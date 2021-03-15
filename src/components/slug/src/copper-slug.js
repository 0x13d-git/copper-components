import { customElement, property, LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers'
import {store} from './store'
import {slice} from './reducer'

const _cc = window.cc

store.addReducers({
    slice
  })

@customElement('copper-slug')
export class CopperSlug extends connect(store)(LitElement) {
    @property() message = 'Send: SLUG';
    @property() count = 0;

    static get styles() {
      return css`
        .fav-button {
            border: 2px solid blue;
        }
      `;
    }

    render() {
        return html`
        <div>
            <h2 "mdc-typography--headline2">Copper: Slug</h2>
            <h3 "mdc-typography--headline3">A test component that is very loud, slow, and tries to touch every part of the <a href="#"><strong><em>cc</em></strong></a> library.</h3>
            <div class="mdc-typography--body1">
            <p>The following button will kick off a series of steps to trigger parts of the application shell. Open the developer's console to observe output statements.</p>
            <p><small>*a progress indicator will be displayed in this space once the test begins.</small></p>
            <button class="fav-button" @click="${() => store.dispatch({ type: 'SLUG' })}">
                ${this.message}
            </button>
            <hr />
            <button class="fav-button" @click="${() => store.dispatch({ type: 'INCREMENT' })}">
                Click to increase count: ${this.count}
            </button>

            <hr />
            <button class="fav-button" @click="${() => {store.dispatch({ type: 'FOO' })}}">
                Call 'FOO' from the app actions.
            </button>
            </div>
            <hr />
            <p>We get the full state so we can show things like the 'name' property from another slice. In this case the app slice.: <strong>${store.getState().app.name}</strong></p>
            <small>Might we worth making this a helper in the utils that will do a safe get for a property, log if it can't be found, and return a -1.</small>
        </div>`
    }

    stateChanged(state) {
        this.count = state.slice.count
        _cc.logger.info('Copper-Slug Log: Example of listening to state changes via redux.', state)
    }
}