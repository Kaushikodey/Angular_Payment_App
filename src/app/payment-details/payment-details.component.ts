import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  IsShown: boolean = true;
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.service.refreshList();
    //console.log(this.service.list);
  }

  populateForm(selectedData: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedData);
  }
  deleterRecord(id: number) {
    if (confirm("Are you sure that you want to delete this record?")) {
      this.service.deletePaymentDetail(id).subscribe(x => {
        this.service.refreshList();
        this.toastr.error('Deleted Successfully', 'Payment Detail Deletion');
      }, err => {
        console.log(err);
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
      });
    }
  }

}
