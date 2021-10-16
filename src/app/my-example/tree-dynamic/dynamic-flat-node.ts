/** Flat node with expandable and level information */

export class DynamicItemNode {
  constructor(
    public children: DynamicItemNode[],
    public item: string = '') {
  }
}
export class DynamicItemFlatNode {
  constructor(
    public item: string,
    public level: number = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false
    ) {}
}
