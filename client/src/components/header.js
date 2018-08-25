import React, { Component } from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../redux/actions/index'

import logo from '../images/logo3.svg'
import order_preview from '../images/Order-preview.jpg'

class Header extends Component{
  state = {
    menu: 'menu-btn'
  }
  menuHandle = () => {
    if (this.state.menu === 'menu-btn'){
      this.setState({menu: 'menu-btn menu-btn_active'})
    }
    else{
      this.setState({menu: 'menu-btn'})
    }
  }

  handleLogOut = () => {
    this.props.LogOut()
  }
  render(){
    return(
      <Switch>
          <Route path="/" render={() => (
            <div className="header row">
              <nav className="navbar navbar-expand-lg navbar-light container" >
                <a href="/" className="navbar-brand">
                  <img className="logo" src={logo} alt="logo"/>
                   MediaMoon
                </a>
                <div className="section">
                  <a onClick={this.menuHandle} className={"navbar-toggler " + this.state.menu} data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span></span>
                  </a>
                </div>
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/search" className="nav-link">Search</a>
                    </li>
                  </ul>
                </div>

                {localStorage.getItem('token') ? (
                  <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
                    <ul className="navbar-nav ml-auto">

                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <b>{localStorage.getItem('username') ? localStorage.getItem('username') : this.props.GetUserDataReducer.your_data.username}</b>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href={localStorage.getItem('username') ? "/profile/" + localStorage.getItem('username') : "/profile/" + this.props.GetUserDataReducer.your_data.username}>Your Profile</a>
                          <a className="dropdown-item" href="/likes">Your Likes</a>
                          <a className="dropdown-item" href="/bans">Your Ban list</a>
                          <a className="dropdown-item" href="/orders">Your Orders</a>
                          <a className="dropdown-item" href={localStorage.getItem('username') ? "/profile/" + localStorage.getItem('username') + "/products" : "/profile/" + this.props.GetUserDataReducer.your_data.username + "/products"}>Your Products</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="/settings">Settings</a>
                          <a className="dropdown-item" onClick={this.handleLogOut}>Log out </a>
                        </div>
                      </li>

                    </ul>
                  </div>
                ) : (
                  <div className="navbar-collapse collapse w-100 order-2 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <b><b><a className="nav-link sign_in" href="/login">Log in</a></b></b>
                        </li>
                        <li className="nav-item">
                            <b><b><a className="nav-link sign_up" href="/register">Register</a></b></b>
                        </li>
                    </ul>
                  </div>
                )}

              </nav>
              <Route exact path="/" render={() => (
                <div className="col-lg-6 offset-lg-3 container header-info animated fadeIn">
                  <div className="container-fluid">
                    <div className="welcome text-center">
                      <h1 className="title mt-3">The best place to sell and buy advertising on the internet!</h1>
                      {localStorage.getItem('token') ? <a href="/search" className="btn btn-outline-light sign_up_button_home">Expore MediaMoon</a> : <a href="/register" className="btn btn-outline-light sign_up_button_home">Sign up for MediaMoon</a>}
                    </div>
                  </div>
                </div>
              )} />

              <Route exact path="/" render={() => (
                <div className="col-lg-6 offset-lg-3 container order-preview-box animated fadeIn">
                  <div className="container-fluid">
                    <img src={order_preview} className="order-preview" />
                  </div>
                </div>
              )} />
            </div>

          )} />
        </Switch>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Header));
