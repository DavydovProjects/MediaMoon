import React from 'react'
import { Link } from 'react-router-dom'

function List(props){
  return(
    <div className="container-fluid">
      <div className="profile-products p-2 animated fadeIn text-center">
        {props.list ?
          props.list.total_prods !== 0 ?
            (
              <ul className="list-inline ml-1 mb-2">
                  <li className="list-inline-item" onClick={props.renderProducts} id="twitter">
                    <Link id="twitter" to={"/profile/" + props.username + "/" + "twitter"}>
                      <i className={props.list.twitter.length !== 0 ? "fab fa-twitter profile-product-twitter-active mr-4" : "fab fa-twitter profile-product-twitter mr-4"} id="twitter"/>
                    </Link>
                  </li>

                  <li className="list-inline-item" onClick={props.renderProducts} id="facebook">
                    <Link id="facebook" to={"/profile/" + props.username + "/" + "facebook"}>
                      <i className={props.list.facebook.length !== 0 ? "fab fa-facebook profile-product-facebook-active mr-4" : "fab fa-facebook profile-product-facebook mr-4"} id="facebook"/>
                    </Link>
                  </li>

                  <li className="list-inline-item" onClick={props.renderProducts} id="youtube">
                    <Link id="youtube" to={"/profile/" + props.username + "/" + "youtube"}>
                      <i className={props.list.youtube.length !== 0 ? "fab fa-youtube profile-product-youtube-active mr-4" : "fab fa-youtube profile-product-youtube mr-4"} id="youtube"/>
                    </Link>
                  </li>

                  <li className="list-inline-item" onClick={props.renderProducts} id="instagram">
                    <Link id="instagram" to={"/profile/" + props.username + "/" + "instagram"}>
                      <i className={props.list.instagram.length !== 0 ? "fab fa-instagram profile-product-instagram-active mr-4" : "fab fa-instagram profile-product-instagram mr-4"} id="instagram"/>
                    </Link>
                  </li>

                  <li className="list-inline-item" onClick={props.renderProducts} id="vk">
                    <Link id="vk" to={"/profile/" + props.username + "/" + "vk"}>
                      <i className={props.list.vk.length !== 0 ? "fab fa-vk profile-product-vk-active mr-4" : "fab fa-vk profile-product-vk mr-4"} id="vk"/>
                    </Link>
                  </li>

                  <li className="list-inline-item" onClick={props.renderProducts} id="twitch">
                    <Link id="twitch" to={"/profile/" + props.username + "/" + "twitch"}>
                      <i className={props.list.twitch.length !== 0 ? "fab fa-twitch profile-product-twitch-active mr-4" : "fab fa-twitch profile-product-twitch mr-4"} id="twitch"/>
                    </Link>
                  </li>

                  <li className="list-inline-item" onClick={props.renderProducts} id="other">
                    <Link id="other" to={"/profile/" + props.username + "/" + "other"}>
                      <i className={props.list.other.length !== 0 ? "fas fa-ellipsis-h profile-product-other-active" : "fas fa-ellipsis-h profile-product-other"} id="other"/>
                    </Link>
                  </li>
              </ul>
            )
          : ''
         : (<h4>Loading...</h4>)}
      </div>
    </div>
  )
}


export default List
