      /* Copper: Header 
        @SEE: https://jsbin.com/bopuhozupa/1/edit?html,output
      */

     import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
     import 'https://unpkg.com/@polymer/iron-icons/iron-icons.js?module';
     import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
     import 'https://unpkg.com/@polymer/app-layout/app-header/app-header.js?module';
     import 'https://unpkg.com/@polymer/app-layout/app-header-layout/app-header-layout.js?module';
     import 'https://unpkg.com/copper-components/src/components/foobar.js?module';
     import 'https://unpkg.com/copper-components/src/components/copper-header.js?module';

     const copperHeaderTagName = 'copper-header';

     class CopperHeader extends PolymerElement {
       
       // Define public API properties
       static get properties() { return { loggedIn: Boolean }}

       // Our HTML template
       static get template() {
         return html`
           <style>
               app-header {
                 background-color: #4285f4;
                 color: #fff;
               }
               
             .image-container {
                 width: 120px;
                 height: 120px;
                 margin: 0 15px -30px;
                 border-bottom-left-radius: 3px;
                 border-bottom-right-radius: 3px;
                 background-color: #2196F3;
                 @apply --shadow-elevation-2dp;
             }
             
             iron-icon {
               --iron-icon-height: 100px;
               --iron-icon-width: 100px;
               margin: 10px;
             }            
             
             [threshold-triggered] .image-container {
                 display: none;
             }  
             
             sample-content {
               margin-top: 56px;
             }
             
             paper-button {
               margin-bottom: 8px;
             }
         </style>
         <app-header-layout fullbleed has-scrolling-region>
             <app-header slot="header" threshold="72" fixed condenses>
               <div style="height:84px;"></div>
               <div style="height:72px;" sticky>
                 <div class="image-container">
                   <iron-icon icon="perm-media"></iron-icon>
                 </div>              
               </div>
             </app-header>
             <app-drawer id="drawer" swipe-open></app-drawer>
             <sample-content size="5"></sample-content>
             <paper-button on-tap="_swap">Next Page</paper-button>
             <br/><br/>
         </app-header-layout>
         `;
       }
       
       // Add methods to the element's public API
       handleClick() {
         alert('Ow!')
       }
     }
     window.customElements.define(copperHeaderTagName, CopperHeader);