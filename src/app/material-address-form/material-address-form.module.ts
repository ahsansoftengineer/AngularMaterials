import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAddressFormRoutingModule } from './material-address-form-routing.module';
import { AddressFormsComponent } from './address-forms/address-forms.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddressFormsComponent],
  imports: [
    CommonModule,
    MaterialAddressFormRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ]
})
export class MaterialAddressFormModule { }
