import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Likes from './likes'
import Preloader from '../preloader'

class LikesIndex extends Component{
  componentDidMount(){
    document.title = 'Likes'
    this.props.LoadLikes({token: localStorage.getItem('token')})
  }

  UnlikeUser = (username) => {
    this.props.Unlike({"to_user": username, "token": localStorage.getItem('token')})
    this.props.LoadLikes({token: localStorage.getItem('token')})
  }

  render(){
    if (!localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      return(
        <div classNmae="likes">
          <div className="container p-0">
            <div className="c-box mb-5 mt-5">

              <h3 className="text-center mb-3">Your likes</h3>

              <div className="row p-2">
                  <div className="col-lg-8 offset-lg-2 card mb-3">
                    {this.props.LikeReducer.data !== 'preloader' ? (
                      <div className="load">
                        {this.props.LikeReducer.data.length !== 0 ? (
                          <div className="table-responsive">
                            <table className="table mt-3">
                              <thead>
                                <tr>
                                  <th scope="col">Avatar</th>
                                  <th scope="col">Nickname</th>
                                  <th scope="col">Rating</th>
                                  <th scope="col">Verified</th>
                                  <th scope="col">Unlike</th>
                                </tr>
                              </thead>
                              <Likes likes={this.props.LikeReducer.data} UnlikeUser={(username) => this.UnlikeUser(username)}/>
                            </table>
                          </div>
                        ) : (<div className="container-fluid text-center p-3"><h4>You did not like anyone!</h4></div>)}
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

export default withRouter(connect(mapStateToProps, AC)(LikesIndex))
