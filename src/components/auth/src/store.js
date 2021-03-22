import { createStore, compose, combineReducers } from 'redux'
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

const _cc = window.cc

function app(state, action) {
  if (typeof state === 'undefined') {
    return {
      name: 'Default App Name',
    }
  }

  switch (action.type) {
    case 'LOGGING_IN':  
      console.log("store listening login")      
      return state
    case 'LOGGING_OUT':          
      console.log("store listening log out")
      return state
    default:
      return state  
  }
}


let lazyStore = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer(combineReducers))
);

lazyStore.addReducers({
  app
});

export const store = lazyStore