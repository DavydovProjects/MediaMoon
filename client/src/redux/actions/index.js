import * as C from '../../constants'

// Fail
export function Fail_Load(error){
  return{
    type: C.FAIL,
    error: error
  }
}

// AuthReducer
export function Login(body){
  return{
    type: C.LOGIN,
    call_api: '/user/auth/',
    method: 'POST',
    auth: 1,
    body: body
  }
}

export function Register(body){
  return{
    type: C.REGISTER,
    call_api: '/user/register/',
    method: 'POST',
    auth: 1,
    body: body
  }
}


export function LogOut(){
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  window.location.reload()
  return{
    type: C.LOGOUT
  }
}

export function CheckAuth(token){
  return{
    type: C.CHECK_AUTH,
    call_api: '/check_auth/',
    method: 'POST',
    body: token
  }
}

export function ClearAuth(){
  return{
    type: C.CLEAR_AUTH
  }
}


// MarketReducer
export function LoadMarketData(body){
  return{
    type: C.LOAD_MARKET_DATA,
    call_api: '/market/load_data/',
    method: 'POST',
    body: body
  }
}

// GetUsersDataReducer
export function GetUserData(username){
  return{
    type: C.GET_USER_DATA,
    call_api: '/user/data/' + username + '/',
    method: 'GET'
  }
}

export function GetYourData(token){
  return{
    type: C.GET_YOUR_DATA,
    call_api: '/user/your_data/',
    method: 'POST',
    body: token
  }
}

export function GetUserFeedback(body){
  return{
    type: C.GET_USER_FEEDBACK,
    call_api: '/feedback/get/' + body.username + '/',
    method: 'POST',
    body: body
  }
}

// LikeReducer
export function CheckLike(body){
  return{
    type: C.CHECK_LIKE,
    call_api: '/like/check/',
    method: 'POST',
    body: body
  }
}

export function Like(body){
  return{
    type: C.LIKE,
    call_api: '/like/add/',
    method: 'POST',
    body: body
  }
}

export function Unlike(body){
  return{
    type: C.UNLIKE,
    call_api: '/like/remove/',
    method: 'POST',
    body: body
  }
}

export function LoadLikes(body){
  return{
    type: C.LOAD_LIKES,
    call_api: '/like/load_likes/',
    method: 'POST',
    body: body
  }
}

export function ClearLikes(body){
  return{
    type: C.CLEAR_LIKES,
  }
}


// FeedbackReducer
export function SendFeedback(body){
  return{
    type: C.SEND_FEEDBACK,
    call_api: '/feedback/add/',
    method: 'POST',
    body: body
  }
}

export function ReportFeedback(body){
  return{
    type: C.REPORT_FEEDBACK,
    call_api: '/feedback/report/',
    method: 'POST',
    body: body
  }
}

export function ClearReportFeedback(){
  return{
    type: C.CLEAR_REPORT_FEEDBACK
  }
}


// UserProductsReducer
export function RemoveProduct(body){
  return{
    type: C.REMOVE_PRODUCT,
    call_api: '/product/delete/',
    method: 'POST',
    body: body
  }
}

export function EditProduct(body){
  return{
    type: C.EDIT_PRODUCT,
    call_api: '/product/edit/',
    method: 'POST',
    body: body
  }
}

export function CreateProduct(body){
  return{
    type: C.CREATE_PRODUCT,
    call_api: '/product/create/',
    method: 'POST',
    body: body
  }
}

export function LoadProducts(body){
  return{
    type: C.LOAD_PRODUCTS,
    call_api: '/product/load_data/',
    method: 'POST',
    body: body
  }
}

export function LoadOneProduct(body){
  return{
    type: C.LOAD_ONE_PRODUCT,
    call_api: '/product/load_one_data/',
    method: 'POST',
    body: body
  }
}


// OrderReducer
export function OrderCreate(body){
  return{
    type: C.ORDER_CREATE,
    call_api: '/order/create/',
    method: 'POST',
    body: body
  }
}

export function ClearCreateOrderData(){
  return{
    type: C.CLEAR_CREATE_ORDER_DATA
  }
}

export function LoadOrders(token, type){
  return{
    type: C.LOAD_ORDERS,
    call_api: '/order/load/' + type + '/',
    method: 'POST',
    body: token
  }
}

export function LoadOneOrder(body){
  return{
    type: C.LOAD_ONE_ORDER,
    call_api: '/order/load_one/',
    method: 'POST',
    body: body
  }
}

export function LoadOrderComments(body){
  return{
    type: C.LOAD_ORDER_COMMENTS,
    call_api: '/order/load_comments/',
    method: 'POST',
    body: body
  }
}

export function AddOrderComment(new_comment){
  return{
    type: C.ADD_ORDER_COMMENT,
    new_comment: new_comment
  }
}

export function ClearOrderComments(){
  return{
    type: C.CLEAR_ORDER_COMMENTS
  }
}

export function SendOrderComment(body){
  return{
    type: C.SEND_ORDER_COMMENT,
    call_api: '/order/send_comment/',
    method: 'POST',
    body: body
  }
}

export function ChangeOrderStatus(body, status){
  return{
    type: C.CHANGE_ORDER_STATUS,
    call_api: '/order/change_status/' + status + '/',
    method: 'POST',
    body: body
  }
}


// BanReducer
export function CheckBan(body){
  return{
    type: C.CHECK_BAN,
    call_api: '/ban/check/',
    method: 'POST',
    body: body
  }
}

export function LoadBansList(body){
  return{
    type: C.LOAD_BANS_LIST,
    call_api: '/ban/load_list/',
    method: 'POST',
    body: body
  }
}

export function Ban(body){
  return{
    type: C.BAN,
    call_api: '/ban/set/',
    method: 'POST',
    body: body
  }
}

export function Unban(body){
  return{
    type: C.UNBAN,
    call_api: '/ban/remove/',
    method: 'POST',
    body: body
  }
}


// SettingsReducer
export function ClearSettingsAccount(){
  return{
    type: C.CLEAR_SETTINGS_ACCOUNT
  }
}


export function SettingsAccount(body){
  return{
    type: C.SETTINGS_ACCOUNT,
    call_api: '/user/settings_account/',
    method: 'POST',
    body: body
  }
}

export function SettingsPassword(body){
  return{
    type: C.SETTINGS_PASSWORD,
    call_api: '/user/settings_password/',
    method: 'POST',
    body: body
  }
}

export function SettingsCommunication(body){
  return{
    type: C.SETTINGS_COMMUNICATION,
    call_api: '/user/settings_communication/',
    method: 'POST',
    body: body
  }
}

export function SettingsImagesSetAvatar(body){
  return{
    type: C.SETTINGS_IMAGES_AVATAR_SAVE,
    call_api: '/user/set_avatar/',
    file: true,
    body: body
  }
}

export function SettingsImagesRemoveAvatar(body){
  return{
    type: C.SETTINGS_IMAGES_AVATAR_REMOVE,
    call_api: '/user/remove_avatar/',
    file: true,
    body: body
  }
}

export function SettingsImagesSetWallpaper(body){
  return{
    type: C.SETTINGS_IMAGES_WALLPAPER_SAVE,
    call_api: '/user/set_profile_wallpaper/',
    file: true,
    body: body
  }
}

export function SettingsImagesRemoveWallpaper(body){
  return{
    type: C.SETTINGS_IMAGES_WALLPAPER_REMOVE,
    call_api: '/user/remove_profile_wallpaper/',
    file: true,
    body: body
  }
}

export function EmailSendCode(body){
  return{
    type: C.EMAIL_SEND_CODE,
    call_api: '/user/send_email_code/',
    method: 'POST',
    body: body
  }
}

export function EmailConfirm(body){
  return{
    type: C.EMAIL_CONFIRM,
    call_api: '/user/confirm_email/',
    method: 'POST',
    body: body
  }
}

// PasswordResetReducer
export function SendPasswordResetCode(body){
  return{
    type: C.SEND_PASSWORD_RESET_CODE,
    call_api: '/user/send_reset_password_code/',
    method: 'POST',
    body: body
  }
}

export function RecoverPassword(body){
  return{
    type: C.RECOVER_PASSWORD,
    call_api: '/user/recover_password/',
    method: 'POST',
    body: body
  }
}
