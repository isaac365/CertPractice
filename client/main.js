import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {browserHistory} from 'react-router';

import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

//Automatically reroute user if they aren't signed in
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

//Replaces route to question id
Tracker.autorun(() => {
  const selectedQuestionId = Session.get('selectedQuestionId');
  Session.set('isNavOpen', false);

  if(selectedQuestionId) {
    browserHistory.replace(`/dashboard/${selectedQuestionId}`);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
})

//Renders the application
Meteor.startup(() => {
  Session.set('selectedQuestionId', undefined);
  Session.set('isNavOpen', false);
  ReactDOM.render(routes, document.getElementById('app'));
});
