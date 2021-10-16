import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyExampleComponent } from './my-example.component';
import { TreeChecklistComponent } from './tree-checklist/tree-checklist.component';
import { TreeDynamicComponent } from './tree-dynamic/tree-dynamic.component';
import { TreeViewAPIComponent } from './tree-view-api/tree-view-api.component';

const routes: Routes = [
  { path: '', component: MyExampleComponent },
  { path: 'my_tree_view', component: TreeViewAPIComponent },
  { path: 'check_list_tree', component: TreeChecklistComponent },
  { path: 'dynamic_tree', component: TreeDynamicComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyExampleRoutingModule {}
