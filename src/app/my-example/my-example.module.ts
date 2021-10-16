import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyExampleRoutingModule } from './my-example-routing.module';
import { MyExampleComponent } from './my-example.component';
import { TreeViewAPIComponent } from './tree-view-api/tree-view-api.component';
import { MaterialModule } from '../material/material.module';
import { TreeDynamicComponent } from './tree-dynamic/tree-dynamic.component';
import { TreeChecklistComponent } from './tree-checklist/tree-checklist.component';



@NgModule({
  declarations: [
    MyExampleComponent,
    TreeViewAPIComponent,
    TreeDynamicComponent,
    TreeChecklistComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MyExampleRoutingModule
  ]
})
export class MyExampleModule { }
