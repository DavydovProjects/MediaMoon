import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Pagination from '../pagination'
import Products from './products'
import SearchForm from './search_form'

import Preloader from '../preloader'

import 'url-search-params-polyfill'

class MarketIndex extends Component{
    constructor(props) {
    super(props)
    let params = new URLSearchParams(this.props.location.search)

    this.state = {
      twitter: params.getAll('filter').includes('twitter'),
      facebook: params.getAll('filter').includes('facebook'),
      youtube: params.getAll('filter').includes('youtube'),
      instagram: params.getAll('filter').includes('instagram'),
      twitch: params.getAll('filter').includes('twitch'),
      vk: params.getAll('filter').includes('vk'),
      other: params.getAll('filter').includes('other'),

      main_lang: params.get('main_lang') ? params.get('main_lang') : "-1",

      content_type: parseInt(params.get('content_type')) ? parseInt(params.get('content_type')) : 'False',

      rating: parseInt(params.get('rating')) ? parseInt(params.get('rating')) : 'False',

      cur_page: parseInt(params.get('page')) ? parseInt(params.get('page')) : 1,

      nickname: params.get('nickname') ? params.get('nickname') : 'False@@@$#%^&*()',

      verified: params.get('verified') ? true : false,

      show: 'col-lg-2 m-settings text-left d-none d-lg-block'
    }
  }

  handle_twitter = () => {
    this.setState({twitter: !this.state.twitter})
  }

  handle_facebook = () => {
    this.setState({facebook: !this.state.facebook})
  }

  handle_youtube = () => {
    this.setState({youtube: !this.state.youtube})
  }

  handle_instagram = () => {
    this.setState({instagram: !this.state.instagram})
  }

  handle_twitch = () => {
    this.setState({twitch: !this.state.twitch})
  }

  handle_vk = () => {
    this.setState({vk: !this.state.vk})
  }

  handle_other = () => {
    this.setState({other: !this.state.other})
  }

  handle_entertaining = () => {
    if (this.state.content_type === 1){
      this.setState({content_type: "False"})
    }
    else{
      this.setState({content_type: 1})
    }
  }

  handle_educational = () => {
    if (this.state.content_type === 2){
      this.setState({content_type: "False"})
    }
    else{
      this.setState({content_type: 2})
    }
  }

  handle_news = () => {
    if (this.state.content_type === 3){
      this.setState({content_type: "False"})
    }
    else{
      this.setState({content_type: 3})
    }
  }

  handle_show = () => {
    if (this.state.content_type === 4){
      this.setState({content_type: "False"})
    }
    else{
      this.setState({content_type: 4})
    }
  }

  handle_other = () => {
    if (this.state.content_type === 5){
      this.setState({content_type: "False"})
    }
    else{
      this.setState({content_type: 5})
    }
  }

  handle_lang = (e) => {
    if (this.state.main_lang === e.target.id){
      this.setState({main_lang: "-1"})
    }
    else{
      this.setState({main_lang: e.target.id})
    }
  }

  handleRating = () => {
    if (this.state.rating === "False"){
      this.setState({rating: 1})
    }
    else if (this.state.rating === 1 ){
      this.setState({rating: 2})
    }
    else if (this.state.rating === 2){
      this.setState({rating: "False"})
    }
  }

  handle_verified = (e) => {
    e.target.checked
    this.setState({verified: !this.state.verified})
  }

  handleSubmit = () => {
    let params = new URLSearchParams(this.props.location.search)
    this.setState({cur_page: 1})
    let new_url = ''
    if (this.state.twitter){
      new_url = new_url + '&filter=twitter'
    }
    if (this.state.facebook){
      new_url = new_url + '&filter=facebook'
    }
    if (this.state.youtube){
      new_url = new_url + '&filter=youtube'
    }
    if (this.state.instagram){
      new_url = new_url + '&filter=instagram'
    }
    if (this.state.twitch){
      new_url = new_url + '&filter=twitch'
    }
    if (this.state.vk){
      new_url = new_url + '&filter=vk'
    }
    if (this.state.other){
      new_url = new_url + '&filter=other'
    }
    if (this.state.content_type){
      new_url = new_url + '&content_type=' + this.state.content_type
    }
    if (this.state.main_lang){
      new_url = new_url + '&main_lang=' + this.state.main_lang
    }
    if (this.state.rating){
      new_url = new_url + '&rating=' + this.state.rating
    }
    if (this.state.nickaname || this.state.nickname !== 'False@@@$#%^&*()'){
      new_url = new_url + '&nickname=' + this.state.nickname
    }
    if (this.state.verified){
      new_url = new_url + '&verified=true'
    }
    if (this.state.cur_page){
      new_url = new_url + '&page=1'
    }
    window.location.href = '/search' + '?filter=true' + new_url
    // history.replace('?filter=true' + new_url)
    // this.props.LoadMarketData(this.state)
  }

  GoPrevPage = () => {
    this.setState({cur_page: this.state.cur_page--})
    let new_url = ''
    if (this.state.twitter){
      new_url = new_url + '&filter=twitter'
    }
    if (this.state.facebook){
      new_url = new_url + '&filter=facebook'
    }
    if (this.state.youtube){
      new_url = new_url + '&filter=youtube'
    }
    if (this.state.instagram){
      new_url = new_url + '&filter=instagram'
    }
    if (this.state.twitch){
      new_url = new_url + '&filter=twitch'
    }
    if (this.state.vk){
      new_url = new_url + '&filter=vk'
    }
    if (this.state.other){
      new_url = new_url + '&filter=other'
    }
    if (this.state.content_type){
      new_url = new_url + '&content_type=' + this.state.content_type
    }
    if (this.state.main_lang){
      new_url = new_url + '&main_lang=' + this.state.main_lang
    }
    if (this.state.rating){
      new_url = new_url + '&rating=' + this.state.rating
    }
    if (this.state.nickaname || this.state.nickname !== 'False@@@$#%^&*()'){
      new_url = new_url + '&nickname=' + this.state.nickname
    }
    if (this.state.verified){
      new_url = new_url + '&verified=true'
    }
    if (this.state.cur_page){
      new_url = new_url + '&page=' + this.state.cur_page--
    }
    window.location.href = '/search' + '?filter=true' + new_url
    // history.replace('?filter=true' + new_url)

  }

  GoNextPage = () => {
    this.setState({cur_page: this.state.cur_page++})
    let new_url = ''
    if (this.state.twitter){
      new_url = new_url + '&filter=twitter'
    }
    if (this.state.facebook){
      new_url = new_url + '&filter=facebook'
    }
    if (this.state.youtube){
      new_url = new_url + '&filter=youtube'
    }
    if (this.state.instagram){
      new_url = new_url + '&filter=instagram'
    }
    if (this.state.twitch){
      new_url = new_url + '&filter=twitch'
    }
    if (this.state.vk){
      new_url = new_url + '&filter=vk'
    }
    if (this.state.other){
      new_url = new_url + '&filter=other'
    }
    if (this.state.content_type){
      new_url = new_url + '&content_type=' + this.state.content_type
    }
    if (this.state.main_lang){
      new_url = new_url + '&main_lang=' + this.state.main_lang
    }
    if (this.state.rating){
      new_url = new_url + '&rating=' + this.state.rating
    }
    if (this.state.nickaname || this.state.nickname !== 'False@@@$#%^&*()'){
      new_url = new_url + '&nickname=' + this.state.nickname
    }
    if (this.state.verified){
      new_url = new_url + '&verified=true'
    }
    if (this.state.cur_page){
      new_url = new_url + '&page=' + this.state.cur_page++
    }
    window.location.href = '/search' + '?filter=true' + new_url
    // history.replace('?filter=true' + new_url)

  }

  handlePagination = (e) => {
    let new_url = ''
    if (this.state.twitter){
      new_url = new_url + '&filter=twitter'
    }
    if (this.state.facebook){
      new_url = new_url + '&filter=facebook'
    }
    if (this.state.youtube){
      new_url = new_url + '&filter=youtube'
    }
    if (this.state.instagram){
      new_url = new_url + '&filter=instagram'
    }
    if (this.state.twitch){
      new_url = new_url + '&filter=twitch'
    }
    if (this.state.vk){
      new_url = new_url + '&filter=vk'
    }
    if (this.state.other){
      new_url = new_url + '&filter=other'
    }
    if (this.state.content_type){
      new_url = new_url + '&content_type=' + this.state.content_type
    }
    if (this.state.main_lang){
      new_url = new_url + '&main_lang=' + this.state.main_lang
    }
    if (this.state.rating){
      new_url = new_url + '&rating=' + this.state.rating
    }
    if (this.state.nickaname || this.state.nickname !== 'False@@@$#%^&*()'){
      new_url = new_url + '&nickname=' + this.state.nickname
    }
    if (this.state.verified){
      new_url = new_url + '&verified=true'
    }
    if (this.state.cur_page){
      new_url = new_url + '&page=' + e.target.innerHTML
    }
    window.location.href = '/search' + '?filter=true' + new_url
  }

  handleClear = () => {
    this.setState({
      twitter: false,
      facebook: false,
      youtube: false,
      instagram: false,
      twitch: false,
      vk: false,
      other: false,

      content_type: "False",

      main_lang: "-1",

      rating: "False",

      nickname: '',

      verified: false
    })
    this.refs.twitter.checked = false
    this.refs.facebook.checked = false
    this.refs.youtube.checked = false
    this.refs.instagram.checked = false
    this.refs.twitch.checked = false
    this.refs.vk.checked = false
    this.refs.other.checked = false
    this.refs.verified.checked = false

    this.refs.french.checked = false
    this.refs.russian.checked = false
    this.refs.english.checked = false
    this.refs.german.checked = false
    this.refs.japanese.checked = false
    this.refs.other.checked = false
  }

  handleSettings = () => {
    if (this.state.show === 'col-lg-2 m-settings text-left d-none d-lg-block'){
      this.setState({show: 'col-lg-2 m-settings text-left animated fadeIn'})
    }else{
      this.setState({show: 'col-lg-2 m-settings text-left d-none d-lg-block'})
    }
  }

  componentDidMount(){
    document.title = "Search"
    this.props.LoadMarketData(this.state)
  }

  render(){
    return(
      <div className="Marketplace mt-5 mb-5">
        <div className="container p-0">
          <div className="m-box row">
            <div className={this.state.show}>

              <div className="set-platforms">
                <h2>Platforms</h2>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set1" onClick={this.handle_twitter} defaultChecked={this.state.twitter} ref="twitter"/>
                  <label className="custom-control-label" htmlFor="pl-set1" >Twitter</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set2" onClick={this.handle_facebook} defaultChecked={this.state.facebook} ref="facebook"/>
                  <label className="custom-control-label" htmlFor="pl-set2">Facebook</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set3" onClick={this.handle_youtube} defaultChecked={this.state.youtube} ref="youtube"/>
                  <label className="custom-control-label" htmlFor="pl-set3">Youtube</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set4" onClick={this.handle_instagram} defaultChecked={this.state.instagram} ref="instagram"/>
                  <label className="custom-control-label" htmlFor="pl-set4">Instagram</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set5" onClick={this.handle_twitch} defaultChecked={this.state.twitch} ref="twitch"/>
                  <label className="custom-control-label" htmlFor="pl-set5">Twitch</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set6" onClick={this.handle_vk} defaultChecked={this.state.vk} ref="vk"/>
                  <label className="custom-control-label" htmlFor="pl-set6">Vk</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="pl-set7" onClick={this.handle_other} defaultChecked={this.state.other} ref="other"/>
                  <label className="custom-control-label" htmlFor="pl-set7">Other</label>
                </div>

              </div>


              <div className="set-content">

                <h2>Content type</h2>
                <form>
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="Entertaining" name="ContentType" value="customEx" checked={this.state.content_type === 1 ? true : false} onClick={this.handle_entertaining}/>
                    <label className="custom-control-label" htmlFor="Entertaining">Entertaining</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="Educational" name="ContentType" value="customEx" checked={this.state.content_type === 2 ? true : false} onClick={this.handle_educational}/>
                    <label className="custom-control-label" htmlFor="Educational">Educational</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="News" name="ContentType" value="customEx" checked={this.state.content_type === 3 ? true : false} onClick={this.handle_news}/>
                    <label className="custom-control-label" htmlFor="News">News</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="Show" name="ContentType" value="customEx" checked={this.state.content_type === 4 ? true : false} onClick={this.handle_show}/>
                    <label className="custom-control-label" htmlFor="Show">Show</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="Other" name="ContentType" value="customEx" checked={this.state.content_type === 5 ? true : false} onClick={this.handle_other}/>
                    <label className="custom-control-label" htmlFor="Other">Other</label>
                  </div>
                </form>

              </div>

              <div className="set-lang mb-3">

                <h2>Language</h2>
                <form>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="french" name="ContentType" value="customEx" checked={this.state.main_lang === 'french' ? true : false} onClick={this.handle_lang}  ref="french"/>
                    <label className="custom-control-label" htmlFor="french">French</label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="russian" name="ContentType" value="customEx" checked={this.state.main_lang === 'russian' ? true : false} onClick={this.handle_lang}  ref="russian"/>
                    <label className="custom-control-label" htmlFor="russian">Russian</label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="english" name="ContentType" value="customEx" checked={this.state.main_lang === 'english' ? true : false} onClick={this.handle_lang}  ref="english"/>
                    <label className="custom-control-label" htmlFor="english">English</label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="german" name="ContentType" value="customEx" checked={this.state.main_lang === 'german' ? true : false} onClick={this.handle_lang}  ref="german"/>
                    <label className="custom-control-label" htmlFor="german">German</label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="japanese" name="ContentType" value="customEx" checked={this.state.main_lang === 'japanese' ? true : false} onClick={this.handle_lang}  ref="japanese"/>
                    <label className="custom-control-label" htmlFor="japanese">Japanese</label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="1" name="ContentType" value="customEx" checked={this.state.main_lang === '1' ? true : false} onClick={this.handle_lang}  ref="other"/>
                    <label className="custom-control-label" htmlFor="1">Other</label>
                  </div>

                </form>

              </div>

              <div className="set-verified mb-2">
                <h2 className="mb-2" >Verified</h2>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="ver-set" onClick={this.handle_verified} defaultChecked={this.state.verified} ref="verified"/>
                  <label className="custom-control-label" htmlFor="ver-set">{this.state.verified ? 'Yes' : 'No'}</label>
                </div>
              </div>

              <div className="set-rating" onClick={this.handleRating} >
                <h2>Rating {this.state.rating !== "False" ? this.state.rating === 1 ? (<i className="fas fa-angle-up" />) : <i className="fas fa-angle-down" /> : (<i className="fas fa-minus" />) }</h2>
              </div>

              <button onClick={this.handleSubmit} className="btn btn-outline-success container-fluid">Sumbit</button>
              <button onClick={this.handleClear} className="btn btn-outline-danger container-fluid mt-2">Clear</button>

            </div>
            <div className="col-lg-10 col-md-12 pt-3 pb-3 m-main">
              <div className="text-center mb-3">
                <button className="btn btn-primary btn-md d-lg-none text-center container-fluid" onClick={this.handleSettings}>Filters</button>
              </div>

              <SearchForm state={this.state}/>
              <Products />

              <Pagination pages_count={this.props.MarketReducer.pages_count} cur_page={this.state.cur_page} GoPrevPage={this.GoPrevPage} GoNextPage={this.GoNextPage} handlePagination={this.handlePagination} />

            </div>
            <br/><br/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(MarketIndex));
