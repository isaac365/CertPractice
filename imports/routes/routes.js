import { Meteor } from 'meteor/meteor';
import React from 'react';
import 'babel-polyfill';
import {Router, Route, browserHistory} from 'react-router';
import {Session} from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
//If user is logged in, redirect them to dashboard
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
//If user is not logged in, redirect them to homepage
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
//Maintains functionality through page refresh
const onEnterQuestionPage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    Session.set('selectedQuestionId', nextState.params.id);
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  console.log('isAuthenticated', isAuthenticated);

  if(isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterQuestionPage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);