import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { firebase, pathToJS } from 'react-redux-firebase';
import LoadingSpinner from '../components/LoadingSpinner';


const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: true,
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') !== null,
  authenticatingSelector: ({ firebase: { auth } }) =>
    pathToJS(firebase, 'isInitializing') === true ||
    pathToJS(firebase, 'auth') === undefined,
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsAuthenticated',
});
