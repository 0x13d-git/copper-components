
/* 
  Copper: Sign In
  Dependent on AWS Amplify library is loaded first  
*/
import { PolymerElement, html } from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';

const copperSignInTagName = 'copper-signin';

class CopperSignIn extends PolymerElement {

  static get template() {
    return html`
        <h4>Sign In</h4>
        Username:
        <input type="text" id="username">
        <br>
        Password:
        <input type="password" name="pass" id="pwd">
        <br>
        <button id="authSignIn" on-click="signIn">Sign In</button>
        `;
  }

  signIn(e) {
    var username = this.$.username.value
    var pass = this.$.pwd.value
    console.log("about to sign in")
    aws_amplify.Amplify.Auth.signIn(
      username, pass
    ).then(data => {
      console.log("successfully signed in")
      console.log(data)
    }
    ).catch(error => {
      console.error('could not sign in');
      console.log(error)
    });

  }
}
customElements.define(copperSignInTagName, CopperSignIn);