import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from  'angularx-social-login';

import {
    GoogleLoginProvider,
    FacebookLoginProvider,
   
  } from 'angularx-social-login';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbModal, NgbCalendar, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;

  loginForm: FormGroup
  user: SocialUser;
  fieldTextType: boolean;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  olB : Boolean =true;
  mlb : Boolean = false ;
  // focus;
  // focus1;
  focus2;
  focus3;
  focus4;
  OptForm: FormGroup;
  getDataFormLocal_local: any;
  getDataFormLocal_gmail: any;
  getDataFormLocal_fb: any;
  selectedDay: any;
  language: any;
  constructor(
    public router:Router,
    public formBuilder: FormBuilder,
    public service :ServiceService,
    private authService: SocialAuthService,
    private modalService: NgbModal, 
    private calendar: NgbCalendar,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService


    ) {
      // this.fromDate = calendar.getToday();
      // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
     }

  ngOnInit() {

    

    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    this.getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    this.getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))
    this.language = localStorage.getItem('language')


    if(this.language != null){
      localStorage.setItem('language',this.language)

    }else{
      localStorage.setItem('language','en')
    }
    console.log(this.language)
    console.log(this.getDataFormLocal_local)
    console.log(this.getDataFormLocal_gmail)
    console.log(this.getDataFormLocal_fb)
    if( this.getDataFormLocal_fb==null){
        this.router.navigate['/home']
    }

    if(this.getDataFormLocal_local!==null || this.getDataFormLocal_fb!=null){
              
      this.router.navigateByUrl('home')
    }else{
      
                
      // this.errorToast("Please Login")
    }




    this.authService.authState.subscribe(user => {
      this.user = user;
    });
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/)])],
    })
  
  }










  validation_messages = {
    'First_Name': [
      { type: 'required', message: 'First Name is required.' },
      { type: 'minlength', message: 'First Name must be at least 2 characters long.' },
      { type: 'maxlength', message: 'First Name cannot be more than 25 characters long.' },
      { type: 'validUsername', message: 'Your First Name has already been taken.' }
    ],

    'userName': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'validUsername', message: 'Your Username has already been taken.' }
    ],

    
    'lastname': [
      { type: 'required', message: 'Last Name is required.' },
      { type: 'minlength', message: 'Last Name must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Last Name cannot be more than 25 characters long.' },
      { type: 'validUsername', message: 'Your Last Name has already been taken.' }
    ],
    
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'address1': [
      { type: 'required', message: 'Address is required.' },
      { type: 'minlength', message: 'Address must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Address cannot be more than 100 characters long.' },
      { type: 'validUsername', message: 'Your Address has already been taken.' }
    ],
    'city': [
      { type: 'minlength', message: 'city must be at least 3 characters long.' },
      { type: 'maxlength', message: 'city cannot be more than 20 characters long.' },
      { type: 'validUsername', message: 'Your city has already been taken.' }
    ],
    'Zipcode': [
      { type: 'minlength', message: 'Zipcode must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Zipcode cannot be more than 9 characters long.' },
      { type: 'validUsername', message: 'Your Zipcode has already been taken.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, one number and  not any special characters.' },
      { type: 'maxlength', message: 'Password must be 10 characters long.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

















  showSuccess() {
    this.toast.success('Login Successfully');
        }
  
  errorToast(error){
    this.toast.error(error, 'Error', {
      timeOut: 3000,
    });
  }

async  login() {
  
  console.log(this.loginForm.value)
  

    try{
      this.ngxService.start(); 
      let responseFromLogin_Api = await this.service.login_Call(this.loginForm.value).toPromise();
      console.log(responseFromLogin_Api);
      this.showSuccess()
      localStorage.setItem('LoginResponse',JSON.stringify(responseFromLogin_Api));
      // this.ngxService.stop();
      // localStorage.setItem('language','en')

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();

      }, 2000);
      // this.router.navigateByUrl('/home', { skipLocationChange: true });
      // this.router.navigate(["nav"]);
      // this.router.navigate(["/home"]);
      this.router.navigateByUrl('/home')
      
      // setTimeout(() => {
        /** spinner ends after 5 seconds */
        location.reload()
      // }, 2000);
    }catch(error){
      console.log(error)
      this.errorToast(error.error)
      this.ngxService.stop();

    }
   
    }
    

    async signInWithGoogle(){
      let google =await  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      console.log(google)
    
      
     let obj = {
      
      "id":google.id ,
      "fullName": google.name,
      "provider":1,
      "photoUrl": google.photoUrl
    
   }

   let google_Registraion = await this.service.RigExternal(obj).toPromise();

   let RegDetail  = await this.service.getExitenceRegis(obj.id).toPromise();
   let gObj = RegDetail
    console.log(gObj)


    let gMAILObj = {
      'creationDate':gObj.creationDate,
      'externalLoginID': gObj.externalLoginID,
      'fullName': gObj.fullName,
      'id': gObj.id,
      'lastLoggedIn':gObj.lastLoggedIn,
      'provider': gObj.provider
     }

     localStorage.setItem('gmailLogin',JSON.stringify(gMAILObj));

     this.router.navigateByUrl('/Country')
    //  location.reload()

    }
  
    async signInWithFB() {
     let fb = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
   
    console.log(fb)

     let obj = {
      
        "id":fb.id ,
        "fullName": fb.name,
        "provider":1,
        "photoUrl": fb.photoUrl
      
     }

     let fb_Registraion = await this.service.RigExternal(obj).toPromise();
    //  localStorage.setItem('fbLogin',JSON.stringify(fb_Registraion));
  
    let RegDetail  = await this.service.getExitenceRegis(obj.id).toPromise();
    let fbObj = RegDetail
     console.log(fbObj)

     let facebookObj = {
      'creationDate':fbObj.creationDate,
      'externalLoginID': fbObj.externalLoginID,
      'fullName': fbObj.fullName,
      'id': fbObj.id,
      'lastLoggedIn':fbObj.lastLoggedIn,
      'provider': fbObj.provider
     }
     console.log(facebookObj)
    localStorage.setItem('fbLogin',JSON.stringify(facebookObj));

    this.router.navigateByUrl('/Country')
    //  setTimeout(() => { 
      /** spinner ends after 5 seconds */
      // location.reload()
    // }, 500);
    }



    toggleFieldTextType() { 
      this.fieldTextType = !this.fieldTextType;
    }
    
  open(content, type, modalDimension) {
    console.log(content,type,modalDimension)
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          console.log(reason)
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
   console.log(reason)
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
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



  }




  }
