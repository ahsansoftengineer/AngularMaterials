import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationsComponent } from './navigations.component';

const routes: Routes = [{ path: '', component: NavigationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationsRoutingModule { }
