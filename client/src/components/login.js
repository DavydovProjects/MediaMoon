import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../redux/actions/index'
import { Redirect } from 'react-router-dom'

class Login extends Component{
  state ={
      login: '',
      password: '',
      logInfo: ''
  }

  componentDidMount(){
    document.title = "Log in to MediaMoon"
  }

  handleLogin = (e) => {
    this.setState({login: e.target.value})
  }
  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }
  handleSubmit = () => {
    if (!this.state.login || !this.state.password){
      this.props.ClearAuth()
      this.setState({logInfo: 'Empty fields!'})
    }
    else{
      this.props.Login(this.state)
      localStorage.setItem('username', this.state.login)
    }
  }

  render(){
    if (localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      return(
        <div className="Login container text-center animated fadeIn">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <h4 className="login-title">Log in to MediaMoon</h4>
              <div className="card">
                <div className="card-body pb-2">
                  {this.props.AuthReducer.error === '' ? this.props.AuthReducer.data !== '' ? !this.props.AuthReducer.data.error ? '' : (<h6 className="text-danger">{this.props.AuthReducer.data.error}</h6>) : '' : (<h6 className="text-danger">{this.props.AuthReducer.error}</h6>)}
                  {!this.props.AuthReducer.data ? this.state.logInfo ? (<h6 className="text-danger">{this.state.logInfo}</h6>) : '' : ''}
                  <form>

                    <div className="form-group text-left">
                      <label htmlFor="login">Login</label>
                      <input type="login" className="form-control" id="login" placeholder="Login" value={this.state.login} onChange={this.handleLogin}/>
                    </div>

                    <div className="form-group text-left">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                    </div>

                  </form>
                  <button className="btn btn-primary container-fluid" onClick={this.handleSubmit}>Login</button>
                  <a className="btn btn-sm btn-link mt-2" href="/password_reset">Forgot your password?</a>
                </div>
              </div>
              <div className="card ask_login">
                <p>New to MediaMoon? <Link to="/register">Create an account.</Link></p>
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

export default withRouter(connect(mapStateToProps, AC)(Login));
