import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'addressforms',
    loadChildren: () =>
      import('./address-forms/address-forms.module').then(
        (m) => m.AddressFormsModule
      ),
  },
  {
    path: 'navigations',
    loadChildren: () =>
      import('./navigations/navigations.module').then(
        (m) => m.NavigationsModule
      ),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then((m) => m.TablesModule),
  },
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'trees',
    loadChildren: () =>
      import('./trees/trees.module').then((m) => m.TreesModule),
  },
  {
    path: 'drag-drops',
    loadChildren: () =>
      import('./drag-drops/drag-drops.module').then((m) => m.DragDropsModule),
  },
  {
    path: 'my_example',
    loadChildren: () =>
      import('./my-example/my-example.module').then((m) => m.MyExampleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
