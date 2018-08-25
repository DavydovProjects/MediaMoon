import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import * as AC from '../../../redux/actions/index'

import Preloader from '../../preloader'
import renderHTML from 'react-render-html'

class UserProducts extends Component{

  state = {
    count: 1
  }

  RemoveProduct = (data) => {
    this.props.RemoveProduct({
      product_platform: data.product_platform,
      product_id: data.product_id,
      token: localStorage.getItem('token')
    })
  }

  render(){
    const { platform } = this.props.UserProductsReducer.data
    const { remove_loading, remove } = this.props.UserProductsReducer
    return(
      <div className="row">
        {!this.props.UserProductsReducer.loading ? this.props.UserProductsReducer.data.prods ? this.props.UserProductsReducer.data.prods.length !== 0 ? this.props.UserProductsReducer.data.prods.map((prod, i) => {
          return(
            <div className={this.props.products.length === 1 ? "col-lg-6 offset-lg-3 col-md-6 offset-md-3 mb-3" : "col-lg-6 col-md-6 mb-3"} key={i}>
              <div className="card text-center product">
                <div className="card-body">
                  <h5 className="card-title m-0 mb-3">
                    {prod.title}
                  </h5>
                  <p className="card-text">

                    {
                      prod.price_currency === 1 ?

                      prod.price_type === 1 ? '$' + prod.price + " - " + '$' + prod.second_price :
                      prod.price_type === 2 ? 'From ' + '$' + prod.price :
                      prod.price_type === 3 ? '$' + prod.price :
                      prod.price_type === 4 ? 'The price is negotiable' : '' : ''

                    }

                    {
                      prod.price_currency === 2 ?

                      prod.price_type === 1 ? '€' + prod.price + " - " + '€' + prod.second_price :
                      prod.price_type === 2 ? 'From ' + '€' + prod.price :
                      prod.price_type === 3 ? '€' + prod.price :
                      prod.price_type === 4 ? 'The price is negotiable' : '' : ''

                    }

                    {
                      prod.price_currency === 3 ?

                      prod.price_type === 1 ? '¥' + prod.price + " - " + '¥' + prod.second_price :
                      prod.price_type === 2 ? 'From ' + '¥' + prod.price :
                      prod.price_type === 3 ? '¥' + prod.price :
                      prod.price_type === 4 ? 'The price is negotiable' : '' : ''
                    }

                    {
                      prod.price_currency === 4 ?

                      prod.price_type === 1 ? '£' + prod.price + " - " + '£' + prod.second_price :
                      prod.price_type === 2 ? 'From ' + '£' + prod.price :
                      prod.price_type === 3 ? '£' + prod.price :
                      prod.price_type === 4 ? 'The price is negotiable' : '' : ''
                    }

                    {
                      prod.price_currency === 5 ?

                      prod.price_type === 1 ? '₽' + prod.price + " - " + '₽' + prod.second_price :
                      prod.price_type === 2 ? 'From ' + '₽' + prod.price :
                      prod.price_type === 3 ? '₽' + prod.price :
                      prod.price_type === 4 ? 'The price is negotiable' : '' : ''
                    }

                  </p>
                  <div className="btn-group container-fluid p-0" role="group">
                    {
                      platform === 'twitter' ?
                        <a href={"https://twitter.com/" + prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      :
                      platform === 'facebook' ?
                        <a href={"https://www.facebook.com/" + prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      :
                      platform === 'youtube' ?
                        <a href={"https://www.youtube.com/" + prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      :
                      platform === 'instagram' ?
                        <a href={"https://www.instagram.com/" + prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      :
                      platform === 'vk' ?
                        <a href={"https://vk.com/" + prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      :
                      platform === 'twitch' ?
                        <a href={"https://www.twitch.tv/" + prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      :
                      platform === 'other' ?
                        <a href={prod.link} className="btn btn-outline-info btn-sm container-fluid" target="_blank">Link to account</a>
                      : ''
                    }
                    <button className="btn btn-sm btn-outline-info container-fluid" data-toggle="modal" data-target={'#detail_' + i}>Details</button>
                  </div>
                </div>
                  {!this.props.GetUserDataReducer.user_data.accept_orders && this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ? '' : (
                    <div className={localStorage.getItem('token') ? "card-footer" : ''}>
                          {localStorage.getItem('token') ?
                            this.props.match.params.username !== this.props.GetUserDataReducer.your_data.username ?
                               prod.status === 0 ?
                               <button className="btn btn-secondary btn-sm container-fluid" disabled>Currently not for sale</button>
                               :
                               this.props.checkOnProduct({id: prod.id, platform: this.props.platform}) ?
                                <button className="btn btn-outline-danger btn-sm container-fluid" onClick={() => {
                                  this.props.removeFromOrder({id: prod.id, title: prod.title, platform: this.props.platform, status: prod.status})
                                  this.setState({count: this.state.count++})
                                }}>Remove from order</button>
                             :
                               <button className="btn btn-outline-success btn-sm container-fluid" onClick={() => {
                                 this.props.addToOrder({id: prod.id, title: prod.title, platform: this.props.platform, status: prod.status})
                                 this.setState({count: this.state.count++})
                               }}>Add to order</button>
                             : ''
                             : ''
                          }
                        {localStorage.getItem('token') && this.props.match.params.username === this.props.GetUserDataReducer.your_data.username ? (
                          <div className="btn-group container-fluid p-0" role="group">
                            <button className="btn btn-sm btn-outline-danger container-fluid" data-toggle="modal" data-target={'#remove_' + i}>Remove</button>
                            <a href={"/edit_product/" + this.props.match.params.platform + '/' + prod.id} target="_blank" className="btn btn-sm btn-outline-primary container-fluid">Edit</a>
                          </div>
                        ) : ''}
                    </div>
                  )}
              </div>

              <div className="modal fade" id={"remove_" + i} tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-sm" role="document">
                  <div className="modal-content">

                    <div className="modal-header">
                      <h5 className="modal-title text-info">Remove product</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div className="modal-body text-center">
                      <h6>Are you sure?</h6>
                      {remove_loading ? 'Loading...' : <button className="btn btn-sm btn-outline-danger" onClick={() => this.RemoveProduct({product_platform: platform, product_id: prod.id})}>Yes</button>}
                    </div>

                  </div>
                </div>
              </div>

              <div className="modal fade" id={"detail_" + i} tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">

                    <div className="modal-header">
                      <h5 className="modal-title text-info">Product details</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-header">
                      <h6 className="modal-title ">Account content type: {
                        prod.content_type === 1 ? "Entertaining" :
                        prod.content_type === 2 ? "Educational" :
                        prod.content_type === 3 ? "News" :
                        prod.content_type === 4 ? "Show" :
                        prod.content_type === 5 ? "Other" : ''
                      }</h6>
                    </div>
                    <div className="modal-body">
                      {prod.details !== '1' ? <div>{renderHTML(prod.details)}</div> : (<div className="container-fluid text-center">This product does not have any details!</div>)}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )
        }) : (<div className="container-fluid text-center"><h4>No products!</h4></div>) : '' : <Preloader />}
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(UserProducts))
