import React from 'react'

export default function InputName(props){
  return(
    <div className="form-group text-left">
      <input type="text" className="form-control" name="name" placeholder="Product name" value={props.name} onChange={props.handleInputs}/>
    </div>
  )
}
