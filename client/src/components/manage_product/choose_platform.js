import React from 'react'

export default function ChoosePlatform(props){
  return(
    <select className="custom-select" name="product_platform" value={props.product_platform} onChange={props.handleInputs}>
      <option value="-1">Choose platform</option>
      <option value="1">Twitter</option>
      <option value="2">Facebook</option>
      <option value="3">Youtube</option>
      <option value="4">Instagram</option>
      <option value="5">Vk</option>
      <option value="6">Twitch</option>
      <option value="7">Other</option>
    </select>
  )
}
