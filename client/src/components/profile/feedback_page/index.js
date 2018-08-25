import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../../redux/actions/index'

import Preloader from '../../preloader'

import Pagination from '../../pagination'
import AddFeedbackForm from './add_feedback_form'
import FeedbackReport from '../feedback_report'

import 'url-search-params-polyfill'

class FeedbackIndex extends Component{
  constructor(props) {
    super(props)

    let params = new URLSearchParams(this.props.location.search)
    this.state = {
      username: this.props.match.params.username,
      cur_page: parseInt(params.get('page')) ? parseInt(params.get('page')) : 1,
      feedback: '',
      report_feedback: 0
    }
  }
  componentDidMount(){
    document.title = this.props.match.params.username + "'s feedback"
    this.props.GetUserData(this.props.match.params.username)
    this.props.GetUserFeedback(this.state)
  }

  GoPrevPage = () => {
    this.setState({cur_page: this.state.cur_page--})
    let new_url = ''
    new_url = new_url + '?page=' + this.state.cur_page--
    window.location.href = '/profile/' + this.props.match.params.username + '/feedback' + new_url
  }

  GoNextPage = () => {
    this.setState({cur_page: this.state.cur_page++})
    let new_url = ''
    new_url = new_url + '?page=' + this.state.cur_page++
    window.location.href = '/profile/' + this.props.match.params.username + '/feedback' + new_url
  }

  handlePagination = (e) => {
    let new_url = ''
    new_url = new_url + '?page=' + e.target.innerHTML
    window.location.href = '/profile/' + this.props.match.params.username + '/feedback' + new_url
  }

  goToProfile = () =>{
    window.location.href = '/profile/' + this.props.match.params.username
  }

  goToFedbackProfile = (username) => {
    window.location.href = "/profile/" + username
  }

  ReportFeedback = (id) => {
    this.props.ClearReportFeedback()
    this.setState({report_feedback: id})
  }

  render(){
    const { user_data } = this.props.GetUserDataReducer
    const { user_feedback } = this.props.GetUserDataReducer
    return(
      <div className="feedback animated fadeIn mt-5 mb-5">
        <div className="container p-0">
          <div className="c-box">

              <div className="profile-title mb-3">
                <div className="row">
                  {user_data && user_feedback && user_data.avatar ? (
                    <div className="container-fluid">
                      <div className="row feedback-profile-title-body">
                        <div className="container-fluid text-center mt-3 profile-user-data">
                            <img className="feedback-profile-avatar" src={"https://api.mediamoon.net" + user_data.avatar} alt="avatar"/>
                            <h4 className="mt-3 mb-3"><a href={'/profile/' + this.props.match.params.username}>{user_data.nickname}</a></h4>
                        </div>
                        <div className="col-2 offset-2 text-center mt-4 mb-3 text-success feedback-info">
                          <h3><i className="fas fa-smile profile-icon mb-1"/></h3>
                          <h4 className="profile-username mt-1">{user_feedback.good_feedbacks}</h4>
                        </div>
                        <div className="col-4 text-center mt-4 mb-3 feedback-info">
                          <h3>Rating</h3>
                          <h4 className="profile-username mt-1">{user_data.rating}</h4>
                        </div>
                        <div className="col-2 text-center mt-4 mb-3 text-danger feedback-info">
                          <h3><i className="fas fa-frown profile-icon mb-1"/></h3>
                          <h4 className="profile-username mt-1">{user_feedback.bad_feedbacks}</h4>
                        </div>
                        <div className="container-fluid row feedback-cards">
                          {!this.props.GetUserDataReducer.error ? user_feedback.feedback ? user_feedback.feedback.map((fb, i) => {
                            return(
                              <div className={fb.mark ? "col-lg-8 offset-lg-2 card border-success mb-3 animated fadeIn" : "col-lg-8 offset-lg-2 card border-danger mb-3 animated fadeIn"} key={i}>
                                <div className={fb.mark ? "card-body text-success pb-3 pt-3 pl-2 pr-2" : "card-body text-danger pb-3 pt-3 pl-2 pr-2"}>
                                  <h5 className="card-title text-left profile-feedback-user" onClick={() => this.goToFedbackProfile(fb.from_user_username)}><img className="from_user_avatar mr-3" src={"https://api.mediamoon.net" + fb.from_user_avatar} alt="avatar"/> {fb.from_user}</h5>
                                  <p className="card-text text-left feedback-text p-2 mb-0">{fb.text}</p>
                                  <h6 className="text-right text-secondary"><i className="fas fa-flag" id="report-tooltip" data-toggle="modal" data-target="#reportModal" onClick={() => this.ReportFeedback(fb.id)}></i></h6>

                                </div>
                              </div>
                            )
                          }) : <Preloader /> : <Preloader />}
                          {localStorage.getItem('token') ? (<AddFeedbackForm/>) : (<div className="container-fluid text-center"><h4>To send feedback you need to log in.</h4></div>)}
                        </div>
                        <div className="text-center">
                        </div>
                      </div>
                      <Pagination pages_count={user_feedback.pages_count} cur_page={this.state.cur_page} GoPrevPage={this.GoPrevPage} GoNextPage={this.GoNextPage} handlePagination={this.handlePagination} />
                    </div>
                  ) : <Preloader/>}
                </div>
              </div>

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

export default withRouter(connect(mapStateToProps, AC)(FeedbackIndex))
