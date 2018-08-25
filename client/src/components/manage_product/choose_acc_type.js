import React from 'react'

export default function ChooseAccType(props){
  return(
    <select className="custom-select mb-3" name="product_content" value={props.product_content} onChange={props.handleInputs}>
      <option value="-1">Choose account content type</option>
      <option value="1">Entertaining</option>
      <option value="2">Educational</option>
      <option value="3">News</option>
      <option value="4">Show</option>
      <option value="5">Other</option>
    </select>
  )
}
