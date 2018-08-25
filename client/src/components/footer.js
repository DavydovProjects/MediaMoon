import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../redux/actions/index'

class Footer extends Component{
  render(){
    return(
      <div className="footer container animated fadeIn p-0">
        <hr/>

          <div className="row">

            <div className="col-md-3 text-center p-0">
              <small><a href="mailto:help@mediamoon.net">help@mediamoon.net</a></small>
            </div>

            <div className="col-md-3 text-center p-0">
              <small><a href="mailto:team@mediamoon.net">team@mediamoon.net</a></small>
            </div>

            <div className="col-md-3 text-center p-0">
              <small><a href="/rules">MediaMoon Rules</a></small>
            </div>

            <div className="col-md-3 text-center p-0">
              <small>© 2018 MediaMoon</small>
            </div>

          </div>

      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Footer));
