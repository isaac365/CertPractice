import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

export const QuestionListItem = (props) => {
  const className = props.question.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedQuestionId', props.question._id);
    }}>
      <h5 className="item__title" >{ props.question.question || 'Untitled question' }</h5>
      <p className="item__subtitle" >{ moment(props.question.updatedAt).format('M/DD/YY') }</p>
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