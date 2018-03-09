import { Meteor } from 'meteor/meteor';
import React from 'react';
import 'babel-polyfill';
import {Router, Route, browserHistory} from 'react-router';
import {Session} from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import sql20764c from '../ui/courses/sql20764c';
import Study from '../ui/study';
import mssql20764c from '../ui/mssql20764c';

//Maintains functionality through page refresh
const onEnterQuestionPage = (nextState) => {
  Session.set('selectedQuestionId', nextState.params.id);
};
const onLeaveQuestionPage = () => {
  Session.set('selectedNoteId', undefined);
};

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth' ;

  if(isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange} >
      <Route path="/" component={Login} privacy="unauth" />
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterQuestionPage} onLeave={onLeaveQuestionPage} />
      <Route path="/courses/20764C" component={mssql20764c} privacy="auth"/>
      <Route path="/courses/20764C/study" component={Study} privacy="auth"/>
      <Route path="/courses/20764C/study/:id" component={Study} privacy="auth" onEnter={onEnterQuestionPage} onLeave={onLeaveQuestionPage} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);