/* 
  Copper: Confirm Code
  Dependent on AWS Amplify library is loaded first  
*/
import { PolymerElement, html } from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';

const copperConfirmCodeTagName = 'copper-confirm-code';

class CopperConfirmCode extends PolymerElement {

  static get template() {
    return html`
      <br />
      <h4>Confirm Sign Up</h4>
      username:
      <input type="text" id="confirmUser">
      <br />
      confirmation code:
      <input type="text" id="confirmCode">
      <br />
      <button id="confirm" on-click="confirmCode">confirm</button>
      <br />
      Did not get it? 
      <button id="resend" on-click="resendConfirmationCode">resend confirmation code</button>
      `;
  }

  confirmCode(e) {
    var user = this.$.confirmUser.value
    var code = this.$.confirmCode.value
    console.log("about to confirm code")
    aws_amplify.Amplify.Auth.confirmSignUp(user, code)
    .then(data => {
      console.log("successfully confirmed code")
      console.log(data)
    }).catch(error => {
      console.error('could not confirm code');
      console.log(error)
    });
  }

  resendConfirmationCode(e) {
    var user = this.$.confirmUser.value
    aws_amplify.Amplify.Auth.resendSignUp(user)
    .then(data => {
      console.log("successfully resent confirmation code")
      console.log(data)
    }).catch(error => {
      console.error('could not resend confirmation code');
      console.log(error)
    })
  }
}

customElements.define(copperConfirmCodeTagName, CopperConfirmCode);