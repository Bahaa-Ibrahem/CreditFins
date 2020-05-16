import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import SampleJson from 'src/assets/test.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map , catchError } from 'rxjs/operators';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  today: number = Date.now();
  num;
  subTotal: number;
  totalDis: number;
  totalTax: number;
  totalBalance: number;
  total1: number = 0;
  total2: number = 0;
  total3: number = 0;
  total4: number = 0;
  total5: number = 0;
  private _jsonURL = 'assets/test.json';


  constructor(private fb: FormBuilder, private http: HttpClient) { 
  
    // console.log(object);
  }

  imprtData() {
    var object;
    this.getJSON().subscribe((data) => {
      object=data;
      console.log(object);

    })
  }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL).pipe(
      map((data:any) => data ,
      catchError(error => {throw error})
    ))
    
  }

  Form = this.fb.group({
    companyName: ['',[ Validators.required]],
    address: ['' , Validators.required],
    shName: ['',[ Validators.required]],
    biName: ['',[ Validators.required]],
    shCompanyName: ['',[ Validators.required]],
    biCompanyName: ['',[ Validators.required]],
    shAddress: ['',[ Validators.required]],
    biAddress: ['',[ Validators.required]],
    shPhone: ['',[ Validators.required]],
    biPhone: ['',[ Validators.required]],
    shEmail: ['',[ Validators.required]],
    biEmail: ['',[ Validators.required]],
    notes: ['',[ Validators.required]],
    

  });

  calculateTotalPrice(quntity: number, price: number, id: number) {
    if(id == 1) this.total1 = quntity*price;
    if(id == 2) this.total2 = quntity*price;
    if(id == 3) this.total3 = quntity*price;
    if(id == 4) this.total4 = quntity*price;
    if(id == 5) this.total5 = quntity*price;

    this.subTotal = this.total1 + this.total2 + this.total3 + this.total4 + this.total5;
  }

  balance(shipping: number) {
    this.totalBalance = this.totalDis + this.totalTax + shipping;
  }

  taxRate(taxRa: number) {
    console.log(this.totalDis);
    console.log(taxRa)
    this.totalTax = (this.totalDis*taxRa)/100;
    console.log(this.totalTax)

  }
  totalDiscount(discount: number) {
    this.totalDis = this.subTotal - discount;
  }

  ngOnInit() {
    // this.total1 = this.quntity1.nativeElement.value * this.price1.nativeElement.value;
    if (localStorage.getItem('num')) {
      this.num = parseInt(localStorage.getItem('num'));
      localStorage.setItem('num', this.num+1);
      this.num = parseInt(localStorage.getItem('num'));
    } else {
      this.num = '1';
      localStorage.setItem('num', this.num);
    }
  }

  onSubmit() {
    console.log(this.Form.value);
    var newBook = {
      isbn: 'isbn', 
      title: 'title',
      year: 'year'
    };
    $.ajax({
      type: "POST",
      data: JSON.stringify(newBook),
      url: 'file:///E:/ITI/Mean%20Stack/Angular/Tasks/CreditFins/CreditFins/src/assets/test.json',
      contentType: "application/json"
  }).done(function(res) {       
      console.log('res', res);
      // Do something with the result :)
  });
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Accept': '*/*',
    //     //'Authorization': 'my-auth-token'
    //   })
    // };
  //   this.http.post('file:///E:/ITI/Mean%20Stack/Angular/Tasks/CreditFins/CreditFins/src/assets/test.json',
  //    newBook, httpOptions)
  //   .subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  }

}
