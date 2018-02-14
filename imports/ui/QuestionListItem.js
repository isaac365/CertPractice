import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const QuestionListItem = (props) => {
  return (
    <div>
      <h5>{ props.question.title || 'Untitled question' }</h5>
      <p>{ moment(props.question.updatedAt).format('M/DD/YY') }</p>
    </div>
  );
};

QuestionListItem.propTypes = {
  question: PropTypes.object.isRequired
};

export default QuestionListItem;