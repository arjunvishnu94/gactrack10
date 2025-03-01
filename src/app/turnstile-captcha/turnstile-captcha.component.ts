import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonStateService } from 'src/button-state.service';


declare global {
  interface Window {
    onTurnstileSuccess: (token: string) => void;
  }
}

@Component({
  selector: 'app-turnstile-captcha',
  template: `<div class="cf-turnstile" data-sitekey="0x4AAAAAAAw3x3k-pB613i6R" data-callback="onTurnstileSuccess"></div>`,
})
export class TurnstileCaptchaComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private buttonStateService: ButtonStateService) { }

  ngOnInit() {

    window.onTurnstileSuccess = (token: string) => {
     





      const headers = new HttpHeaders({
        'Content-Type': 'application/json',

      });

      const body = {};

      this.http.post<any>('https://iopeu-bah-apw02.azurewebsites.net/api/captchapost/' + token, body, { headers }).subscribe({
        next: (res) => {
         // console.log('Verification response:', res);





          if (res.success) {
            this.buttonStateService.setButtonEnabled(true); 
           // console.log(res.success)
        }

        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.buttonStateService.setButtonEnabled(false);
        }
      });


    }
  }

  ngAfterViewInit() {

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }


}
