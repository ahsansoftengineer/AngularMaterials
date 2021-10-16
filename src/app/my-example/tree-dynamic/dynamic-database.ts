import { DynamicItemFlatNode } from "./dynamic-flat-node";

export class DynamicDatabase {
  dataMap = new Map([
    ['Simulation', ['Factorio', 'Oxygen not included']],
    ['Indie', [`Don't Starve`, 'Terraria', 'Starbound', 'Dungeon of the Endless']],
    ['Action', ['Overcooked']],
    ['Strategy', ['Rise to ruins']],
    ['RPG', ['Magicka']],
    ['Magicka', ['Magicka 1', 'Magicka 2']],
    [`Don't Starve`, ['Region of Giants', 'Together', 'Shipwrecked']]
  ]);

  rootLevelNodes = ['Simulation', 'Indie', 'Action', 'Strategy', 'RPG'];

  /** Initial data from database */
  initialData(): DynamicItemFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicItemFlatNode(name, 0, true));
  }
  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }
  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
