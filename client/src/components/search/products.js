import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Preloader from '../preloader'

import france_im from '../../images/langs/france.svg'
import japanese_im from '../../images/langs/japan.svg'
import german_im from '../../images/langs/germany.svg'
import english_im from '../../images/langs/english.svg'
import russian_im from '../../images/langs/russia.svg'
import other_im from '../../images/langs/other.svg'

import Fail from '../../images/fail.svg'

import 'url-search-params-polyfill'

class Products extends Component{

  goToProfile(username){
    window.location.href = '/profile/' + username
  }

  render(){
    let params = new URLSearchParams(this.props.location.search)
    return(
      <div className="Products row">
        {this.props.MarketReducer.products_data !== 'preloader' ? this.props.MarketReducer.products_data.length !== 0 ? this.props.MarketReducer.products_data.map((prod, i) => {
          return(
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3" key={i}>
              <a href={'/profile/' + prod[4]} target="_blank">
                <div className="card mb-3 animated fadeIn product" data-toggle="tooltip" data-placement="top" title={prod[5] ? "Account is verified" : ''}>
                  <div className="card-body text-center pl-0 pr-0">
                    <img className="product-user-avatar rounded" src={"https://api.mediamoon.net" + prod[1]} alt="product-user-avatar"/>

                    <h5 className="card-title mt-3">
                    {
                      prod[6] === '1' ? <img className="market-product-lang" src={other_im} /> :
                      prod[6] === 'french' ? <img className="market-product-lang" src={france_im} /> :
                      prod[6] === 'russian' ? <img className="market-product-lang" src={russian_im} /> :
                      prod[6] === 'english' ? <img className="market-product-lang" src={english_im} /> :
                      prod[6] === 'german' ? <img className="market-product-lang" src={german_im} /> :
                      prod[6] === 'japanese' ? <img className="market-product-lang" src={japanese_im} /> : ''
                    }
                    </h5>
                    <h5 className="card-title mt-3">{prod[0]}</h5>
                    <h5 className="card-text product-platforms">
                      {prod[3][0] !== 0 ? (<i className={params.getAll('filter').includes('twitter') ? "fab fa-twitter mr-1 product-platform-twitter-active" : "fab fa-twitter mr-1 product-platform-twitter"}/> ) : ''}
                      {prod[3][1] !== 0 ? (<i className={params.getAll('filter').includes('facebook') ? "fab fa-facebook mr-1 product-platform-facebook-active" : "fab fa-facebook mr-1 product-platform-facebook"}/> ) : ''}
                      {prod[3][2] !== 0 ? (<i className={params.getAll('filter').includes('youtube') ? "fab fa-youtube mr-1 product-platform-youtube-active" : "fab fa-youtube mr-1 product-platform-youtube"}/> ) : ''}
                      {prod[3][3] !== 0 ? (<i className={params.getAll('filter').includes('instagram') ? "fab fa-instagram mr-1 product-platform-instagram-active" : "fab fa-instagram mr-1 product-platform-instagram"}/> ) : '' }
                      {prod[3][4] !== 0 ? (<i className={params.getAll('filter').includes('vk') ? "fab fa-vk mr-1 product-platform-vk-active" : "fab fa-vk mr-1 product-platform-vk"}/> ) : ''}
                      {prod[3][5] !== 0 ? (<i className={params.getAll('filter').includes('twitch') ? "fab fa-twitch mr-1 product-platform-twitch-active" : "fab fa-twitch mr-1 product-platform-twitch"}/> ) : ''}
                      {prod[3][6] !== 0 ? (<i className={params.getAll('filter').includes('other') ? "fas fa-ellipsis-h mr-1 product-platform-other-active" : "fas fa-ellipsis-h mr-1 product-platform-other"}/>) : ''}
                    </h5>
                    <h5 className="card-title mb-0">{prod[2] <= 0 ? prod[2] === 0 ? (<span className="badge badge-secondary align-middle">Rating {prod[2]}</span>) : (<span className="badge badge-danger align-middle">Rating {prod[2]}</span>) : (<span className="badge badge-success align-middle">Rating {prod[2]}</span>)}</h5>
                  </div>
                </div>
              </a>
            </div>
          )
        }) : (
          <div className="fail_data_load mx-auto">
            <img src={Fail} className="mb-3 mt-3" alt="Fail..."/>
            <h1>Not found :(</h1>
          </div>
      ) : <Preloader/>}
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Products));
