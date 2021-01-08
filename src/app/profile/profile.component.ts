import { Component, OnInit, ViewChild, ElementRef, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';
// import { Loader } from '@googlemaps/loader';
import Swal from 'sweetalert2';


declare const google: any;




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {
  notificationJSON = [
    {
      id: 1,
      data: 'My Listings',

    },
    {
      id: 2,
      data: 'Edit Profile'
    },
    {
      id: 3,
      data: 'Recent Activities'
    },
    {
      id: 4,
      data: 'Promotions'
    },
    {
      id: 5,
      data: 'My Exchange'
    },
    {
      id: 6,
      data: 'Notifications'
    },
    {
      id: 7,
      data: 'My Orders & My Sales'
    },
    {
      id: 8,
      data: 'Rating & Review'
    },
    {
      id: 9,
      data: 'Banner Ads History'
    }
    
  ]
  getData: { id: number; data: string; }[];
  EditProfileForm: FormGroup;
  getProfileDetail: any;
  firstLatter: any;
  FullName_: any;
  image: any;
  Id: any;
  MP_1 :boolean ;
  mylocation: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  latitude: number;
  geoCoder: any;
  longitude: number;
  zoom: number;
  address: any;

  selectedFile: any;
  selectedArray: any;
  imageUrl: string | ArrayBuffer;
  editFile: boolean;
  removeUpload: boolean;
  cd: any;
  message: string;

  show = true;
  userId: string | Blob;
  loginData: any;
  loginData_Id: any;
  keyProfile: string;
  myLocation: any;
  Location: any;
  newLocation: string | Blob;

  E1: boolean = false;
  E2: boolean = true;
  E3: boolean = true;
  E4: boolean = true;
  E5: boolean = true;
  E6: boolean = true;
  E7: boolean = true;
  E8: boolean = true;
  E9 : boolean = true;
  C1: boolean = false;
  C2: boolean = true;
  getDataFormLocal_local: any;
  getDataFormLocal_gmail: any;
  getDataFormLocal_fb: any;
  EL: boolean;
  FBL: boolean;
  Fb_id: any;
  myAdsListing = [];
  M1:boolean = true;
  date: string;
  OptForm: FormGroup;
  mlb: boolean = false;
  olB: boolean = true;
  OptVerification: FormGroup
  LikedAds=[];
  Follower_data=[];
  Following_user=[];
  Featured: Promise<any>;
  GetCallFav = [];
  FollowResponse: any;
  UnFollowResponse: any;

  mySoldsArray: any;
  verifedEmailBox: boolean;
  verifedEmailBox_not: boolean;
  phoneNumber_verifed: boolean ;
  phoneNumber_verified_not: boolean ;



  constructor(
    public router: Router,
    private modalService: NgbModal,
    private toast: ToastrService,
    public translate: TranslateService,
    private ngxService: NgxUiLoaderService,
    private apiloader: MapsAPILoader,
    public formBuilder: FormBuilder,
    public service: ServiceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ActivatedRoute: ActivatedRoute
  ) {
    // this.E1  = false ;
    // this.E2 = true ;
    // this.E3  = true ;
    // this.E4  = true ;
    // this.E5 = true ;
    // this.E6  = true ;
    // this.E7 = true ;
    // this.E8  = true ;

   
    this.date = ActivatedRoute.snapshot.paramMap.get('p1');
    console.log(this.date,"id");

    if(this.date == '6'){
    this.E1  = true ;
    this.E2 = true ;
    this.E3  = true ;
    this.E4  = true ;
    this.E5 = true ;
    this.E6  = false ;
    this.E7 = true ;
    this.E8  = true ;
    this.E9 = true
    }else if(this.date == '4'){
    this.E1  = true ;
    this.E2 = true ;
    this.E3  = true ;
    this.E4  = false;
    this.E5 = true ;
    this.E6  = true ;
    this.E7 = true ;
    this.E8  = true ;

    this.E9  = true ;
  }
  }
  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    // console.log(this.searchElementRef.nativeElement); // throws an error
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.Liksbutton()
    this.ngxService.stop();
    this.FollowerButton();
    this.GetAddFavProduct()
    this.emailVerified();
    this.mySoldAdsApi()
    this.get_profile();
    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    this.getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    this.getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });



    this.Intalization();
    this.GetCallFeaturedApiCall();
  
  }

  AddMobile(){
    this.C2 = true;
    this.M1 = false
  }
  CancelButton(){
    this.C2 = false;
    this.M1 = true
  }

  async Liksbutton(){

    // console.log("h123")  
    let getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    let getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    let getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))

    
    // let LikedAds = await this.service.myLikes(userId).toPromise();
    // this.LikedAds = LikedAds
    // console.log(this.LikedAds,"hi")
    if(getDataFormLocal_local !== null){
    
        let userId = getDataFormLocal_local.Id;
      let LikedAds = await this.service.myLikes(userId).toPromise();
     
      this.LikedAds = LikedAds
      console.log(this.LikedAds,"hi")
    }else if(getDataFormLocal_fb !== null){
      let userId = getDataFormLocal_fb.id;
      let LikedAds = await this.service.myLikes(userId).toPromise();
      this.LikedAds = LikedAds
      console.log(this.LikedAds,"hi")
    }else{

    }

  }

  async GetCallFeaturedApiCall(){
 
    
    this.Featured = await this.service.GetCallFeaturedAds(this.loginData_Id).toPromise();
    console.log(this.Featured," Featured")
   }
   





  async FollowerButton(){
    console.log('hi')
    let getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    let getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    let getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))




    if(getDataFormLocal_local !== null){
      let userId = getDataFormLocal_local.Id;
    let Follower_data = await this.service.myGetFallower(userId).toPromise();
    this.Follower_data = Follower_data
    console.log(this.Follower_data,"hi")
  }else if(getDataFormLocal_fb !== null){
    let userId = getDataFormLocal_fb.id;
    let Follower_data = await this.service.myGetFallower(userId).toPromise();
    this.Follower_data = Follower_data
    console.log(this.Follower_data,"hi")
  }else{

  }








  }




  async FollerwDetail(item) {
    let userId = this.getDataFormLocal_local.Id
    let follow = new FormData();
    follow.append('Followedby',userId);
    follow.append('FollowedUser', item.userID);
    this.FollowResponse = await this.service.getFollow(follow).toPromise()
    // this.follerList()
    // this.followingList()
    // this.f1 = true;
    // this.Uf1 = false;
    this.FollwingButton()
    console.log(this.FollowResponse, "FollowResponse")
  }
  




  async mySoldAdsApi(){

    let userId = this.getDataFormLocal_local.Id
    let SoldAds = await this.service.MyCallSoldA(userId).toPromise()
    this.mySoldsArray = SoldAds
    console.log(this.mySoldsArray,'mySolde');
  }

  


  async getApiCallUnFollow(item) {

    let userId = this.getDataFormLocal_local.Id
    // console.log(this.getProductById)
    let UnFollow = new FormData();
    UnFollow.append('Followedby', userId);
    UnFollow.append('FollowedUser', item.userID);

    this.UnFollowResponse = await this.service.getUnFollow(UnFollow).toPromise()
    // this.follerList()
    // this.followingList()
    // this.Uf1 = true;
    // this.f1 = false;
    console.log(this.UnFollowResponse, "UnFollowResponse")
  }








 async FollwingButton(){
    console.log('hi')
    let getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    let getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    let getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))




    if(getDataFormLocal_local !== null){
      let userId = getDataFormLocal_local.Id;
    let Following_user = await this.service.myGetFallowing(userId).toPromise();
    this.Following_user = Following_user
    console.log(this.Follower_data,"hi")
  }else if(getDataFormLocal_fb !== null){
    let userId = getDataFormLocal_fb.id;
    let Following_user = await this.service.myGetFallowing(userId).toPromise();
    this.Following_user = Following_user
    console.log(this.Follower_data,"hi")
  }else{

  }







    
  }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  // toogle(MP_1){
  //   console.log(MP_1)
  // }


  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     // console.log(results[2].address_components[0],"location")
  //     this.mylocation = results[2].address_components[3].long_name

  //     // console.log(results[2],"location")
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;

  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }




  Intalization() {

    this.EditProfileForm = this.formBuilder.group({
      username: ['',],
      AddressLine1: ['',],
      FullName: ['', Validators.required],
      Country: ['',],
      email: ['', Validators.required],
      Pin: ['',],
      Bio: ['',],
      City: ['',],
      State: ['',],
      Location: ['',],
      ProfilePicture: ['']

    })




    this.OptForm = this.formBuilder.group({
      number: ['', [Validators.required,Validators.min(999999999),Validators.max(9999999999)]],

    }),
      this.OptVerification = this.formBuilder.group({
        otp: ['', [Validators.required,Validators.min(99999),Validators.max(999999)]],
      })
    this.getProfile()
  }


  showSuccess(value) {
    this.toast.success(value, '');
  }

  errorToast(error) {
    this.toast.error(error, '', {
      timeOut: 3000,
    });
  }

  
  async GetAddFavProduct(){
    

    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    let UserId = this.getDataFormLocal_local.Id
    this.GetCallFav = await  this.service.GetAddFav(UserId).toPromise();
     
    // if(GetCallFav.length !== 0){
    //   this.GetCallFav =  GetCallFav.length
    //   this.redHeart = true;
    // }else{
    //   this.redHeart = false;
    //   this.GetCallFav =  0
    
    // }
    
      console.log( this.GetCallFav,"GetCallFav")
      
    }
    





  passData(id) {

    console.log(id)
    this.getData = this.notificationJSON.filter(ele => ele.id === id)
    let Gid = this.getData[0]['id']


    if (Gid === 1) {
      
      
      this.E1 = false;
      this.E2 = true;
      this.E3 = true;
      this.E4 = true;
      this.E5 = true;
      this.E6 = true;
      this.E7 = true;
      this.E8 = true;
      this.E9  = true ;
      this.keyProfile = ''
    } else if (Gid === 2) {
      this.keyProfile = this.getData[0].data
      this.E1 = true;
      this.E2 = false;
      this.E3 = true;
      this.E4 = true;
      this.E5 = true;
      this.E6 = true;
      this.E7 = true;
      this.E8 = true;
      this.E9  = true ;
    } else if (Gid === 3) {
      this.keyProfile = ''
      this.E1 = true;
      this.E2 = true;
      this.E3 = false;
      this.E4 = true;
      this.E5 = true;
      this.E6 = true;
      this.E7 = true;
      this.E8 = true;
      this.E9  = true ;
    } else if (Gid === 4) {
      this.E1 = true;
      this.E2 = true;
      this.E3 = true;
      this.E4 = false;
      this.E5 = true;
      this.E6 = true;
      this.E7 = true;
      this.E8 = true;
      this.E9  = true ;
      this.keyProfile = ''
    } else if (Gid === 5) {

      this.E1 = true;
      this.E2 = true;
      this.E3 = true;
      this.E4 = true;
      this.E5 = false;
      this.E6 = true;
      this.E7 = true;
      this.E8 = true;
      this.E9  = true ;
      this.keyProfile = ''
    } else if (Gid === 6) {
      this.E1 = true;
      this.E2 = true;
      this.E3 = true;
      this.E4 = true;
      this.E5 = true;
      this.E6 = false;
      this.E7 = true;
      this.E8 = true;
      this.E9  = true ;
      this.keyProfile = ''
    } else if (Gid === 7) {
      this.E1 = true;
      this.E2 = true;
      this.E3 = true;
      this.E4 = true;
      this.E5 = true;
      this.E6 = true;
      this.E7 = false;
      this.E8 = true;
      this.E9  = true ;
      this.keyProfile = ''
    } else if (Gid === 8) {
      this.E1 = true;
      this.E2 = true;
      this.E3 = true;
      this.E4 = true;
      this.E5 = true;
      this.E6 = true;
      this.E7 = true;
      this.E8 = false;
      this.E9  = true ;
      this.keyProfile = ''
    } else if (Gid === 9) {
      this.E1 = true;
      this.E2 = true;
      this.E3 = true;
      this.E4 = true;
      this.E5 = true;
      this.E6 = true;
      this.E7 = true;
      this.E8 = true;
      this.E9  = false ;
      this.keyProfile = ''
    }






















    // console.log(this.getData)
    // if (id == 2) {
    //   this.keyProfile = this.getData[0].data

    // } else {
    //   this.keyProfile = ''
    // }




    if (id === 2) {
      this.mapsAPILoader.load().then(() => {
        // this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  }
  async otpCall(value) {
    
    console.log(value)
    console.log(this.OptForm.value)
    try {
      

if(value === 'in' ){

  
  let Nb = `%2B91${this.OptForm.value.number}`
  console.log(Nb)
  let Verification_Otp = await this.service.VerifyOtpCall(Nb).toPromise();
  console.log(Verification_Otp)
  this.showSuccess('otp Sent Your Mobile Number')

  this.mlb = true;
  this.olB = false
  localStorage.setItem('otp', Verification_Otp.Value)
}else{
   
  let Nb = `%2B1${this.OptForm.value.number}`
  console.log(Nb)
  let Verification_Otp = await this.service.VerifyOtpCall(Nb).toPromise();
  console.log(Verification_Otp)
  this.showSuccess('otp Sent Your Mobile Number')

  this.mlb = true;
  this.olB = false
  localStorage.setItem('otp', Verification_Otp.Value)

}


    } catch (error) {
      console.log(error)
      this.errorToast('Mobile Number Already Exists')
    
      // this.router.navigateByUrl('/login')
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
  async otpVerifyCall() {
    try {
      let otpValue = JSON.parse(localStorage.getItem('otp'));
      console.log(otpValue)
      let Verfiy = this.OptVerification.value.otp;
      console.log(Verfiy)
      if (otpValue === Verfiy) {
        this.showSuccess('otp Verified Successfully')
        this.C1 = false;
        this.C2 = true;
        this.M1 = true

        // location.reload();
        // if(this.loginLocalData === null  &&  this.fbLogin === null ){
        
        //   console.log('h2');
        //   this.router.navigateByUrl('/regtraionVieOtp')
        //   localStorage.removeItem('otp')
        // }else{
         
        //   setTimeout(() => {
        //     location.reload();
        //   }, 1000);
        //   this.router.navigateByUrl('/home')
        //   localStorage.removeItem('otp')

        // }
      }
        else{
          this.errorToast('please Enter Valid Otp')
        }
  
       
        // console.log(this.OptVerification.value)
      // }
    } catch (error) {
      console.log(error)
      this.errorToast(error.error)
    }
  }






























  async getProfile() {


    if (this.getDataFormLocal_local !== null) {

      this.EL = false;
      this.FBL = true


      let loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
      this.loginData_Id = loginLocalData.Id

     
      this.getProfileDetail = await this.service.GetProfileDetails(loginLocalData.UserName).toPromise();
      console.log(this.getProfileDetail)

      this.firstLatter = this.getProfileDetail.FullName.split(' ').map(n => n[0]).join('');
      this.firstLatter = this.firstLatter.split(' ').map(n => n[0]).join('');
      console.log(this.firstLatter)
      this.FullName_ = this.getProfileDetail.FullName;

      console.log(this.getProfileDetail)
      this.image = this.getProfileDetail.ImageSource;
      this.Id = loginLocalData.Id;


      if (this.getProfileDetail.Country == null) {
        // this.newLocation = ''
        this.newLocation = loginLocalData.Country;
      } else {
        // this.newLocation = ''
        this.newLocation = this.getProfileDetail.Country;

      }
      this.myListingAdds_login();


      // this.Location = this.getProfileDetail.Country
      console.log(this.getProfileDetail, "getProfileDetail")
      this.EditProfileForm.controls['username'].setValue(this.getProfileDetail.Username)
      this.EditProfileForm.controls['FullName'].setValue(this.getProfileDetail.FullName)
      this.EditProfileForm.controls['email'].setValue(loginLocalData.Email)
      // this.EditProfileForm.controls['Pin'].setValue( this.getProfileDetail.Pin)
      this.EditProfileForm.controls['Bio'].setValue(this.getProfileDetail.Bio)
      // this.EditProfileForm.controls['FullName'].setValue( this.getProfileDetail.FullName)
      // this.EditProfileForm.controls['AddressLine1'].setValue( this.getProfileDetail.AddressLine1)
      // this.EditProfileForm.controls['City'].setValue(  this.getProfileDetail.City)
      this.EditProfileForm.controls['Location'].setValue(this.getProfileDetail.Country)
      // this.EditProfileForm.controls['State'].setValue( this.getProfileDetail.State)




    } else if (this.getDataFormLocal_fb !== null) {
      this.EL = true;
      this.FBL = false



      console.log('fb')
      let fb_loginLocalData = JSON.parse(localStorage.getItem('fbLogin'))
      this.Fb_id = fb_loginLocalData.id
    

      let getProfileDetail = await this.service.getExitenceRegis(fb_loginLocalData.id).toPromise();
      console.log(getProfileDetail)
      this.image = getProfileDetail.photoUrl;
      console.log(this.image);
      this.FullName_ = getProfileDetail.fullName
      this.firstLatter = getProfileDetail.fullName.split(' ').map(n => n[0]).join('');
      this.firstLatter = this.firstLatter.split(' ').map(n => n[0]).join('');
      console.log(this.firstLatter)

      this.EditProfileForm.controls['FullName'].setValue(this.FullName_)

      this.myListingAdds_fb();

    } else {

    }






  }



  editPicture() {

    this.show = !this.show
    console.log(this.show)



  }



  uploadFile(event, files) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.selectedFile = event.target.files[0]
    this.selectedArray.push(this.selectedFile)
    console.log(this.selectedArray)
    this.selectedArray.forEach(ele =>
      console.log(ele, 'hi')
    )
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        // this.registrationForm.patchValue({
        //   file: reader.result
        // });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    // var readers = new FileReader();
    // console.log(file[0])
    // this.imagePath = files;
    // console.log(this.imagePath);
    // let len = this.ImpageArray.length;
    // this.ImpageArray.push(this.imagePath);
    //   console.log(this.ImpageArray)
    // readers.readAsDataURL(files[0]);
    // readers.onload = (_event) => {
    //   this.imgURL = readers.result;
    //   let len = this.ImpageArray.length;

    //    console.log(len)
    //    if(len >= 4 ){
    //    this.errorToast("Maximum image upload only 4")
    //    }else{

    //     this.ImpageArray.push(this.imageUrl);
    //     console.log(this.ImpageArray)
    //    }
    // }
  }









  Chnage(){
this.C1 = true;
this.C2 = false

  }

  async get_profile(){
    debugger
    let username = this.getDataFormLocal_local.UserName;
    let detailProfile = await this.service.GetProfileDetails(username).toPromise();
    console.log(detailProfile)
    if(detailProfile.MobileNumber != null ){
      console.log('mobile')
      this.phoneNumber_verifed = false;
      this.phoneNumber_verified_not = true;
    }else {
      console.log('mobile_not')
      this.phoneNumber_verifed = true;
      this.phoneNumber_verified_not = false;
    }
  }





  async ProfileFormDataCall(value) {
    console.log(value)
    
    let ProFormData = new FormData()


    ProFormData.append('Username', this.EditProfileForm.value.username)
    ProFormData.append('AddressLine1', this.EditProfileForm.value.AddressLine1),
      ProFormData.append('email', this.EditProfileForm.value.email),
      ProFormData.append('Pin', this.EditProfileForm.value.Pin),
      ProFormData.append('Bio', this.EditProfileForm.value.Bio),
      ProFormData.append('FullName', this.EditProfileForm.value.FullName),
      ProFormData.append('Country', value),
      ProFormData.append('State', this.EditProfileForm.value.State),
      ProFormData.append('City', this.EditProfileForm.value.City)
    ProFormData.append('ProfilePicture', this.EditProfileForm.value.ProfilePicture)


    try {

      let SbProfile = await this.service.EditProfile(ProFormData).toPromise()
      console.log(SbProfile);

      this.newLocation = ''
      setTimeout(() => {
        location.reload();

      }, 1000);

      this.showSuccess('Update Profile Successfully')
    } catch (error) {
      this.errorToast(error.error)
      console.log(error)
    }
  }


  async EditProfileSubmit(EditProfileData) {
    try {
    } catch (error) {
      console.log(error)
    }
  }
  async myListingAdds_login(){
    let loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    this.myAdsListing = await this.service.MycallAds(loginLocalData.Id).toPromise();
    // this.myAdsListing = myAdsListing;
    console.log(this.myAdsListing);
  }
  
  
  async myListingAdds_fb(){
    let fb_loginLocalData = JSON.parse(localStorage.getItem('fbLogin'))
    this.myAdsListing = await this.service.MycallAds(fb_loginLocalData.id).toPromise();
    console.log(this.myAdsListing);
  }
  

  async submit(event, files) {
    this.ngxService.start();

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.selectedFile = event.target.files[0]
console.log(this.selectedFile)
    if (this.getDataFormLocal_local !== null) {
     
      let profile = new FormData;
      profile.append('userid', this.loginData_Id);
     
      profile.append('ProfilePicture', this.selectedFile);
      let pic = await this.service.ExternalProfile(profile).toPromise();
      this.ngxService.stop();

      this.showSuccess("Image Uploaded Successfully");
      location.reload();
      console.log(pic);
    
    } else if (this.getDataFormLocal_fb !== null) {
      let profile = new FormData;
      profile.append('userid', this.Fb_id);
      profile.append('ProfilePicture', this.selectedFile)

      // let obj ={
      //   "id": this.Fb_id,
      //   "fullName": this.getDataFormLocal_fb.fullName,
      //   "provider": 1,
      //   "photoUrl":  profile
      // }
      let pic = await this.service.RigExternal(profile).toPromise();
      this.ngxService.stop()

      this.showSuccess("Image Uploaded Successfully")
      location.reload()
      console.log(pic)
    }


  }


  async Emailverification(value){
let userId = this.getDataFormLocal_local.Id;
    let send_otp = await this.service.sendMailOptByApiCall(userId).toPromise()
      console.log(send_otp)
      localStorage.setItem("emailOtp",send_otp.otp  )
this.showSuccess("otp Send your Male Inbox");

 setTimeout(() => {
  this.alertfun();
}, 500);

   
  }


  async emailVerified(){
    
    let userId = this.getDataFormLocal_local.Id;

    let verifedEmail = await  this.service.emailVerifed(userId).toPromise();
    console.log(verifedEmail)
    if(verifedEmail === "Verified !"){
        this.verifedEmailBox = false;
        this.verifedEmailBox_not = true;
    }else {
         this.verifedEmailBox_not = true;
         this.verifedEmailBox = false;

    }
  }


async alertfun(){

const { value: formValues } = await Swal.fire({

  title: 'Please Enter Your Otp',
  html:
    '<input id="swal-input1" class="swal2-input" >' ,
   
  focusConfirm: false,
  // preConfirm: () => {
    // return [
      // document.getElementById('swal-input1').value,
      // document.getElementById('swal-input2').value
    // ]
    // console.log(document.getElementById('swal-input1').value,
  // }
})

if (formValues) {
let optValue = JSON.parse(document.getElementById('swal-input1')['value']);
let emailOtpValue = JSON.parse(localStorage.getItem('emailOtp'))
console.log(emailOtpValue);
// let emailOtpValue = JSON.parse(localStorage.getItem('emailOtp'))

if(optValue === emailOtpValue){
  this.showSuccess("Email verified Successfully")
}else{
  this.errorToast("Please Check Oour Otp ")
}
  console.log(optValue);
  // Swal.fire(JSON.stringify(formValues))
}




}



  facebookverification(){

  }
  EditPost(){
  this.router.navigate(['/AddPost',{id:'1'}]);
    // this.router.navigateByUrl('/AddPost')
  }

  changePassword() {
    this.router.navigateByUrl('/changePassword')
  }

  mobileVerified() {
    this.router.navigateByUrl('/verify')
  }

}







