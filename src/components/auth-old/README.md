# Copper: Auth

TODO: fill in test here

## Architectural Decision Record (ADR):

The temptation is to move things like `package-json` and `babel.config.json` to a root directory. However there's no guarantee that the component itself will need to conform to a certain implementation. Requiring each component to inherit style or dependencies is making assumptions about unknown requirements. For example a wrapper for the `ag-grid` web compoenent may require adopting many of the `ag-grid` conventions in order to work smoothly. In these scenarios the only requirement is that the wrapper provide enough wiring to allow access to the store/cc implementations and common styling of the component.