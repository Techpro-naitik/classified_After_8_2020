import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidator } from '../validation/password.validation';
import { UsernameValidator } from '../validation/username.validation';
import { MustMatch } from '../../app/must-match';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: SocialUser;

  test: Date = new Date();
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  public registerForm: FormGroup
  fieldTextType: boolean;
  matching_passwords_group: FormGroup;
  constructor(
    private service: ServiceService,
    private router: Router,
    private fb: FormBuilder,
    //  private Event:EventService,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,

    private authService: SocialAuthService,
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });

    // this.matching_passwords_group = new FormGroup({
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.maxLength(10),
    //     Validators.required,
    //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    //   ])),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, (formGroup: FormGroup) => {
    //   return PasswordValidator.areEqual(formGroup);
    // });

    // this.registerForm = this.fb.group(
    //   {

    //     userName: ['', [Validators.required,Validators.maxLength(20)]],
    //     email: ['', Validators.required],
    //     fullName: ['', [Validators.required,Validators.maxLength(20)]],
    //     mobileNumber: [''],
    //     password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
    //   confirmPassword : [''],

    //   }
    // )







    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^(?=[a-zA-Z0-9#@$?]{6,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
      
    });


    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    
      userName:new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(2),
        Validators.required
      ])),
      fullName:new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(2),
        Validators.required
      ])),
      // password: this.matching_passwords_group,
      password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/)])],
      confirmPassword: [null, Validators.compose([Validators.required])]


    }, {
      validator: MustMatch('password', 'confirmPassword'),
    // });



      
      // desired_clinic: ['', Validators.required],
      // isChecked: new FormControl(true, Validators.pattern('true')),
      // NotificationValue: [''],
      // SpecialNotificationValue: [''],
     
      // address1:new FormControl('', Validators.compose([
      //   UsernameValidator.validUsername,
      //   Validators.maxLength(100),
      //   Validators.minLength(5),
      //   Validators.required
      // ])),
      // city:new FormControl('', Validators.compose([
      //   UsernameValidator.validUsername,
      //   Validators.maxLength(15),
      //   Validators.minLength(3),
      // ])),
      // zipcode:new FormControl('', Validators.compose([
      //   UsernameValidator.validUsername,
      //   Validators.maxLength(9),
      //   Validators.minLength(5),
      // ])),
      
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


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirm_password').value;

  return pass === confirmPass ? null : { notSame: true }     
}




  showSuccess() {
    this.toast.success('Register Successfully', '');
  }

  errorToast(error) {
    this.toast.error(error, '', {
      timeOut: 3000,
    });
  }
  async register() {

    try {
      this.ngxService.start();

      let RegisterValue = {
        userName: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        fullName: this.registerForm.value.fullName,

        mobileNumber: this.registerForm.value.mobileNumber,
        password: this.registerForm.value.password

      }

      // if (RegisterValue.userName === "" || RegisterValue.fullName === "" ||
      // RegisterValue.mobileNumber === "" || RegisterValue.password === "" ||
      // RegisterValue.email === "" 
      // ) {


        // this.errorToast('Please Enter the value')
        this.ngxService.stop();
      // } else {

        let responseFromRegister_Api = await this.service.registration_Call(RegisterValue).toPromise()
        console.log(responseFromRegister_Api);


        let obj = {
          email : this.registerForm.value.userName,
          password :this.registerForm.value.password 
        }
        
                let responseFromLogin_Api = await this.service.login_Call(obj).toPromise();
                console.log(responseFromLogin_Api.Id,"responseFromLogin_Api")
        
                localStorage.setItem('id',JSON.stringify(responseFromLogin_Api.Id));

        this.showSuccess();
        //   this.Event.publish('pushEvent',  "hello");
        setTimeout(() => {
          this.ngxService.stop();
          // stop foreground spinner of the master loader with 'default' taskId
        }, 2000)
        this.router.navigateByUrl('/Country')
        setTimeout(() => {
          /** spinner ends after 5 seconds */
        //  location.reload()
        }, 1000);
      // }


    }
    catch (error) {
      console.log(error)

      console.log(error.error)
      let error_error = error.error
      this.ngxService.stop();

      this.errorToast(error_error)
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
}