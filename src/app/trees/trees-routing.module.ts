import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreesComponent } from './trees.component';

const routes: Routes = [{ path: '', component: TreesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreesRoutingModule { }
