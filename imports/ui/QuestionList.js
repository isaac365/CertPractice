import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

import {studyQuestions} from '../api/questions';
import QuestionListHeader from './QuestionListHeader';
import QuestionListItem from './QuestionListItem';
import QuestionListEmptyItem from './QuestionListEmptyItem';

export const QuestionList = (props) => {
  return (
    <div>
      <QuestionListHeader/>
      {props.questions.length === 0 ? <QuestionListEmptyItem/> : undefined }
      {props.questions.map((question) => {
        return <QuestionListItem key={question._id} question={question} />;
      })}
      Question List {props.questions.length}
    </div>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('questions');

  return {
    questions: studyQuestions.find().fetch().map((question) => {
      return { 
        ...question,
        selected: question._id === selectedQuestionId
      };
    })
  };
}, QuestionList);
