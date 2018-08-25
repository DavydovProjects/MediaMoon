import { GET_USER_DATA, GET_USER_FEEDBACK, GET_YOUR_DATA, START, SUCCESS, FAIL } from '../../constants'

let defaultState={
  your_data: '',
  your_data_loading: true,

  user_data: '',
  user_data_loading: true,

  user_profile_prods: '',
  user_profile_feedback: '',

  user_feedback: '',

  error: ''
}

const GetUsersDataReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){
    case GET_YOUR_DATA + START:
      return Object.assign({}, state, { your_data_loading: true })
    case GET_YOUR_DATA + SUCCESS:
      return Object.assign({}, state, { your_data_loading: false, your_data: response })

    case GET_USER_DATA + START:
      return Object.assign({}, state, { user_data_loading: true })
    case GET_USER_DATA + SUCCESS:
      return Object.assign({}, state, { user_data: response, user_profile_prods: response.products, user_profile_feedback: response.feedback, user_data_loading: false  })

    case GET_USER_FEEDBACK + START:
      return Object.assign({}, state, { user_feedback: 'preloader' })
    case GET_USER_FEEDBACK + SUCCESS:
      return Object.assign({}, state, { user_feedback: response })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to load data!' })

    default:
      return state
  }
}

export default GetUsersDataReducer
