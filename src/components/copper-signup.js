
/* 
  Copper: Sign up
  Dependent on AWS Amplify library is loaded first  
*/
import { PolymerElement, html } from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';

const copperSignUpTagName = 'copper-signup';

class CopperSignUp extends PolymerElement {

  static get template() {
    return html`
      <h4>Sign Up</h4>
      email:
      <input type="email" name="remail" id="remail">
      <br />
      password:
      <input type="password" name="repass" id="repass">
      <br />
      username:
      <input type="text" id="reuser">
      <br />
      <button id="authSignUp" on-click="signUp">Sign Up</button>
      `;
  }

  signUp(e) {
    var email = this.$.remail.value
    var pass = this.$.repass.value
    var uname = this.$.reuser.value
    console.log("about to sign up")
    aws_amplify.Amplify.Auth.signUp({
      username: uname,
      password: pass,
      attributes: {
        email: email // optional
      }
    }
    ).then(data => {
      console.log("successfully signed up")
      console.log(data)
    }
    ).catch(error => {
      console.error('could not sign up');
      console.log(error)
    });

  }
}
customElements.define(copperSignUpTagName, CopperSignUp);