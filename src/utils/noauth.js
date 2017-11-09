import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { firebase, pathToJS } from 'react-redux-firebase';
import LoadingSpinner from '../components/LoadingSpinner';

const locationHelper = locationHelperBuilder({});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  AuthenticatingComponent: LoadingSpinner,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/Home',
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') === null,
  authenticatingSelector: ({ firebase }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined
})
