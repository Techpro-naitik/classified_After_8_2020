export enum End_Point {

    server_Url= 'https://classifiedwebapi.azurewebsites.net/api/'
}

export enum urL {

    Admin = 'Admin/',
    Authentication ='Authentication/',
    Products = 'Products/',
    AdminAnalytics = 'AdminAnalytics/',
    User = 'User/'

}

export enum auth_Urls {
    login = 'login',
    Register='Register',
    GetAllCategory = 'GetAllCategory',
    GetSubCategory = 'GetSubCategoriesOfCategory?CategoryID=',
    SignOut = 'SignOut',
    ForgetPasswordEmail ='ForgetPassword?username=',
    ResetPasswordUsername = 'ResetPassword?username=',
    getPasswordResetTokenEmail = 'getPasswordResetToken?email=',
    GetProfileDetailsUsername = 'GetProfileDetails?username=',
    GetCategoryID = 'GetCategory?id=',
    ResetPassword = 'ResetPassword',
    previousPassword = '&previouspassword=',
    newPassword= '&newpassword=',
    ProductALLProduct ="GetAllProducts",
    FilterResult = 'FilterResult',
    GetLocationsList = 'GetLocationsList',
    NewPassword = 'NewPassword',
    AddProduct = 'AddProduct',
    GetAllbrands = 'GetAllbrands',
    GetAllbrandswithsubcategoryid='GetAllbrandswithsubcategoryid?subcategoryid=',
    GateMakeYears = 'GateMakeYears',
    GetAllProductModels = 'GetAllProductModels',
    SearchProducts = 'SearchProducts?userid=',
    Keywords ='&Keywords=',
    AddSearchedKeyword = 'AddSearchedKeyword?keyword=',
    VerifyMobileNumber ='VerifyMobileNumber?number=',
    GetAllCategoryTypes = 'GetAllCategoryTypes',
    GetAllChildSubCategory = 'GetAllChildSubCategory',
    GetProfileDetails = 'GetProfileDetails?username=',
    EditProfile =  'EditProfile',
    GetSearchHistory ='GetSearchHistory?userid='   ,
    EditProfileExternal = 'EditProfileExternal'  ,
    GetExternalRegisterUser = 'GetExternalRegisterUser?ID=',
    EditNameProfileExternal = 'EditNameProfileExternal',
    EditNameProfileInternal ='EditNameProfileInternal',
    ExternalReg =  'ExternalRegistartion',
    MyAds = 'MyAds?userid=',
    GetFavourites = 'GetFavourites?userid=',
    GetFeaturedAds = 'GetFeaturedAds?userid=',
    MySoldA = 'MySoldAds?userid=',
    EditProfilePicInternal = 'EditProfilePicInternal',
    AddCountryAndLanguageByID = 'AddCountryAndLanguageByID?ID=',
    LikeAd = 'LikeAd',
    UnlikeLikeAd = 'UnlikeLikeAd',
    LikeList = 'LikeList?userid=',
    FollowerList = "FollowerList?userid=",
    FollowingList = "FollowingList?userid=",
    AddComment ="AddComment",
    GetApiComments = "GetComments?ProductID=" ,
    DeleteComment = 'DeleteComment?commentid=',
    Follow = 'Follow',
    UnFollow = 'UnFollow',
    ReportProduct = 'ReportProduct',
    DeleteFavourites = 'DeleteFavourites?productid=',
    GetAllProductswithUserID = 'GetAllProductswithUserID?userid=',
    GetProductDetailByID = 'GetProductDetailByID?productid=',
    AddFavourites = 'AddFavourites',
    GetAllProductsByCategoryID = 'GetAllProductsByCategoryID',
    EditComment = 'EditComment',
    SendOTPToMail ="SendOTPToMail?UserID=",
    VerifyEmail = 'VerifyEmail?UserID=',

    
}

            