import { customElement, property, LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers'
import {store} from './store'
import {slice} from './reducer'

const _cc = window.cc

store.addReducers({
    slice
  })

@customElement('copper-signout')
export class CopperSignOut extends connect(store)(LitElement) {
    @property() message = 'Send: SignOut';
    @property() count = 0;
    @property() displaySignOut = "none";

    static get styles() {
      return css`
        .fav-button {
            border: 2px solid blue;
            --mdc-theme-primary: #f44336;
        }
      `;
    }

    render() {
        return html`
        <div style="display:${this.displaySignOut};">
          <h4>Sign Out</h4>
          <button class="fav-button" @click="${this._signout}">
            Sign Out
          </button>
        </div>
        `
    }

    stateChanged(state) { 
      //https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js                              
      _cc.amplify.Hub.listen('auth', (data) => {      
        switch (data.payload.event) {
          case 'signIn':
              this.displaySignOut = "block"       
              break;
          default:
            this.displaySignOut = "none"
              break;           
        }
      });
    }

    _signout(e) {       
      store.dispatch({ type: 'authd' })
      _cc.amplify.Auth.signOut()
      .then(data => {        
        _cc.logger.info("successfully signed out") 
        store.dispatch({ type: 'logOut', isAuth: false })
      }
      ).catch(error => {
        _cc.logger.error(error)
        store.dispatch({ type: 'logOut', isAuth: true })        
      });      
    }
}