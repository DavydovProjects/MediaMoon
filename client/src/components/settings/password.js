import React from 'react'

function Password(props){
  return(
    <div className="container-fluid card mb-3 p-0">
      <div className="card-header">
        <h4>Password {!props.password_loading ?
          props.password_error ?
           <small><span className="text-danger float-right">{props.password_error}</span></small> :
            props.password ?
             props.password.error ?
              <small><span className="text-danger float-right">{props.password.error}</span></small> :
               <small><span className="text-success float-right">{props.password}</span></small> : '' : <small><span className="text-secondary float-right">Loading...</span></small>
             }
        </h4>
      </div>
      <div className="card-body">
        <div className="row">

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Old password</h5>
            <div className="input-group">
              <input type="password" className="form-control" placeholder="Old password" id="old_password" value={props.old_password} onChange={props.handlePassword}/>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">New password</h5>
            <div className="input-group">
              <input type="password" className="form-control" placeholder="New password" id="new_password" value={props.new_password} onChange={props.handlePassword}/>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Confirm new password</h5>
            <div className="input-group">
              <input type="password" className="form-control" placeholder="Confirm new password" id="cnew_password" value={props.cnew_password} onChange={props.handlePassword}/>
            </div>
          </div>

          <div className="col-lg-12">
            <button className="btn btn-sm btn-outline-success container-fluid" onClick={props.submitPassword}>Change</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Password
