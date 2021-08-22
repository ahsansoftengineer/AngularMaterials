import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreesRoutingModule } from './trees-routing.module';
import { TreesComponent } from './trees.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TreesComponent
  ],
  imports: [
    CommonModule,
    TreesRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TreesModule { }
