import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

class OrderMsgs extends Component{
  render(){
      return(
        <div className="mt-3">
          {this.props.order_comments.map((comment, i) => {
            return(
              <div className="container-fluid p-0 mb-3 animated fadeIn" key={i}>
                <div className="pb-2 pt-2 pl-1 pr-1 order-comment">
                  {comment.this_user_avatar ? (
                    <h6 className="card-title text-left mb-0">
                    <img className="order-chat-avatar mr-2" src={"https://api.mediamoon.net" + comment.this_user_avatar} alt="avatar"/>
                    {comment.this_user_nickname}
                    <span className="order-comment-date float-right">{comment.date}</span>
                    </h6>
                  ) : ''}
                  <p className="card-text text-left order-comment-text p-2 mb-0 mt-2 order-comment-text">{comment.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(OrderMsgs))
