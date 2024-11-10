
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
 
constructor(private http : HttpClient) {}
  ngOnInit() {


   
 
 }



}






