/** Minimal browser globals so wouter can resolve a location during server rendering. */
const noop = () => {};
const stubLocation = { pathname: "/", search: "", hash: "", href: "http://localhost/" };
Object.assign(globalThis, {
  location: stubLocation,
  history: { pushState: noop, replaceState: noop, state: null },
  addEventListener: noop,
  removeEventListener: noop,
  scrollTo: noop,
  window: { location: stubLocation, addEventListener: noop, removeEventListener: noop, scrollTo: noop },
  document: { body: { style: {} } },
});
