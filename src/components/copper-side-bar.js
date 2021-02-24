      /* Copper: SideBar */
      import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
      const copperSideBarTagName = 'copper-side-bar';

      class CopperSideBar extends PolymerElement {
        static get template() {
          return html`
            <div>Side Bar</div>
          `;
        }
        
        handleClick() {
          alert('Ow!')
        }
      }

      customElements.define(copperSideBarTagName, CopperSideBar);