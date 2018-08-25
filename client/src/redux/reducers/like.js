import { CLEAR_LIKES, LOAD_LIKES, LIKE, UNLIKE, CHECK_LIKE, SUCCESS, START, FAIL } from '../../constants'

let defaultState = {
  liked: 'False',

  data: ''
}

const LikeReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case CHECK_LIKE + START:
      return Object.assign({}, state, { liked: 'preloader' })
    case CHECK_LIKE + SUCCESS:
      return Object.assign({}, state, { liked: response })

    case LIKE + START:
      return Object.assign({}, state, { liked: 'preloader' })
    case LIKE + SUCCESS:
      return Object.assign({}, state, { liked: response })

    case UNLIKE + START:
      return Object.assign({}, state, { liked: 'preloader' })
    case UNLIKE + SUCCESS:
      return Object.assign({}, state, { liked: response })

    case LOAD_LIKES + START:
      return Object.assign({}, state, { data: 'preloader' })
    case LOAD_LIKES + SUCCESS:
      return Object.assign({}, state, { data: response.list })

    case CLEAR_LIKES:
      return Object.assign({}, state, { data: '' })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state

  }
}

export default LikeReducer
