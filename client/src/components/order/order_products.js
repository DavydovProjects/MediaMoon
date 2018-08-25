import React from 'react'

export default function OrderProducts(props){
  return(
    <div className="row pl-3 pr-3">
      <div className="card col-lg-10 offset-lg-1">
        <h4 className="card-title mt-3">Order products</h4>
        <div className="row">
          {props.order.products.map((prod, i) => {
            i = i + 1
            if (props.order.products.length === 1){
              return(
                <div className="col-lg-8 offset-lg-2 mt-3 mb-3" key={i}>
                  <h5><i className={prod.platform !== 'other' ? "fab fa-"+ prod.platform : "fas fa-ellipsis-h"}/><br/> {prod.title}</h5>
                </div>
              )
            }
            else{
              return(
                <div className="col-lg-6 mt-3 mb-3" key={i}>
                  <h5><i className={prod.platform !== 'other' ? "fab fa-"+ prod.platform : "fas fa-ellipsis-h"}/><br/> {prod.title}</h5>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
