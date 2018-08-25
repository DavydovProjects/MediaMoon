import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Preloader from '../preloader'

import 'url-search-params-polyfill'

class PasswordResetConfirm extends Component{

  constructor(props) {
  super(props)
  let params = new URLSearchParams(this.props.location.search)

    this.state = {
      u: params.get('u') ? params.get('u') : "-1337",
      code: params.get('code') ? params.get('code') : "-1337",
      passowrd: '',
      cpassword: '',

      error: ''
    }
  }

  componentDidMount(){
    document.title = 'Password reset'
  }

  handlePasswords = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    if (this.state.password && this.state.cpassword){
      if (this.state.password === this.state.cpassword){
        this.props.RecoverPassword({
          u: this.state.u,
          password_code: this.state.code,
          new_password: this.state.password
        })
        this.setState({error: ''})
      }
      else{
        this.setState({error: "Passwords don't match!"})
      }
    }
    else{
      this.setState({error: 'Fill all the gaps!'})
    }
  }

  render(){
    if (localStorage.getItem('token') || this.state.u === "-1337" || this.state.code === "-1337"){
      window.location.href = '/'
    }
    else{
      const { data, loading, error } = this.props.PasswordResetReducer
      return(
        <div className="container text-center animated fadeIn mt-5 mb-3">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">

              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3"><i className="fa fa-lock fa-4x"></i></h5>
                  <h3 className="text-center mb-3">Create a new password</h3>

                  {this.state.error ? <p className="text-danger">{this.state.error}</p> : loading ? '' : data.error ? <p className="text-danger">{data.error}</p> : <p className="text-success">{data}</p>}

                  <div className="form-group text-left">
                    <label forHtml="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handlePasswords}/>
                  </div>

                  <div className="form-group text-left">
                    <label forHtml="cpassword">Password confirmation</label>
                    <input type="password" className="form-control" id="password-confirmation" placeholder="Confirm password" value={this.state.cpassword} name="cpassword" onChange={this.handlePasswords}/>
                  </div>

                  <button className="btn btn-outline-primary container-fluid" onClick={this.handleSubmit}>Change password</button>
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

export default withRouter(connect(mapStateToProps, AC)(PasswordResetConfirm))
