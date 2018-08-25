const logger = (store) => (next) => (action) =>{
  next(action)
  console.log("Action fired:", action)
}

export default logger
