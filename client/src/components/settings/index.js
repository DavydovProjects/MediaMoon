import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Preloader from '../preloader'

import EmailConfirmation from './email'
import AccountSettings from './account'
import PasswordSettings from './password'
import ImagesSettings from './images'
import CommunicationSettings from './communication'

class Settings extends Component{

  state = {
    account_error: '',

    nickname: '',
    email: '',
    status: '',
    lang: "-1",
    info: '',

    old_password: '',
    new_password: '',
    cnew_password: '',
    password_error: '',

    cur_avatar: 'Choose file...',
    cur_wallpaper: 'Choose file...',

    avatar_error: '',
    wallpaper_error: '',

    email_code: '',
    email_code_status: false,

    accept_orders: 'nothing',
    show_in_market: 'nothing',
    show_feedback: 'nothing',

    error_communication: ''
  }

  componentDidMount(){
      document.title = 'Settings'
  }

  handleAccount = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }


  SubmitAccount = () => {
    this.props.ClearSettingsAccount()
    if (this.state.nickname || this.state.email || this.state.status || this.state.lang !== "-1" || this.state.info){
      this.setState({account_error: ''})
      this.props.SettingsAccount({
        nickname: this.state.nickname,
        email: this.state.email,
        status: this.state.status,
        lang: this.state.lang,
        info: this.state.info,
        token: localStorage.getItem('token')
      })
    }
    else{
      this.setState({account_error: 'Fields are empty!'})
    }
  }

  handlePassword = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  submitPassword = () => {
    if (this.state.old_password || this.state.new_password || this.state.cnew_password){
      if (this.state.new_password === this.state.cnew_password){
        this.setState({password_error: ''})
        this.props.SettingsPassword({
          token: localStorage.getItem('token'),
          old_password: this.state.old_password,
          new_password: this.state.new_password
        })
      }
      else{
        this.setState({password_error: "New passwords don't match!"})
      }
    }
    else{
      this.setState({password_error: 'Fields are empty!'})
    }
  }

  handleChangeAvatar = (selectorFiles) => {
      this.setState({cur_avatar: selectorFiles[0]})
  }

  handleChangeWallpaper = (selectorFiles) => {
      this.setState({cur_wallpaper: selectorFiles[0]})
  }

  saveAvatar = () => {
    if (this.state.cur_avatar !== 'Choose file...'){
      this.setState({avatar_error: ''})
      var data = new FormData()
      data.append('avatar', this.state.cur_avatar)
      data.append('token', localStorage.getItem('token'))
      this.props.SettingsImagesSetAvatar(data)
    }
    else{
      this.setState({avatar_error: 'You need to choose your image!'})
    }
  }

  removeAvatar = () => {
    var data = new FormData()
    data.append('token', localStorage.getItem('token'))
    this.props.SettingsImagesRemoveAvatar(data)
  }

  saveWallpaper = () => {
    if (this.state.cur_wallpaper !== 'Choose file...'){
      this.setState({wallpaper_error: ''})
      var data = new FormData()
      data.append('wallpaper', this.state.cur_wallpaper)
      data.append('token', localStorage.getItem('token'))
      this.props.SettingsImagesSetWallpaper(data)
    }
    else{
      this.setState({wallpaper_error: 'You need to choose your image!'})
    }
  }

  removeWallpaper = () => {
    var data = new FormData()
    data.append('token', localStorage.getItem('token'))
    this.props.SettingsImagesRemoveWallpaper(data)
  }

  sendEmailCode = () => {
    this.props.EmailSendCode({token: localStorage.getItem('token')})
    this.setState({email_code_status: true})
  }

  confirmEmailCode = () => {
    this.props.EmailConfirm({token: localStorage.getItem('token'), code: this.state.email_code})
  }

  handleEmailCode = (e) => {
    this.setState({email_code: e.target.value})
  }

  handleAcceptOrders = (e) => {
    var isTrueSet = (e.target.name == 'true')
    this.setState({accept_orders: isTrueSet})
  }

  handleShowInMarket = (e) => {
    var isTrueSet = (e.target.name == 'true')
    this.setState({show_in_market: isTrueSet})
  }

  handleShowFeedback = (e) => {
    var isTrueSet = (e.target.name == 'true')
    this.setState({show_feedback: isTrueSet})
  }

  SubmitCommunication = () => {
    if (this.state.accept_orders !== 'nothing' || this.state.show_in_market !== 'nothing' || this.state.show_feedback !== 'nothing'){
      this.props.SettingsCommunication({token: localStorage.getItem('token'), accept_orders: this.state.accept_orders, show_in_market: this.state.show_in_market, show_feedback: this.state.show_feedback})
      this.setState({error_communication: ''})
      this.props.GetYourData({"token": localStorage.getItem('token')})
    }
    else{
      this.setState({error_communication: "You didn't changed anything!"})
    }
  }

  render(){
    if (!localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      const {your_data, your_data_loading} = this.props.GetUserDataReducer
      const {account, account_loading, images_avatar, images_loading_avatar, images_wallpaper, images_loading_wallpaper, password, password_loading, communication_loading} = this.props.SettingsReducer
      return(
        <div classNmae="settings">
          <div className="container p-0">
            <div className="c-box mb-5 mt-5 p-3">

              {!your_data_loading ? ! your_data.email_is_confirmed ? (
                <EmailConfirmation
                  confirm_loading={this.props.EmailReducer.confirm_loading}
                  confirm={this.props.EmailReducer.confirm}
                  confirmEmailCode={this.confirmEmailCode}
                  email_code_status={this.state.email_code_status}
                  sendEmailCode={this.sendEmailCode}
                  handleEmailCode={this.handleEmailCode}/>
              ) : '' : ''}

              <AccountSettings
                account={account}
                account_loading={account_loading}
                account_error={this.state.account_error}
                handleAccount={this.handleAccount}
                nickname={this.state.nickname}
                email={this.state.email}
                status={this.state.status}
                lang={this.state.lang}
                info={this.state.info}
                SubmitAccount={this.SubmitAccount} />

              <PasswordSettings
                password_error={this.state.password_error}
                password_loading={password_loading}
                password={password}
                old_password={this.state.old_password}
                new_password={this.state.new_password}
                cnew_password={this.state.cnew_password}
                handlePassword={this.handlePassword}
                submitPassword={this.submitPassword}/>

              <ImagesSettings
                avatar_error={this.state.avatar_error}
                images_loading_avatar={images_loading_avatar}
                images_avatar={images_avatar}
                handleChangeAvatar={this.handleChangeAvatar}
                cur_avatar={this.state.cur_avatar}
                saveAvatar={this.saveAvatar}
                removeAvatar={this.removeAvatar}
                wallpaper_error={this.state.wallpaper_error}
                images_loading_wallpaper={images_loading_wallpaper}
                images_wallpaper={images_wallpaper}
                handleChangeWallpaper={this.handleChangeWallpaper}
                cur_wallpaper={this.state.cur_wallpaper}
                saveWallpaper={this.saveWallpaper}
                removeWallpaper={this.removeWallpaper}/>

              <CommunicationSettings
                communication_loading={communication_loading}
                accept_orders={this.state.accept_orders}
                show_in_market={this.state.show_in_market}
                show_feedback={this.state.show_feedback}
                your_data={your_data}
                handleAcceptOrders={this.handleAcceptOrders}
                handleShowInMarket={this.handleShowInMarket}
                handleShowFeedback={this.handleShowFeedback}
                SubmitCommunication={this.SubmitCommunication}/>


            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Settings))
