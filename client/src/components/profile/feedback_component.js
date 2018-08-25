import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import FeedbackReport from './feedback_report'

class Feedback extends Component{
  state = {
    fb_text: '',
    mark: '',

    symbols_count: 0,

    send_error: '',

    report_feedback: 0
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

  goToProfile = (username) => {
    window.location.href = "/profile/" + username
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

  ReportFeedback = (id) => {
    this.props.ClearReportFeedback()
    this.setState({report_feedback: id})
  }

  render(){
    if (this.props.FeedbackReducer.data[0] === 'Successfully added a new feedback!'){
      window.location.href = '/profile/' + this.props.match.params.username
    }
    return(
      <div className="profile-feedback">
          <div className>
              <div className="row">
                {this.props.feedback ? this.props.feedback.slice(0, 3).map((fb, i) => {
                  return(
                    <div className={fb.mark ? "col-lg-12 card border-success mb-3 animated fadeIn" : "col-lg-12 card border-danger mb-3 animated fadeIn"}>
                      <div className={fb.mark ? "card-body text-success pb-3 pt-3 pl-2 pr-2" : "card-body text-danger pb-3 pt-3 pl-2 pr-2"}>
                        <h5 className="card-title text-left profile-feedback-user" onClick={() => this.goToProfile(fb.from_user_username)}><img className="from_user_avatar mr-3" src={"https://api.mediamoon.net" + fb.from_user_avatar} alt="avatar"/> {fb.from_user}</h5>
                        <p className="card-text text-left feedback-text p-2 mb-0">{fb.text}</p>
                      </div>
                      <h6 className="text-right text-secondary"><i className="fas fa-flag" id="report-tooltip" data-toggle="modal" data-target="#reportModal" onClick={() => this.ReportFeedback(fb.id)}></i></h6>
                    </div>
                  )
                }) : (<div className="container-fluid text-center"><h4>Loading...</h4></div>)}

                <div className={localStorage.getItem('token') && this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ? "add-feedback-form col-lg-12 p-0 text-center mb-3 " : "add-feedback-form col-lg-12 p-0 text-center"}>
                    {localStorage.getItem('token') ? this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ? (
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
                  ) : '' : (<div className="container-fluid text-center"><h4>To send feedback you need to log in.</h4></div>)}

                </div>

              {this.props.feedback.length >= 4 ? (<a className="btn btn-outline-secondary btn-md col-lg-12 " href={"/profile/" + this.props.GetUserDataReducer.user_data.username + "/feedback"}>View all feedbackes</a>) : '' }
            </div>
          </div>
        <FeedbackReport report_feedback={this.state.report_feedback}/>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Feedback))
