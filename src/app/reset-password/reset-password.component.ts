import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ResetForm:FormGroup
  selectedDay: any;
  constructor(
    public router:Router,
    public formBuilder: FormBuilder,
    public service :ServiceService,
    // public Translate:TranslateService,
    // private ngxService: NgxUiLoaderService,
    // private authService: SocialAuthService,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
    private ActivatedRouter:ActivatedRoute,
    public translate: TranslateService,

    ) { }

  ngOnInit() {
  
    let parms = this.ActivatedRouter.snapshot.paramMap.get('token')
    console.log(parms);



    this.ResetForm = this.formBuilder.group({
      username: ['', Validators.required],
      // password: ['', Validators.required]
    })
  }

  

  showSuccess(loginApiHit) {
    this.toast.success(loginApiHit, );
        }
  
  errorToast(error){
    this.toast.error(error, '' ,{
      timeOut: 3000,
    });
  }
async  resetPassordApiHit() {
  
  console.log(this.ResetForm.value)
  

    try{
      this.ngxService.start(); 
      let loginApiHit = await this.service.resetPassword(this.ResetForm.value).toPromise();
      console.log(loginApiHit);
      this.showSuccess(loginApiHit)
      // this.getTokenApi()
      // localStorage.setItem('LoginResponse',JSON.stringify(responseFromLogin_Api));
      // this.ngxService.stop();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();

      }, 2000);
      this.router.navigateByUrl('/login')

    }catch(error){
      console.log(error)
      setTimeout(() => {
        //         /** spinner ends after 5 seconds */

         this.ngxService.stop();
        
              }, 1000);
      this.errorToast(error.error)

    }
  }
  
  
  switchLanguage(language: string) {
    console.log(language)

    this.translate.use(language);
    console.log(this.translate.use(language));
  }
  selectChangeHandler(event: any) {
    //update the ui

    this.selectedDay = event.target.value;
    let language = localStorage.getItem('language')

    this.switchLanguage(language);
    this.switchLanguage(this.selectedDay);
    // if (language != undefined) {
    //   console.log(this.selectedDay)
    //   this.switchLanguage(language);

    // } else {
    //   localStorage.setItem('language', this.selectedDay)
    //   this.switchLanguage(this.selectedDay);
    // }
    // this.selectedDay


  }

  // async  getTokenApi() {
  
  //   // console.log()
    
  
  //     try{
  //       this.ngxService.start(); 
  //     let mail = this.ResetForm.value.email
  //     console.log(mail)
  //       let ResetToken = await this.service.ResetToken(mail).toPromise();
  //       console.log(ResetToken.result);
  //       localStorage.setItem('resetTokenResponse',JSON.stringify(ResetToken.result));
  //       // this.ngxService.stop();
  
  //       setTimeout(() => {
  //         /** spinner ends after 5 seconds */
  //         // this.ngxService.stop();
  
  //       }, 2000);
  //       this.router.navigateByUrl('/login')
  
  //     }catch(error){
  //       console.log(error)
  //     }
  //   }
}