import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakePaymentComponent } from './../make-payment/make-payment.component';
import { PaymentService } from './../payment.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MakePaymentComponent
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
