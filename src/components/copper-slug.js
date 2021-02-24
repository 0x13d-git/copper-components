      /* Copper Slug: The most basic component you can drop in a page to test wiring. */
      import {PolymerElement, html} from 'https://unpkg.com/@polymer/polymer/polymer-element.js?module';
      const copperSlugTagName = 'copper-slug';

      class CopperSlug extends PolymerElement {
        static get template() {
          return html`
            <button on-click="handleClick">Kick Me</button>
          `;
        }
        
        handleClick() {
          alert('Ow!')
        }
      }
      customElements.define(copperSlugTagName, CopperSlug);