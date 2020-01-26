import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { StateProvider } from './state'
import App from './app'
import './index.css'
import AppTest from './component-test'

function Index() {
  let initialState = {
    auth: {
      isAuthenticated: false,
      token: '',
      user: {}
    },
    components: {
      queue: true,
      audioState: false,
      search: true,
      results: false,
      miniPlayer: true,
      fullPlayer: false,
      playlist: true,
      playlistItems: false
    },
    display: {
      title: '',
      id: '',
      channelTitle: ''
    },
    queue: [],
    playlistObj: {
      id: '',
      snippet: {}
    },
    channelId: 'UC7Zyh4_j6BZEZtjnuS-PMOg'
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'manage':
        return {
          ...state,
          components: action.components
        }
      case 'login':
        return {
          ...state,
          auth: action.auth
        }
      case 'select':
        return {
          ...state,
          display: action.display
        }
      case 'addtoq':
        return {
          ...state,
          queue: action.queue
        }
      case 'cId':
        return {
          ...state,
          channelId: action.channelId
        }
      case 'pId':
        return {
          ...state,
          playlistObj: action.playlistObj
        }
      default:
        return state
    }
  }

  const googleSuccess = res => {
    initialState.auth.isAuthenticated = true
    initialState.auth.token = res.Zi.access_token
    initialState.auth.user = res.w3.ig

    localStorage.setItem('YTP-token', res.Zi.access_token)
    localStorage.setItem('YTP-user', res.w3.ig)
    window.location.href = '/'
  }
  const googleFailure = res => {
    console.log(res)
  }

  const logout = () => {
    window.location.href = '/'
    localStorage.removeItem('token')
  }

  useEffect(() => {
    console.log(initialState.queue)
  }, [initialState.queue])

  useEffect(() => {
    let authorize = localStorage.getItem('YTP-token')
    if (authorize) {
      initialState.auth.isAuthenticated = true
      console.log('Welcome to YT Player')
      console.log('Auth Status ->', initialState.auth.isAuthenticated)
      console.log('channelFetchId ->', initialState.channelId)
    }
    if (!initialState.display.id) {
      initialState.components.fullPlayer = false
    }
  }, [initialState.auth.isAuthenticated, initialState.channelId])

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {/* <AppTest queue={initialState.queue} /> */}
      <App
        googleSuccess={googleSuccess}
        googleFailure={googleFailure}
        logout={logout}
      />
    </StateProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
