import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,

} from 'angularx-social-login';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ServiceService } from 'src/app/service.service';
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: SocialUser;
  // @Input() item: string='dksfjsdkfjskd';
  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  loginLocalData: any;
  GmailLogin: any;
  fbLogin: any;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1: NgbDate;
  data : boolean | any;
  model2: NgbDate;
  // firstLatter = 'A'
  // items = ['item1', 'item2', 'item3', 'item4'];
  Language = [{
    id: '1', Lag: 'English' ,name:'En'
  }, {
    id: '2', Lag: 'Arabic',name:'Ar'
  }]
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  selectedDay: any;
  getProfileDetail: any;
  firstLatter: any;
  image: any;
  Lang: string;
  constructor(
    public location: Location,
    private router: Router,
    private authService: SocialAuthService,
    //  private Router:Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    public translate: TranslateService,
    calendar: NgbCalendar,
    public service :ServiceService

    ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    // translate.setDefaultLang('en');
  }

  ngOnInit() {  
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
    this.loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    this.GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    this.fbLogin = JSON.parse(localStorage.getItem('fbLogin'));
    this.Lang = localStorage.getItem('language');

    
    console.log(this.Lang)
    console.log(this.GmailLogin)
    console.log(this.loginLocalData)
    console.log(this.fbLogin)


    // this.getLanguage()


    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });


    if(this.loginLocalData!== null){
      this.getProfileName();
    } else if(this.fbLogin!== null){
      this.ExterProfile();
    }else if(this.GmailLogin!== null){
      this.gmailExterProfile()
    }

  }


getLanguage(){
    this.translate.use(this.Lang);


}

async  getProfileName(){
  this.getLanguage()
  console.log("login")
  let loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
  console.log(loginLocalData)
  let getProfileDetail = await this.service.GetProfileDetails(loginLocalData.UserName).toPromise();
  console.log(getProfileDetail)
  this.image =  getProfileDetail.ImageSource;
  console.log(this.image);
  this.getProfileDetail = getProfileDetail.FullName
  this.firstLatter  = getProfileDetail.FullName.split(' ').map(n => n[0]).join('');
    this.firstLatter = this.firstLatter.split(' ').map(n => n[0]).join('');
  console.log(this.firstLatter)
  
  }
  clckFn(){
    // this.data = ! this.data
    // console.log(this.data)
    this.router.navigateByUrl('/')
    // localStorage.setItem('toggle',JSON.parse(this.data));
        location.reload();
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
      localStorage.setItem('language', this.selectedDay)
    //   this.switchLanguage(this.selectedDay);
    // }
    // this.selectedDay


  }

  async ExterProfile(){
    this.getLanguage()
    console.log('fb')
    let loginLocalData = JSON.parse(localStorage.getItem('fbLogin'))
  console.log(loginLocalData)
  let getProfileDetail = await this.service.getExitenceRegis(loginLocalData.id).toPromise();
  console.log(getProfileDetail)
  this.image =  getProfileDetail.photoUrl;
  console.log(this.image);
  this.getProfileDetail = getProfileDetail.fullName
  this.firstLatter  = getProfileDetail.fullName.split(' ').map(n => n[0]).join('');
    this.firstLatter = this.firstLatter.split(' ').map(n => n[0]).join('');
  console.log(this.firstLatter)
  }



  async gmailExterProfile(){
    this.getLanguage()
    console.log('gmail')
    let GmailloginLocalData = JSON.parse(localStorage.getItem('gmailLogin'))
  console.log(GmailloginLocalData)
  let getProfileDetail = await this.service.getExitenceRegis(GmailloginLocalData.id).toPromise();
  console.log(getProfileDetail)
  this.image =  getProfileDetail.photoUrl;
  console.log(this.image);
  this.getProfileDetail = getProfileDetail.fullName
  this.firstLatter  = getProfileDetail.fullName.split(' ').map(n => n[0]).join('');
    this.firstLatter = this.firstLatter.split(' ').map(n => n[0]).join('');
  console.log(this.firstLatter)
  }










  notification(){
    // this.router.navigate(['/user-profile']);
    this.router.navigate(['/user-profile', {p1: 6}]);

  }

  na(){
    // this.router.navigate(['/user-profile']);
    this.router.navigate(['/user-profile', {p1: 4}]);

  }




  async signInWithGoogle() {
    let google = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    localStorage.setItem('gmailLogin', JSON.stringify(google));
    this.router.navigateByUrl('/dashboard')
    console.log(google)
  }

  async signInWithFB() {
    let fb = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    localStorage.setItem('fbLogin', JSON.stringify(fb));
    this.router.navigateByUrl('/dashboard')
    console.log(fb)
  }


  continueWithEmail() {
    this.router.navigateByUrl('/emailVerification')
  }
  ContinueWithPhone() {
    this.router.navigateByUrl('/phoneNumber')
  }
  signOut(): void {

    this.router.navigateByUrl('/home')


    localStorage.clear()
    // location.reload()
    setTimeout(() => {
      location.reload()
      // stop foreground spinner of the master loader with 'default' taskId
    }, 500)
  }



  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isRangeStart(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate) {
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate) {
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date) {
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date) {
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day)) {
      this.model2 = this.model1;
    }
  }
}
