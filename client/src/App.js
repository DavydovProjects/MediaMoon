import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from './redux/actions/index'

import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'

import MarketIndex from './components/search/index'

import ProfileIndex from './components/profile/index'
import FeedbackIndex from './components/profile/feedback_page/index'
import ProfileProductsIndex from './components/profile/products_page/index'

import CreateProduct from './components/manage_product/create_product/index'
import EditProduct from './components/manage_product/edit_product/index'

import LikesIndex from './components/likes/index'
import BansIndex from './components/bans/index'

import OrdersListIndex from './components/orders_list/index'
import OrderIndex from './components/order/index'

import Settings from './components/settings/index'

import PasswordReset from './components/password_reset/index'
import PasswordChangeConfirm from './components/password_reset/password_confirm'

import Rules from './components/rules'

import Login from './components/login'
import Register from './components/reg'

import './css/main.css'
import './css/footer.css'
import './css/header.css'
import './css/home.css'
import './css/login.css'
import './css/marketplace.css'
import './css/profile.css'
import './css/feedback.css'
import './css/products.css'
import './css/orders.css'

import './css/text-editor.css'

import './css/likes.css'
import './css/bans.css'

import './css/preloader.css'

class App extends Component {
  componentDidMount(){
    if (localStorage.getItem('token')){
      this.props.CheckAuth({"token": localStorage.getItem('token')})
      this.props.GetYourData({"token": localStorage.getItem('token')})
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
          <Switch>
            <Route exact path="/" component={Home}/>

            <Route path="/rules" component={Rules}/>

            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>

            <Route path="/settings" component={Settings}/>

            <Route path="/search" component={MarketIndex}/>

            <Route exact path="/profile/:username" component={ProfileIndex}/>
            <Route path="/profile/:username/feedback" component={FeedbackIndex}/>
            <Route path="/profile/:username/:platform" component={ProfileProductsIndex}/>

            <Route path="/create_product" component={CreateProduct} />
            <Route path="/edit_product/:platform/:id" component={EditProduct} />

            <Route path="/likes" component={LikesIndex}/>
            <Route path="/bans" component={BansIndex}/>

            <Route path="/orders" component={OrdersListIndex}/>
            <Route path="/order/:order_id" component={OrderIndex}/>

            <Route path="/password_reset" component={PasswordReset} />
            <Route path="/password_reset_confirm" component={PasswordChangeConfirm} />

          </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(App));
