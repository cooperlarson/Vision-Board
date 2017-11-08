import React from 'react';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { pathToJS } from 'react-redux-firebase'
import { Loader } from 'react-loader';

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsAuthenticated = connectedRouterRedirect({
  // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectPath: '/',
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') && firebase.auth !== null,
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'auth') === undefined ||
    pathToJS(firebase, 'isInitializing') === true,
  AuthenticatingComponent: <div><Loader loaded={false} /></div>,
})

/**
 * @description Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  AuthenticatingComponent: <div><Loader loaded={false} /></div>,
  redirectPath: '/Home',
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') && firebase.auth === null,
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'auth') === undefined ||
    pathToJS(firebase, 'isInitializing') === true,
})

export default {
  UserIsAuthenticated,
  UserIsNotAuthenticated
}
