import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptchanewComponent } from './captchanew/captchanew.component';


const routes: Routes =
 [
  {path:'',component:CaptchanewComponent},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
