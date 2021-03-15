# copper-components

## Abstract

Take the AmplifyJS web-components and wire them for use with an opinioned `<app-header>`.

## Problem Statement

There is little support for web-components when learning AmplifyJs. As a result the overall adoption rate of web-components is assumed to be lower do to lack of exposure and understanding. Maybe developers write poor front end code and many others shy away from front end technologies completely. An attempt should be made to flatten the learning curve surrounding solutions within the webb application space.

## Proposed Solution

`Copper-Components` will provide a simple starter project as well as maintain a library of examples.

## Quick Start

**!!!!TODO:** improve all of this Right now everthing is in the `/src/components/slug` folder but ideally the `/src/components/slug/snowpack.config.js` options will allow us to put everything at a more central level so we aren't copying it all to each component.

* navigate to `/src/components/slug`
* run `npm install`
* run `npm run start` - this will start the app on a dev server.
* run `npm run build` - this will build the app and place it in `build` for release
* Review the following call chain for details: 
  * `/src/components/slug/public/index.html` - is in the static `public` folder and doesn't change on build.
  * `/src/components/slug/src/index.js` - this is built, combined with the public folder contents and placed in `build`
  * `/src/components/slug/src/index/js` - imports `copper-slug` but could be any other dependencies that are needed/wanted.
  * From here you should be able to see how the `store`, `reducer`, and `machine` work to gether.
    * `copper-slug.js` brings in the common store and it's own reducer. It then uses the `lazyReducerEnhancer` from `pwa-helpers` to wire them together.
    * `reducer.js` in redux is what will be responsible for processing actions into a new immutable state. Here we bring in `machine.js` to handle those reductions
    * `machine.js` the `xstate` approach to statement machines.
