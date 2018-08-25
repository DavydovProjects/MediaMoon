import React from 'react'

export default function ChoosePriceType(props){
  return(
    <select className="custom-select mt-3" name="price_type" value={props.price_type} onChange={props.handleInputs}>
      <option value="-1">Choose product price type</option>
      <option value="1">From * to *</option>
      <option value="2">From *</option>
      <option value="3">Price is *</option>
      <option value="4">The price is negotiable</option>
    </select>
  )
}
