import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Preloader from '../preloader'
import Bans from './bans'

class BansList extends Component{

  componentDidMount(){
    document.title = 'Bans'
    this.props.LoadBansList({token: localStorage.getItem('token')})
  }

  UnBanUser = (username) => {
    this.props.Unban({"username": username, "token": localStorage.getItem('token')})
    this.props.LoadBansList({token: localStorage.getItem('token')})
  }

  render(){
    if (!localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      return(
        <div classNmae="bans">
          <div className="container p-0">
            <div className="c-box mb-5 mt-5">

              <h3 className="text-center mb-3">Your bans</h3>

              <div className="row p-2">
                  <div className="col-lg-8 offset-lg-2 card mb-3">
                    {!this.props.BanReducer.list_loading ? (
                      <div className="load">
                        {this.props.BanReducer.list.length !== 0 ? (
                          <div className="table-responsive">
                            <table className="table mt-3">
                              <thead>
                                <tr>
                                  <th scope="col">Avatar</th>
                                  <th scope="col">Nickname</th>
                                  <th scope="col">Rating</th>
                                  <th scope="col">Verified</th>
                                  <th scope="col">Ban date</th>
                                  <th scope="col">Unban</th>
                                </tr>
                              </thead>
                              <Bans bans={this.props.BanReducer.list} UnBanUser={(username) => this.UnBanUser(username)}/>
                            </table>
                          </div>
                        ) : (<div className="container-fluid text-center p-3"><h4>You did not ban anyone!</h4></div>)}
                      </div>
                    ) : <Preloader/>}
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

export default withRouter(connect(mapStateToProps, AC)(BansList))
