import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationsRoutingModule } from './navigations-routing.module';
import { NavigationsComponent } from './navigations.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    NavigationsComponent,
  ],
  imports: [
    CommonModule,
    NavigationsRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class NavigationsModule { }
