import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import 'url-search-params-polyfill'


class SearchForm extends Component{
  constructor(props) {
    super(props)
    let params = new URLSearchParams(this.props.location.search)
    this.state = {
      nickname: params.get('nickname') ? params.get('nickname') : ''
    }
  }

  handleChangeInput = (e) => {
    this.setState({nickname: e.target.value})
  }

  handleUserSearch = () => {
    if (this.state.nickname){
      let new_url = ''
      if (this.props.state.content_type){
        new_url = new_url + '&content_type=' + this.props.state.content_type
      }
      if (this.props.state.rating){
        new_url = new_url + '&rating=' + this.props.state.rating
      }
      if (this.props.state.cur_page){
        new_url = new_url + '&page=1'
      }
      if (this.state.nickname !== ''){
        new_url = new_url + '&nickname=' + this.state.nickname
      }
      window.location.href = '/search' + '?filter=true' + new_url
    }
  }

  render(){
    return(
      <div className="search_form mb-2">
        <div className="row">

          <div className="col-lg-6 offset-lg-3">

            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Name" onChange={this.handleChangeInput} value={this.state.nickname}/>
              <div className="input-group-append">
                <button className="btn btn-success" type="submit" onClick={this.handleUserSearch}><i className="fas fa-search mt-1"/></button>
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

export default withRouter(connect(mapStateToProps, AC)(SearchForm));
