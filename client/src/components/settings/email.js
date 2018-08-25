import React from 'react'

function EmailConfirmation(props){
  return(
    <div className="container-fluid card border-primary mb-3 p-0" >
      <div className="card-body text-center">
        <h4 className="card-title text-primary ">You need to confirm your email address</h4>
        {props.confirm_loading ? '' : props.confirm.error ? <p className="card-text text-danger">{props.confirm.error}</p> : <p className="card-text text-success">{props.confirm}</p>}
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Confirmation code" value={props.email_code} onChange={props.handleEmailCode}/>
              <div className="input-group-append">
                <button className="btn btn-outline-success" type="button" id="button-addon2" onClick={props.confirmEmailCode}>Confirm</button>
              </div>
            </div>
          </div>

        </div>
        {!props.email_code_status ? (<p className="card-text">To get your confirmation code click on this button <br/><button className="btn btn-sm btn-outline-info mt-2" onClick={props.sendEmailCode}>Send confirmation code</button></p>) :  <p className="card-text text-success">Confirmation code has been sent!<br/></p>}
        <h6 className="card-title text-secondary m-0">If you forget your password, you will not be able to recover it with an unconfirmed email</h6>
      </div>
    </div>
  )
}

export default EmailConfirmation
