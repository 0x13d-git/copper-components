import {machine} from './machine'

const _cc = window.cc

// ReDuX ToolKit "Slice" - the actions and reducers just for this component

export function slice(state, action) {
  // In case we don't have a state
  if (typeof state === 'undefined') {    
    let m = machine.withContext({ isAuth: state? state.isLoggedIn? true: false : false }) //whoa! -Elvis
    let s = m.transition(machine.state, 'isLoggedIn')
    var isAuth = false;
    if (s.value == 'authd') {
      isAuth = true
    }      
    return {
      isLoggedIn: isAuth,
      authStatus: s
    }
  } 
  var s = machine.transition(state.authStatus, action.type, { isAuth: action.isAuth }) 
  state.authStatus = s
  _cc.logger.info("xstate value: " + s.value)         
  return state  
}
