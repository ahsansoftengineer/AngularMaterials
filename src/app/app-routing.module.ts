import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'addressform',
    loadChildren: () =>
      import('./material-address-form/material-address-form.module').then(
        (m) => m.MaterialAddressFormModule
      ),
  },
  {
    path: 'navigations',
    loadChildren: () =>
      import('./navigations/navigations.module').then(
        (m) => m.NavigationsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
