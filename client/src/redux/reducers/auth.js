import { REGISTER, LOGIN, LOGOUT, START, SUCCESS, FAIL, CLEAR_AUTH } from '../../constants'

let defaultState={
  data: '',
  error: ''
}

const AuthReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){
    case REGISTER + START:
      return Object.assign({}, state, { data: 'preloader' })
    case REGISTER + SUCCESS:
      return Object.assign({}, state, { data: response })

    case LOGIN + START:
      return Object.assign({}, state, { data: 'preloader' })
    case LOGIN + SUCCESS:
      return Object.assign({}, state, { data: response })

    case LOGOUT:
      return Object.assign({}, state, { data: '', error: '' })

    case CLEAR_AUTH:
      return Object.assign({}, state, { data: '', error: '' })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state
  }
}

export default AuthReducer
