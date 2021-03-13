import { LitElement, html, property, customElement } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module'
import { connect, lazyReducerEnhancer } from 'https://unpkg.com/pwa-helpers@0.9.1/pwa-helpers.js'
import {slugSlice} from '../../reducers/slug'

store.addReducers({
    slugSlice
  })
class CopperSlug extends connect(store)(LitElement) {
    render() {
        return html`
        <div>
            <h2 "mdc-typography--headline2">Copper: Slug</h2>
            <h3 "mdc-typography--headline3">A test component that is very loud, slow, and tries to touch every part of the <a href="#"><strong><em>cc</em></strong></a> library.</h3>
            <div class="mdc-typography--body1">
            <p>The following button will kick off a series of steps to trigger parts of the application shell. Open the developer's console to observe output statements.</p>
            <p><small>*a progress indicator will be displayed in this space once the test begins.</small></p>
            <button class="fav-button" @click="${() => store.dispatch({ type: 'SLUG' })}">
                Press Me!
            </button>
            </div>
        </div>`
    }

    stateChanged(state) {
        this.textContent = state.toString()
        state.cc.logger.info('NOTE: Copper Slug sees state changes.')
    }
}

customElements.define('copper-slug', CopperSlug);