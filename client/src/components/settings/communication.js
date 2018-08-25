import React from 'react'

function Communication(props){
  return(
    <div className="container-fluid card p-0">
      <div className="card-header">
        <h4>Communication {props.communication_loading ? <small><span className="text-secondary float-right">Loading...</span></small> : ''}</h4>
      </div>
      <div className="card-body">

        <div className="row">
          <div className="col-lg-6 text-center">
            <h5 className="card-title">Accept orders</h5>
              <div>
                <button className={props.accept_orders === true ? "btn btn-sm btn-success mr-2" : "btn btn-sm btn-outline-success mr-2"} name="true" onClick={props.handleAcceptOrders}>Yes</button>
                <button className={props.accept_orders === false ? "btn btn-sm btn-danger" : "btn btn-sm btn-outline-danger"} name="false" onClick={props.handleAcceptOrders}>No</button>
              </div>
            <p className="text-center mt-3 mb-1">* Currently: {props.your_data.accept_orders ? 'Yes' : 'No'} *</p>
          </div>

          <div className="col-lg-6 text-center">
            <h5 className="card-title">Show account in "Search"</h5>
              <div>
                <button className={props.show_in_market === true ? "btn btn-sm btn-success mr-2" : "btn btn-sm btn-outline-success mr-2"} name="true" onClick={props.handleShowInMarket}>Yes</button>
                <button className={props.show_in_market === false ? "btn btn-sm btn-danger" : "btn btn-sm btn-outline-danger"} name="false" onClick={props.handleShowInMarket}>No</button>
              </div>
            <p className="text-center mt-3 mb-1">* Currently: {props.your_data.show_in_market ? 'Yes' : 'No'} *</p>
          </div>

          <div className="col-lg-6 offset-lg-3 mt-3 text-center">
            <h5 className="card-title">Show feedback in your profile</h5>
              <div>
                <button className={props.show_feedback === true ? "btn btn-sm btn-success mr-2" : "btn btn-sm btn-outline-success mr-2"} name="true" onClick={props.handleShowFeedback}>Yes</button>
                <button className={props.show_feedback === false ? "btn btn-sm btn-danger" : "btn btn-sm btn-outline-danger"} name="false" onClick={props.handleShowFeedback}>No</button>
              </div>
            <p className="text-center mt-3 mb-1">* Currently: {props.your_data.show_feedback ? 'Yes' : 'No'} *</p>
          </div>

        </div>

        <div className="col-lg-6 offset-lg-3 mt-3">
          <button className="btn btn-sm btn-outline-success container-fluid" onClick={props.SubmitCommunication}>Save</button>
        </div>

      </div>
    </div>
  )
}

export default Communication
