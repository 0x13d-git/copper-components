      /* Copper: Footer */
      import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
      const copperFooterTagName = 'copper-footer';

      class CopperFooter extends PolymerElement {
        static get template() {
          return html`
            <div>Footer</div>
          `;
        }
        
        handleClick() {
          alert('Ow!')
        }
      }
      customElements.define(copperFooterTagName, CopperFooter);