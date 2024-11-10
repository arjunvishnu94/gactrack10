import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from './profile.model';


const GRAPH_ENDPOINT="https://graph.microsoft.com/v1.0/users";
 const GRAPH_ENDPOINT_PIC="https://graph.microsoft.com/v1.0/me/photo/$value";
 const GRAPH_ENDPOINT_test="?$top=999&$count=true&$filter= startsWith(country,'Bahrain')";
const GRAPH_ENDPOINTME="https://graph.microsoft.com/v1.0/me";

@Injectable({
  
  providedIn: 'root'

})
export class AzureAdDemomService {

isUserLoggedIn:Subject<boolean> = new Subject<boolean>(); 


  constructor(private httpClient:HttpClient) { }

getUserProfile()
{
  return this.httpClient.get<Profile>(GRAPH_ENDPOINTME);
}

getUserProfilePic()
{
  return this.httpClient.get(GRAPH_ENDPOINT_PIC,
    {
      responseType:"blob"
    });
}


getAllUsers()
 {

  return this.httpClient.get<Profile>(GRAPH_ENDPOINT +GRAPH_ENDPOINT_test);

 }




}
