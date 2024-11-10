import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  constructor() { }

  
  public blue = new BehaviorSubject<boolean>(false);
  public blueview = new BehaviorSubject<boolean>(false);

  setBlue(changeToggle: boolean)
  {
   
    this.blue.next(changeToggle);
  }


  getBlue() 
  
  {
    return this.blue.asObservable();
    
 
  }

  


  
  
}
