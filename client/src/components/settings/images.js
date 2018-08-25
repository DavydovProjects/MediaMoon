import React from 'react'

function Images(props){
  return(
    <div className="container-fluid card mb-3 p-0">
      <div className="card-header">
        <h4>Images</h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12 mb-4">

            <h5 className="card-title">Avatar
              {props.avatar_error ? (<small><span className="text-danger float-right">{props.avatar_error}</span></small>) :
              props.images_loading_avatar ? <small><span className="text-secondary float-right">{props.images_avatar}</span></small> :
              props.images_avatar.error ? <small><span className="text-danger float-right">{props.images_avatar.error}</span></small> :
              <small><span className="text-success float-right">{props.images_avatar}</span></small>}
            </h5>

            <div className="custom-file text-right">
              <input type="file" className="custom-file-input" id="avatar" onChange={ (e) => props.handleChangeAvatar(e.target.files) }/>
              <label className="custom-file-label text-left" htmlFor="avatar">{props.cur_avatar.name}</label>

              <p className="text-center mt-1 mb-1">* Recommended images with the same height and width *</p>

              <div className="row">
                <div className="col-6">
                  <button className="btn btn-sm btn-outline-success mt-2 container-fluid" onClick={props.saveAvatar}>Save</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-sm btn-outline-danger mt-2 container-fluid" onClick={props.removeAvatar}>Remove</button>
                </div>
              </div>

            </div>
          </div>
          <div className="col-lg-12">
            <h5 className="card-title">
              Profile wallpaper {
              props.wallpaper_error ?
              (<small><span className="text-danger float-right">{props.wallpaper_error}</span></small>) :
              props.images_loading_wallpaper ? <small><span className="text-secondary float-right">{props.images_wallpaper}</span></small> :
              props.images_wallpaper.error ? <small><span className="text-danger float-right">{props.images_wallpaper.error}</span></small> :
              <small><span className="text-success float-right">{props.images_wallpaper}</span></small>}
            </h5>
            <div className="custom-file text-right">
              <input type="file" className="custom-file-input" id="profile_wallpaper" onChange={ (e) => props.handleChangeWallpaper(e.target.files) }/>
              <label className="custom-file-label text-left" htmlFor="profile_wallpaper">{props.cur_wallpaper.name}</label>

              <p className="text-center mt-1 mb-1">* Suggested size 960x300 px *</p>

              <div className="row">
                <div className="col-6">
                  <button className="btn btn-sm btn-outline-success mt-2 container-fluid" onClick={props.saveWallpaper}>Save</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-sm btn-outline-danger mt-2 container-fluid" onClick={props.removeWallpaper}>Remove</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Images
