import {START, SUCCESS, FAIL} from '../../constants'
import React from 'react'
import  { Redirect } from 'react-router-dom'

const api = (store) => (next) => (action) =>{

  if (!action.call_api) return next(action)

  else{
    next({type: action.type + START})
    if (!action.file){
      if (!action.body){
        fetch('https://api.mediamoon.net/api' + action.call_api, {
            method: action.method,
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((res) => res.json())
        .then((response) => next({type: action.type + SUCCESS, response}))
        .catch(err => {
          next({type: FAIL, err})
        })
      }

      else{
        if (action.auth){
          fetch('https://api.mediamoon.net/api' + action.call_api, {
            method: action.method,
            body: JSON.stringify(action.body),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => res.json())
          .then((response) => {
            if (!response.error){
              localStorage.setItem('token', response.token)
              next({type: action.type + SUCCESS, response})
              return <Redirect to='/' />
            }
            else{
              next({type: action.type + SUCCESS, response})
            }
          })
          .catch(err => {
            next({type: FAIL, err})
          })
        }
        else{
          // console.log(action.body)
          fetch('https://api.mediamoon.net/api' + action.call_api, {
            method: action.method,
            body: JSON.stringify(action.body),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res) => res.json())
          .then((response) => {
            if (!response.error){
              // console.log(response)
              next({type: action.type + SUCCESS, response})
            }
            else{
              if (response.error === 'token is expired!' || response.error === 'token is invalid!' || response.error === 'Can not decode token!'){
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                next({type: action.type + SUCCESS, response})
              }
              else{
                next({type: action.type + SUCCESS, response})
              }
            }
          })
          .catch(err => {
            next({type: FAIL, err})
          })
        }
      }
    }
    else{
      fetch('https://api.mediamoon.net/api' + action.call_api, {
        method: 'POST',
        body: action.body
      })
      .then((res) => res.json())
      .then((response) => {
        if (!response.error){
          next({type: action.type + SUCCESS, response})
        }
        else{
          if (response.error === 'token is expired!' || response.error === 'token is invalid!' || response.error === 'Can not decode token!'){
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            next({type: action.type + SUCCESS, response})
          }
          else{
            next({type: action.type + SUCCESS, response})
          }
        }
      })
      .catch(err => {
        next({type: FAIL, err})
      })
    }
  }

}

export default api
