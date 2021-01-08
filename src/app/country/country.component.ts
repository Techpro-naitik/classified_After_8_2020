import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  getDataFormLocal_local: any;
  GmailLogin: any;
  fbLogin: any;
  selectedDay: any;

  constructor(public service: ServiceService,
    private toast: ToastrService,
    public translate: TranslateService,
    public router:Router) { }

  ngOnInit(): void {
    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('id'))
    console.log(this.getDataFormLocal_local);

    // this.loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    this.GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    this.fbLogin = JSON.parse(localStorage.getItem('fbLogin'));

  }


  async Saudi_Arabia() {
    if(this.selectedDay !== undefined ){
    let obj = {
      ID: this.getDataFormLocal_local,
      language: '',
      Country: 'Saudi Arabia '
    }


if(this.getDataFormLocal_local !== null ){
  this.router.navigateByUrl('/login');

}else{
  this.router.navigateByUrl('/home');
  location.reload();
}



   
    this.showSuccess('country Updated Successfully')


    let submitPost = await this.service.AddCountryLnag(obj).toPromise()
    // this.router.navigateByUrl('/login');
    localStorage.removeItem('id')
}else{
  this.errorToast('please Select Language')
}
  }


  async UAE() {
    if(this.selectedDay !== undefined ){
    let obj = {
      ID: this.getDataFormLocal_local,
      language: '',
      Country: 'UAE',

    }
    if(this.getDataFormLocal_local !== null ){
      this.router.navigateByUrl('/login');
    
    }else{
      this.router.navigateByUrl('/home');
      location.reload();
    }   

     this.showSuccess('country Updated Successfully')

    let submitPost = await this.service.AddCountryLnag(obj).toPromise()
 
    localStorage.removeItem('id')
  }else{
    this.errorToast('please Select Language')

  }
  }


  async Egypt() {
debugger
if(this.selectedDay !== undefined ){
  let obj = {
    ID: this.getDataFormLocal_local,
    language: '',
    Country: 'Egypt'
  }
  if(this.getDataFormLocal_local !== null ){
    this.router.navigateByUrl('/login');
  
  }else{
    this.router.navigateByUrl('/home');
    location.reload();
  }

  this.showSuccess('country Updated Successfully')

  let submitPost = await this.service.AddCountryLnag(obj).toPromise()

  localStorage.removeItem('id')
}else{
  this.errorToast('please Select Language')

}
 
  }


  showSuccess(Value) {
    this.toast.success(Value, '');
  }

  errorToast(error) {
    this.toast.error(error, '', {
      timeOut: 3000,
    });
  }
  async Halti() {

    let obj = {
      ID: this.getDataFormLocal_local,
      language: '',
      Country: 'Halti'

    }
    if(this.getDataFormLocal_local !== null ){
      this.router.navigateByUrl('/login');
    
    }else{
      this.router.navigateByUrl('/home');
      location.reload();
    }
    this.showSuccess('country Updated Successfully')
    let submitPost = await this.service.AddCountryLnag(obj).toPromise()

    localStorage.removeItem('id')
  }
  async USA() {

    let obj = {
      ID: this.getDataFormLocal_local,
      language: 'English ',
      Country: 'USA'
    }
    if(this.getDataFormLocal_local !== null ){
      this.router.navigateByUrl('/login');
    
    }else{
      this.router.navigateByUrl('/home');
      location.reload();
    }
    this.showSuccess('country Updated Successfully')

    let submitPost = await this.service.AddCountryLnag(obj).toPromise()
  
    localStorage.removeItem('id')
  }


  async domician() {

    let obj = {
      ID: this.getDataFormLocal_local,
      language: '',
      Country: 'domician Republic'
    }


    if(this.getDataFormLocal_local !== null ){
      this.router.navigateByUrl('/login');
    
    }else{
      this.router.navigateByUrl('/home');
      location.reload();
    }

    this.showSuccess('country Updated Successfully')

   let domician =  this.service.AddCountryLnag(obj).toPromise();

   localStorage.removeItem('id')
 
    
  }




  
  switchLanguage(language: string) {
    console.log(language)

    this.translate.use(language);
    console.log(this.translate.use(language));
  }
  myCallingValue(value){
    debugger
    //update the ui
    console.log(value)
    // this.selectedDay = event.target.value;
    this.selectedDay = value;


    // this.switchLanguage(language);
    this.switchLanguage(this.selectedDay);
    // if (language != undefined) {
    //   console.log(this.selectedDay)
    //   this.switchLanguage(language);

    // } else {
      localStorage.setItem('language', this.selectedDay)
    //   this.switchLanguage(this.selectedDay);
    // }
    // this.selectedDay


  }
}
