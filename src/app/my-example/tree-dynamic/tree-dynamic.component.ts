import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { DynamicDatabase } from './dynamic-database';
import { DynamicItemFlatNode, DynamicItemNode } from './dynamic-flat-node';
import { DynamicDataSource } from './dynamic-datastore';
import { MatTreeFlatDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-tree-dynamic',
  templateUrl: './tree-dynamic.component.html',
  styleUrls: ['./tree-dynamic.component.scss'],
  providers: [DynamicDatabase],
})
export class TreeDynamicComponent implements OnInit {
  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(
      this.treeControl,
      database);
    // this.dataSource = new MatTreeFlatDataSource(
    //   this.treeControl,
    //   // Change 1
    //   this.treeFlattener
    // );

    this.dataSource.data = database.initialData();
  }
  ngOnInit() {}
  treeControl: FlatTreeControl<DynamicItemFlatNode>;
  // dataSource: DynamicDataSource;
  dataSource: any;
  getLevel = (node: DynamicItemFlatNode) => {
    return node.level;
  };

  isExpandable = (node: DynamicItemFlatNode) => {
    return node.expandable;
  };
  // Additional 1
  getChildren = (node: DynamicItemNode): DynamicItemNode[] => node.children;

  hasChild = (_: number, _nodeData: DynamicItemFlatNode) => {
    return _nodeData.expandable;
  };
  /* Allowed multiple Selection */
  checklistSelection = new SelectionModel<DynamicItemFlatNode>(true);

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: DynamicItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }
  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: DynamicItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }
  // Analysied
  todoItemSelectionToggle(node: DynamicItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child))
    // Un Comment This
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: DynamicItemFlatNode): void {
    console.log('todoLeafItemSelectionToggle');
    console.log(node);
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: DynamicItemFlatNode): void {
    let parent: DynamicItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }
  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: DynamicItemFlatNode): void {
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
  getParentNode(node: DynamicItemFlatNode): DynamicItemFlatNode | null {
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

}
