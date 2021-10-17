import { BehaviorSubject } from "rxjs";
import { Analysis, AnalysisFlat } from "./dynamic-flat-node";

export class DynamicDatabase {
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
  initialData(): AnalysisFlat[] {
    return [
      new AnalysisFlat(101, 'Ahsan',1, 0, true, false,2),
      new AnalysisFlat(102, 'Asim', 2, 0, true, false, 0),
      new AnalysisFlat(103, 'Mobin', 3, 0, true, false, 0),
    ];
  }
  getChildren(node: AnalysisFlat): AnalysisFlat[] | undefined {
    return this.dataMap.get(node.id);
  }
  isExpandable(node: AnalysisFlat): boolean {
    return node.count > 0;
  }
  dataChange = new BehaviorSubject<Analysis[]>([]);
  get data(): Analysis[] {
    return this.dataChange.value;
  }
}
