/** Flat node with expandable and level information */
// This is Not in Use
export class Analysis {
  constructor(
    public id: number,
    public title: string = '',
    public children: Analysis[] = [],
    ) {
  }
}
export class AnalysisFlat {
  constructor(
    public id: number,
    public title: string,
    public count: number,
    public level: number = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false,
    public status: number = 0,


    ) {}
}
