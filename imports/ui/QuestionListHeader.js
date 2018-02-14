import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export const QuestionListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        props.meteorCall('questions.insert');
      }} >Create Study Question</button>
    </div>
  )
}; 

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, QuestionListHeader)