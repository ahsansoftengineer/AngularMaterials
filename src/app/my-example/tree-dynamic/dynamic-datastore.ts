import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DynamicDatabase } from "./dynamic-database";
import { DynamicItemFlatNode } from "./dynamic-flat-node";

@Injectable({
  providedIn: 'root'
})
export class DynamicDataSource {

  dataChange: BehaviorSubject<DynamicItemFlatNode[]> = new BehaviorSubject<DynamicItemFlatNode[]>([]);

  get data(): DynamicItemFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicItemFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }



  constructor(private treeControl: FlatTreeControl<DynamicItemFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicItemFlatNode[]> {
    // this.treeControl.expansionModel.onChange!.subscribe(change => {
      this.treeControl.expansionModel.changed!.subscribe(change => {
      if ((change as SelectionChange<DynamicItemFlatNode>).added ||
        (change as SelectionChange<DynamicItemFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicItemFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicItemFlatNode>) {
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
  toggleNode(node: DynamicItemFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }


    if (expand) {
      node.isLoading = true;

      setTimeout(() => {
        const nodes = children.map(name =>
          new DynamicItemFlatNode(name, node.level + 1, this.database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;
      }, 1000);
    } else {
      this.data.splice(index + 1, children.length);
      this.dataChange.next(this.data);
    }
  }



}
