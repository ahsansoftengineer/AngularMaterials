import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressFormsRoutingModule } from './address-forms-routing.module';
import { AddressFormsComponent } from './address-forms.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressFormsComponent
  ],
  imports: [
    CommonModule,
    AddressFormsRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class AddressFormsModule { }
