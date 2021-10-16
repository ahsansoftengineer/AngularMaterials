import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MaterialModules = [
  ReactiveFormsModule,
  MatButtonModule,
  CdkTreeModule,
  MatTreeModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  LayoutModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [],
  imports: [MaterialModules],
  exports: [MaterialModules],
})
export class MaterialModule {}
