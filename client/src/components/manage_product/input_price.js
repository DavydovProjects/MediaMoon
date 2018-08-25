import React from 'react'

export default function InputPrice(props){
  return(
    <div className="form-group text-left mt-3">
      <input type="number" className="form-control" name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.handleInputs}/>
    </div>
  )
}
