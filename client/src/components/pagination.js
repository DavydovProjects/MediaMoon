import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../redux/actions/index'

class Pagination extends Component{
  render(){
    const pageNumbers = [];
    for (let i = 1; i <= this.props.pages_count; i++) {
      pageNumbers.push(i);
    }
    return(
      <div className="module-pagination">
        {this.props.pages_count !== 0 ? this.props.pages_count !== 1 ? this.props.pages_count <= 7 ? (
          <nav aria-label="Page navigation m-pagination">
            <ul className="pagination justify-content-center">

              <li className={this.props.cur_page === 1 ? "page-item disabled" : "page-item"} onClick={this.props.cur_page === 1 ? '' : this.props.GoPrevPage}>
                <a className="page-link" tabindex="-1">&laquo;</a>
              </li>

              {pageNumbers.map(number => {
                return(
                  <li className={this.props.cur_page === number ? "page-item active" : "page-item"} onClick={this.props.handlePagination}><a className="page-link">{number}</a></li>
                )
              })}

              <li className={this.props.cur_page === this.props.pages_count ? "page-item disabled" : "page-item"} onClick={this.props.cur_page === this.props.pages_count ? '' : this.props.GoNextPage}>
                <a className="page-link">&raquo;</a>
              </li>

            </ul>
          </nav>
        ) : '' : '' : ''}

        {this.props.pages_count > 7 ? this.props.cur_page <= 4 ? (
          <nav aria-label="Page navigation m-pagination">
            <ul className="pagination justify-content-center">

              <li className={this.props.cur_page === 1 ? "page-item disabled" : "page-item"} onClick={this.props.cur_page === 1 ? '' : this.props.GoPrevPage}>
                <a className="page-link" tabindex="-1">&laquo;</a>
              </li>

              {pageNumbers.slice(0, 5).map(number => {
                return(
                  <li className={this.props.cur_page === number ? "page-item active" : "page-item"} onClick={this.props.handlePagination}><a className="page-link">{number}</a></li>
                )
              })}
              <li className="page-item disabled" onClick={this.props.handlePagination}><a className="page-link">...</a></li>

              <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count}</a></li>

              <li className={this.props.cur_page === this.props.pages_count ? "page-item disabled" : "page-item"} onClick={this.props.GoNextPage}>
                <a className="page-link">&raquo;</a>
              </li>

            </ul>
          </nav>
        ) : '' : ''}
         {this.props.MarketReducer.products_data.length !== 0 ? 5 < this.props.cur_page ? this.props.cur_page >= this.props.pages_count - 3 ? (
          <nav aria-label="Page navigation m-pagination">
            <ul className="pagination justify-content-center">

              <li className={this.props.cur_page === 1 ? "page-item disabled" : "page-item"} onClick={this.props.GoPrevPage}>
                <a className="page-link" tabindex="-1">&laquo;</a>
              </li>

              <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">1</a></li>
              <li className="page-item disabled" onClick={this.props.handlePagination}><a className="page-link">...</a></li>


              <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count - 4}</a></li>
              <li className={this.props.pages_count - 3 === this.props.cur_page ? "page-item active" : "page-item"} onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count - 3}</a></li>
              <li className={this.props.pages_count - 2 === this.props.cur_page ? "page-item active" : "page-item"} onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count - 2}</a></li>
              <li className={this.props.pages_count - 1 === this.props.cur_page ? "page-item active" : "page-item"} onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count - 1}</a></li>
              <li className={this.props.pages_count     === this.props.cur_page ? "page-item active" : "page-item"} onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count}</a></li>


              <li className={this.props.cur_page === this.props.pages_count ? "page-item disabled" : "page-item"} onClick={this.props.cur_page === this.props.pages_count ? '' : this.props.GoNextPage}>
                <a className="page-link">&raquo;</a>
              </li>

            </ul>
          </nav>
        ) : '' : '': ''}
         {this.props.cur_page >= 5 ? this.props.cur_page <= this.props.pages_count - 4 ? (

            <nav aria-label="Page navigation m-pagination">
              <ul className="pagination justify-content-center">

                <li className={this.props.cur_page === 1 ? "page-item disabled" : "page-item"} onClick={this.props.GoPrevPage}>
                  <a className="page-link" tabindex="-1">&laquo;</a>
                </li>

                <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">1</a></li>

                <li className="page-item disabled" onClick={this.props.handlePagination}><a className="page-link">...</a></li>


                <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">{this.props.cur_page - 1}</a></li>
                <li className="page-item active" onClick={this.props.handlePagination}><a className="page-link">{this.props.cur_page}</a></li>
                <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">{this.props.cur_page + 1}</a></li>


                <li className="page-item disabled" onClick={this.props.handlePagination}><a className="page-link">...</a></li>

                <li className="page-item" onClick={this.props.handlePagination}><a className="page-link">{this.props.pages_count}</a></li>

                <li className={this.props.cur_page === this.props.pages_count ? "page-item disabled" : "page-item"} onClick={this.props.GoNextPage}>
                  <a className="page-link">&raquo;</a>
                </li>

              </ul>
            </nav>

         ) : '' : ''}
       </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return state
}

export default withRouter(connect(mapStateToProps, AC)(Pagination));
