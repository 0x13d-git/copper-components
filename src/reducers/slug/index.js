import {cc} from '../../store/app'
import {machine} from '../../state_machines/slug'

// retrieved dynamically
const someContext = { amount: 42, };

const dynamicCounterMachine = machine.withContext(someContext);

// ReDuX ToolKit "Slice" - the actions and reducers just for this component

function counter(state, action) {
  if (typeof state === 'undefined') {
    return {
      count: 0,
      cc: cc
    }
  }

  switch (action.type) {
    case 'INCREMENT':
      state.count + 1
      return state
    case 'DECREMENT':
      state.count - 1
      return state
    case 'SLUG':
      state.cc.amplify.Hub.dispatch(
        'foo', 
        { 
          event: 'buttonClick', 
          data: state.count.toString(), 
          message:'NOTE: Telling anyone that cares that SLUG fired.' 
        }
      );

      //console.log(cc.logger)      	
      // Log messages will be written to the window's console.
      state.cc.logger.info('/* Copper Slug: Logging Smoke Tests */')
      
      state.cc.logger.info('* Amplify object keys')
      state.cc.logger.log(Object.keys(state.cc.amplify))
      
      state.cc.logger.info('* Change the primary theme color')
      document.querySelector('body').style.setProperty('--mdc-theme-primary', '#1d2d36')

      state.cc.logger.info('* Grab API Data')
      state.cc.amplify.API.get("MyAPIGatewayAPI", "", {})
        .then(response => {
            state.cc.logger.info(JSON.stringify(response));

        })
        .catch(error => {
            console.log(error);
        });
      
      state.cc.logger.log('/* BEGIN example log statements */')
      state.cc.logger.info('This is an info statement.')
      state.cc.logger.warn('Warning statement!')
      state.cc.logger.error('Example error message.')
      
      state.cc.logger.log('/* END example log statements */')
      return state
    default:
      return state
  }
}

export default counter