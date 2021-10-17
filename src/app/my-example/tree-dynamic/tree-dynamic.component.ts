import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { DynamicDatabase } from './dynamic-database';
import { Analysis, AnalysisFlat } from './dynamic-flat-node';
import { DynamicDataSource } from './dynamic-data-source';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

@Component({
  selector: 'app-tree-dynamic',
  templateUrl: './tree-dynamic.component.html',
  styleUrls: ['./tree-dynamic.component.scss'],
  providers: [DynamicDatabase],
})
export class TreeDynamicComponent implements OnInit {
  constructor(public database: DynamicDatabase) {
    // Missing 1
    // this.treeFlattener = new MatTreeFlattener(
    //   this.transformer,
    //   this.getLevel,
    //   this.isExpandable,
    //   this.getChildren
    // );
    this.treeControl = new FlatTreeControl<AnalysisFlat>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    // this.dataSource = new MatTreeFlatDataSource(
    //   this.treeControl,
    //   // Change 1
    //   this.treeFlattener
    // );

    this.dataSource.data = database.initialData();
    // Missing 2
    // database.dataChange.subscribe((data) => {
    //   this.dataSource.data = data;
    // });
  }
  ngOnInit() {}
  treeControl: FlatTreeControl<AnalysisFlat>;
  // dataSource: DynamicDataSource;
  dataSource: any;
  // dataSource: MatTreeFlatDataSource<Analysis, AnalysisFlat>;

  getLevel = (node: AnalysisFlat) => {
    return node.level;
  };

  isExpandable = (node: AnalysisFlat) => {
    return node.expandable;
  };
  // Additional 1
  getChildren = (node: Analysis): Analysis[] => node.children;

  hasChild = (_: number, _nodeData: AnalysisFlat) => {
    return _nodeData.expandable;
  };
  /* Allowed multiple Selection */
  checklistSelection = new SelectionModel<AnalysisFlat>(true);

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: AnalysisFlat): number {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return +descAllSelected;
  }
  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: AnalysisFlat): number {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    console.log('descendantsPartiallySelected');
    if(result && !this.descendantsAllSelected(node)){
      node.status = 2
    } else if(this.descendantsAllSelected(node)){
      node.status = 1
    }
    //  else if(!this.descendantsAllSelected(node)){
    //   node.status = 0
    // }
    return node.status;
  }
  // Only For Parent Toggle Selection
  todoItemSelectionToggle(node: AnalysisFlat): void {
    console.log('todoItemSelectionToggle');
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    // Un Comment This
    this.checkAllParentsSelection(node);
    node.status = +this.checklistSelection.isSelected(node)
    console.log(node);
  }
  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: AnalysisFlat): void {
    console.log('todoLeafItemSelectionToggle');
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    node.status = +this.checklistSelection.isSelected(node)
    console.log(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: AnalysisFlat): void {
    let parent: AnalysisFlat | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: AnalysisFlat): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }
  /* Get the parent node of a node */
  getParentNode(node: AnalysisFlat): AnalysisFlat | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  // Changed From Here
    // Flattener Here
  // treeFlattener: MatTreeFlattener<Analysis, AnalysisFlat>;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<AnalysisFlat, Analysis>();
  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
   transformer = (node: Analysis, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.id === node.id
        ? existingNode
        : new AnalysisFlat(601, 'Ahsan', 0, 1);
    flatNode.id = node.id;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Analysis, AnalysisFlat>();

  /** A selected parent node to be inserted */
  selectedParent: AnalysisFlat | null = null;

  /** The new item's name */
  newItemName = '';

  // hasNoContent = (_: number, _nodeData: AnalysisFlat) =>
  //   _nodeData.item === '';

  /** Select the category so we can insert the new item. */
  // addNewItem(node: AnalysisFlat) {
  //   const parentNode = this.flatNodeMap.get(node);
  //   this._database.insertItem(parentNode!, '');
  //   this.treeControl.expand(node);
  // }

  /** Save the node to database */
  // saveNode(node: AnalysisFlat, itemValue: string) {
  //   const nestedNode = this.flatNodeMap.get(node);
  //   this._database.updateItem(nestedNode!, itemValue);
  // }
}
