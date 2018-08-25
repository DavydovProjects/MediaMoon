import { SEND_PASSWORD_RESET_CODE, RECOVER_PASSWORD, START, SUCCESS, FAIL } from '../../constants'

let defaultState={
  data: '',

  loading: false,

  error: ''
}

const PasswordResetReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case SEND_PASSWORD_RESET_CODE + START:
      return Object.assign({}, state, { data: '', loading: true })
    case SEND_PASSWORD_RESET_CODE + SUCCESS:
      return Object.assign({}, state, { data: response, loading: false })

    case RECOVER_PASSWORD + START:
      return Object.assign({}, state, { data: '', loading: true })
    case RECOVER_PASSWORD + SUCCESS:
      return Object.assign({}, state, { data: response, loading: false })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state
  }
}

export default PasswordResetReducer
