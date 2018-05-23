import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react';
// import contextTypes from './contextTypes';

const contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export class ContextProvider extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    context: PropTypes.shape(contextTypes),
  };

  static childContextTypes = contextTypes;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props && this.props.children;
  }
}

/**
 * Decorate components with context and observable
 * @param component
 * @returns {Function|Class}
 */
export function connect(component) {
  if (!component) return contextTypes;
  Object.assign(component, { contextTypes });
  return observer(component);
}
