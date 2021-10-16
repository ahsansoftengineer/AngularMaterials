import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyExampleRoutingModule } from './my-example-routing.module';
import { MyExampleComponent } from './my-example.component';
import { TreeViewAPIComponent } from './tree-view-api/tree-view-api.component';
import { MaterialModule } from '../material/material.module';
import { TreeChecklistComponent } from './tree-checklist/tree-checklist.component';


@NgModule({
  declarations: [
    MyExampleComponent,
    TreeViewAPIComponent,
    TreeChecklistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MyExampleRoutingModule
  ]
})
export class MyExampleModule { }
