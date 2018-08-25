import React from 'react'

export default function ChoosePriceCur(props){
  return(
    <select className="custom-select mt-3" name="price_currency" value={props.price_currency} onChange={props.handleInputs}>
      <option value="-1">Choose price currency</option>
      <option value="1">U.S. Dollar</option>
      <option value="2">Euro</option>
      <option value="3">Japanese Yen</option>
      <option value="4">British Pound</option>
      <option value="5">Russian Ruble</option>
    </select>
  )
}
