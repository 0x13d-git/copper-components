/* Copper Components Core (cc)
    abstract:
        A Redux store for AmplifyJS which uses xState for reducers.
        Functionality can be extended using Redux slices
    by: 00110001 00110011 01000100
*/
 
/* Logging: Logdown  */
import logdown from "logdown"
/* Redux */
import { createStore, combineReducers } from 'redux'
/* MomentJs */
import moment from 'moment';
/* LoDash */
import lodash from 'lodash'
/* SASS Styling
* It would be good to have an elegant solution for SASS complilation in browser and storage local. This would help primarily to recreate CSSZenGarden
* @SEE: https://code.sololearn.com/WKNQYtDaiK6q/?ref=app
*/
// import Sass from 'sass'
/* AWS Amplify */
//import Amplify, { Auth } from 'aws-amplify'
/* PWA Helpers */
// import { connect, lazyReducerEnhancer, installRouter, updateMetadata, installOfflineWatcher } from 'pwa-helpers'
/* xState */
// @see: https://xstate.js.org/docs/guides/context.html#initial-context
import { Machine, assign } from 'xstate'

class cc {
    constructor(params) {
        this.logger = params.logger
        this.settings = params.settings
        this.amplify = params.amplify
        this.pwa = params.pwa
        this.moment = params.moment
        this.lodash = params.lodash
        this.sass = params.sass
        this.xstate = params.xstate
    }

    /* Quality of Life Helper(s) */
    getUser() {}
}

const params = {
  logger: logdown('cc'),
  amplify: null, //Amplify,
  settings: {
    content: [],
    files: [],
    media: [],
    theme: [],
    models: []
  },
  // pwa: {
  //   connect: connect,
  //   lazyReducerEnhancer: lazyReducerEnhancer,
  //   installRouter: installRouter,
  //   updateMetadata: updateMetadata,
  //   installOfflineWatcher: installOfflineWatcher
  // },
  moment: moment,
  lodash: lodash,
  sass: null, // Sass,
  xstate: {
    Machine: Machine,
    assign: assign
  }
}

export default cc
