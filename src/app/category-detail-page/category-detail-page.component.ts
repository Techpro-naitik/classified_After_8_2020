import { Component, OnInit, NgZone, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal ,} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-modal-content',
  template: `
  <div [hidden]="PriviosOffer">
  <div class="modal-header" >
  <h5 class="modal-title text-center" style="font-size:22px;font-weight:800;color:#222222">Make an offer</h5>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <h5 style="text-align: center;color:#222222;font-weight:800;font-size: 25px;">Ask price <span style="color:#172b4d">250 $</span></h5>
  <span style="font-weight: 600;margin-bottom: 10px;display: block;margin-top: 25px;">Your offer Price</span>
  <form>
  <div class="form-group">
  <div class="input-group mb-4">
  <div class="input-group-prepend">
  <span class="input-group-text" style="background: #cecfd0;color: #ffffff;margin-right: 0;">
  $
  </span>
  </div>
  <input style="padding-left: 10px;" placeholder="Search" type="text" class="form-control" autocomplete="off">
  </div>
  </div>
  <div class="form-group">
  <textarea class="form-control" placeholder="Type your message"></textarea>
  </div>
  <div class="form-group">
  <button type="button" style="margin-left: auto;display: block;" class="btn btn-1 btn-primary" (click)="sentOffer()">Send</button>
  </div>
  </form>
  </div>
  
  </div>
  
  
  <div class="modal-header" [hidden]="showOffer">
  <h5 class="modal-title text-center" style="font-size:22px;font-weight:800;color:#222222"></h5>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
  <span aria-hidden="true">&times;</span>
  </button>
  
  <div class="modal-body">
  <h5 style="text-align: center;color:#222222;font-weight:800;font-size: 25px;">Your offer Sent<span style="color:#172b4d"></span></h5>
  </div>
  </div>




<div [hidden]="ReportModal">

</div>








  `,

})





export class NgbdModalContent {
  @Input() name;
  cancel_vakue: number;
  ReportModal = true;
  PriviosOffer: boolean;
  showOffer: boolean = true;
  constructor(public activeModal: NgbActiveModal) {
  }
  cancel() {
    this.cancel_vakue = 1
    console.log(this.cancel_vakue)
  }

  sentOffer() {
    this.showOffer = false;
    this.PriviosOffer = true;
  }
}





// export class NgbdModalExchange {
//   @Input() name;
//   cancel_vakue: number;

//   PriviosOffer: boolean;
//   showOffer: boolean = true;
//   constructor(public activeModal: NgbActiveModal) {
//   }
//   cancel(){
//   this.cancel_vakue = 1
//   console.log(this.cancel_vakue)
//   }

//   sentOffer(){
//   this.showOffer = false ;
//   this.PriviosOffer = true;
//   }
//   }

















interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  content?: string;
  isShown: boolean;
  icon: string;
}

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}



@Component({
  selector: 'app-category-detail-page',
  templateUrl: './category-detail-page.component.html',
  styleUrls: ['./category-detail-page.component.css']
})
export class CategoryDetailPageComponent implements OnInit {
  origine: any;
  @Input()
  public alerts: Array<IAlert> = [];
  d1 : Date = new Date();
  private backup: Array<IAlert>;
  getSubCategoryById = [];
  id: string;
  redHeart: boolean = false;
  whiteHeart: boolean;
  whiteeHeart: boolean;
  likeValue: number = 0;
  getDataFormLocal_local: any;
  getDataFormLocal_gmail: any;
  getDataFormLocal_fb: any;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  AddComment: FormGroup;
  firstLatter = "A"
  @ViewChild('search')
  public searchElementRef: ElementRef;
  mylocation: any;
  openBox = true;
  title: string = 'AGM project';
  f1: boolean = false;
  Uf1: boolean = true;

  closeResult: string;

  // Radius
  radius = 20000;
  radiusLat = 0;
  radiusLong = 0;

  markers: marker[] = []
  getProductById: any;
  UserId: any;
  getProductCommentResponse = [];
  UnFollowResponse: any;
  FollowResponse: any;
  responseFollowerList: any;
  responseFollowingList = [];
  allLikesbyUserID: any;
  getProductById_image: any;
  getProductById_ProductDescription: any;
  getProductBy_ProductTitle: any;
  getProductBy_Price: any;
  getProductBy_AddedOn: any;
  getProduct_UserName: any;
  getProductBy_FollowersCount: any;
  getProductBy_FollowingCount: any;
  getProductBy_ViewCount: any;
  Featured: Promise<any>;
  TotalItem: any;
  UserProfilePic: any;
  getAllProduct_Location: any;
  avalable_Product: any;
  AddFavor: any;
  GetCallFav: any;
  Delete_Api_Fav_call: any;
  CreatedByUserID: any;

  form:FormGroup
  cmtID: any;
  filterLocationById: any;
  location_Location: any;














  constructor(
    private Activatedroute: ActivatedRoute,
    private service: ServiceService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private Fb: FormBuilder,
    private modalService: NgbModal,
    
  ) {

  }

  ngOnInit(): void {

console.log(this.d1,"date")














    this.id = JSON.parse(localStorage.getItem('id'));
    console.log(this.id, "hi")



    let getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    let getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    let getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))


    if (getDataFormLocal_local !== null) {
      this.UserId = getDataFormLocal_local.Id;
    } else if (getDataFormLocal_fb !== null) {
      this.UserId = getDataFormLocal_fb.id;
    }


    this.form = new FormGroup({
      ReportRemark: new FormControl('', Validators.required)
    });
     



    this.getAllProduct();

    this.follerList()
    this.GetAddFavProduct()

    // this.getSubCategory()
    // this.getLiks()
   
    this.commentForm()
    // this.ExchangeOpen()

    // this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
    // });
// 

//     this.mapsAPILoader.load().then(() => {
//     this.setCurrentLocation();
//     this.geoCoder = new google.maps.Geocoder;

//     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
//     autocomplete.addListener("place_changed", () => {
//     this.ngZone.run(() => {
//     //get the place result
//     let place: google.maps.places.PlaceResult = autocomplete.getPlace();

//     //verify result
//     if (place.geometry === undefined || place.geometry === null) {
//     return;
//     }

//     //set latitude, longitude and zoom
//     this.latitude = place.geometry.location.lat();
//     this.longitude = place.geometry.location.lng();
//     this.zoom = 12;
//     });
//     });
//     });

  }

  saveValue(value){
    console.log(value);
   
  }
  private getDismissReason(reason: any): string {
   
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  commentForm() {
    this.AddComment = this.Fb.group({

      Comment: ['', Validators.required]

    })
  }
  async PostComment() {
    try {

      let MyPostCommentDatat = new FormData();
      console.log(this.getProductById.ProductID)
      MyPostCommentDatat.append('UserID', this.UserId)
      MyPostCommentDatat.append('ProductID', this.getProductById.productID)

      MyPostCommentDatat.append('Comment', this.AddComment.value.Comment)

      let SubmitComment = await this.service.AddComentApi(MyPostCommentDatat).toPromise();
      console.log(SubmitComment, "SubmitComment")
      this.getProductComment()

      let value= null
        this.AddComment.controls['Comment'].setValue(value)

    } catch (error) {
      console.log(error)
    }


  }


  async getProductComment() {

    this.getProductCommentResponse = await this.service.getApiProductComment(this.id).toPromise()

    console.log(this.getProductCommentResponse, "getProductComment")
  }



  async changeGender(e) {
    console.log(e.target.value);

    let Reportvalue = e.target.value


    if(Reportvalue != null && Reportvalue != undefined){
      let obj = {
        "productID": this.id,
        "reportType": 1,
        "reportMessage": Reportvalue
      }
  
      let ResponseReportItem = await this.service.ReportItems(obj).toPromise();
      console.log(ResponseReportItem,"ResponseReportItem")
      this.openBox = true
      this.alertWithSuccess()
      
    }else{
      
    }
    
  


  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }



  // async getLiks() {
  //   let allLikesbyUserID = await this.service.myLikes(this.UserId).toPromise();

  //   console.log(allLikesbyUserID,"allLikesbyUserID")
  //     this.avalable_Product = allLikesbyUserID.filter(ele=>ele.productID === this.id);
  //     console.log(this.avalable_Product,"Available");
  //   if(this.avalable_Product.length !== 0){
  //       this.redHeart = true;
  //   }

  //   this.allLikesbyUserID = allLikesbyUserID.length
  //   console.log(this.allLikesbyUserID, 'allLikesbyUserID')
  // }

  aboutSellerPage(){

    this.router.navigateByUrl('/SellerProfile')
console.log(this.id)
  this.router.navigate(['/SellerProfile',{'id':this.id}])    


  }







  async followingList() {



    let responseFollowingList = await this.service.myGetFallowing(this.UserId).toPromise();
    let FollowingList = responseFollowingList.filter(ele => ele.userID == this.CreatedByUserID);
          console.log(FollowingList," getAllProductCreatedUserId");
  
    if (FollowingList.length !== 0) {
      this.responseFollowingList = FollowingList.length
      console.log(this.responseFollowingList,'getAllProductCreatedUserId');
      this.f1 = true;
      this.Uf1 = false;
    }else{
      this.f1 = false;
      this.Uf1 = true;
    }
    // this.getAllProduct()
    console.log(responseFollowingList, 'responseFollowingList');

  }

  EditComment(value){
      this.cmtID  = value
      console.log(this.cmtID,"cmt")
  }

  EditData_call(val,cmt){
    console.log(val)
    console.log(cmt )
    // const buffer: ArrayBuffer = new Blob();
    // let image = parse(binary)
    try{
      let editFormData = new FormData();
      editFormData.append('CommentID',cmt);
      editFormData.append('Comment',val);
      editFormData.append('Images',"");
 
let EditApiCallValue = this.service.EditValueApi(editFormData).toPromise();
this.cmtID = null;
this.getAllProduct();
    }catch(error){
      console.log(error)
    }
  }

  async followingList_update() {



    let responseFollowingList = await this.service.myGetFallowing(this.UserId).toPromise();
    let FollowingList = responseFollowingList.filter(ele => ele.userID == this.CreatedByUserID);
          console.log(FollowingList," getAllProductCreatedUserId");
  
          if (FollowingList.length !== 0) {
            this.responseFollowingList = FollowingList.length
            console.log(this.responseFollowingList,'getAllProductCreatedUserId');
            // this.f1 = true;
            // this.Uf1 = false;
          }else{
            this.responseFollowingList = FollowingList.length
            // this.f1 = false;
            // this.Uf1 = true;
          }
          
    // this.getAllProduct()
    console.log(responseFollowingList, 'responseFollowingList');

  }







  async follerList() {
    let responseFollowerList = await this.service.myGetFallower(this.UserId).toPromise();
    this.responseFollowerList = responseFollowerList.length

    // this.getAllProduct()

    console.log(responseFollowerList, 'responseFollowerList')
  }







  async getApiCallFollow() {

    let follow = new FormData();
    follow.append('Followedby', this.UserId);
    follow.append('FollowedUser', this.getProductById.createdByUserID);
    this.FollowResponse = await this.service.getFollow(follow).toPromise()
    this.follerList()
    this.followingList_update();
    this.getAllProduct();
    this.f1 = true;
    this.Uf1 = false;
    console.log(this.FollowResponse, "FollowResponse")
  }


  async getApiCallUnFollow() {

    
    console.log(this.getProductById)
    let UnFollow = new FormData();
    UnFollow.append('Followedby', this.UserId);
    UnFollow.append('FollowedUser', this.getProductById.createdByUserID);

    this.UnFollowResponse = await this.service.getUnFollow(UnFollow).toPromise()
    this.follerList()
    this.followingList_update();
    this.getAllProduct();
    this.Uf1 = true;
    this.f1 = false;
    console.log(this.UnFollowResponse, "UnFollowResponse")
  }




  async DeleteProductComment(DeleteProductComment) {
    console.log(DeleteProductComment)
    try {
      this.getProductCommentResponse = await this.service.DeleteApiProductComment(DeleteProductComment).toPromise()

      console.log(this.getProductCommentResponse, "getProductComment");
      this.getProductComment();

    } catch (error) {
      console.log(error)
    }

  }






 // Get Current Location Coordinates
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.radiusLat = this.latitude;
  //       this.radiusLong = this.longitude;
  //       this.zoom = 8;

  //       for (let i = 1; i < 50; i++) {
  //         this.markers.push(
  //           {
  //             lat: this.latitude + Math.random(),
  //             lng: this.longitude + Math.random(),
  //             label: `${i}`,
  //             draggable: false,
  //             content: `Content no ${i}`,
  //             isShown: false,
  //             icon: './assets/marker-red.png'
  //           }
  //         );
  //       }

  //     });
  //   }
  // }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  radiusDragEnd($event: any) {
    console.log($event);
    this.radiusLat = $event.coords.lat;
    this.radiusLong = $event.coords.lng;
    this.showHideMarkers();
  }

  event(type, $event) {
    console.log(type, $event);
    this.radius = $event;
    this.showHideMarkers();
  }

  showHideMarkers() {
    Object.values(this.markers).forEach(value => {
      value.isShown = this.getDistanceBetween(value.lat, value.lng, this.radiusLat, this.radiusLong);
    });
  }

  getDistanceBetween(lat1, long1, lat2, long2) {
    var from = new google.maps.LatLng(lat1, long1);
    var to = new google.maps.LatLng(lat2, long2);

    if (google.maps.geometry.spherical.computeDistanceBetween(from, to) <= this.radius) {
      console.log('Radius', this.radius);
      console.log('Distance Between', google.maps.geometry.spherical.computeDistanceBetween(
        from, to
      ));
      return true;
    } else {
      return false;
    }
  }

  open_Modal(content, type, modalDimension) {
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
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}



  // Get Current Location Coordinates
  // private setCurrentLocation() {
  // if ('geolocation' in navigator) {
  // navigator.geolocation.getCurrentPosition((position) => {
  // this.latitude = position.coords.latitude;
  // this.longitude = position.coords.longitude;
  // console.log(this.latitude)
  // console.log(this.longitude)
  // this.zoom = 8;
  // this.getAddress(this.latitude, this.longitude);
  // });
  // }
  // }


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    console.log(this.latitude)
    console.log(this.longitude)
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results, "result");
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
















  // async getSubCategory() {






  //   let subcategory = await this.service.get_subcategory(0).toPromise();
  //   console.log(subcategory);




  //   let getSubCategoryById = subcategory.filter(ele => ele.SubCategoryId === this.id);
  //   this.getSubCategoryById = getSubCategoryById[0].SubCategoryName
  //   console.log(this.getSubCategoryById)

  // }
  async getAllProduct() {
    // let GetProduct = await this.service.GetALLProduct().toPromise();
    // console.log(GetProduct);





  
    let obj = {
      
        "categoryID": 0,
        "userID": ''
      
    }
    let GetProduct = await this.service.getProductBYIDWithCategory(obj).toPromise();
 
  console.log(GetProduct,'value')






    let getProductById = GetProduct.filter(ele => ele.productID === this.id);
    this.getProductById = getProductById[0];
  
    // this.latitude = JSON.parse(getProductById[0].Latitude)
    // this.longitude = JSON.parse(getProductById[0].Longitude)
    // console.log(this.latitude)
    // console.log(this.longitude)

    // this.radiusLat = this.latitude;
    // this.radiusLong = this.longitude;
    // this.zoom = 8;

    // for (let i = 1; i < 50; i++) {
    //   this.markers.push(
    //     {
    //       lat: this.latitude + Math.random(),
    //       lng: this.longitude + Math.random(),
    //       label: `${i}`,
    //       draggable: false,
    //       content: `Content no ${i}`,
    //       isShown: false,
    //       icon: './assets/marker-red.png'
    //     }
    //   );
    // }
    




   








    navigator.geolocation.getCurrentPosition((position) => {
      if(getProductById[0].Longitude ! == undefined && getProductById[0].Latitude ! == undefined){
      }
      // this.latitude =JSON.parse(getProductById[0].Longitude)
      // this.longitude = JSON.parse(getProductById[0].Latitude)

      this.longitude = JSON.parse(getProductById[0].longitude)
      this.latitude = JSON.parse(getProductById[0].latitude)
      this.radiusLat = this.latitude;
      this.radiusLong = this.longitude;
      this.zoom = 8;

      for (let i = 1; i < 50; i++) {
        this.markers.push(
          {
            lat: this.latitude + Math.random(),
            lng: this.longitude + Math.random(),
            label: `${i}`,
            draggable: false,
            content: `Content no ${i}`,
            isShown: false,
            icon: './assets/marker-red.png'
          }
        );
      }
  

    });






    this.getProduct_UserName = getProductById[0].userName
    this.getProductBy_ProductTitle = getProductById[0].productTitle;
    this.getProductBy_Price = getProductById[0].price;
    this.TotalItem = getProductById[0].totalAddedProduct
    this.UserProfilePic = getProductById[0].userprofilePic
    this.getProductBy_AddedOn = getProductById[0].addedOn;
    this.getProductBy_FollowersCount = getProductById[0].followersCount;
    this.getProductBy_FollowingCount = getProductById[0].followingCount
    this.getProductBy_ViewCount = getProductById[0].viewCount
    this.getProductById_image = getProductById[0].productImages[0].imageSource;
    this.getProductById_ProductDescription = getProductById[0].productDescription
    this.longitude = JSON.parse(getProductById[0].longitude)
    this.latitude = JSON.parse(getProductById[0].latitude)
    console.log(this.getProductById_image, "product image")

    console.log(this.getProductById, 'getProductById')

    this.CreatedByUserID =this.getProductById.createdByUserID, 'getProductById'
    let locationId  = JSON.parse(this.getProductById.locationID);
    this.followingList()
    // this.test();
    this.locationGetbyId(locationId)
    this.getProductCommentResponse = await this.service.getApiProductComment(this.id).toPromise()
    console.log(this.getProductCommentResponse, "getProductComment")

  }

  OpenReportBox(){
    this.openBox = false;
  }

  Cancel(){
    this.openBox = true;
  }


async locationGetbyId(locationId){
  let location_name = await this.service.locationList().toPromise();
  console.log(location_name)

  this.filterLocationById = location_name.filter(ele => ele.LoactionID  === locationId)
  console.log(this.filterLocationById);
 this.location_Location = this.filterLocationById[0].LocationName

}


   monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
    
}

//  test() {
//    let d1 =this.d1

//    let d2 = this.datepipe.transform(this.getProductBy_AddedOn, 'yyyy-MM-dd');
//    console.log(d2)
//     var diff = this.monthDiff(d1, d2);
//     console.log(
//         d1.toISOString().substring(0, 10),
//         "to",
//         d2.toISOString().substring(0, 10),
//         ":",
//         diff
//     );
// }






    // get f(){
    //   return this.form.controls;
    // }



  async AddFav(){
    let obj= {
        "productid": this.id,
        "userid": this.UserId
      }
      this.redHeart = !this.redHeart;
      console.log(this.redHeart)
      this.AddFavor = await this.service.AddFavApi(obj).toPromise();
      console.log(this.AddFavor);
      this.GetAddFavProduct()
    }

   async deleteApiCall(){
      let obj = {
        productid:this.id,
        userid: this.UserId
      }
      
        this.Delete_Api_Fav_call = await this.service.DeleteApiProductFavourites(obj).toPromise();
        console.log(this.Delete_Api_Fav_call,"delte");
        this.GetAddFavProduct();
    }




async GetAddFavProduct(){

let GetCallFav =await  this.service.GetAddFav(this.UserId).toPromise();
let available = GetCallFav.filter(ele => ele.productID == this.id);
console.log(available);
if(available.length !== 0){
  this.GetCallFav =  available.length
 

  this.redHeart = true;
}else{
  this.redHeart = false;
  this.GetCallFav =  0

}

  console.log(GetCallFav,"GetCallFav")
  
}



  // async LikeAdsPostCall() {
  //   let getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
  //   let getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
  //   let getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))
  //   this.redHeart = !this.redHeart;
  //   console.log(this.redHeart)
  //   if (this.redHeart == true) {
  //     this.likeValue = 1;
  //     let obj = {
  //       "userID": getDataFormLocal_local.Id,
  //       "productID": this.id
  //     }
  //     let ProductPostData = await this.service.LikeAdsApiCall(obj).toPromise();
  //     this.getLiks()
  //     console.log(ProductPostData, "like")

  //   } else {
  //     this.likeValue = 0;
  //     let obj = {
  //       "userID": getDataFormLocal_local.Id,
  //       "productID": this.id
  //     }
  //     let ProductPostData = await this.service.UnLikeAdsApiCall(obj).toPromise();
  //     this.getLiks()
  //     console.log(ProductPostData, "unlike")
  //   }


  // }


  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to Report an Product?',
      text: 'Do You Want to Report an Product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Report it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        console.log(result.value, "result")
        console.log(result, "result")


        Swal.fire(
          'Deleted!',
          'Confirm Report ',
          'success'
        )
        this.ReportItem();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Report is safe :)',
          'error'
        )
      }
    })
  }



  async ReportItem() {
    let obj = {
      "productID": this.id,
      "reportType": 1,
      "reportMessage": "please Report"
    }

    let ResponseReportItem = await this.service.ReportItems(obj).toPromise();
    console.log(ResponseReportItem);
  }
}