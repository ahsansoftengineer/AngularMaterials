/**
 * Node for to-do item
 */
 export class TodoItemNode {
  constructor(public children: TodoItemNode[], public item: string = '') {
    this.children = children;
    this.item = item;
  }
}
/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  constructor(
    public item: string = '',
    public level: number = 0,
    public expandable: boolean = false
  ) {}
}
