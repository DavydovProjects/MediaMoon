import { CLEAR_SETTINGS_ACCOUNT, SETTINGS_ACCOUNT, SETTINGS_PASSWORD, SETTINGS_IMAGES_AVATAR_SAVE, SETTINGS_IMAGES_AVATAR_REMOVE, SETTINGS_IMAGES_WALLPAPER_SAVE, SETTINGS_IMAGES_WALLPAPER_REMOVE, SETTINGS_COMMUNICATION, START, SUCCESS, FAIL } from '../../constants'

let defaultState = {
  account: '',
  account_loading: true,

  password: '',
  password_loading: false,

  images_avatar: '',
  images_loading_avatar: true,

  images_wallpaper: '',
  images_loading_wallpaper: true,

  communication: '',
  communication_loading: false
}


const SettingsReducer=(state=defaultState,action)=>{
  const {type, response} = action
  switch(type){

    case SETTINGS_ACCOUNT + START:
      return Object.assign({}, state, { account: '', account_loading: true })
    case SETTINGS_ACCOUNT + SUCCESS:
      return Object.assign({}, state, { account: response, account_loading: false  })

    case SETTINGS_PASSWORD + START:
      return Object.assign({}, state, { password: '', password_loading: true })
    case SETTINGS_PASSWORD + SUCCESS:
      return Object.assign({}, state, { password: response, password_loading: false  })

    case SETTINGS_IMAGES_AVATAR_SAVE + START:
      return Object.assign({}, state, { images_avatar: 'Loading...', images_loading_avatar: true })
    case SETTINGS_IMAGES_AVATAR_SAVE + SUCCESS:
      return Object.assign({}, state, { images_avatar: response, images_loading_avatar: false  })

    case SETTINGS_IMAGES_AVATAR_REMOVE + START:
      return Object.assign({}, state, { images_avatar: 'Loading...', images_loading_avatar: true })
    case SETTINGS_IMAGES_AVATAR_REMOVE + SUCCESS:
      return Object.assign({}, state, { images_avatar: response, images_loading_avatar: false  })

    case SETTINGS_IMAGES_WALLPAPER_SAVE + START:
      return Object.assign({}, state, { images_wallpaper: 'Loading...', images_loading_wallpaper: true })
    case SETTINGS_IMAGES_WALLPAPER_SAVE + SUCCESS:
      return Object.assign({}, state, { images_wallpaper: response, images_loading_wallpaper: false  })

    case SETTINGS_IMAGES_WALLPAPER_REMOVE + START:
      return Object.assign({}, state, { images_wallpaper: 'Loading...', images_loading_wallpaper: true })
    case SETTINGS_IMAGES_WALLPAPER_REMOVE + SUCCESS:
      return Object.assign({}, state, { images_wallpaper: response, images_loading_wallpaper: false  })

    case SETTINGS_COMMUNICATION + START:
      return Object.assign({}, state, { communication: '', communication_loading: true })
    case SETTINGS_COMMUNICATION + SUCCESS:
      return Object.assign({}, state, { communication: response, communication_loading: false  })

    case CLEAR_SETTINGS_ACCOUNT:
    return Object.assign({}, state, { account: '', account_loading: true })

    case FAIL:
      return Object.assign({}, state, { error: 'Failed to load data!' })

    default:
      return state
  }
}

export default SettingsReducer
