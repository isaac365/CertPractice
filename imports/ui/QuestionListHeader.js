import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

export const QuestionListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        props.meteorCall('questions.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedQuestionId', res);
          }
        });
      }} >Create Study Question</button>
    </div>
  )
}; 

QuestionListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, QuestionListHeader)