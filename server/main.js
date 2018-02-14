import { Meteor } from 'meteor/meteor';
import 'babel-polyfill';
import {WebApp} from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/questions';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

});