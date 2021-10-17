import { BehaviorSubject } from "rxjs";
import { Analysis, AnalysisFlat } from "./dynamic-flat-node";

export class DynamicDatabase {
  // dataMap = new Map([
  //   ['Simulation', ['Factorio', 'Oxygen not included']],
  //   ['Indie', [`Don't Starve`, 'Terraria', 'Starbound', 'Dungeon of the Endless']],
  //   ['Action', ['Overcooked']],
  //   ['Strategy', ['Rise to ruins']],
  //   ['RPG', ['Magicka']],
  //   ['Magicka', ['Magicka 1', 'Magicka 2']],
  //   [`Don't Starve`, ['Region of Giants', 'Together', 'Shipwrecked']]
  // ]);
  dataMap = new Map([
    [101, [
      new AnalysisFlat(201, 'A', 3, 1, false, false, 2),
      new AnalysisFlat(202, 'B', 0, 1, false, false, 1),
      new AnalysisFlat(203, 'C', 0, 1, false, false, 1),
    ]],
    [102, [
      new AnalysisFlat(204, 'D', 0, 1),
      new AnalysisFlat(205, 'E', 0, 1),
    ]],
    [103, [
      new AnalysisFlat(206, 'F', 0, 1),
      new AnalysisFlat(207, 'G', 0, 1, false, false, 1),
      new AnalysisFlat(208, 'H', 0, 1),
    ]],
    [201, [
      new AnalysisFlat(301, 'I', 0, 2),
      new AnalysisFlat(302, 'J', 0, 2, false, false, 1),
      new AnalysisFlat(303, 'K', 3, 2, false, false, 2),
    ]],
    [303, [
      new AnalysisFlat(401, 'L', 0, 3),
      new AnalysisFlat(402, 'M', 0, 3),
      new AnalysisFlat(403, 'N', 0, 3, false, false, 1),
    ]],

  ]);
  // rootLevelNodes = [ 'Simulation', 'Indie', 'Action', 'Strategy','RPG'];
  /** Initial data from database */
  initialData(): AnalysisFlat[] {
    return [
      new AnalysisFlat(101, 'Ahsan',1, 0, true, false,2),
      new AnalysisFlat(102, 'Asim', 2, 0, true, false, 0),
      new AnalysisFlat(103, 'Mobin', 3, 0, true, false, 0),
    ];
    // return this.rootLevelNodes.map(name => new AnalysisFlat(name, 0, true))
  }
  getChildren(node: AnalysisFlat): AnalysisFlat[] | undefined {
    return this.dataMap.get(node.id);
  }
  isExpandable(node: AnalysisFlat): boolean {
    // return this.dataMap.has(node.id);
    return node.count > 0;
  }

  // Change Here
  dataChange = new BehaviorSubject<Analysis[]>([]);

  get data(): Analysis[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `Analysis` with nested
    // file node as children.
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
      const node = new Analysis(value);
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
  // insertItem(parent: TodoItemNode, name: string) {
  //   if (parent.children) {
  //     parent.children.push({ item: name } as TodoItemNode);
  //     this.dataChange.next(this.data);
  //   }
  // }

  // updateItem(node: TodoItemNode, name: string) {
  //   node.item = name;
  //   this.dataChange.next(this.data);
  // }
}

// This is Also Aditional
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null,
    },
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular',
  ],
};
