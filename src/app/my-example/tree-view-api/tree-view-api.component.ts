import { ArrayDataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';


@Component({
  selector: 'app-tree-view-api',
  templateUrl: './tree-view-api.component.html',
  styleUrls: ['./tree-view-api.component.scss'],
})
export class TreeViewAPIComponent {
  // Comparision Flatten and Nested Tree Node
  // 1.
  // Flaten Tree
  treeControl = new FlatTreeControl<FoodNodeFlat>(
    (node) => node.level,
    (node) => node.expandable
  );
  treeControlNested = new NestedTreeControl<FoodNodeNested> (node => node.children);
  // 2.
  dataSource = new ArrayDataSource(TREE_DATA_FLAT);
  dataSourceNested = new ArrayDataSource(TREE_DATA_NESTED);
  // 3.
  hasChild = (_: number, node: FoodNodeFlat) => node.expandable;
  hasChildNested = (_: number, node: FoodNodeNested) => !!node.children && node.children.length > 0;
  // Flat Node Methods
  getParentNode(node: FoodNodeFlat) {
    const nodeIndex = TREE_DATA_FLAT.indexOf(node);
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA_FLAT[i].level === node.level - 1) {
        return TREE_DATA_FLAT[i];
      }
    }

    return null;
  }
  shouldRender(node: FoodNodeFlat) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }
}
/** Flat node with expandable and level information */
interface FoodNodeFlat {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

const TREE_DATA_FLAT: FoodNodeFlat[] = [
  {
    name: 'Fruit',
    expandable: true,
    level: 0,
  },
  {
    name: 'Apple',
    expandable: false,
    level: 1,
  },
  {
    name: 'Banana',
    expandable: false,
    level: 1,
  },
  {
    name: 'Fruit loops',
    expandable: false,
    level: 1,
  },
  {
    name: 'Vegetables',
    expandable: true,
    level: 0,
  },
  {
    name: 'Green',
    expandable: true,
    level: 1,
  },
  {
    name: 'Broccoli',
    expandable: false,
    level: 2,
  },
  {
    name: 'Brussels sprouts',
    expandable: false,
    level: 2,
  },
  {
    name: 'Orange',
    expandable: true,
    level: 1,
  },
  {
    name: 'Pumpkins',
    expandable: false,
    level: 2,
  },
  {
    name: 'Carrots',
    expandable: false,
    level: 2,
  },
];
// Nested Node Structure
interface FoodNodeNested {
  name: string;
  children?: FoodNodeNested[];
}

const TREE_DATA_NESTED: FoodNodeNested[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];
