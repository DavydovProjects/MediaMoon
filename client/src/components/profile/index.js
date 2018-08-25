import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Products from './products_component'
import Feedback from './feedback_component'
import AddFeedbackForm from './feedback_page/add_feedback_form'

import Preloader from '../preloader'

import france_im from '../../images/langs/france.svg'
import japanese_im from '../../images/langs/japan.svg'
import german_im from '../../images/langs/germany.svg'
import english_im from '../../images/langs/english.svg'
import russian_im from '../../images/langs/russia.svg'
import other_im from '../../images/langs/other.svg'

class ProfileIndex extends Component{
  state = {
    products: [],
    feedback: '',

    liked: false,
    banned: false
  }

  componentDidMount(){
    document.title = this.props.match.params.username + "'s profile"
    this.props.GetUserData(this.props.match.params.username)
    if (localStorage.getItem('token')){
      this.props.CheckLike({"to_user": this.props.match.params.username, "token": localStorage.getItem('token')})
      this.props.CheckBan({"username": this.props.match.params.username, "token": localStorage.getItem('token')})
    }
  }

  LikeUser = () => {
    this.props.Like({"to_user": this.props.match.params.username, "token": localStorage.getItem('token')})
    this.setState({liked: true})
  }
  UnlikeUser = () => {
    this.props.Unlike({"to_user": this.props.match.params.username, "token": localStorage.getItem('token')})
    this.setState({liked: false})
  }

  BanUser = () => {
    this.props.Ban({"username": this.props.match.params.username, "token": localStorage.getItem('token')})
    this.setState({banned: true})
  }
  UnBanUser = () => {
    this.props.Unban({"username": this.props.match.params.username, "token": localStorage.getItem('token')})
    this.setState({banned: false})
  }

  render(){
    const { user_data, user_data_loading } = this.props.GetUserDataReducer
    return(
      <div className="profile animated fadeIn mt-5 mb-5">
        <div className="container p-0">


            {!user_data_loading ? user_data.error !== 'Object does not exist!' ? (
              <div className="p-box pt-0 pb-3">
                <div className="profile-title mb-0">

                  <div className="container-fluid profile-wallpaper-box p-0 d-none d-lg-block">
                    <img src={"https://api.mediamoon.net" + user_data.profile_wallpaper} className="profile-wallpaper" />
                  </div>

                  <div className="container-fluid push-profile-wallpaper d-lg-none">
                  </div>

                  <div className="row">
                    <div className="container-fluid">
                      <div className="row profile-title-body">

                          <div className="container-fluid text-center">
                            <img className="profile-avatar" src={"https://api.mediamoon.net" + user_data.avatar} alt="avatar"/>
                            <h5 className="mt-3 mb-1">
                            {
                              user_data.main_lang === '1' ? <img className="market-product-lang" src={other_im}  data-toggle="tooltip" data-placement="top" title="Other"/> :
                              user_data.main_lang === 'french' ? <img className="market-product-lang" src={france_im}  data-toggle="tooltip" data-placement="top" title="France"/> :
                              user_data.main_lang === 'russian' ? <img className="market-product-lang" src={russian_im}  data-toggle="tooltip" data-placement="top" title="Russian"/> :
                              user_data.main_lang === 'english' ? <img className="market-product-lang" src={english_im}  data-toggle="tooltip" data-placement="top" title="English"/> :
                              user_data.main_lang === 'german' ? <img className="market-product-lang" src={german_im}  data-toggle="tooltip" data-placement="top" title="German"/> :
                              user_data.main_lang === 'japanese' ? <img className="market-product-lang" src={japanese_im}  data-toggle="tooltip" data-placement="top" title="Japanese"/> : ''
                            }
                            </h5>
                          </div>

                          <div className="col-lg-4 col-md-4 text-center mt-3 mb-3">
                            <i className="fas fa-heart profile-icon mb-1"/>
                            <h2 className="profile-username mb-3">Likes</h2>
                            <h5 className="profile-username mt-1">{user_data.likes}</h5>
                          </div>

                          <div className="col-lg-4 col-md-4 text-center mt-3 mb-3">
                            <i className={user_data.verified ? "fas fa-check-circle profile-icon mb-1" : "fas fa-user-circle profile-icon mb-1" } data-toggle="tooltip" data-placement="top" title={user_data.verified ? "Account is verified" : ''}/>
                            <h2 className="profile-username mb-3">{user_data.nickname}</h2>
                            <h5 className="profile-username mt-1">{user_data.status}</h5>
                          </div>

                          <div className="col-lg-4 col-md-4 text-center mt-3 mb-3">
                            <i className="fas fa-star profile-icon mb-1"/>
                            <h2 className="profile-username mb-3">Rating</h2>
                            <h5 className="profile-username mt-1">{user_data.rating}</h5>
                          </div>

                        {localStorage.getItem('token') ? (

                          <div className="col-4 offset-2 text-center mt-2 mb-2">
                            {this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ? (
                              <div>
                                {this.props.LikeReducer.liked[0] === 'True' || this.state.liked ? (
                                  <h4 className="profile-like-user text-success">
                                    <i className="fas fa-heart profile-icon mb-1" onClick={this.UnlikeUser}/><br/>
                                    Unlike
                                  </h4>
                                ) : this.props.LikeReducer.liked[0] === 'False' || !this.state.liked ? (
                                  <h4 className="profile-like-user text-success">
                                    <i className="far fa-heart profile-icon mb-1" onClick={this.LikeUser}/><br/>
                                    Like
                                  </h4>
                                ) : ''}
                              </div>
                            ) : ''}
                          </div>

                        ) : ''}

                        {localStorage.getItem('token') ? (

                          <div className="col-4  text-center mt-2 mb-2">
                            {this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ? (
                              <div>
                                {this.props.BanReducer.banned[0] === true || this.state.banned ? (
                                  <h4 className="profile-like-user text-danger">
                                    <i className="fas fa-ban profile-icon mb-1" onClick={this.UnBanUser}/><br/>
                                    UnBan
                                  </h4>
                                ) : this.props.BanReducer.banned[0] === false || !this.state.banned ? (
                                  <h4 className="profile-like-user text-danger">
                                    <i className="fas fa-ban profile-icon mb-1" onClick={this.BanUser}/><br/>
                                    Ban
                                  </h4>
                                ) : ''}
                              </div>
                            ) : ''}
                          </div>

                        ) : ''}

                      </div>
                    </div>
                  </div>
                </div>

                {!user_data_loading ? (
                  <div className="profile-body mb-3">
                    <div className="container-fluid">
                      {this.props.GetUserDataReducer.user_profile_prods ? this.props.GetUserDataReducer.user_profile_prods.total_prods !== 0 ?  <Products products={this.props.GetUserDataReducer.user_profile_prods} /> : '' : ''}
                    </div>
                    <div className="row">
                      <div className="col-lg-8 offset-lg-2 text-center">
                        <div className="container-fluid p-0 mb-3 animated fadeIn">
                          <div className="card pt-3">
                            <h4 classNmae="card-title">Information</h4>
                            <p classname="card-text">{user_data.info ? user_data.info : 'User has not specified personal information.'}</p>
                          </div>
                        </div>
                        <Feedback feedback={this.props.GetUserDataReducer.user_profile_feedback} />
                        {!user_data.show_feedback ? (<div className="container-fluid p-0"><a className="btn btn-outline-secondary btn-md col-lg-12" href={"/profile/" + this.props.GetUserDataReducer.user_data.username + "/feedback"}>Feedback</a></div>) : '' }
                      </div>
                    </div>
                  </div>
              ) : <Preloader />}
              </div>

            ) : (<div className="container-fluid text-center"><h4>User does not exist!</h4></div>) : <Preloader />}


        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(ProfileIndex))
