import { REPORT_FEEDBACK, SEND_FEEDBACK, CLEAR_REPORT_FEEDBACK, SUCCESS, START, FAIL } from '../../constants'

let defaultState = {
  data: '',

  report_data: '',

  error: ''
}

const FeedbackReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case SEND_FEEDBACK + START:
      return Object.assign({}, state, { data: 'preloader' })
    case SEND_FEEDBACK + SUCCESS:
      return Object.assign({}, state, { data: response })

    case REPORT_FEEDBACK + START:
      return Object.assign({}, state, { report_data: 'preloader' })
    case REPORT_FEEDBACK + SUCCESS:
      return Object.assign({}, state, { report_data: response })

    case CLEAR_REPORT_FEEDBACK:
      return Object.assign({}, state, {report_data: ''})

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state

  }
}

export default FeedbackReducer
