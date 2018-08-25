import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

class FeedbackReport extends Component{
  state = {
    report_reason: '',
    symbols_count: 0,

    error: ''
  }

  handleReasonInput = (e) => {
    this.setState({report_reason: e.target.value, symbols_count: e.target.value.length})
  }

  handleSubmit = () => {
    if (this.state.report_reason.length < 5){
      this.setState({error: 'Min length for reason text is 5!'})
    }
    else if (this.state.report_reason.length > 150){
      this.setState({error: 'Max length for reason text is 150!'})
    }
    else{
      this.setState({error: ''})
      this.props.ReportFeedback({
        feedback_id: this.props.report_feedback,
        reason: this.state.report_reason,
        token: localStorage.getItem('token')
      })
      if (!this.props.FeedbackReducer.report_data.error){
        this.setState({report_reason: ''})
      }
    }
  }

  render(){
    return(
      <div className="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title text-danger" id="exampleModalLabel">Report feedback</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body feedback-report-body">
              {!this.state.error ?
                 this.props.FeedbackReducer.report_data ?
                  this.props.FeedbackReducer.report_data !== 'preloader' ? !this.props.FeedbackReducer.report_data.error ?
                   (<p className="text-success text-center">{this.props.FeedbackReducer.report_data}</p>) :
                    (<p className="text-danger text-center">{this.props.FeedbackReducer.report_data.error}</p>) :
                     '' :
                      '' :
                       (<p className="text-danger text-center">{this.state.error}</p>) }
              <div className="form-group text-left">
                <input type="text" className="form-control" placeholder="Reason" value={this.state.report_reason} onChange={this.handleReasonInput}/>
              </div>
            </div>
            <div className="container-fluid text-center mb-3">{this.state.symbols_count}/150</div>
            <div className="row">
              <button type="button" className="btn btn-light col-lg-6 offset-lg-3 mb-2" onClick={this.handleSubmit}>Submit</button>
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

export default withRouter(connect(mapStateToProps, AC)(FeedbackReport))
