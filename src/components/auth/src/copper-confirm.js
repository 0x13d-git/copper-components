import { customElement, property, LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers'
import { store } from './store'
import { slice } from './reducer'

const _cc = window.cc

store.addReducers({
    slice
})

@customElement('copper-confirm')
export class CopperConfirmCode extends connect(store)(LitElement) {
    @property() message = 'Send: Confirmation';
    @property() count = 0;
    @property() displayConfirm = "none";

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
        <div style="display:${this.displayConfirm};">
            <h4>Confirm Sign Up</h4>
            username:
            <input type="text" id="confirmUser">
            <br />
            confirmation code:
            <input type="text" id="confirmCode">
            <br />
            <button id="confirm" @click="${this._confirmCode}">confirm</button>
            <br />
            Did not get it? Please type in username first then click button below.
            <button id="resend" @click="${this._resendCode}">resend confirmation code</button>
        </div>
        `
    }

    stateChanged(state) {
        //https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js                              
        _cc.amplify.Hub.listen('auth', (data) => {
            _cc.logger.info("stateChanged - confirmcode: " + data.payload.event)
            switch (data.payload.event) {
                case 'signUp':
                    this.displayConfirm = "block"
                    break;                
                default:
                    this.displayConfirm = "none"
                    break;                    
            }
        });
    }

    _confirmCode(e) {
        store.dispatch({  type: 'confirmCode', isAuth: false }) 
        var user = this.shadowRoot.getElementById("confirmUser").value
        var code = this.shadowRoot.getElementById("confirmCode").value
        console.log("about to confirm code")
        _cc.amplify.Auth.confirmSignUp(user, code)
        .then(data => {
            _cc.logger.info(data)
            _cc.amplify.Hub.dispatch('auth', { event: 'confirmCode'})
            store.dispatch({ type: 'valid', isAuth: true })      
        }).catch(error => {
            _cc.logger.error(error)
            store.dispatch({ type: 'valid', isAuth: false })          
        });

    }

    _resendCode(e) {        
        var user =  this.shadowRoot.getElementById("confirmUser").value
        _cc.amplify.Auth.resendSignUp(user)
        .then(data => {
            _cc.logger.info(data)
            store.dispatch({ type: 'resend', isAuth: true }) 
        }).catch(error => {
            _cc.logger.error(error)
            store.dispatch({ type: 'resend', isAuth: false })
        })
    }
}