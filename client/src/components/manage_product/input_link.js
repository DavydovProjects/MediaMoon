import React from 'react'

export default function InputLink(props){
  return(
    <div className={"input-group " + props.className}>
      <div className="input-group-prepend">
        <span className="input-group-text">
          {
            props.product_platform !== "-1" ?
              props.product_platform === '1' || props.product_platform === 'twitter' ? 'https://twitter.com/' :
              props.product_platform === '2' || props.product_platform === 'facebook' ? 'https://www.facebook.com/' :
              props.product_platform === '3' || props.product_platform === 'youtube' ? 'https://www.youtube.com/' :
              props.product_platform === '4' || props.product_platform === 'instagram' ? 'https://www.instagram.com/' :
              props.product_platform === '5' || props.product_platform === 'vk' ? 'https://vk.com/' :
              props.product_platform === '6' || props.product_platform === 'twitch' ? 'https://www.twitch.tv/' :
              props.product_platform === '7' || props.product_platform === 'other' ? '@' : ''
            : '@'
          }
        </span>
      </div>
      <input type="text" className="form-control" name="link" placeholder="Link" value={props.link} onChange={props.handleInputs}/>
    </div>
  )
}
