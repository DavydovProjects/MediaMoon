import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import io from 'socket.io-client'

class SendMsgForm extends Component{

  constructor(props){
    super(props)

    this.state = {
      text: ''
    }

    const socket = io.connect('https://socket.mediamoon.net', {
      query: {
        order: this.props.match.params.order_id
      }
    })

    this.EmitMessage = () => {
      socket.emit('new_message', this.props.match.params.order_id)
    }

  }

  onKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.SubmitComment()
    }
  }

  handleText = (e) => [
    this.setState({text: e.target.value})
  ]

  SubmitComment = () => {
    if (this.state.text){
      this.props.SendOrderComment({'token': localStorage.getItem('token'), 'order_id': this.props.match.params.order_id, 'text': this.state.text})
      this.setState({error: '', text: ''})
      this.props.addOneCommentToTheBottom(this.state.text)
      this.EmitMessage()
      setTimeout(() => this.props.setScrollToBottom(),100)
    }
  }

  render(){
    return(
      <div className="container-fluid p-0 animated fadeIn">
        <div className="input-group order-chat-form">
          <input type="text" className="form-control" placeholder="Your message" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={this.handleText} value={this.state.text} onKeyDown={this.onKeyDown}/>
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button" onClick={this.SubmitComment}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(SendMsgForm))
