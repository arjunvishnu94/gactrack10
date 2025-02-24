import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {


   upload: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {






  }
  save1(){

  

      const SECRET_KEY = '0x4AAAAAAAw3xywIWN3TEWI15oPh4c6c0rA';
  const sitekey = '0x4AAAAAAAw3x3k-pB613i6R'

  let formData = new FormData();
      formData.append('secretkey', SECRET_KEY);
      formData.append('sitekey', sitekey);

    async function handlePost(request) {
      const body = await request.formData();
      // Turnstile injects a token in "cf-turnstile-response".
      const token = body.get("cf-turnstile-response");
      const ip = request.headers.get("CF-Connecting-IP");
    
      // Validate the token by calling the
      // "/siteverify" API endpoint.
      let formData = new FormData();
      formData.append("secret", SECRET_KEY);
      formData.append("response", token);
      formData.append("remoteip", ip);
    
      const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const result = await fetch(url, {
        body: formData,
        method: "POST",

      });
    
      const outcome = await result.json();
      if (outcome.success) {
        // ...
      }
    }

  }

save(){

  

  const SECRET_KEY = '0x4AAAAAAAw3xywIWN3TEWI15oPh4c6c0rA';
  const sitekey = '0x4AAAAAAAw3x3k-pB613i6R'


      
      // Turnstile injects a token in "cf-turnstile-response".
    //   const token = ('cf-turnstile-response');
    // const ip = ('CF-Connecting-IP');
  
      // Validate the token by calling the "/siteverify" API.
      let formData = new FormData();
      formData.append('secretkey', SECRET_KEY);
      formData.append('sitekey', sitekey);
      // formData.append('remoteip', ip);
  
      // const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      //     body: formData,
      //     method: 'POST',
      // });

      this.http.post('https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback', formData)
      
      .subscribe(result => {


      this.data =  JSON.stringify(result)


      console.log(this.data)
  
       this.data = "success"

      if (this.data != "success") {

          return new Response('The provided Turnstile token was not valid! \n' + JSON.stringify(result));
          
      }
      else{
      // The Turnstile token was successfuly validated. Proceed with your application logic.
      // Validate login, redirect user, etc.
      // For this demo, we just echo the "/siteverify" response:
      return new Response('Turnstile token successfuly validated \n' + JSON.stringify(result));
  }
}
      )
    


}


 


}

  function handlePost(request: any) {
    throw new Error('Function not implemented.');
  }


