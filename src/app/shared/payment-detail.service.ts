import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  readonly BaseURL = 'https://localhost:44340/api/PaymentDetail';
  constructor(private http: HttpClient) { }
  formData: PaymentDetail = new PaymentDetail();
  list: PaymentDetail[];
  postPaymentDetail() {
    return this.http.post(this.BaseURL, this.formData);
  }
  refreshList() {
    this.http.get(this.BaseURL).toPromise().then(res => this.list = res as PaymentDetail[]);
    // if (this.list == null || this.list == undefined || this.list.length < 1) {
    //   return false;
    // }
    // else {
    //   return true;
    // }
  }
  putPaymentDetail() {
    return this.http.put(this.BaseURL + '/' + this.formData.paymentDetailId, this.formData);
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(this.BaseURL + '/' + id);
  }
}
