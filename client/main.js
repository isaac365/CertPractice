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
  onAuthChange(isAuthenticated);
});

//Replaces route to question id
Tracker.autorun(() => {
  const selectedQuestionId = Session.get('selectedQuestionId');

  if(selectedQuestionId) {
    browserHistory.replace(`/dashboard/${selectedQuestionId}`);
  }
});

//Renders the application
Meteor.startup(() => {
  Session.set('selectedQuestionId', undefined)
  ReactDOM.render(routes, document.getElementById('app'));
});
