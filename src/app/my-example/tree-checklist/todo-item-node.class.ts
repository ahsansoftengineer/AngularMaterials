/**
 * Node for to-do item
 */
export class Analysis {
  constructor(
    public id: string = '',
    public title: string = '',
    public analysisFlat: AnalysisFlat = new AnalysisFlat(),
    public children: Analysis[] = [],
    ) {
  }
}
/** Flat to-do item node with expandable and level information */
export class AnalysisFlat {
  constructor(
    public id: number = 0,
    public title: string = '',
    public count: number = 0,
    public level: number = 1,
    public expandable: boolean = false,
    public isLoading: boolean = false,
    public status: number = 0,
    ) {}
}
