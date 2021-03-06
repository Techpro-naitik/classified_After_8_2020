import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Renderer2, NgZone, Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-modal-content',
  template: `  <div class="modal-header addpostmodalheader">
  <h5 class="modal-title text-center">Promote the listing</h5>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
  <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body addpostmodalbody"> 
<h5>Highlight Listings?</h5>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
<div class="modal-tab">
<div>

<div (click)="common('urgent')">
        urgent
 </div>
  <div (click)="common('Ads')">
        Add
  </div>
 
    <div [hidden]="U1">
    khsdkhfksdjf
    </div>
    <div [hidden]="Aq">
      232323232323
    <div>
</div>





</div>
</div>
<div class="modal-footer">
  <div class="left-side">
      <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Never mind</button>
  </div>
  <div class="divider"></div>
  <div class="right-side">
      <button type="button" class="btn btn-danger btn-link" (click)="cancel()" (click)="activeModal.close('Close click')">DELETE</button>
  </div>
</div>





`,

})


export class NgbdModalContent {
  @Input() name;
  cancel_vakue: number;
  // urgent: boolean;
  // Ads: boolean;
  U1 :boolean = false;
  Aq :boolean = true;
    constructor(public activeModal: NgbActiveModal) {
    // this.U1 = false;
   
  }
  cancel(){
      this.cancel_vakue = 1
      console.log(this.cancel_vakue)
  }
  common(value){
 //   console.log(value)
    if(value === "urgent"){
      console.log(value)
      this.U1 = false
      this.Aq = true
    }else if(value === "Ads"){
      console.log(value)
      this.Aq = false
      this.U1 = true
  
    }
  }
}








@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  displayMessage = "Sort by...";
  sortOptions = ["Balance", "Company", "Last Name"]
  get_Category_api: [];
  get_SubCategory_api: Promise<any> | [];
  get_AllBrand_api: any;
  cars: boolean = true;
  get_Year_Api_Response: any;
  get_Model_Api_Response: any;
  AddPostForm: FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;
  fileData: File = null;
  public show: boolean = true;
  arrayInputs = []
  geoCoder: any;
  button_Fixed: Boolean = false;
  Fixed: number;
  Negotiable: number;
  NotDisclosed: number;
  // @ViewChild('fileInput') el: ElementRef;
  imageUrl: any
  editFile: boolean = true;
  removeUpload: boolean = false;
  ImpageArray=[];
  Range :boolean = false
  selectedFile: any;
  loginLocalData: any;
  GmailLogin: any;
  fbLogin: any;
  selectedArray=[];
  realState = true
  @ViewChild('search')
  public searchElementRef: ElementRef;
  olB: boolean=true;
  otp_Value: string;
  mlbrL = true;
  olBRl = true
  mlb: boolean = true;
  red: boolean =true;
  MobileNumber: string;
  subChildCategory=[];
  CTyId_Data: any;
  latitude: number;
  longitude: number;
  zoom: number;
  editData: string;
  sub_child_category: any;
  radiusLat: number;
  radiusLong: number;
  markers: any;
  location_Name: string;
  constructor(
    public service: ServiceService,
    public formBuilder: FormBuilder,
    public cd: ChangeDetectorRef,
    private renderer:Renderer2,
     private ele: ElementRef,
     private toast: ToastrService,
     private ngxService: NgxUiLoaderService,
     private router:Router,
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,
     public ActivatedRouter: ActivatedRoute,
     private modalService: NgbModal

  ) {

    this.editData = this.ActivatedRouter.snapshot.paramMap.get('id');
    if(this.editData !== null){
      console.log(this.editData,"addPost");
    

    }

   }
  changeMessage(id) {
    console.log(id)
    // this.get_Category_byId(id)
    // this.displayMessage = "Sort by " + selectedItem;
  }




  async GetSubCatgory(value){
    // console.log(value)

  
    let getSubChildCategory =  await this.service.GetAllChildSubCategory().toPromise()
    console.log(getSubChildCategory)
    let id = JSON.parse(value);
    this.sub_child_category = getSubChildCategory.filter(ele=>ele.SubCategoryId === id);
    console.log(this.sub_child_category,"childe")

    // if(value === 'Mobile' || value === 'Tablet' || value === 'Laptops'){

    //   // if(){

    //   }
  // }


  }


  
  async SubChiledCategory(value){
    
    console.log(value)

  if(value === 'SmartPhones'){

      
  }else if(value === 'Normal phones'){
    
  }



  // let getSubChildCategory =  await this.service.GetAllChildSubCategory().toPromise()
  // console.log(getSubChildCategory)





}
  ngOnInit(): void {
    
    // this.open();
    this.loginLocalData = JSON.parse(localStorage.getItem('LoginResponse'))
    this.GmailLogin = JSON.parse(localStorage.getItem('gmailLogin'));
    this.fbLogin = JSON.parse(localStorage.getItem('fbLogin'));

    if(this.loginLocalData!==null || this.fbLogin!=null){
               
    }else{
      this.router.navigateByUrl('login')
                
      this.errorToast("Please Login")
    }
    this.initialize_form();
    this.get_Category()
    // this.setCurrentLocation();
    this.setArrayInputs(this.arrayInputs);
    console.log(this.AddPostForm);
  }

  initialize_form() {
    this.AddPostForm = this.formBuilder.group({
      ProductID: [''],
      ProductTitle: ['',Validators.required],
      ProductDescription: ['',Validators.required],
      Condition: [''],
      ModifiedBy: [''],
      Datetime: [''],
      CategoryID: [''],
      SubCategoryID: ['',],
      Price: [''],
      MakeYear: [''],
      MinPrice: [''],
      MaxPrice: [''],
      Mileage: [''],
      OwnerNumber: [''],
      PriceType: [''],
      issold: [''],
      Remarks: [''],
      Images: [''],
      LocationName: [''],
      BrandID: [''],
      ModelID: [''],
      ChildSubCategoryID:[''],
      MobileNumber:[''],
      controllerArray: this.formBuilder.array([])

    })
  }




  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    
      console.log(autocomplete)
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();


          
          this.zoom = 12;


            console.log(place.formatted_address)
          this.location_Name = place.formatted_address
          console.log(this.latitude )
          console.log(this.longitude )
        });
      });
    });

    // console.log(this.searchElementRef.nativeElement); // throws an error
  }

  showSuccess(value) {
    this.toast.success(value);
        }
  
  errorToast(error){
    this.toast.error(error, '', {
      timeOut: 1000,
    });
  }

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.radiusLat = this.latitude;
  //       this.radiusLong = this.longitude;
  //       console.log(this.latitude)
  //       console.log(this.longitude)
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


  
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
}

  async get_Category() {
    this.get_Category_api = await this.service.get_category().toPromise();
    console.log(this.get_Category_api);
    this.Get_Year();


  }

  async get_Category_byId(id) {
    
try{
    let Sid;
    if (id == null || id == undefined || id == '') {

      Sid = 0
    } else {
      
      Sid = id
      console.log(id)
      this.get_SubCategory_api = await this.service.get_subcategory(Sid).toPromise();
      console.log(this.get_Category_api);
  
  
      let getCategory = await this.service.get_category_id(Sid).toPromise();
      console.log(getCategory);

      let getCategoryTypeId = await this.service.getCategoryTypeId().toPromise();
      console.log(getCategoryTypeId);

      let CTyId =getCategoryTypeId.filter(ele =>ele.CategoryTypeID === getCategory.CategoryTypeID);

      console.log(CTyId);

      
      this.subChildCategory =  await this.service.GetAllChildSubCategory().toPromise();

      this.CTyId_Data = this.subChildCategory.filter(ele =>ele.ChildSubCateoryId === getCategory.CategoryID);

      console.log(this.CTyId_Data)

      if (getCategory.CategoryName !== 'Cars' ) {
        console.log(true)
        this.cars = true
        this.MobileNumber =''
      } else {
        console.log(false)
        this.cars = false
        this.mlb = false;
        this.mlbrL = true;
        this.red = true
        this.MobileNumber =''
        // this.realState = false;
      }
      if(getCategory.CategoryName ! == 'real estate sales'){
        this.realState = false;
        this.mlbrL = false;
        this.mlb = true;
        this.red = true
        this.MobileNumber =''
      }else {
        
        this.realState = true;
        this.MobileNumber =''
      }
    }


    // this.Brands(this.get_SubCategory_api['SubCategoryId']);
  }catch(error){
      console.log(error)
  }
  }

 

 async verifyMobile(MobileNumber) {

    console.log(MobileNumber)


    try {
      let Nb = `%2B91${MobileNumber}`
      console.log(Nb)
      let Verification_Otp = await this.service.VerifyOtpCall(Nb).toPromise();
      console.log(Verification_Otp)
      this.mlb = true;
      this.olB = false
      localStorage.setItem('otp', Verification_Otp.Value)
    } catch (error) {
      console.log(error)
    }
  }
  async verifyMobileRl(MobileNumber) {

    console.log(MobileNumber)


    try {
      let Nb = `%2B91${MobileNumber}`
      console.log(Nb)
      let Verification_Otp = await this.service.VerifyOtpCall(Nb).toPromise();
      console.log(Verification_Otp)
      this.mlbrL = true;
      this.olBRl = false
      localStorage.setItem('otp', Verification_Otp.Value)
    } catch (error) {
      console.log(error)
    }
  }
  otp_call(otp){
    try {
      let otpValue = JSON.parse(localStorage.getItem('otp'));
      console.log(otpValue)
      let Verfiy = parseInt(otp)
      console.log(Verfiy)
      if (otpValue === Verfiy) {
        this.showSuccess('otp Verified Succesfully')
        // if(this.mlb == false){
        //     console.log('mlb false')
        // }else
        // if(this.mlbrL == false){
        //   console.log('mlbRl false')
        this.red = false
        this.olB = true;
          this.mlb = true;
          this.olBRl = true;
          this.mlbrL = true;
        // }
      //   if(this.mlb == true){
      //     console.log('mlb true')
      //     this.olB = true;
      //     this.mlb = false;
      // }else{

      //         console.log('mlbRl true')
      //    this.olBRl = true;
      //   this.mlbrL = false;

      // }



        // location.reload();
        this.otp_Value =''
        console.log(otp)

      }
    } catch (error) {
      console.log(error)
    }

    
  }

  // addfield()  {
  //   console.log('function triggered');
  //   const div = this.renderer.createElement('div');
  //   const input = this.renderer.createElement('input');

  //   this.renderer.appendChild(div, input);
  //   // col-md-12 col-sm-12 col-xs-12
  //   this.renderer.addClass(div, 'col-md-12');
  //   this.renderer.addClass(div, 'col-md-12');
  //   this.renderer.addClass(div, 'col-xs-12');
  //   // this.renderer.addClass(div,X  'margin: 10px');

  //   console.log('cross passes the code');
  //   this.renderer.addClass(input, 'form-control');
  //   this.renderer.addClass(input, 'col-md-12');
  //   this.renderer.addClass(input, 'col-md-12');
    
  //   const textboxes = document.getElementById('textboxes');

  //   this.renderer.appendChild(textboxes, div);
  //   console.log(textboxes)
  // }




  async Brands(id) {
    
    if (id == null || id === undefined || id === '' ) {

      
    } else{
      console.log(id)
      this.get_AllBrand_api = await this.service.Get_brand_byID(id).toPromise();
      console.log(this.get_AllBrand_api, "brandName");
    }
  }

  disclosed() {
    this.show = !this.show;

    if (this.show == true) {
      this.NotDisclosed = 4
    }
    console.log(this.show, "hi")
  }

  FixedPrice() {
    this.button_Fixed = !this.button_Fixed;

    if (this.button_Fixed == true) {
      this.Fixed = 1;
      this.AddPostForm.controls['PriceType'].setValue(this.Fixed)
    } else {
      this.Fixed = 3
      this.AddPostForm.controls['PriceType'].setValue(this.Fixed)
    }
    console.log(this.button_Fixed)
  }

  toggleRange(){

    this.Range = !this.Range;
    console.log(this.Range)
  }

  async post_Add_data(id) {
    let add_product = await this.service.Add_Product(id).toPromise();
    console.log(add_product);
  }

  async Get_Year() {
    this.get_Year_Api_Response = await this.service.Get_Api_Year().toPromise();
    console.log(this.get_Year_Api_Response);
    this.Get_Model();
  }



  async Get_Model() {
    this.get_Model_Api_Response = await this.service.Get_Api_Model().toPromise();
    console.log(this.get_Model_Api_Response, "Model");
  }
  get_YYYY(value){
    console.log(value)
  }

 async  SubmitPostForm() {
   
   console.log(this.ImpageArray)
    console.log(this.AddPostForm.value);
    this.ngxService.start()
    try{
      // let PostFormObj = {
      //   // ProductID: " " ,
      //   productTitle: this.AddPostForm.value.ProductTitle ,
      //   productDescription: this.AddPostForm.value.ProductDescription,
      //   // Condition: this.AddPostForm.value.Condition ,
      //   // ModifiedBy: this.AddPostForm.value.ModifiedBy ,
      //   // Datetime: this.AddPostForm.value.Datetime ,
      //   categoryID: parseInt(this.AddPostForm.value.CategoryID) ,
      //   subCategoryID: parseInt(this.AddPostForm.value.SubCategoryID) ,
      //   price: parseInt(this.AddPostForm.value.Price) ,
      //   makeYear: '2015',
      //   minPrice: parseInt(this.AddPostForm.value.MinPrice ),
      //   maxPrice: parseInt(this.AddPostForm.value.MaxPrice) ,
      //   // Mileage: parseInt(this.AddPostForm.value.Mileage) ,
      //   // OwnerNumber: parseInt(this.AddPostForm.value.OwnerNumber) ,
      //   // PriceType: this.AddPostForm.value.PriceType ,
      //   // issold: this.AddPostForm.value.issold ,
      //   // Remarks: this.AddPostForm.value.Remarks ,
      //   // Images: this.AddPostForm.value.Images ,
      //   locationName: this.AddPostForm.value.LocationName ,
      //   // BrandID: parseInt(this.AddPostForm.value.BrandID) ,
      //   // ModelID:parseInt(this.AddPostForm.value.ModelID)
      // }

        // let imageFormData = new FormData;
        // imageFormData.append('Images',  this.AddPostForm.value.Images) ;

        // console.log(JSON.stringify(imageFormData.get('Images')));
 
        // console.log(JSON.stringify(imageFormData.getAll('Images')));
        //         // console.log(JSON.stringify(imageFormData.getAll('Images')));

        const uploadData = new FormData();

   
        // )

        this.selectedArray.forEach(e=> uploadData.append('Images', e));

        // uploadData.append('Images', this.selectedFile, this.selectedFile.name);
        uploadData.append('productTitle', this.AddPostForm.value.ProductTitle);
        uploadData.append('productDescription', this.selectedFile, this.selectedFile.name);
        uploadData.append('categoryID', this.AddPostForm.value.CategoryID);
        uploadData.append('locationName',  this.location_Name );
        uploadData.append('makeYear', this.selectedFile, this.selectedFile.name);
        uploadData.append('condition', '1');
        uploadData.append('CreatedByUserID', this.loginLocalData.Id);
        uploadData.append('price', this.AddPostForm.value.Price);
        uploadData.append('Longitude', this.latitude.toString());
        uploadData.append('Latitude',  this.longitude.toString());
        
        
        uploadData.append('minPrice', this.AddPostForm.value.MinPrice);
        uploadData.append('maxPrice', this.AddPostForm.value.MaxPrice);
        uploadData.append('issold',  'false');
        uploadData.append('productTag', '1');

        
        
        console.log(this.selectedFile)
        console.log(this.selectedFile.name)
      //   for (var pair of uploadData) {
      //     console.log(pair[0]+ ', ' + pair[1]); 
      // }
  //     uploadData.forEach((value,key) => {
  //       console.log(JSON.parse(key)+" "+value)
  // });
  console.log(uploadData.get('Images')); // this is return first element value.


      let PostFormObj =   {

        "productTitle":  this.AddPostForm.value.ProductTitle,
        "productDescription": this.AddPostForm.value.ProductTitle,
        "categoryID":parseInt(this.AddPostForm.value.CategoryID),
        "subCategoryID": parseInt(this.AddPostForm.value.SubCategoryID) ,
        "locationName": this.AddPostForm.value.LocationName,
        "makeYear": this.AddPostForm.value.MakeYear,
        "condition": 1,
        "price": parseInt(this.AddPostForm.value.Price),
        "minPrice": parseInt(this.AddPostForm.value.MinPrice ),
        "maxPrice": parseInt(this.AddPostForm.value.MaxPrice),
        "issold": false,
        "productTag": 1,
        "Images":uploadData
        }
      console.log(PostFormObj)

      let postData = await this.service.Add_Product(uploadData).toPromise()
      console.log(postData);
      this.showSuccess("Add Post Created Successfully")
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        location.reload()
      }, 1000);
      this.ngxService.stop()
    }catch(error){
        console.log(error)
        this.errorToast(error)
        this.ngxService.stop()
    }
  }





  uploadFile(event, files) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.selectedFile = event.target.files[0]
    this.selectedArray.push(this.selectedFile)
    console.log(this.selectedArray)
    this.selectedArray.forEach(ele=>
      console.log(ele,'hi')
    )
    console.log(this.ImpageArray)
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
    var readers = new FileReader();
    // console.log(file[0])
    // this.imagePath = files;
    // console.log(this.imagePath);
    // let len = this.ImpageArray.length;
    // this.ImpageArray.push(this.imagePath);
    //   console.log(this.ImpageArray)
    readers.readAsDataURL(files[0]);
    readers.onload = (_event) => {
      this.imgURL = readers.result;
      let len = this.ImpageArray.length;

       console.log(len)
       if(len >= 4 ){
       this.errorToast("Maximum image upload only 4")
       }else{
        
        this.ImpageArray.push(this.imageUrl);
        console.log(this.ImpageArray)
       }
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = ''
    this.editFile = true;
    this.removeUpload = false;
    // this.registrationForm.patchValue({
    //   file: [null]
    // });
  }

  // Submit Registration Form
  // onSubmit() {
  //   this.submitted = true;
  //   if(!this.registrationForm.valid) {
  //     alert('Please fill all the required fields to create a super hero!')
  //     return false;
  //   } else {
  //     console.log(this.registrationForm.value)
  //   }
  // }

  // }
  setArrayInputs(arrayInputs) {
    const arrayFG = arrayInputs.map(address => this.formBuilder.group(address));
    const formArray = this.formBuilder.array(arrayFG);
    this.AddPostForm.setControl("controllerArray", formArray);
  }


  addInput() {
    (this.AddPostForm.get("controllerArray") as FormArray).push(
      this.formBuilder.group({ controlerInputName1: "" })
    );
        console.log(this.AddPostForm);

  }

  removeInput(index) {
    this.AddPostForm.controls.controllerArray["controls"].splice(index, 1);
  }
}

