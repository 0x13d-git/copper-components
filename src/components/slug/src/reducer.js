import {machine} from './machine'

const _cc = window.cc

// ReDuX ToolKit "Slice" - the actions and reducers just for this component

export function slice(state, action) {
  // In case we don't have a state
  if (typeof state === 'undefined') {
    return {
      count: 0
    }
  }

  switch (action.type) {
    case 'INCREMENT':
      let m = machine.withContext({ amount: state.count })
      let s = m.transition(machine.state, 'FILL')
      state.count = s.context.amount
      return state
    case 'DECREMENT':
      state.count - 1
      return state
    case 'SLUG':
      _cc.amplify.Hub.dispatch(
        'foo', 
        { 
          event: 'buttonClick', 
          data: state.count.toString(), 
          message:'NOTE: Telling anyone that cares that SLUG fired.' 
        }
      );

      //console.log(cc.logger)      	
      // Log messages will be written to the window's console.
      _cc.logger.info('/* Copper Slug: Logging Smoke Tests */')
      
      _cc.logger.info('* Amplify object keys', Object.keys(_cc.amplify))
      
      _cc.logger.info('* Change the primary theme color')
      document.querySelector('body').style.setProperty('--mdc-theme-primary', '#1d2d36')

      _cc.amplify.API.get("MyAPIGatewayAPI", "", {})
        .then(response => {
            _cc.logger.info('**Grab API Data**', JSON.stringify(response));

        })
        .catch(error => {
            _cc.logger.error(error);
        });
      
      _cc.logger.log('/* BEGIN example log statements */')
      _cc.logger.info('This is an info statement.')
      _cc.logger.warn('Warning statement!')
      _cc.logger.error('Example error message.')
      
      _cc.logger.log('/* END example log statements */')
      return state
    default:
      return state
  }
}