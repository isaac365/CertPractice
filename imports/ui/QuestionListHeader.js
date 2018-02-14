import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const QuestionListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        props.meteorCall('questions.insert');
      }} >Create Study Question</button>
    </div>
  )
}; 

QuestionListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, QuestionListHeader)