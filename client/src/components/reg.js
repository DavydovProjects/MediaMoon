import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../redux/actions/index'
import { Redirect } from 'react-router-dom'

class Register extends Component{
  state ={
    email: '',
    login: '',
    password: '',
    cpassword: '',
    logInfo: ''
  }

  componentDidMount(){
    document.title = "Join MediaMoon"
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }
  handleLogin = (e) => {
    this.setState({login: e.target.value})
  }
  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }
  handleCPassword = (e) => {
    this.setState({cpassword: e.target.value})
  }
  handleSubmit = () => {
    if (!this.state.email || !this.state.login || !this.state.password || !this.state.cpassword){
      this.props.ClearAuth()
      this.setState({logInfo: 'Empty fields!'})
    }
    else{
      this.props.Register(this.state)
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
              <h4 className="login-title">Join MediaMoon</h4>
              <div className="card">
                <div className="card-body">
                  {this.props.AuthReducer.error === '' ? this.props.AuthReducer.data !== '' ? !this.props.AuthReducer.data.error ? '' : (<h6 className="text-danger">{this.props.AuthReducer.data.error}</h6>) : '' : (<h6 className="text-danger">{this.props.AuthReducer.error}</h6>)}
                  {!this.props.AuthReducer.data ? this.state.logInfo ? (<h6 className="text-danger">{this.state.logInfo}</h6>) : '' : ''}
                  <form>

                    <div className="form-group text-left">
                      <label forHtml="Email">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail}/>
                    </div>

                    <div className="form-group text-left">
                      <label forHtml="Login">Login</label>
                      <input type="login" className="form-control" id="login" placeholder="Login" value={this.state.login} onChange={this.handleLogin}/>
                    </div>

                    <div className="form-group text-left">
                      <label forHtml="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                    </div>

                    <div className="form-group text-left">
                      <label forHtml="cpassword">Password confirmation</label>
                      <input type="password" className="form-control" id="password-confirmation" placeholder="Confirm password" value={this.state.cpassword} onChange={this.handleCPassword}/>
                    </div>

                  </form>
                  <button className="btn btn-primary container-fluid" onClick={this.handleSubmit}>Register</button>
                </div>
              </div>

              <div className="card ask_login">
                <p>Already have an account? <Link to="/login">Sign in.</Link></p>
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

export default withRouter(connect(mapStateToProps, AC)(Register));
