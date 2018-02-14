import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

const QuestionListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedQuestionId', props.question._id);
    }}>
      <h5>{ props.question.title || 'Untitled question' }</h5>
      <p>{ moment(props.question.updatedAt).format('M/DD/YY') }</p>
    </div>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {Session};
}, QuestionListItem);