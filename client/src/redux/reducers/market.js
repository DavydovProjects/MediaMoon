import { LOAD_MARKET_DATA, START, SUCCESS, FAIL } from '../../constants'

let defaultState={
  products_data: [],
  pages_count: 1
}


const MarketReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case LOAD_MARKET_DATA + START:
      return Object.assign({}, state, { products_data: 'preloader' })
    case LOAD_MARKET_DATA + SUCCESS:
    return Object.assign({}, state, { products_data: response[0], pages_count: response[1] })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to connect to the server!' })

    default:
      return state
  }
}

export default MarketReducer
