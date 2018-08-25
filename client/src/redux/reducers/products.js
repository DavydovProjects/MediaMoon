import { LOAD_PRODUCTS, LOAD_ONE_PRODUCT, EDIT_PRODUCT, CREATE_PRODUCT, REMOVE_PRODUCT, START, SUCCESS, FAIL } from '../../constants'

let defaultState = {
  data: '',
  loading: false,

  create: '',
  create_loading: false,

  edit: '',
  edit_loading: false,

  remove: '',
  remove_loading: false
}


const UserProductsReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){
    case LOAD_PRODUCTS + START:
      return Object.assign({}, state, { data: '', loading: true })
    case LOAD_PRODUCTS + SUCCESS:
      return Object.assign({}, state, { data: response, loading: false  })

    case LOAD_ONE_PRODUCT + START:
      return Object.assign({}, state, { data: '', loading: true })
    case LOAD_ONE_PRODUCT + SUCCESS:
      return Object.assign({}, state, { data: response, loading: false  })

    case CREATE_PRODUCT + START:
      return Object.assign({}, state, { create: '', create_loading: true })
    case CREATE_PRODUCT + SUCCESS:
      return Object.assign({}, state, { create: response, create_loading: false  })

    case EDIT_PRODUCT + START:
      return Object.assign({}, state, { edit: '', edit_loading: true })
    case EDIT_PRODUCT + SUCCESS:
      return Object.assign({}, state, { edit: response, edit_loading: false  })

    case REMOVE_PRODUCT + START:
      return Object.assign({}, state, { remove: '', remove_loading: true })
    case REMOVE_PRODUCT + SUCCESS:
      return Object.assign({}, state, { remove: response, remove_loading: false  })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to load data!' })

    default:
      return state
  }
}

export default UserProductsReducer
