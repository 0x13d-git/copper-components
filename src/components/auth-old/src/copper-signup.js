import { customElement, property, LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers'
import { store } from './store'
import { slice } from './reducer'

const _cc = window.cc

store.addReducers({
    slice
})

@customElement('copper-signup')
export class CopperSignUp extends connect(store)(LitElement) {
    @property() message = 'Send: SignUp';
    @property() count = 0;
    @property() displaySignUp = "block";

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
        <div style="display:${this.displaySignUp};">
            <hr />
            <h4>Sign Up</h4>
            Email
            <BR/>
            <input type="email" name="remail" id="remail">
            <br />
            Username
            <BR/>
            <input type="text" id="reuser">           
            <br />
            Password
            <BR/>
            <input type="password" name="repass" id="repass">
            <br />
            <button class="fav-button" id="authSignUp" @click="${this._signUp}">Sign Up</button>
        </div>
        `
    }

    stateChanged(state) {
        //https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js                              
        _cc.amplify.Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signOut':
                    this.displaySignUp = "block"
                    break;
                default:
                    this.displaySignUp = "none"
                    break;                                     
            }
        });
    }

    _signUp(e) {
        store.dispatch({  type: 'signUp', isAuth: false }) 
        var email = this.shadowRoot.getElementById("remail").value        
        var pass = this.shadowRoot.getElementById("repass").value
        var uname = this.shadowRoot.getElementById("reuser").value
        _cc.amplify.Auth.signUp({
            username: uname,
            password: pass,
            attributes: {
                email: email // optional
            }
        }
        ).then(data => {
            _cc.logger.info(data)
            store.dispatch({ type: 'valid', isAuth: true })              

        }
        ).catch(error => {
            _cc.logger.error(error)
            store.dispatch({ type: 'valid', isAuth: false })            
        });

    }
}