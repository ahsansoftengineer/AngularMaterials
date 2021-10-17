import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DynamicDatabase } from "./dynamic-database";
import { AnalysisFlat } from "./dynamic-flat-node";

@Injectable({
  providedIn: 'root'
})
export class DynamicDataSource {
  dataChange: BehaviorSubject<AnalysisFlat[]> = new BehaviorSubject<AnalysisFlat[]>([]);
  get data(): AnalysisFlat[] { return this.dataChange.value; }
  set data(value: AnalysisFlat[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }
  constructor(private treeControl: FlatTreeControl<AnalysisFlat>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<AnalysisFlat[]> {
    // this.treeControl.expansionModel.onChange!.subscribe(change => {
      this.treeControl.expansionModel.changed!.subscribe(change => {
      if ((change as SelectionChange<AnalysisFlat>).added ||
        (change as SelectionChange<AnalysisFlat>).removed) {
        this.handleTreeControl(change as SelectionChange<AnalysisFlat>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data));
  }
  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<AnalysisFlat>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.reverse().forEach((node) => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  // Open Closed Node
  toggleNode(node: AnalysisFlat, expand: boolean) {
    const children = this.database.getChildren(node);
    const index = this.data.indexOf(node);
    // If no children, or cannot find the node, no op
    if (!children || index < 0) { return; }
    if (expand) {
      node.isLoading = true;
      setTimeout(() => {
        // const nodes = children.map(analysis =>
        //   new AnalysisFlat(analysis.id, analysis.title, analysis.count, analysis.level,  this.database.isExpandable(analysis)));
        // this.data.splice(index + 1, 0, ...nodes);
        this.data.splice(index + 1, 0, ...children);
        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;
      }, 400);
    } else {
      this.data.splice(index + 1, children.length);
      console.log(node);

      this.dataChange.next(this.data);
    }
  }



}
