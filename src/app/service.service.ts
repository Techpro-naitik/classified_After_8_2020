import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { End_Point, auth_Urls, urL } from 'src/constant';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http: HttpClient) {

  }


  login_Call(loginForm_Value): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.login}`, loginForm_Value);
  }


  registration_Call(registraionForm_Value): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.Register}`, registraionForm_Value, { responseType: 'text' });

  }


  get_category(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllCategory}`);

  }


  get_category_id(id): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetCategoryID}${id}`);

  }





  get_subcategory(id): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetSubCategory}${id}`,);

  }

  signout(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${auth_Urls.SignOut}`);

  }


  resetPassword(email): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.ForgetPasswordEmail}${email.
      
      username}`, {}, { responseType: 'text' });

  }

  NewPasswrord(token, data): Observable<any> {

    console.log(data)

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.ResetPassword}`,data, { 
      
      responseType: 'text' });

  }



  GetALLProduct(): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.ProductALLProduct}`, {});
  }
  filterGetData(obj): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.FilterResult}`, obj);
  }

  locationList(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetLocationsList}`);
  }

  get_Token_newPassword(obj): Observable<any> {
    console.log(obj)

    return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.NewPassword}`, obj,{ 
      
      responseType: 'text' });

  }





    
  Add_Product(obj):Observable<any> {

    // return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.AddProduct}`, obj );
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.AddProduct}`, obj ,{ 
      
      responseType: 'text' } );

    // return this.http.post('https://classifiedwebapi.azurewebsites.net/api/Products/AddProduct?ProductTitle=Test&CategoryID=10&LocationName=in&MakeYear=2015&MaxPrice=45454&MinPrice=4354&Price=30000&ProductDescription=Test&SubCategoryID=30',{headers});
  }
  
      
  Get_brand_byID(subcategoryid):Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllbrandswithsubcategoryid}${subcategoryid}`,{} );
  }

  Get_Api_Year(): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GateMakeYears}`);
  }
  
  Get_Api_Model(): Observable<any> {

    return this.http.post(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllProductModels}`,{});
  }

  
  get_search(userId ,keyWord): Observable<any> {

    return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.SearchProducts}${userId}${auth_Urls.Keywords}${keyWord}`);
  }



Admin_Analytics_searchKeyWord(keyWord):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.AdminAnalytics}${auth_Urls.AddSearchedKeyword}${keyWord}`);
}


VerifyOtpCall(number):Observable<any>{
  
  return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.VerifyMobileNumber}${number}`,{ 
      
    responseType: 'text' })
}


getCategoryTypeId():Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllCategoryTypes}`);
}

GetAllChildSubCategory():Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Admin}${auth_Urls.GetAllChildSubCategory}`);
}


GetProfileDetails(username):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.GetProfileDetails}${username}` , {});
}

EditProfile(username):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.User}${auth_Urls.EditProfile}` , username ,{responseType:'text'});
}

getSerachThUser(Keywords):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetSearchHistory}${Keywords}`);
}


getExitenceRegis(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.GetExternalRegisterUser}${id}`);
}


EditExtenalProfile(obj):Observable<any>{

  return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditNameProfileExternal}` , obj,{ 
      
    responseType: 'text' });
}




RigExternal(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Authentication}${auth_Urls.ExternalReg}` , obj,{ 
      
    responseType: 'text' });
}



// EditExtenalProfile(obj):Observable<any>{

//   return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditProfile}` , obj);
// }




EditInterProfile(obj):Observable<any>{

  return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditNameProfileInternal}` , obj,{ 
      
    responseType: 'text' });
}


GeCallFavourites(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetFavourites}${id}`,{ 
      
    responseType: 'text' });
}



GetCallFeaturedAds(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetFeaturedAds}${id}`);
}


MyCallSoldA(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.MySoldA}${id}`,);
}


MycallAds(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.MyAds}${id}`);
}


ExternalProfile(obj):Observable<any>{

  return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.EditProfilePicInternal}`,obj,{ 
      
    responseType: 'text' });
}


myLikes(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.LikeList}${id}`);
}


myGetFallower(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.FollowerList}${id}`);
}

myGetFallowing(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.FollowingList}${id}`);
}




LikeAdsApiCall(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.LikeAd}`,obj,{ 
      
    responseType: 'text' });
}

UnLikeAdsApiCall(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.UnlikeLikeAd}`,obj,{ 
      
    responseType: 'text' });
}


AddCountryLnag(obj):Observable<any>{

  return this.http.put(`${End_Point.server_Url}${urL.User}${auth_Urls.AddCountryAndLanguageByID}${obj.ID}&Country=${obj.Country}`,
  {   responseType: 'text' });
}


AddComentApi(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.AddComment}`,obj,
  {   responseType: 'text' });
}


getApiProductComment(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetApiComments}${id}`);
}

DeleteApiProductComment(id):Observable<any>{

  return this.http.delete(`${End_Point.server_Url}${urL.Products}${auth_Urls.DeleteComment}${id}`, { responseType: 'text' });
}


getFollow(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.User}${auth_Urls.Follow}`,obj, { responseType: 'text' });
}

getUnFollow(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.User}${auth_Urls.UnFollow}`,obj, {responseType: 'text' });
}

ReportItems(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.ReportProduct}`,obj, {responseType: 'text' });
}


AddFavApi(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.AddFavourites}`,obj,{ 
      
    responseType: 'text' });
}

GetAddFav(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetFavourites}${id}`);
}

DeleteApiProductFavourites(obj):Observable<any>{

  return this.http.delete(`${End_Point.server_Url}${urL.Products}${auth_Urls.DeleteFavourites}${obj.productid}&userid=${obj.userid}`, { responseType: 'text' });
}


GetSimalarProductById(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetAllProductswithUserID}${id}`);
}


getProductBYIDWithCategory(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.GetAllProductsByCategoryID}`,obj);
}

EditValueApi(obj):Observable<any>{

  return this.http.post(`${End_Point.server_Url}${urL.Products}${auth_Urls.EditComment}`,obj,{responseType: 'text' });
}


sendMailOptByApiCall(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.SendOTPToMail}${id}`);
}


emailVerifed(id):Observable<any>{

  return this.http.get(`${End_Point.server_Url}${urL.User}${auth_Urls.VerifyEmail}${id}`, {responseType: 'text' });
}



}

