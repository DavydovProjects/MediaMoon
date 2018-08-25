import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../../redux/actions/index'

import DetailsEditor from '../../editor'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'

import Preloader from '../../preloader'

import InputName from '../input_name'
import ChooseAccType from '../choose_acc_type'
import ChoosePlatform from '../choose_platform'
import InputLink from '../input_link'
import ChoosePriceType from '../choose_price_type'
import ChoosePriceCur from '../choose_price_cur'
import InputPrice from '../input_price'

class EditProduct extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      product_content: "-1",
      link: '',

      price_type: "-1",
      price_currency: "-1",
      fprice: '',
      sprice: '',

      editorState: EditorState.createEmpty(),

      status: '',

      error: '',

      first_load: true
    }

    this.handleEditor = (editorState) => {
      this.setState({editorState})
    }

  }

  componentDidMount(){
      document.title = "Edit your product"
      this.props.LoadOneProduct({
        token: localStorage.getItem('token'),
        product_id: this.props.match.params.id,
        product_model: this.props.match.params.platform
      })
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleStatus = (e) => {
    this.setState({status: e.target.name})
  }

  handleSubmit = () => {
    const { name, product_content, link, price_type, price_currency, fprice, sprice, editorState, error } = this.state
    if (name && product_content !== "-1" && link && price_type !== "-1"){

      if (price_type === "1"){
        if (fprice && sprice && price_currency !== "-1"){
          this.setState({error: ''})
          this.props.EditProduct({
            title: this.state.name,
            content_type: this.state.product_content,
            link: this.state.link,
            fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
            sprice: this.state.sprice === '' ? 0 : this.state.sprice,
            price_type: this.state.price_type,
            price_currency: this.state.price_currency === "-1" ? 1 : this.state.price_currency,
            status: this.state.status,

            product_id: this.props.match.params.id,
            product_model: this.props.match.params.platform,
            details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

            token: localStorage.getItem('token')
          })
        }
        else{this.setState({error: 'Fil the gaps!'})}
      }

      else if (price_type === "2"){
        if (fprice && price_currency !== "-1"){
          this.setState({error: ''})
          this.props.EditProduct({
            title: this.state.name,
            content_type: this.state.product_content,
            link: this.state.link,
            fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
            sprice: this.state.sprice === '' ? 0 : this.state.sprice,
            price_type: this.state.price_type,
            price_currency: this.state.price_currency === "-1" ? 1 : this.state.price_currency,
            status: this.state.status,

            product_id: this.props.match.params.id,
            product_model: this.props.match.params.platform,
            details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

            token: localStorage.getItem('token')
          })
        }
        else{this.setState({error: 'Fil the gaps!'})}
      }

      else if (price_type === "3"){
        if (fprice && price_currency !== "-1"){
          this.setState({error: ''})
          this.props.EditProduct({
            title: this.state.name,
            content_type: this.state.product_content,
            link: this.state.link,
            fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
            sprice: this.state.sprice === '' ? 0 : this.state.sprice,
            price_type: this.state.price_type,
            price_currency: this.state.price_currency === "-1" ? 1 : this.state.price_currency,
            status: this.state.status,

            product_id: this.props.match.params.id,
            product_model: this.props.match.params.platform,
            details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

            token: localStorage.getItem('token')
          })
        }
        else{this.setState({error: 'Fil the gaps!'})}
      }

      else if (price_type === "4"){
        this.setState({error: ''})
        this.props.EditProduct({
          title: this.state.name,
          content_type: this.state.product_content,
          link: this.state.link,
          fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
          sprice: this.state.sprice === '' ? 0 : this.state.sprice,
          price_type: this.state.price_type,
          price_currency: this.state.price_currency === "-1" ? 1 : this.state.price_currency,
          status: this.state.status,

          product_id: this.props.match.params.id,
          product_model: this.props.match.params.platform,
          details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

          token: localStorage.getItem('token')
        })
      }
    }

    else{this.setState({error: 'Fil the gaps!'})}

  }

  render(){
    if (!localStorage.getItem('token')){
      window.location.href = '/'
    }
    else{
      const { data, loading, edit, edit_loading } = this.props.UserProductsReducer
      if (!loading && !data.error && data !== '' && this.state.first_load){
        this.setState({
          first_load: false,
          name: data.title,
          product_content: data.content_type,
          link: data.link,
          price_type: data.price_type.toString(),
          status: data.status
        })
        if (data.price_type === 1){
          this.setState({
            price_currency: data.price_currency,
            fprice: data.price,
            sprice: data.second_price
          })
        }
        if (data.price_type === 2 || data.price_type === 3 ){
          this.setState({
            price_currency: data.price_currency,
            fprice: data.price
          })
        }
        if (data.details !== "1"){
          this.setState({
            editorState: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(data.details)
              )
            )
          })
        }
      }
      if (loading){
        return(
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <Preloader />
            </div>
          </div>
        )
      }
      if (data.error){
        return(
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card mb-5 mt-5">
                <div className="card-body text-center">
                  <h4>{data.error}</h4>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return(
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="card mb-5 mt-5">
              <div className="card-body text-center">

                <h5 className="text-primary"><i className="fas fa-edit fa-4x"></i></h5>

                <div className="row mt-4">
                  <div className="col-xl-10 offset-xl-1">

                    <h3 className="mm-gray text-left mb-4">Edit a product
                      {this.state.error ?
                         <small className="text-danger float-right"><span>{this.state.error}</span></small> :
                         edit_loading ?
                         <small className="text-secondary float-right"><span>Loading...</span></small> :
                         edit ? edit.error ? <small className="text-danger float-right"><span>{edit.error}</span></small> : <small className="text-success float-right"><span>{edit}</span></small> : ''
                      }
                    </h3>

                    <InputName name={this.state.name} handleInputs={this.handleInputs} />

                    <ChooseAccType product_content={this.state.product_content} handleInputs={this.handleInputs} />

                    <InputLink product_platform={this.props.match.params.platform} link={this.state.link} handleInputs={this.handleInputs}/>

                    <ChoosePriceType price_type={this.state.price_type} handleInputs={this.handleInputs}/>

                    {this.state.price_type !== "-1" ?

                      this.state.price_type === "1" ?
                        <div>
                          <ChoosePriceCur price_currency={this.state.price_currency} handleInputs={this.handleInputs} />
                          <InputPrice name="fprice" placeholder="First price" value={this.state.fprice} handleInputs={this.handleInputs}/>
                          <InputPrice name="sprice" placeholder="Second price" value={this.state.sprice} handleInputs={this.handleInputs}/>
                        </div>
                      :

                      this.state.price_type === "2" ?
                        <div>
                          <ChoosePriceCur price_currency={this.state.price_currency} handleInputs={this.handleInputs} />
                          <InputPrice name="fprice" placeholder="Price" value={this.state.fprice} handleInputs={this.handleInputs}/>
                        </div>
                      :

                      this.state.price_type === "3" ?
                        <div>
                          <ChoosePriceCur price_currency={this.state.price_currency} handleInputs={this.handleInputs} />
                          <InputPrice name="fprice" placeholder="Price" value={this.state.fprice} handleInputs={this.handleInputs}/>
                        </div>
                      :

                      this.state.price_type === "4" ? '' : ''

                    : ''}

                  </div>

                  <div className="col-xl-10 offset-xl-1 text-left mt-3">
                    <DetailsEditor onChange={this.handleEditor} editorState={this.state.editorState}/>
                  </div>

                  <div className="col-xl-10 offset-xl-1 text-center mt-3">
                    <h5 className="card-title">Status</h5>
                      <div>
                        <button className={Number(this.state.status) === 1 ? "btn btn-sm btn-success mr-2" : "btn btn-sm btn-outline-success mr-2"} name="1" onClick={this.handleStatus}>For sale</button>
                        <button className={Number(this.state.status) === 0 ? "btn btn-sm btn-danger" : "btn btn-sm btn-outline-danger"} name="0" onClick={this.handleStatus}>Not for sale</button>
                      </div>
                  </div>

                  <div className="col-xl-10 offset-xl-1">
                    <button className="container-fluid btn btn-outline-success mt-3" onClick={this.handleSubmit}>Change</button>
                  </div>

                </div>

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

export default withRouter(connect(mapStateToProps, AC)(EditProduct))
