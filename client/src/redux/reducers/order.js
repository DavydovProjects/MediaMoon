import { SEND_ORDER_COMMENT, LOAD_ORDER_COMMENTS, ADD_ORDER_COMMENT, CLEAR_ORDER_COMMENTS, ORDER_CREATE, CLEAR_CREATE_ORDER_DATA, LOAD_ORDERS, LOAD_ONE_ORDER, SUCCESS, START, FAIL } from '../../constants'

let defaultState = {
  create_data: '',
  pages_count: 1,

  list: '',

  order: '',
  order_loading: true,

  order_comments: [],
  order_comments_loading: true,
  comments_length: 0,

  order_comments_pages_count: 1,

  send_comment_data: '',

  error: ''
}

const OrderReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case ORDER_CREATE + START:
      return Object.assign({}, state, { create_data: 'preloader' })
    case ORDER_CREATE + SUCCESS:
      return Object.assign({}, state, { create_data: response })

    case CLEAR_CREATE_ORDER_DATA:
      return Object.assign({}, state, { create_data: '' })

    case LOAD_ORDERS + START:
      return Object.assign({}, state, { list: 'preloader' })
    case LOAD_ORDERS + SUCCESS:
      return Object.assign({}, state, { list: response.res_list, pages_count: response.pages_count })

    case LOAD_ONE_ORDER + START:
      return Object.assign({}, state, { order_loading: true })
    case LOAD_ONE_ORDER + SUCCESS:
      return Object.assign({}, state, { order_loading: false, order: response})

    case LOAD_ORDER_COMMENTS + START:
      return Object.assign({}, state, { order_comments_loading: true })
    case LOAD_ORDER_COMMENTS + SUCCESS:
      return Object.assign({}, state, { order_comments_loading: false, order_comments: response.order_comments, order_comments_pages_count: response.pages_count, comments_count: response.comments_count})

    case ADD_ORDER_COMMENT:
      return Object.assign({}, state, {order_comments: [...state.order_comments, action.new_comment]})

    case CLEAR_ORDER_COMMENTS:
      return Object.assign({}, state, { order_comments: [] })

    case SEND_ORDER_COMMENT + START:
      return Object.assign({}, state, { send_comment_data: 'preloader' })
    case SEND_ORDER_COMMENT + SUCCESS:
      return Object.assign({}, state, { send_comment_data: response })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state

  }
}

export default OrderReducer
