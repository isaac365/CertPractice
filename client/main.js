import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

import {routes, onAuthChange} from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

//Automatically reroute user if they aren't signed in
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

//Renders the application
Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
