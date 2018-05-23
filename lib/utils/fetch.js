"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;
exports.fetchDataOnLocationMatch = fetchDataOnLocationMatch;
// from rfx stack


/**
  Fetch data from components mapping "static fetchData()"
  and injecting store, router params and query.
  Used on the server-side. It returns a Promise.
 */
function fetchData(store, components, params, query) {
  return Promise.all(components.map(function (component) {
    return component.fetchData ? component.fetchData(store, params, query) : false;
  }));
}

/**
  Fetch data from components when the router matches the borwser location.
  It also prevent the first page to re-fetch data already fetched from the server.
  Used on the client-side.
 */
function fetchDataOnLocationMatch(history, routes, match, store) {
  var ssrLocation = store.app.ssrLocation;
  history.listen(function (e) {
    if (e.pathname !== ssrLocation) {
      match({ routes: routes, location: e.pathname }, function (error, redirect, props) {
        if (props) fetchData(store, props.components, props.params, props.location.query);
      });
    }
    // enable subsequent fetches
    ssrLocation = false;
  });
}