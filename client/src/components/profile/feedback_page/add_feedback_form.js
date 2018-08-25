import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../../redux/actions/index'

class AddFeedbackForm extends Component{
  state = {
    fb_text: '',
    mark: '',

    symbols_count: 0,

    send_error: ''
  }

  handleInput = (e) => {
    this.setState({fb_text: e.target.value, symbols_count: e.target.value.length})
  }

  chooseGood = () => {
    this.setState({mark: true})
  }

  chooseBad = () => {
    this.setState({mark: false})
  }

  SendFeedback = () => {
    if (!this.state.fb_text){
      this.setState({send_error: 'You did not type anything!'})
    }
    else if (this.state.fb_text.length > 150) {
      this.setState({send_error: 'Feedback text max length is 150 symbols!'})
    }
    else if (this.state.mark === ''){
      this.setState({send_error: 'Choose a mark!'})
    }
    else{
      this.setState({send_error: ''})
      this.props.SendFeedback({to_user: this.props.match.params.username, text: this.state.fb_text, mark: this.state.mark, token: localStorage.getItem('token')})
    }
  }

  render(){
    return(
      <div className="add-feedback-form col-lg-8 offset-lg-2 p-0 mb-3 text-center">
          <div className="card p-3">
            {this.state.send_error ? (<h5 className="card-title text-danger">{this.state.send_error}</h5>) : this.props.FeedbackReducer.data.error ? (<h5 className="card-title text-danger">{this.props.FeedbackReducer.data.error}</h5>) : ''}
            {!this.props.FeedbackReducer.data.error ? this.props.FeedbackReducer.data !== 'preloader' ? (<h5 className="card-title text-success">{this.props.FeedbackReducer.data}</h5>) : '' : '' }
            <div className="form-group text-left">
              <textarea type="text" className="form-control" placeholder="Feedback" value={this.state.fb_text} onChange={this.handleInput}/>
            </div>
            <div className="container-fluid text-center mb-3">{this.state.symbols_count}/150</div>
            <div className="row">
              <div className={this.state.mark !== '' ? this.state.mark === true ? "col-4 text-center text-success" : "col-4 text-center" : "col-4 text-center"}>
                <h3><i className="fas fa-smile feedback-profile-icon mb-1" onClick={this.chooseGood}/></h3>
              </div>

              <div className="col-4 p-0">
                <button className="btn btn-outline-success container-fluid" onClick={this.SendFeedback}>Submit</button>
              </div>

              <div className={this.state.mark !== '' ? this.state.mark === false ? "col-4 text-center text-danger" : "col-4 text-center" : "col-4 text-center"}>
                <h3><i className="fas fa-frown feedback-profile-icon mb-1" onClick={this.chooseBad}/></h3>
              </div>
            </div>
          </div>

      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(AddFeedbackForm))
