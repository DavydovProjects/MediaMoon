import { BAN, UNBAN, CHECK_BAN, LOAD_BANS_LIST, SUCCESS, START, FAIL } from '../../constants'

let defaultState = {
  banned: 'False',

  list: [],
  list_loading: true
}

const BanReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case CHECK_BAN + START:
      return Object.assign({}, state, { banned: 'preloader' })
    case CHECK_BAN + SUCCESS:
      return Object.assign({}, state, { banned: response })

    case BAN + START:
      return Object.assign({}, state, { banned: 'preloader' })
    case BAN + SUCCESS:
      return Object.assign({}, state, { banned: response })

    case UNBAN + START:
      return Object.assign({}, state, { banned: 'preloader' })
    case UNBAN + SUCCESS:
      return Object.assign({}, state, { banned: response })

    case LOAD_BANS_LIST + START:
      return Object.assign({}, state, { list: [], list_loading: true })
    case LOAD_BANS_LIST + SUCCESS:
      return Object.assign({}, state, { list: response.list, list_loading: false })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state

  }
}

export default BanReducer
