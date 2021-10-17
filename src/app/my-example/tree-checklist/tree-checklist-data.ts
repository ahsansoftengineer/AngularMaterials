import { AnalysisFlat } from './todo-item-node.class';

export const TREE_DATA = {
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
// export const TREE_DATA = [

//   [101, 'Ahsan', [
//     new AnalysisFlat(201, 'A', 3, 1, false, false, 2),
//     new AnalysisFlat(202, 'B', 0, 1, false, false, 1),
//     new AnalysisFlat(203, 'C', 0, 1, false, false, 1),
//   ]],
//   [102, [
//     new AnalysisFlat(204, 'D', 0, 1),
//     new AnalysisFlat(205, 'E', 0, 1),
//   ]],
//   [103, [
//     new AnalysisFlat(206, 'F', 0, 1),
//     new AnalysisFlat(207, 'G', 0, 1, false, false, 1),
//     new AnalysisFlat(208, 'H', 0, 1),
//   ]],
//   [201, [
//     new AnalysisFlat(301, 'I', 0, 2),
//     new AnalysisFlat(302, 'J', 0, 2, false, false, 1),
//     new AnalysisFlat(303, 'K', 3, 2, false, false, 2),
//   ]],
//   [303, [
//     new AnalysisFlat(401, 'L', 0, 3),
//     new AnalysisFlat(402, 'M', 0, 3),
//     new AnalysisFlat(403, 'N', 0, 3, false, false, 1),
//   ]],
// ]

  // new AnalysisFlat(206, 'F', 0, 1),
  // new AnalysisFlat(207, 'G', 0, 1, false, false, 1),
  // new AnalysisFlat(208, 'H', 0, 1),
  // new AnalysisFlat(301, 'I', 0, 2),
  // new AnalysisFlat(302, 'J', 0, 2, false, false, 1),
  // new AnalysisFlat(303, 'K', 3, 2, false, false, 2),
  // new AnalysisFlat(401, 'L', 0, 3),
  // new AnalysisFlat(402, 'M', 0, 3),
  // new AnalysisFlat(403, 'N', 0, 3, false, false, 1),
// export const TREE_DATA = {
//   101: {
//     201: new AnalysisFlat(201, 'A', 3, 1, false, false, 2),
//     202: new AnalysisFlat(202, 'B', 0, 1, false, false, 1),
//     203: new AnalysisFlat(203, 'C', 0, 1, false, false, 1),
//     children: {
//       301: new AnalysisFlat(206, 'F', 0, 1),
//       302: new AnalysisFlat(207, 'G', 0, 1, false, false, 1),
//       303: new AnalysisFlat(208, 'H', 0, 1),
//     },
//   },
//   102: [
//     new AnalysisFlat(301, 'I', 0, 2),
//     new AnalysisFlat(302, 'J', 0, 2, false, false, 1),
//     new AnalysisFlat(303, 'K', 3, 2, false, false, 2),
//   ],
//   103: [
//     new AnalysisFlat(401, 'L', 0, 3),
//     new AnalysisFlat(402, 'M', 0, 3),
//     new AnalysisFlat(403, 'N', 0, 3, false, false, 1),
//   ]
// };
