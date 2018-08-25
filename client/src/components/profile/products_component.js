import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

class Products extends Component{
  render(){
    return(
      <div className="profile-products p-2 text-center animated fadeIn">
        {this.props.products ?
          this.props.products.total_prods !== 0 ?
            (
            <div className="container-fluid text-center">
              <ul className="list-inline ml-1">

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "twitter"}>
                      <i className={this.props.products.twitter.length !== 0 ? "fab fa-twitter profile-product-twitter-active mr-4" : "fab fa-twitter profile-product-twitter mr-4"} data-toggle="tooltip" data-placement="bottom" title="Twitter"/>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "facebook"}>
                      <i className={this.props.products.facebook.length !== 0 ? "fab fa-facebook profile-product-facebook-active mr-4" : "fab fa-facebook profile-product-facebook mr-4"} data-toggle="tooltip" data-placement="bottom" title="Facebook"/>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "youtube"}>
                      <i className={this.props.products.youtube.length !== 0 ? "fab fa-youtube profile-product-youtube-active mr-4" : "fab fa-youtube profile-product-youtube mr-4"} data-toggle="tooltip" data-placement="bottom" title="Youtube"/>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "instagram"}>
                      <i className={this.props.products.instagram.length !== 0 ? "fab fa-instagram profile-product-instagram-active mr-4" : "fab fa-instagram profile-product-instagram mr-4"} data-toggle="tooltip" data-placement="bottom" title="Instagram"/>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "vk"}>
                      <i className={this.props.products.vk.length !== 0 ? "fab fa-vk profile-product-vk-active mr-4" : "fab fa-vk profile-product-vk mr-4"} data-toggle="tooltip" data-placement="bottom" title="Vk"/>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "twitch"}>
                      <i className={this.props.products.twitch.length !== 0 ? "fab fa-twitch profile-product-twitch-active mr-4" : "fab fa-twitch profile-product-twitch mr-4"} data-toggle="tooltip" data-placement="bottom" title="Twitch"/>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href={"/profile/" + this.props.match.params.username + "/" + "other"}>
                      <i className={this.props.products.other.length !== 0 ? "fas fa-ellipsis-h profile-product-other-active" : "fas fa-ellipsis-h profile-product-other"} data-toggle="tooltip" data-placement="bottom" title="Other"/>
                    </a>
                  </li>

              </ul>
            </div>
            )
          : ''
         : (<h4>Loading...</h4>)}
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Products));
