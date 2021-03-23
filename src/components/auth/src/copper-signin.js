import { customElement, property, LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers'
import {store} from './store'
import {slice} from './reducer'

const _cc = window.cc

store.addReducers({
    slice
  })

@customElement('copper-signin')
export class CopperSignIn extends connect(store)(LitElement) {
    @property() message = 'Send: SignIn';
    @property() count = 0;
    @property() displaySignIn = "block";

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
        <div style="display:${this.displaySignIn};">
            <h4>Sign In</h4>
            Username:
            <input type="text" id="username">
            <br>
            Password:
            <input type="password" name="pass" id="pwd">
            <br>
            <button class="fav-button" @click="${this._signIn}">
              Sign In
            </button>
        </div>`
    }

    stateChanged(state) {
        //https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js
        _cc.amplify.Hub.listen('auth', (data) => {          
          switch (data.payload.event) {
            case 'signOut':
              this.displaySignIn = "block"
                break;
            case 'confirmCode':
              this.displaySignIn = "block"
              break;    
            default:
              this.displaySignIn = "none"
                break;            
          }

        });
      }

    _signIn(e) {     
      store.dispatch({  type: 'notAuthd', isAuth: false }) 
      var username = this.shadowRoot.getElementById("username").value
      var pass = this.shadowRoot.getElementById("pwd").value
      _cc.amplify.Auth.signIn(
        username, pass
      ).then(data => {        
        _cc.logger.info(data)
        store.dispatch({ type: 'logIn', isAuth: true })              
      }
      ).catch(error => {        
        _cc.logger.error(error)
        store.dispatch({ type: 'logIn', isAuth: false })          
      });                   
    }
}