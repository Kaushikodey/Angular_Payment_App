import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms'
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onsubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0) {
      this.InsertRecord(form);
    }
    else {
      this.UpdateRecord(form);
    }
  }

  InsertRecord(form: NgForm) {

    this.service.postPaymentDetail().subscribe(res => {
      this.resetForm(form);
      this.toastr.success('Submitted Successfully', 'Payment Detail Register');
      this.service.refreshList();
    }, err => {
      console.log(err);
      this.toastr.error('everything is broken', 'Major Error', {
        timeOut: 3000,
      });
    });

  }

  UpdateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(res => {
     
      this.toastr.info('Updated Successfully', 'Payment Detail Update');
      this.resetForm(form);
      this.service.refreshList();
    }, err => {
      console.log(err);
      this.toastr.error('everything is broken', 'Major Error', {
        timeOut: 3000,
      });
    });
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
