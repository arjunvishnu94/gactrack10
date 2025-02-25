

import { Component, OnInit, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonStateService } from 'src/button-state.service';



@Component({
  selector: 'app-captchanew',
  templateUrl: './captchanew.component.html',
  styleUrls: ['./captchanew.component.css']
})
export class CaptchanewComponent implements OnInit {
  [x: string]: any;
  title = 'trackinggaclogins';

  popup1 = true
  popup2 = false
  popup3 = false
  popup4 = false
  popup5 = false
  popup6 = false
  popup7 = false
  abc: any;


  isButtonEnabled: boolean = false;
  edionedetail1 !: FormArray;
  invoiceproduct1 !: FormGroup;




  abc1: any[];

  totalAngularPackages: any;
  shipmentDetails:any = {};







  getGroupedData() {
    if (!Array.isArray(this.abc1)) {
      return {}; 
    }
    const groupedData = this.groupByCategory(this.abc1);
    const maxDateItem = this.findMaxDateItem(this.abc1);
    Object.keys(groupedData).forEach(category => {
      groupedData[category].forEach(ts => {
        ts.isMaxDate = ts.createddate === maxDateItem.createddate;
      });


      groupedData[category].sort((a, b) => new Date(b.createddate).getTime() - new Date(a.createddate).getTime());
      
    });
    //console.log(groupedData)
    return groupedData;
    
  }

  private findMaxDateItem(items: any[]) {
    if (items.length === 0) {
      return null;  
    }
    return items.reduce((max, ts) =>
      new Date(ts.createddate) > new Date(max.createddate) ? ts : max
    );
  }

  private groupByCategory(data: any[]) {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return {}; 
  }


    return data.reduce((acc, ts) => {
      (acc[ts.category] = acc[ts.category] || []).push(ts);

     // console.log(acc)
      
      return acc;

      
    }, 
   
    {});
  }

  constructor(public formBuilder: FormBuilder, private builder: FormBuilder, 
    private datepipe: DatePipe,
    private http: HttpClient, private dialog: MatDialog, private SpinnerService: NgxSpinnerService,
  private buttonStateService: ButtonStateService) { }
    
    
  ngOnInit(): void {
    this.buttonStateService.buttonEnabled$.subscribe(enabled => {
      this.isButtonEnabled = enabled;
    });

  }

  productForm = this.formBuilder.group({
    trackingnumber: ['', Validators.required],
    customername: [''],
    origin: [''],
    destination: [''],
    hblnumber: [''],
    etd: [],
    eta: [],
    ata: [],
    atd: [],
    jobnumber: [''],
    hbl: [''],
    mbl: [''],
    events: [''],
    createddate: [''],
    jobopenedby: [''],
    billingparty: [''],
    events1: [''],
    createddate1: [''],
    events2: [''],
    createddate2: [''],
    events3: [''],
    createddate3: [''],
    details1: this.builder.array([]),
  })


  get invproducts1() {
    return this.productForm.get("details1") as FormArray;
  }



  open() { this.popup3 = true; this.popup4 = true; this.popup5 = true; this.popup6 = true; this.popup7 = true }

  close() { this.popup3 = false }

  open1() { this.popup4 = true }

  close1() { this.popup4 = false }

  open2() { this.popup5 = true }

  close2() { this.popup5 = false }

  open3() { this.popup6 = true }

  close3() { this.popup6 = false }

  open4() { this.popup7 = true }

  close4() { this.popup7 = false }


  track(){

    this.popup1 = true
    this.popup2 = false
    this.popup3 = false
    this.popup4 = false
    this.popup5 = false
    this.popup6 = false
    this.popup7 = false

    this.buttonStateService.buttonEnabled$.subscribe(enabled => {
      this.isButtonEnabled = enabled;
    });

    location.reload();

  }

  search() {


    this.SpinnerService.show();


    this.http.get<any>('https://api20220705123849.azurewebsites.net/api/jobs/gactrack/' + this.productForm.getRawValue().trackingnumber).subscribe({
      next: (res) => {

//console.log(res)
      

        if(res!= null) {

        this.popup2 = true
        this.popup3 = true
        this.popup4 = true
        this.popup5 = true
        this.popup6 = true
        this.popup7 = true

        this.popup1 = false

        this.productForm.controls['jobnumber'].setValue(res.jobnumber);
        this.productForm.controls['customername'].setValue(res.customer);
        this.productForm.controls['billingparty'].setValue(res.billingparty);
        this.productForm.controls['jobopenedby'].setValue(res.jobopenedby);
        this.productForm.controls['origin'].setValue(res.pol);
        this.productForm.controls['destination'].setValue(res.pod);
        this.productForm.controls['hblnumber'].setValue(res.hbl);
     
        this.productForm.controls['hbl'].setValue(res.hbl);
        this.productForm.controls['mbl'].setValue(res.mbl);
       
        this.jobevents1()

        const formattedEta = this.datepipe.transform(res.eta, 'MMMM dd, yyyy')
        const formattedEtd = this.datepipe.transform(res.etd, 'MMMM dd, yyyy')
        const formattedAta = this.datepipe.transform(res.ata, 'MMMM dd, yyyy')
        const formattedAtd = this.datepipe.transform(res.atd, 'MMMM dd, yyyy')


        this.shipmentDetails = {
          trackingnumber :this.productForm.getRawValue().trackingnumber,
          origin:res.pol,
          destination:res.pod,
          customername:res.customer,
          billingparty:res.billingparty,
          etd:formattedEtd,
          eta:formattedEta,
          hbl:res.hbl,
          mbl:res.mbl,
          ata:formattedAta,
          atd:formattedAtd
        }
       
      }


        else
        
        {

          this.SpinnerService.hide();

    

        }

      },

      error: (error) => {

        this.SpinnerService.hide();
//

      },


    })




  }











  jobevents1() {


    this.http.get<any>('https://api20220705123849.azurewebsites.net/api/jobevent/getjobeventsjointracking/' + this.productForm.getRawValue().jobnumber).subscribe({
      next: (res1) => {


        //console.log(res1)

        this.abc1 = res1.filter(u => u.trackerevent == 'Y').sort((a, b) => new Date(a.createddate).getTime() - new Date(b.createddate).getTime());
        this.SpinnerService.hide();

      }
    })
  }





}
