import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressFormsComponent } from './address-forms.component';

const routes: Routes = [{ path: '', component: AddressFormsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressFormsRoutingModule { }
