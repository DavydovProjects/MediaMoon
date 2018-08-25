import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../redux/actions/index'

import communication from '../images/chat.svg'
import rating from '../images/star.svg'
import transaction from '../images/transaction.svg'

import twitter from '../images/twitter.svg'
import facebook from '../images/facebook.svg'
import youtube from '../images/youtube.svg'
import instagram from '../images/instagram.svg'
import vk from '../images/vk.svg'
import twitch from '../images/twitch.svg'
import more from '../images/more.svg'
import order_preview from '../images/order_preview.svg'

import orders_info from '../images/home-orders-info.jpg'
import products_info from '../images/home-products-info.jpg'
import profile_info from '../images/home-profile-info.jpg'

class Home extends Component{

  componentDidMount(){
    document.title = "MediaMoon"
  }

  render(){
    return(
      <div className="home animated fadeIn">
        <div className="container">
          <h2 className="text-center">Buy or Sell Advertising</h2>
          <p className="text-center">MediaMoon enables you to easily sell or buy advertising any type you want.</p>

          <div className="row info-row">

            <div className="col-lg-4">
              <div className="container-fluid text-center info-block">
                <img className="info-img" src={rating} alt="IMAGE[Helpful rating system]"/>
                <p>Helpful rating system</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="container-fluid text-center info-block">
                <img className="info-img" src={communication}  alt="IMAGE[Convenient communication]"/>
                <p>Convenient communication</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="container-fluid text-center info-block">
                <img className="info-img" src={transaction}  alt="IMAGE[Easy to buy and sell]"/>
                <p>Easy to buy and sell</p>
              </div>
            </div>

          </div>

          <div className="home-info row text-left">
            <div className="col-lg-8">
              <img src={profile_info} className="img-fluid"/>
            </div>
            <div className="col-lg-4">
              <b><h2 className="mt-3">Customize your profile</h2></b>
              <p>For your profile you can set wallpaper, avatar, information about your self and so on. If you are a person who would like to sell advertisements here then it will be really useful for you. </p>
            </div>
          </div>

          <div className="home-info row text-left d-none d-lg-flex">
            <div className="col-lg-4">
              <b><h2 className="mt-3">Control your orders</h2></b>
              <p>With our orders system you can easily manage all your orders: communicate with customers / sellers, reject, accept orders and so on.</p>
            </div>
            <div className="col-lg-8">
              <img src={orders_info} className="img-fluid"/>
            </div>
          </div>

          <div className="home-info row text-left d-lg-none">
            <div className="col-lg-8">
              <img src={orders_info} className="img-fluid"/>
            </div>
            <div className="col-lg-4">
              <b><h2 className="mt-3">Control your orders</h2></b>
              <p>With our orders system you can easily manage all your orders: communicate with customers / sellers, reject, accept orders and so on.</p>
            </div>
          </div>

          <div className="home-info row text-left">
            <div className="col-lg-8">
              <img src={products_info} className="img-fluid"/>
            </div>
            <div className="col-lg-4">
              <b><h2 className="mt-3">Interact with products</h2></b>
              <p>Manage your own products if you sell advertising or submit an order to user on whose page you are.</p>
            </div>
          </div>

          <h2 className="text-center">Just Choose What Platform do You Want</h2>
          <p className="text-center">And search for the ad seller you want.</p>

          <div className="row platforms text-center">

            <div className="col-lg-2 offset-lg-3 col-md-4 col-sm-6 col-6">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=twitter&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={twitter} alt="Twitter" data-toggle="tooltip" data-placement="bottom" title="Twitter"/></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=facebook&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={facebook} alt="Facebook" data-toggle="tooltip" data-placement="bottom" title="Facebook"/></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=youtube&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={youtube} alt="Youtube" data-toggle="tooltip" data-placement="bottom" title="Youtube"/></a>
              </div>
            </div>

            <div className="col-lg-2 offset-lg-3 col-md-4 col-sm-6 col-6">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=instagram&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={instagram} alt="Instagram" data-toggle="tooltip" data-placement="bottom" title="Instagram"/></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=twitch&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={twitch} alt="Twitch" data-toggle="tooltip" data-placement="bottom" title="Twitch"/></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=vk&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={vk} alt="Vk" data-toggle="tooltip" data-placement="bottom" title="Vk"/></a>
              </div>
            </div>

            <div className="col-lg-2 offset-lg-5 col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-6 offset-3">
              <div className="container-fluid platform">
                <a href="/search?filter=true&filter=other&content_type=False&main_lang=-1&rating=False&page=1" target="_blank"><img className="platform-img" src={more} alt="Other" data-toggle="tooltip" data-placement="bottom" title="Other"/></a>
              </div>
            </div>

          </div>


        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Home));
