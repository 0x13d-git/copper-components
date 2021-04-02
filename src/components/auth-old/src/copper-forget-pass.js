import { customElement, property, LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers'
import { store } from './store'
import { slice } from './reducer'

const _cc = window.cc

store.addReducers({
    slice
})

@customElement('copper-forget-pass')
export class CopperForgetPass extends connect(store)(LitElement) {
    @property() message = 'Send: Forget Password';
    @property() count = 0;
    @property() displayQuestion = "block";
    @property() displaySendEmail = "none";
    @property() displayCodeForm = "none";

    static get styles() {
        return css`
        .fav-button {
            border: 2px solid blue;
            --mdc-theme-primary: #f44336;
        }

        a {
            color: blue;
            cursor: pointer;
          }
          /* mouse over link */
          a:hover {
            color: hotpink;
            cursor: pointer;
          }  
      `;
    }

    render() {
        return html`
        <!-- Initial view on page load -->
        <div style="display:${this.displayQuestion};">            
        forgot <a herf="#" @click="${this._displayQuestion}">password?</a>

            <!-- <button id="resend" @click="${this._displayQuestion}">Reset Password</button> -->
        </div>
        <!-- User selects to reset password. Will receive a code via email. -->
        <div style="display:${this.displaySendEmail};">
            <h4>Forgot My Password</h4>
            Username<BR/>            
            <input type="text" id="username">
            <br>       
            Click to send password reset code. Check your email.     
            <button class="fav-button" id="resend" @click="${this._sendCode}">Submit</button>
        </div>
        <!-- User changes password -->
        <div style="display:${this.displayCodeForm};">
            <h4>Reset My Password</h4>
            Username<BR/>
            <input type="text" id="username">
            <br>
            Code<BR/>
            <input type="text" name="code" id="code">
            <br>
            New Password<BR/>
            <input type="password" name="pass" id="pwd">
            <br>
            Click to change password
            <button class="fav-button" id="resend" @click="${this._forgetPassword}">Submit</button>
        </div>
        `
    }

    stateChanged(state) {
        //https://docs.amplify.aws/guides/authentication/listening-for-auth-events/q/platform/js                              
        _cc.amplify.Hub.listen('auth', (data) => {            
            switch (data.payload.event) {
                case 'forgotPassword':
                    this.displayQuestion = "none"
                    this.displaySendEmail = "none"
                    this.displayCodeForm = "block"
                    break;
                case 'signOut':
                    this.displayQuestion = "block"
                    this.displaySendEmail = "none"
                    this.displayCodeForm = "none"
                    break;                    
                case 'forgotPassword_failure':
                    _cc.logger.error(data)
                    this.displayQuestion = "none"
                    this.displaySendEmail = "block"
                    this.displayCodeForm = "none"
                    break;    
                case 'forgotPasswordSubmit_failure':
                    _cc.logger.error(data)
                    this.displayQuestion = "none"
                    this.displaySendEmail = "none"
                    this.displayCodeForm = "block"
                    break;                     
                default:
                    this.displayQuestion = "none"
                    this.displaySendEmail = "none"
                    this.displayCodeForm = "none"
                    break;                    
            }
        });
    }

    _displayQuestion(e) {
        store.dispatch({  type: 'forgetPassword', isAuth: false }) 
        this.displaySendEmail = "block"        
    }

    _sendCode(e) {        
        //send code
    }

    _forgetPassword(e) {
        //forget password
    }
}