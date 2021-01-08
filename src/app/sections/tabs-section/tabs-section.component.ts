
import { Component, OnInit, ElementRef, ViewChild, NgZone, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapsAPILoader } from '@agm/core';
import { TranslateService } from '@ngx-translate/core';
// const nisPackage = require("../package.json");
// const nisPackage = require('./package.json');
// const { nisPackage } = require('./package.json');
@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrls: ['./tabs-section.component.css']
})
export class TabsSectionComponent implements OnInit {
  page = 1;
  page1 = 1;
  filterItem = [];
  responseApplyFilters = [];
  subCategory = [];
  categoryAPiData: any | [];
  getSubCategoryResponse: any | [];
  responseFrom_get_categoryApi: [] | any;
  GetProdt: any | [];
  rangePriceValue: any | [];
  selectedValueCategory: any | [];
  yearValue: any;
  get_Product: any;
  getFilterProduct: any;
  get_Location: any | [];
  s1: boolean = false;
  s2: boolean = true;
  s3: boolean = true;
  locatonValue: any | [];
  public glbValue;
  keyword = 'Keyword';
  keyword_KeyWord = 'LocationName';
  PostData: any;
  sortBy: any;
  get_Year: Promise<any>;
  items = [];
  pageOfItems: Array<any>;
  public staticUserIds;
  public Ids;
  localArray = [];
  getDataFormLocal_local: any;
  getDataFormLocal_gmail: any;
  getDataFormLocal_fb: any;
  responseFrom_get_Keyword = [];
  ValueGloubal: string;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  key: string;
  getSerchSubCategoryResponse: any[];
  selectedDay: any;
  Hidden: any[];
  FilterpageOfItems = [];
  mylocation: any;
  data: any;
  paramsValue: string;
  myValue: boolean = false;
  showId: any;
  searchKeyWord_Admin=[];
  pageSeachOfItems: any;
  s4: boolean;
  Currentmylocation: any;
  Search_Admin: boolean;
  GetSimlar: any;


  array = [];
  sum = 10;
 
  // scrollDistance = 1;
  // scrollUpDistance = 2;
  direction = "";
  modalOpen = false;
  product=[];

  // nisVersion = nisPackage.dependencies["ngx-infinite-scroll"];















  constructor(
    public router: Router,
    public service: ServiceService,
    private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService,
    public Activate: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.appendItems(0, this.sum);
  }
  ngOnInit() {

    this.getDataFormLocal_local = JSON.parse(localStorage.getItem('LoginResponse'))
    this.getDataFormLocal_gmail = JSON.parse(localStorage.getItem('gmailLogin'))
    this.getDataFormLocal_fb = JSON.parse(localStorage.getItem('fbLogin'))

    this.data = JSON.parse(localStorage.getItem('toggle'))

    console.log(this.data, "data")

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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

    this.gettSearch()
    this.getAllProduct()
    this.getAll_category();
    this.myYear()

    // let paramsValue = this.Activate.snapshot.paramMap.get('id');
    // console.log(paramsValue)

    if (this.getDataFormLocal_local === null || this.getDataFormLocal_fb === null) {
      let tmp = localStorage.getItem('tempValue');
      this.responseFrom_get_Keyword = JSON.parse(tmp);
    }


  }
















  // change Language


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
  // generateWord() {
  //   return chance.word();
  // }


  addItems(startIndex, endIndex, _method) {
    console.log(startIndex);
    console.log(endIndex);
    console.log(_method);
    for (let i = 0; i <this.product.length; ++i) {
 
      // this.array[_method]([i, " "]);
      this.product[_method]([i])
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push");
  }


  onScrollDown(ev) {
  
    console.log("scrolled down!!", ev);

    // add another 20 items
    const start = this.sum;
    console.log(this.sum);
    this.product.length += 20;
    this.appendItems(start, this.sum);

    this.direction = "down";
  }


  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onUp(ev) {
    console.log("scrolled up!", ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = "up";
  }


    async getAllProduct() {
    // this.get_Product = await this.service.GetALLProduct().toPromise();
    // this.items =  this.get_Product;


    // let UserId = this.getDataFormLocal_local.Id
    let obj = {
      
        "categoryID": 0,
        "userID": ''
      
    }
    this.product = await this.service.getProductBYIDWithCategory(obj).toPromise();
    console.log(this.subCategory,'value');

    this.Get_Similar_Product_ById();
  }

  // for current Location

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }



  // for current Location Address

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // console.log(results[2].address_components[0],"location")
      this.Currentmylocation = results[2]
      console.log(this.Currentmylocation)
      // console.log(results[2],"location")
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

  showSuccess() {
    this.toast.success('Register Successfully', '');
  }

  errorToast(error) {
    this.toast.error(error, '', {
      timeOut: 3000,
    });
  }

  //Pagination  
  onChangePage(pageOfItems: Array<any>) {

    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log(this.pageOfItems, "pageOfItems")
  }

  FilteronChangePage(pageOfItems: Array<any>) {

    // update current page of items
    this.FilterpageOfItems = pageOfItems;
    console.log(this.pageOfItems, "pageOfItems")
  }

pageCurr(pageOfItems){
  this.pageSeachOfItems = pageOfItems;
  console.log(this.pageOfItems, "pageOfItems")
}
  // for searched Subcategory
  async categorySelect(value, id) {
    this.gettSearch()

    // for Email login
    if (this.getDataFormLocal_local != null) {
      console.log(this.getDataFormLocal_local.Id)
      this.s1 = true
      this.s2 = true
      this.s3 = false
      this.s4 = true

      try {

        let cID;
        if (this.ValueGloubal !== undefined) {
          this.ngxService.start()
          this.subCategory = await this.service.get_subcategory(0).toPromise();
          console.log(this.subCategory)


          let category: any = this.categoryAPiData.filter(ele => ele.CategoryName == this.ValueGloubal);
          category.forEach(element => {
            cID = element.CategoryId
          });



          console.log(this.responseApplyFilters, "this.responseApplyFilters")

      

          this.getSubCategoryResponse = this.subCategory.filter(ele => ele.CategoryId === cID);
          console.log(this.getSubCategoryResponse);

          this.getSerchSubCategoryResponse = this.subCategory.filter(ele => ele.SubCategoryName === this.ValueGloubal);
          console.log(this.getSerchSubCategoryResponse, "this.ValueGloubal");

   

          let searchKeyWord = await this.service.Admin_Analytics_searchKeyWord(this.ValueGloubal).toPromise();
          console.log(searchKeyWord);


          this.searchKeyWord_Admin = await this.service.get_search(this.getDataFormLocal_local.Id, this.ValueGloubal).toPromise();
          
          if(this.searchKeyWord_Admin.length == 0){
            this.Search_Admin = true
          }
          // console.log(this.searchKeyWord_Admin);

          let countryID = this.get_Location.filter(ele => ele.LoactionID === id);
          console.log(countryID)
     
          this.ngxService.stop();


        } else {
          this.errorToast('please Enter some value')
        
          this.ngxService.stop();

        }

      } catch (err) {
        console.log(err)
        this.ngxService.stop();

      }

    } else if (this.getDataFormLocal_fb != null) {            // fb login
      console.log(this.getDataFormLocal_fb.id)
      this.s1 = true
      this.s2 = true
      this.s3 = false
      this.s4 = true
      console.log(this.staticUserIds)
      console.log(this.Ids)
      try {
        
        let cID;
        if (this.ValueGloubal !== undefined) {
          this.ngxService.start();

          this.subCategory = await this.service.get_subcategory(0).toPromise();
          console.log(this.subCategory)


          let category: any = this.categoryAPiData.filter(ele => ele.CategoryName == this.ValueGloubal);
          category.forEach(element => {
            cID = element.CategoryId
          });

          this.getSubCategoryResponse = this.subCategory.filter(ele => ele.CategoryId === cID);
          console.log(this.getSubCategoryResponse);

          this.getSerchSubCategoryResponse = this.subCategory.filter(ele => ele.SubCategoryName === this.ValueGloubal);
          console.log(this.getSerchSubCategoryResponse, "this.ValueGloubal");

          let searchKeyWord = await this.service.Admin_Analytics_searchKeyWord(this.ValueGloubal).toPromise();
          console.log(searchKeyWord);


          this.searchKeyWord_Admin = await this.service.get_search(this.getDataFormLocal_local.Id, this.ValueGloubal).toPromise();
        
          if(this.searchKeyWord_Admin.length == 0){
            this.Search_Admin = true
          }
          let countryID = this.get_Location.filter(ele => ele.LoactionID === id);
          console.log(countryID)
          this.staticUserIds = '';
          this.Ids = ''

          this.ngxService.stop();


        } else {
          this.errorToast('please Enter some value')
          this.ngxService.stop();

        }

      } catch (err) {
        console.log(err)
        this.ngxService.stop();

      }
    } else {                                        // for guest user 

      try {

        console.log(this.glbValue, ".....")
        let cID;
        if (this.ValueGloubal !== undefined) {
          this.ngxService.start();
          let tmp = localStorage.getItem('tempValue');
          if (tmp === null || tmp === undefined) {
            let obj = { Keyword: this.ValueGloubal }
            this.localArray.push(obj);
            console.log(this.localArray)
            console.log(this.localArray)


            this.responseFrom_get_Keyword = this.localArray
            localStorage.setItem('tempValue', JSON.stringify(this.responseFrom_get_Keyword))
            console.log(this.responseFrom_get_Keyword, 'ArrayLocalSerchKeyWord')
          } else {

            this.responseFrom_get_Keyword = JSON.parse(tmp);
            console.log(this.responseFrom_get_Keyword, " this.responseFrom_get_Keyword ")
            let obj = { Keyword: this.ValueGloubal }
            this.responseFrom_get_Keyword.push(obj);
            console.log(this.responseFrom_get_Keyword)

            // this.responseFrom_get_Keyword = this.localArray
            console.log(this.localArray)
            localStorage.setItem('tempValue', JSON.stringify(this.responseFrom_get_Keyword))
            console.log(this.responseFrom_get_Keyword, 'ArrayLocalSerchKeyWord')
          }

          this.s1 = true
          this.s2 = true
          this.s3 = false
          this.s4 = true
          console.log(this.staticUserIds)
          console.log(this.Ids)
          this.subCategory = await this.service.get_subcategory(0).toPromise();
          console.log(this.subCategory)
          let category: any = this.categoryAPiData.filter(ele => ele.CategoryName == this.ValueGloubal);
          console.log(category, "category");
          category.forEach(element => {
            cID = element.CategoryId
          });

          this.getSubCategoryResponse = this.subCategory.filter(ele => ele.CategoryId === cID);
          console.log(this.getSubCategoryResponse);

          this.getSerchSubCategoryResponse = this.subCategory.filter(ele => ele.SubCategoryName === this.ValueGloubal);
          console.log(this.getSerchSubCategoryResponse, "this.ValueGloubal");



          // this.getSerchSubCategoryResponse =this.subCategory.filter((item) => {
          //   return item.sensor.toLowerCase().includes(this.ValueGloubal.toLowerCase());
          // });



          // let term =  this.ValueGloubal;
          // this.items = this.subCategory.filter(function(tag) {
          //     return tag.name.indexOf(term) >= 0;
          // }); 


          console.log(this.getSerchSubCategoryResponse, "dsfs")

          let searchKeyWord = await this.service.Admin_Analytics_searchKeyWord(this.ValueGloubal).toPromise();
          console.log(searchKeyWord);

          this.searchKeyWord_Admin = await this.service.get_search(0, this.ValueGloubal).toPromise();
        
          if(this.searchKeyWord_Admin.length == 0){
            this.Search_Admin = true
          }

          let countryID = this.get_Location.filter(ele => ele.LoactionID === id);
          console.log(countryID)
          this.staticUserIds = '';
          this.Ids = ''
          this.ngxService.stop();
        } else {
          this.errorToast('please Enter some value')
          this.ngxService.stop();
        }
      } catch (err) {
        console.log(err)
        this.ngxService.stop();

      }
    }






  }


  // For get searched Keyword

  async gettSearch() {
    if (this.getDataFormLocal_local != null) {
      this.responseFrom_get_Keyword = await this.service.getSerachThUser(this.getDataFormLocal_local.Id).toPromise();
      console.log(this.responseFrom_get_Keyword, "responseFrom_get_Keyword");
    } else if (this.getDataFormLocal_fb != null) {
      console.log(this.getDataFormLocal_fb.id)
      this.responseFrom_get_Keyword = await this.service.getSerachThUser(this.getDataFormLocal_fb.id).toPromise();
      console.log(this.responseFrom_get_Keyword, "responseFrom_get_Keyword");
    }
  }



  async getAll_category() {


    try {
      this.s4 = true
      this.ngxService.start();

      this.responseFrom_get_categoryApi = await this.service.get_category().toPromise();
      console.log(this.responseFrom_get_categoryApi, "categoryApi");
      // this.items = this.responseFrom_get_categoryApi;
      this.gettSearch()
      // console.log(this.items)
      this.getLocation()
      this.categoryAPiData = this.responseFrom_get_categoryApi
      this.subCategory = await this.service.get_subcategory(0).toPromise();
      // this.items = this.subCategory
      console.log(this.items)
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.ngxService.stop();
      }, 2000);

    } catch (error) {
      console.log(error)
    }
  }




  detailPage() {
    this.router.navigateByUrl('/dPage')
    this.ngxService.stop();
  }


  selectLocation(value) {
    console.log(value)
  }



  async bindValue(id) {

    this.showId = id
    // let available = localStorage.getItem('_p')

    // if(available! == null){
    //   this.myValue = true ;
    // }else{
    //   this.myValue = false ;
    // }


    //   localStorage.setItem('p_','id');    
    //  console.log(id)
    try {

      // this.router.navigate(['home',{'id':id}])
      //  this.paramsValue = this.Activate.snapshot.paramMap.get('id');
      // console.log(this.paramsValue)
      // this.subCategory = await this.service.get_subcategory(id).toPromise();
      // console.log(this.subCategory)
      if(this.getDataFormLocal_local!=null){
        let UserId = this.getDataFormLocal_local.Id

      
        let obj = {
          
            "categoryID": id,
            "userID": UserId
          
        }
        this.subCategory = await this.service.getProductBYIDWithCategory(obj).toPromise();
        console.log(this.subCategory,'value')
  
      }if(this.getDataFormLocal_local == null){
      

      
        let obj = {
          
            "categoryID": id,
            "userID": ""
          
        }
        this.subCategory = await this.service.getProductBYIDWithCategory(obj).toPromise();
        console.log(this.subCategory,'value')
  
      }
     


        
    
    } catch (err) {
      console.log(err)
    }
  }




  async getLocation() {
    this.get_Location = await this.service.locationList().toPromise();
  }



  navigation(value) {
    console.log(value)
    this.router.navigate(['/dPage']);
    localStorage.setItem('id', value)
  }







  async FilterProduct(data) {
    this.getFilterProduct = await this.service.filterGetData(data).toPromise();
  }

  async Get_Similar_Product_ById(){
    

if(this.getDataFormLocal_local!=null){
  let userId = this.getDataFormLocal_local.Id
      
  this.GetSimlar = await this.service.GetSimalarProductById(userId).toPromise();
  console.log( this.GetSimlar,"GetSmilarProduct")
}else{
  let userId = 0
      
  this.GetSimlar = await this.service.GetSimalarProductById(userId).toPromise();
  console.log( this.GetSimlar,"GetSmilarProduct")
}

   
  }



  save_range(value) {
    console.log(value)
    this.rangePriceValue = value;
  }




  selectEvent(item) {
    // do something with selected item
    console.log(item, 'selecte');
    this.ValueGloubal = item.Keyword;

  }

  onChangeSearch(val: string) {
    console.log(val)
    if (val === undefined) {
      this.ValueGloubal = undefined
    } else {
      this.ValueGloubal = val
    }
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

  }



  onFocused(e) {
    console.log(e)
    this.gettSearch()
    // this.ValueGloubal = undefined
    // do something when input is focused
  }



  async myYear() {
    try {
      this.get_Year = await this.service.Get_Api_Year().toPromise();
      console.log(this.get_Year)
    } catch (error) {
      console.log(error)
    }
  }



  YearDroupDown(value) {
    this.yearValue = value
    console.log("the selected value is " + value);
  }



  Subcategory(value) {

    let id = JSON.parse(value)
    this.s1 = true 
    this.s2 = true
    this.s3 = true
    this.s4 = false
  this.getSerchSubCategoryResponse = this.subCategory.filter(ele => ele.SubCategoryId === id);
  console.log(this.getSerchSubCategoryResponse, "this.ValueGloubal");
  value = ''
    
  }






  mylocationDroupDown(location) {
    this.locatonValue = location
  }



  myPostLocal(myPostDate) {
    this.PostData = myPostDate
  }



  mySortLocal(mySort) {
    // console.log(mySort)
    this.sortBy = mySort
  }
  async applyFilter() {
    this.s1 = true
    this.s2 = false
    this.s3 = true
    this.s4 = true
    console.log(this.s2)
    this.subCategory == null;
    let lYear;
    let lprice;
    let lSelectedCategory;
    let LlocatonValue;

    if (this.yearValue === undefined) {
      lYear = ""
    } else {
      lYear = this.yearValue
    }
    if (this.rangePriceValue === undefined) {
      lprice = 0
    } else {
      lprice = this.rangePriceValue;
    }

    if (this.selectedValueCategory === undefined) {
      lSelectedCategory = 0
    } else {
      lSelectedCategory = parseInt(this.selectedValueCategory)
    }

    if (this.locatonValue === undefined) {
      LlocatonValue = 0
    } else {
      LlocatonValue = parseInt(this.locatonValue);
    }



    let applyLocalFilter = {
      "categoryId": lSelectedCategory,
      "subcategoryId": 0,
      "locationId": LlocatonValue,
      "makeYear": lYear,
      "minMileage": 0,
      "maxMileage": 0,
      "brandID": 0,
      "modelID": 0,
      "typeID": 0,
      "price": lprice,
      "minpriceRange": 0,
      "maxpriceRange": 0,
      "priceType": 0,
      "productCondition": 0,
      "begningYear": "",
      "endYear": "",
      "sortby": parseInt(this.sortBy),
      "postedWithin": parseInt(this.PostData)

    }

    console.log(applyLocalFilter)
    try {
      this.ngxService.start()
      this.responseApplyFilters = await this.service.filterGetData(applyLocalFilter).toPromise();

      this.items = this.responseApplyFilters;

      console.log(this.responseApplyFilters)
      this.ngxService.stop();
    } catch (error) {
      this.ngxService.stop();
      console.log(error)
    }
  }
  reload() {
    location.reload();
  }
}
