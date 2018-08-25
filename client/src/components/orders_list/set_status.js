import React from 'react'

function SetStatus(props){
    return(
      <div className="col-lg-6 offset-lg-3 mt-3">
        <div className="container-fluid filters text-center">
          <select className="custom-select" value={props.status} onChange={props.handleStatus}>
            <option value="-1">Choose order status</option>
            <option value="0">For consideration</option>
            <option value="1">In process</option>
            <option value="2">Done</option>
            <option value="3">Canceled</option>
          </select>
        </div>
      </div>
    )
}

export default SetStatus
