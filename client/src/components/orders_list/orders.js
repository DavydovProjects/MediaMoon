import React from 'react'

function Orders(props){
    return(
      <div className="row mb-3">
        {props.orders.length !== 0 ? props.orders.map((order, i) => {
          return(
            <div className="col-lg-6 col-md-6 col-sm-6 order-item mt-3" key={i}>
              <div className="card text-center pt-3 pb-3">
                <a href={"/order/" + order.id}>
                  <h4  className="card-title p-1 m-0">{props.type === 'incoming' ? 'From ' : 'To '}{order.to_user}</h4>
                  <div className="card-body p-2">
                    <h5 className="card-title">
                      {order.order_prods.includes('twitter') ? ( <i className="fab fa-twitter mr-1 product-platform-twitter-active"/> ) : ''}
                      {order.order_prods.includes('facebook') ? ( <i className="fab fa-facebook mr-1 product-platform-facebook-active"/> ) : ''}
                      {order.order_prods.includes('youtube') ? ( <i className="fab fa-youtube mr-1 product-platform-youtube-active"/> ) : ''}
                      {order.order_prods.includes('instagram') ? ( <i className="fab fa-instagram mr-1 product-platform-instagram-active"/> ) : '' }
                      {order.order_prods.includes('vk') ? ( <i className="fab fa-vk mr-1 product-platform-vk-active"/> ) : ''}
                      {order.order_prods.includes('twitch') ? ( <i className="fab fa-twitch mr-1 product-platform-twitch-active"/> ) : ''}
                      {order.order_prods.includes('other') ? ( <i className="fas fa-ellipsis-h mr-1 product-platform-other-active"/>) : ''}
                    </h5>
                    <h5 className="card-title mb-0">
                      {order.status === 0 ? <span className="badge badge-primary align-middle">For consideration</span> : order.status === 1 ? <span className="badge badge-warning align-middle">In process</span> : order.status === 2 ? <span className="badge badge-success align-middle">Done</span> : order.status === 3 ? <span className="badge badge-danger align-middle">Canceled</span> : ''}
                    </h5>
                  </div>
                </a>
              </div>
            </div>
          )
        }) : (<div className="container-fluid text-center p-3"><h4>No orders</h4></div>)}
      </div>
    )
}

export default Orders
