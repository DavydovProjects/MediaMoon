import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as AC from '../../../redux/actions/index'

import Pagination from '../../pagination'
import Preloader from '../../preloader'

import List from './list'
import UserProducts from './products'

class ProfileProductsIndex extends Component{

  state = {
    platform: '',
    list: '',

    order: [],
    counter: 0
  }

  componentWillMount(){
    document.title = this.props.match.params.username + "'s products"
    this.props.GetUserData(this.props.match.params.username)
    this.props.LoadProducts({'username': this.props.match.params.username, 'platform_type': this.props.match.params.platform})
  }

  renderProducts = (e) => {
    this.props.LoadProducts({'username': this.props.match.params.username, 'platform_type': e.target.id})
  }

  goToProfile = () =>{
    window.location.href = '/profile/' + this.props.match.params.username
  }

  addToOrder = (prod_data) => {
    var search_res = false
    for(var i = 0, l = this.state.order.length; i < l; i++) {
      if (this.state.order[i].id === prod_data.id && this.state.order[i].platform === prod_data.platform){
        search_res = true
      }
    }
    if (search_res === false){
      this.setState({order: this.state.order.concat(prod_data)})
    }
  }

  removeFromOrder = (prod_data) => {
    for(var i = 0, l = this.state.order.length; i < l; i++){
    	if (this.state.order[i].id === prod_data.id && this.state.order[i].platform === prod_data.platform) {
        var new_state = this.state.order
        var removed = new_state.splice(i, 1)
        this.setState({order: new_state})
        break
      }
    }
  }

  checkOnProduct = (prod_data) => {
    var found = false;
    for(var i = 0; i < this.state.order.length; i++) {
        if (this.state.order[i].id === prod_data.id && this.state.order[i].platform === prod_data.platform) {
            found = true;
            break;
        }
    }
    return found
  }

  OrderSubmit = () => {
    this.props.ClearCreateOrderData()
    this.props.OrderCreate({to_user: this.props.match.params.username, products: this.state.order, token: localStorage.getItem('token')})
  }

  render(){
    const { user_data, your_data, your_data_loading } = this.props.GetUserDataReducer
    const { data, remove_loading, remove } = this.props.UserProductsReducer
    if (!this.props.UserProductsReducer.remove_loading && !this.props.UserProductsReducer.remove.error && this.props.UserProductsReducer.remove !== '') {
      window.location.reload()
    }
    if (this.props.OrderReducer.create_data.resp === 'You have successfully submitted an order!'){
      window.location.href = '/order/' + this.props.OrderReducer.create_data.order_id
    }
    else{
      return(
        <div className="profile-products-page animated fadeIn mt-5 mb-5">
          <div className="container p-0">
            <div className="c-box pb-3 pt-3">

            <div className="profile-title mb-3">
              <div className="row">
                <div className="container-fluid">
                  <div className="row feedback-profile-title-body">

                    <div className="container-fluid text-center mt-3 profile-user-data">
                        {!this.props.GetUserDataReducer.user_data_loading ? (<img className="feedback-profile-avatar" src={"https://api.mediamoon.net" + user_data.avatar} alt="avatar"/>) : ''}

                        <h4 className="mt-3 mb-3 "><a href={'/profile/' + this.props.match.params.username}>{user_data.nickname}  </a></h4>

                    </div>

                  </div>
                  {this.props.UserProductsReducer.loading && this.props.GetUserDataReducer.user_data_loading ? '' : your_data.username === user_data.username ? <div className="container-fluid text-center"><a href="/create_product" className="btn btn-outline-info mb-2" target="_blank">Create a product</a></div> : ''}
                  {!this.props.UserProductsReducer.loading && !this.props.GetUserDataReducer.user_data_loading ? this.props.GetUserDataReducer.user_data.products.total_prods ? (

                    <div className="profile-body mb-3">

                      <List username={this.props.match.params.username} list={this.props.GetUserDataReducer.user_data.products} renderProducts={this.renderProducts}/>


                      <div className="row animated fadeIn">
                        {user_data.accept_orders ? (
                          <div className="col-lg-6 offset-lg-3 order-list mb-3">
                            <div className="card ml-3 mr-3 p-2">
                              <h5 className="card-title text-center">Current order list:</h5>
                              <div className="row text-center">
                                {this.state.order.length !== 0 ? this.state.order.map((thing, i) => {
                                  i = i + 1
                                  return(
                                    <div className="col-lg-6 mt-3 mb-3 order-thing text-center" key={i} onClick={() => {
                                      this.setState({counter: Math.random()})
                                      this.removeFromOrder({id: thing.id, title: thing.title, platform: thing.platform, status: thing.status})
                                    }}>
                                      <h6><i className={thing.platform !== 'other' ? "fab fa-"+thing.platform : "fas fa-ellipsis-h"}/><br/> {thing.title}</h6>
                                    </div>
                                  )
                                }) : localStorage.getItem('token') ? this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ? (<div className="col-lg-8 offset-lg-2">You did not choosed anything.</div>) : (<div className="col-lg-8 offset-lg-2">You can not submit an order to yourself.</div>) : <div className="col-lg-8 offset-lg-2">You need to log in.</div>}
                                <div className={!this.props.OrderReducer.create_data.error ? "container-fluid mb-3 text-success" : "container-fluid mb-3 text-danger"}>
                                  {!this.props.OrderReducer.create_data.error ? this.props.OrderReducer.create_data !== '' ? 'You are successfully submitted an order to ' + this.props.match.params.username + '!' : '' : this.props.OrderReducer.create_data.error}
                                </div>
                                {localStorage.getItem('token') ? this.state.order.length !== 0 ? (<button className="btn btn-sm btn-outline-info container-fluid" onClick={this.OrderSubmit}>Submit an order</button>) : '' : ''}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-lg-12 text-center text-danger mb-3">
                            <h5>{this.props.match.params.username} is currently not accepting orders.</h5>
                          </div>
                        )}


                        <div className="col-lg-8 offset-lg-2">
                          <UserProducts platform={this.props.UserProductsReducer.data.platform} products={this.props.UserProductsReducer.data.prods} checkOnProduct={this.checkOnProduct} addToOrder={this.addToOrder} removeFromOrder={this.removeFromOrder} counter={this.state.counter}/>
                        </div>
                      </div>

                    </div>

                  ) : (<div className="container-fluid text-center mb-3"><h4>No Products!</h4></div>) : <div className="container-fluid mb-4"><Preloader /></div>}

                  {!this.props.UserProductsReducer.loading && !this.props.GetUserDataReducer.user_data_loading ? this.props.GetUserDataReducer.user_data.products.total_prods ? this.props.match.params.platform === 'products' ? <div className="container-fluid text-center mb-3"><h4>Choose platform!</h4></div> : '' : '' : ''}
                    </div>
                  </div>
                </div>

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

export default withRouter(connect(mapStateToProps, AC)(ProfileProductsIndex))
