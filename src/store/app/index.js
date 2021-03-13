import { createStore } from 'redux'
import {cc} from '../../cc'


function app(state, action) {
  if (typeof state === 'undefined') {
    return {
      name: 'Default App Name',
      cc: cc
    }
  }

  switch (action.type) {
    case 'FOO':
      console.log(cc.logger)      	
      // Log messages will be written to the window's console.
      state.cc.logger.info('/* App Action Reducer: FOO Call */')
      
      return state
    default:
      return state
  }
}

export default createStore(app)