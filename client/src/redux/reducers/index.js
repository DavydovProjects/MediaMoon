import AuthReducer from './auth'
import GetUserDataReducer from './UsersData'
import MarketReducer from './market'
import LikeReducer from './like'
import BanReducer from './ban'
import FeedbackReducer from './feedback'
import UserProductsReducer from './products'
import OrderReducer from './order'
import SettingsReducer from './settings'
import EmailReducer from './email'
import PasswordResetReducer from './reset_password'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({AuthReducer, GetUserDataReducer, MarketReducer, LikeReducer, BanReducer, FeedbackReducer, UserProductsReducer, OrderReducer, SettingsReducer, EmailReducer, PasswordResetReducer})
export default rootReducer
