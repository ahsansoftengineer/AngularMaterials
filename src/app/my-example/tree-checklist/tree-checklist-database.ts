import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Analysis } from "./todo-item-node.class";
import { TREE_DATA } from "./tree-checklist-data";

@Injectable({
  providedIn: 'root'
})
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<Analysis[]>([]);

  get data(): Analysis[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `Analysis` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `Analysis`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): Analysis[] {
    return Object.keys(obj).reduce<Analysis[]>((accumulator, key) => {
      const value = obj[key];
      const node = new Analysis();
      node.title = key;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.title = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  // insertItem(parent: Analysis, name: string) {
  //   if (parent.children) {
  //     parent.children.push({ item: name } as Analysis);
  //     this.dataChange.next(this.data);
  //   }
  // }

  // updateItem(node: Analysis, name: string) {
  //   node.item = name;
  //   this.dataChange.next(this.data);
  // }
}
