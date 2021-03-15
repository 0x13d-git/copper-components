
/* 
  Copper: Sign Out
  Dependent on AWS Amplify library is loaded first  
*/
import { PolymerElement, html } from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';

const copperSignOutTagName = 'copper-signout';

class CopperSignOut extends PolymerElement {

  static get template() {
    return html`
        <h4>Sign Out</h4>
        <button id="signout" on-click="signOut">sign out</button>
        `;
  }

  signOut(e) {
    console.log("about to sign out")
    aws_amplify.Amplify.Auth.signOut()
    .then(data => {
      console.log("successfully sign out")
      console.log(data)
    }
    ).catch(error => {
      console.error('could not sign out');
      console.log(error)
    });

  }
}
customElements.define(copperSignOutTagName, CopperSignOut);