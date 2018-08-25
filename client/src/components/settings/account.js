import React from 'react'

function Account(props){
  return(
    <div className="container-fluid card p-0 mb-3">
      <div className="card-header">
        <h4>Account <span className="text-danger float-right">{props.account_error}</span></h4>
      </div>
      <div className="card-body">
        <div className="row">

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Nickname {props.account_loading ? '' : props.account.error.nickname ?  (<small><span className="text-danger float-right">{props.account.error.nickname}</span></small>) : props.account.success.nickname ? (<small><span className="text-success float-right">{props.account.success.nickname}</span></small>) : ''}</h5>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Nickname" id="nickname" value={props.nickname} onChange={props.handleAccount}/>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Email address {props.account_loading ? '' : props.account.error.email ?  (<small><span className="text-danger float-right">{props.account.error.email}</span></small>) : props.account.success.email ? (<small><span className="text-success float-right">{props.account.success.email}</span></small>) : ''}</h5>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Email address" id="email" value={props.email} onChange={props.handleAccount}/>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Status {props.account_loading ? '' : props.account.error.status ?  (<small><span className="text-danger float-right">{props.account.error.status}</span></small>) : props.account.success.status ? (<small><span className="text-success float-right">{props.account.success.status}</span></small>) : ''}</h5>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Status" id="status" value={props.status} onChange={props.handleAccount}/>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Language {props.account_loading ? '' : props.account.error.lang ?  (<small><span className="text-danger float-right">{props.account.error.lang}</span></small>) : props.account.success.lang ? (<small><span className="text-success float-right">{props.account.success.lang}</span></small>) : ''}</h5>
            <div className="input-group">
              <select className="custom-select" id="lang" value={props.lang} onChange={props.handleAccount}>
                <option value="-1">Choose</option>
                <option value="french">French</option>
                <option value="russian">Russian</option>
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="japanese">Japanese</option>
                <option value="1">Other</option>
              </select>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <h5 className="card-title">Information {props.account_loading ? '' : props.account.error.info ?  (<small><span className="text-danger float-right">{props.account.error.info}</span></small>) : props.account.success.info ? (<small><span className="text-success float-right">{props.account.success.info}</span></small>) : ''}</h5>
            <div className="input-group">
              <textarea className="form-control" id="information" rows="3" id="info" value={props.info} onChange={props.handleAccount}></textarea>
            </div>
          </div>

          <div className="col-lg-12">
            <button className="btn btn-sm btn-outline-success container-fluid" onClick={props.SubmitAccount}>Save</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Account
