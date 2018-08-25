import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as AC from '../../../redux/actions/index'

import DetailsEditor from '../../editor'
import { EditorState } from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'

import InputName from '../input_name'
import ChooseAccType from '../choose_acc_type'
import ChoosePlatform from '../choose_platform'
import InputLink from '../input_link'
import ChoosePriceType from '../choose_price_type'
import ChoosePriceCur from '../choose_price_cur'
import InputPrice from '../input_price'

class CreateProduct extends Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      product_content: "-1",
      product_platform: "-1",
      link: '',

      price_type: "-1",
      price_currency: "-1",
      fprice: '',
      sprice: '',

      editorState: EditorState.createEmpty(),

      error: ''
    }

    this.onChange = (editorState) => {
      this.setState({editorState})
    }

  }

  componentDidMount(){
      document.title = "Create a product"
  }

  handleInputs = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    const { name, product_content, product_platform, link, price_type, price_currency, fprice, sprice, editorState, error } = this.state
    if (name && product_content !== "-1" && product_platform !== "-1" && link && price_type !== "-1"){

      if (price_type === "1"){
        if (fprice && sprice && price_currency !== "-1"){
          this.setState({error: ''})
          this.props.CreateProduct({
            name: this.state.name,
            product_content: this.state.product_content,
            link: this.state.link,
            fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
            sprice: this.state.sprice === '' ? 0 : this.state.sprice,
            price_type: this.state.price_type,
            price_currency: this.state.price_currency,

            product_platform: this.state.product_platform,
            details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

            token: localStorage.getItem('token')
          })
        }
        else{this.setState({error: 'Fil the gaps!'})}
      }

      else if (price_type === "2"){
        if (fprice && price_currency !== "-1"){
          this.setState({error: ''})
          this.props.CreateProduct({
            name: this.state.name,
            product_content: this.state.product_content,
            link: this.state.link,
            fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
            sprice: this.state.sprice === '' ? 0 : this.state.sprice,
            price_type: this.state.price_type,
            price_currency: this.state.price_currency,

            product_platform: this.state.product_platform,
            details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

            token: localStorage.getItem('token')
          })
        }
        else{this.setState({error: 'Fil the gaps!'})}
      }

      else if (price_type === "3"){
        if (fprice && price_currency !== "-1"){
          this.setState({error: ''})
          this.props.CreateProduct({
            name: this.state.name,
            product_content: this.state.product_content,
            link: this.state.link,
            fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
            sprice: this.state.sprice === '' ? 0 : this.state.sprice,
            price_type: this.state.price_type,
            price_currency: this.state.price_currency,

            product_platform: this.state.product_platform,
            details: this.state.editorState.getCurrentContent().hasText() ? stateToHTML(this.state.editorState.getCurrentContent()) : '1',

            token: localStorage.getItem('token')
          })
        }
        else{this.setState({error: 'Fil the gaps!'})}
      }

      else if (price_type === "4"){
        this.setState({error: ''})
        this.props.CreateProduct({
          name: this.state.name,
          product_content: this.state.product_content,
          link: this.state.link,
          fprice: this.state.fprice === '' ? 0 : this.state.fprice ,
          sprice: this.state.sprice === '' ? 0 : this.state.sprice,
          price_type: this.state.price_type,
          price_currency: this.state.price_currency === "-1" ? 1 : this.state.price_currency,

          product_platform: this.state.product_platform,
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
    else if (this.props.UserProductsReducer.create[0] === 'Product has been successfully created!'){
      window.location.href = '/profile/' + this.props.GetUserDataReducer.your_data.username + '/products'
    }
    else{
      const { create, create_loading } = this.props.UserProductsReducer
      return(
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="card mb-5 mt-5">
              <div className="card-body text-center">

                <h5 className="text-primary"><i className="fas fa-plus-circle fa-4x"></i></h5>

                <div className="row mt-4">
                  <div className="col-xl-10 offset-xl-1">

                    <h3 className="mm-gray text-left mb-4">Create a product
                      {this.state.error ?
                         <small className="text-danger float-right"><span>{this.state.error}</span></small> :
                         create_loading ?
                         <small className="text-secondary float-right"><span>Loading...</span></small> :
                         create ? create.error ? <small className="text-danger float-right"><span>{create.error}</span></small> : <small className="text-success float-right"><span>{create}</span></small> : ''
                      }
                    </h3>

                    <InputName name={this.state.name} handleInputs={this.handleInputs} />

                    <ChooseAccType product_content={this.state.product_content} handleInputs={this.handleInputs} />

                    <ChoosePlatform product_platform={this.state.product_platform} handleInputs={this.handleInputs} />

                    <InputLink className="mt-3" product_platform={this.state.product_platform} link={this.state.link} handleInputs={this.handleInputs}/>

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
                    <DetailsEditor onChange={this.onChange} editorState={this.state.editorState}/>
                  </div>
                  <div className="col-xl-10 offset-xl-1">
                    <button className="container-fluid btn btn-outline-success mt-3" onClick={this.handleSubmit}>Create</button>
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

export default withRouter(connect(mapStateToProps, AC)(CreateProduct))
