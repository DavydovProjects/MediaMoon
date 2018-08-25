import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Preloader from '../preloader'

class PasswordResetIndex extends Component{

  state = {
    email: ''
  }

  componentDidMount(){
    document.title = 'Password reset'
  }

  onSubmit = () => {
    if (this.state.email){
      this.props.SendPasswordResetCode({email: this.state.email})
    }
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }

  render(){
    if (localStorage.getItem('token')){
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
                    <h3 className="text-center">Forgot Password?</h3>
                    <p>You can reset your password here.</p>

                    <div className="input-group mb-3">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                        </div>
                        <input id="email" name="email" placeholder="Email address" className="form-control"  type="email" onChange={this.handleEmail}/>
                      </div>
                    </div>

                    {!loading ? data ? !data.error ? (
                      <div className="card border-success text-success pt-2 pb-2">
                        Email has been sent!
                      </div>
                    ) :<button className="btn btn-outline-danger container-fluid" onClick={this.onSubmit}>{data.error}</button> :
                     <button className="btn btn-outline-primary container-fluid" onClick={this.onSubmit}>Reset password</button> :
                     (
                       <div className="card border-secondary text-secondary pt-2 pb-2">
                         Loading...
                       </div>
                     )}
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

export default withRouter(connect(mapStateToProps, AC)(PasswordResetIndex))
