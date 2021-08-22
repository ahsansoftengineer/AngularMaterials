import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DragDropsComponent } from './drag-drops.component';

const routes: Routes = [
  // { path: '', component: DragDropsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragDropsRoutingModule { }
