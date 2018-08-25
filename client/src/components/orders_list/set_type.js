import React from 'react'

function SetType(props){
    return(
      <div className="col-lg-6 offset-lg-3">
        <div className="container-fluid controls text-center">
          <div className="btn-group" role="group">
            <button type="button" className={props.state.type === 'incoming' ? "btn btn-info" : "btn btn-outline-info"} onClick={props.clickIncoming}>Incoming</button>
            <button type="button" className={props.state.type === 'outgoing' ? "btn btn-info" : "btn btn-outline-info"} onClick={props.clickOutgoing}>Outgoing</button>
          </div>
        </div>
      </div>
    )
}

export default SetType
