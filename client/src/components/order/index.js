import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import _ from 'lodash'

import Pagination from '../pagination'
import Preloader from '../preloader'

import io from 'socket.io-client'

import OrderProducts from './order_products'
import OrderMsgs from './order_comments'
import SendMsgForm from './send_comment_form'

import 'url-search-params-polyfill'

class OrderIndex extends Component{
  constructor(props) {
  super(props)

    const socket = io.connect('https://socket.mediamoon.net', {
      query: {
        order: this.props.match.params.order_id
      }
    })

    this.state = {
      cur_page: 1,
      socket: socket,
      scrolled: false
    }

    socket.on('new_message', () => {
      // console.log('New message!')
      setTimeout(() => {
        this.props.LoadOrderComments({"order_id": this.props.match.params.order_id, "token": localStorage.getItem('token'), 'cur_page': this.state.cur_page })
      },500)
    })

  }

  componentWillMount(){
    this.props.LoadOneOrder({"order_id": this.props.match.params.order_id, "token": localStorage.getItem('token')})
    this.props.LoadOrderComments({"order_id": this.props.match.params.order_id, "token": localStorage.getItem('token'), 'cur_page': 1})
  }

  componentDidMount(){
    document.title = 'Order'
  }

  handleScroll = () => {
    if (this.scroller){
      if (this.scroller.scrollTop === 0){

        if (this.props.OrderReducer.order_comments_pages_count !== this.state.cur_page){
          this.setState({cur_page: this.state.cur_page + 1})
        }

        if (!this.props.OrderReducer.order_comments_loading) {
          this.props.LoadOrderComments({"order_id": this.props.match.params.order_id, "token": localStorage.getItem('token'), 'cur_page': this.state.cur_page + 1 })
        }
        setTimeout(() => {
          if (this.props.OrderReducer.order_comments_pages_count !== this.state.cur_page){
            this.scroller.scrollTop = 200
          }
        },500)

      }
    }
  }

  updateComments = () => {
    this.props.LoadOrderComments({"order_id": this.props.match.params.order_id, "token": localStorage.getItem('token'), 'cur_page': this.state.cur_page })
  }

  setScrollToBottom = () => {
    this.scroller.scrollTop = this.scroller.scrollHeight
  }

  changeStatus = (status) => {
    this.props.ChangeOrderStatus({order_id: this.props.match.params.order_id, token: localStorage.getItem('token')}, status)
    setTimeout(() => {
      window.location.href = '/order/' + this.props.match.params.order_id
    },1000)
  }

  addOneCommentToTheBottom = (text) => {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear()
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = yyyy + '-' + mm + '-' + dd

    if (this.props.OrderReducer.order.user_status === 'To') var user_avatar_url = this.props.OrderReducer.order.users.to_user_avatar
    if (this.props.OrderReducer.order.user_status === 'From') var user_avatar_url = this.props.OrderReducer.order.users.from_user_avatar

    var new_comment = {
                    'id': -1,
                    'this_user_nickname': this.props.GetUserDataReducer.your_data.nickname,
                    'this_user_avatar': user_avatar_url,
                    'text': text,
                    'date': today
                  }
    this.props.AddOrderComment(new_comment)
  }

  render(){
    if (!localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      let params = new URLSearchParams(this.props.location.search)
      return(
        <div className="container p-0">
          <div className="c-box mb-5 mt-5 pb-3">
            {!this.props.OrderReducer.order_loading ? !this.props.OrderReducer.order.error ? (
              <div className="row">

                <div className="col-lg-6 p-0 mb-3" onLoad={() => this.scroller.scrollTop = 10000000}>
                  <div className="container-fluid p-0 text-center ml-0 mr-0 mt-3 profile-user-data">
                    <div className="row">
                      <div className="col-6">
                        <img className="order-profile-avatar" src={"https://api.mediamoon.net" + this.props.OrderReducer.order.users.from_user_avatar} alt="avatar"/>
                      </div>
                      <div className="col-6">
                        <img className="order-profile-avatar" src={"https://api.mediamoon.net" + this.props.OrderReducer.order.users.to_user_avatar} alt="avatar"/>
                      </div>
                      <div className="col-4 offset-1 mt-3 p-0"><h5><a href={'/profile/' + this.props.OrderReducer.order.users.from_user_username}>{this.props.OrderReducer.order.users.from_user_nickname}</a></h5></div>
                      <div className="col-2 mt-3 p-0"><i className="fas fa-arrow-right" /></div>
                      <div className="col-4 mt-3 p-0"><h5><a href={'/profile/' + this.props.OrderReducer.order.users.to_user_username}>{this.props.OrderReducer.order.users.to_user_nickname}</a></h5></div>
                    </div>
                    <h4 className="card-title">
                      {this.props.OrderReducer.order.order_status === 0 ? <span className="badge badge-primary align-middle">For consideration</span> : this.props.OrderReducer.order.order_status === 1 ? <span className="badge badge-warning align-middle">In process</span> : this.props.OrderReducer.order.order_status === 2 ? <span className="badge badge-success align-middle">Done</span> : this.props.OrderReducer.order.order_status === 3 ? <span className="badge badge-danger align-middle">Canceled</span> : ''}
                    </h4>
                    <h4 className="mt-3 mb-3">
                      {
                        this.props.OrderReducer.order.order_status === 0  && this.props.OrderReducer.order.user_status === 'To' ?(
                          <div>
                            <button type="button" className="btn btn-sm mr-3 btn-outline-warning" onClick={() => this.changeStatus('accept')}>Accept</button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => this.changeStatus('cancel')}>Cancel</button>
                          </div>
                        )
                        : this.props.OrderReducer.order.order_status === 3  || this.props.OrderReducer.order.order_status === 2 ? '' : this.props.OrderReducer.order.order_status === 1 ?
                        (
                          <div>
                            {this.props.OrderReducer.order.user_status === 'To' ? <button type="button" className="btn btn-sm btn-outline-success mr-2" onClick={() => this.changeStatus('done')}>Done</button> : ''}
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => this.changeStatus('cancel')}>Cancel</button>
                          </div>
                        )
                        : ''
                      }
                    </h4>
                    <OrderProducts order={this.props.OrderReducer.order} />
                  </div>
                </div>
                  <div className="col-lg-6 order-chat-container">
                    <div className="container-fluid p-0 ml-0 mr-0 card">
                      <div className="pl-3 pr-3 order-chat" ref={(scroller) => {this.scroller = scroller}} onScroll={this.handleScroll}
                      onLoad={
                        () => {
                          if (!this.state.scrolled){
                            this.scroller.scrollTop = 10000000
                            this.setState({scrolled: true})
                          }
                        }
                      }
                      >

                      <OrderMsgs order_comments={this.props.OrderReducer.order_comments} />

                      </div>
                      <div className="pt-3 ">
                        {this.props.OrderReducer.send_comment_data.error ? <span className="text-danger">{this.props.OrderReducer.send_comment_data.error}</span> : ''}
                        {this.props.OrderReducer.order.order_status === 1 ? (
                          <SendMsgForm setScrollToBottom={this.setScrollToBottom} addOneCommentToTheBottom={this.addOneCommentToTheBottom}/>
                        ) : <div className="container-fluid text-center"><h5>You can not send messages when order status is not "In process"!</h5></div>}
                      </div>
                    </div>
                  </div>

              </div>
            ) :  <div className="container-fluid text-center"><h3>{this.props.OrderReducer.order.error}</h3></div> : <Preloader />}

          </div>
        </div>
      )
    }
  }
}


const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(OrderIndex))
