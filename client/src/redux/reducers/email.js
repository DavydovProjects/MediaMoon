import { EMAIL_SEND_CODE, EMAIL_CONFIRM, START, SUCCESS, FAIL } from '../../constants'

let defaultState = {
  confirm: '',
  confirm_loading: true,
}


const UserProductsReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case EMAIL_CONFIRM + START:
      return Object.assign({}, state, { confirm: '', confirm_loading: true })
    case EMAIL_CONFIRM + SUCCESS:
      return Object.assign({}, state, { confirm: response, confirm_loading: false  })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to load data!' })

    default:
      return state
  }
}

export default UserProductsReducer
