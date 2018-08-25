import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../redux/actions/index'

import Pagination from '../pagination'
import Preloader from '../preloader'

import Orders from './orders'
import SetStatus from './set_status'
import SetType from './set_type'

import 'url-search-params-polyfill'

class OrdersIndex extends Component{

  constructor(props) {
    super(props)
    let params = new URLSearchParams(this.props.location.search)
    this.state = {
      orders: [],

      type: 'outgoing',
      status: "-1",

      cur_page: parseInt(params.get('page')) ? parseInt(params.get('page')) : 1,

      load: true
    }
  }


  clickIncoming = () => {
    if (this.state.type === 'to'){
      false
    }
    else{
      this.setState({type: 'incoming', load: true, status: "-1"})
      this.props.LoadOrders({token: localStorage.getItem('token'), status: "-1", cur_page: 1}, 'incoming')
    }
  }

  clickOutgoing = () => {
    if (this.state.type === 'from'){
      false
    }
    else{
      this.setState({type: 'outgoing', load: true, status: "-1"})
      this.props.LoadOrders({token: localStorage.getItem('token'), status: "-1", cur_page: 1}, 'outgoing')
    }
  }

  componentDidMount(){
    document.title = 'Orders'
    this.props.LoadOrders({token: localStorage.getItem('token'), status: this.state.status, cur_page: this.state.cur_page}, 'outgoing')
  }

  handleStatus = (e) => {
    this.props.history.push('/orders')

    this.setState({load: true, status: e.target.value, cur_page: 1})
    this.props.LoadOrders({token: localStorage.getItem('token'), status: e.target.value, cur_page: 1}, this.state.type)
  }

  GoPrevPage = () => {
    this.setState({cur_page: this.state.cur_page--})
    let new_url = ''
    if (this.state.cur_page){
      new_url = new_url + '?page=' + this.state.cur_page--
    }
    this.props.history.push('/orders' + new_url)

    this.setState({load: true})
    this.props.LoadOrders({token: localStorage.getItem('token'), status: this.state.status, cur_page: this.state.cur_page--}, 'outgoing')
  }

  GoNextPage = () => {
    this.setState({cur_page: this.state.cur_page++})
    let new_url = ''
    if (this.state.cur_page){
      new_url = new_url + '?page=' + this.state.cur_page++
    }
    this.props.history.push('/orders' + new_url)

    this.setState({load: true})
    this.props.LoadOrders({token: localStorage.getItem('token'), status: this.state.status, cur_page: this.state.cur_page++}, 'outgoing')
  }

  handlePagination = (e) => {
    let new_url = ''
    this.setState({cur_page: e.target.innerHTML})
    if (this.state.cur_page){
      new_url = new_url + '?page=' + e.target.innerHTML
    }
    this.props.history.push('/orders' + new_url)

    this.setState({load: true})
    this.props.LoadOrders({token: localStorage.getItem('token'), status: this.state.status, cur_page: e.target.innerHTML}, 'outgoing')
  }


  render(){
    if (!localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      let params = new URLSearchParams(this.props.location.search)
      return(
        <div className="container p-0">
          <div className="c-box mb-5 mt-5">
            <h3 className="text-center mb-3">Orders</h3>
            <div className="row p-2">
              <div className="col-lg-8 offset-lg-2 card p-3 mb-3 justify-content-center">
                <div className="row">
                  <SetType state={this.state} clickIncoming={this.clickIncoming} clickOutgoing={this.clickOutgoing} />
                  <SetStatus handleStatus={this.handleStatus} status={this.state.status}/>
                </div>
                {this.props.OrderReducer.list !== 'preloader' ? (
                  <div className="load">
                    <Orders type={this.state.type} orders={this.props.OrderReducer.list}/>
                    <Pagination pages_count={this.props.OrderReducer.pages_count} cur_page={parseInt(params.get('page')) ? parseInt(params.get('page')) : 1} GoPrevPage={this.GoPrevPage} GoNextPage={this.GoNextPage} handlePagination={this.handlePagination} />
                  </div>
                ) : <Preloader />}

              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(OrdersIndex))
