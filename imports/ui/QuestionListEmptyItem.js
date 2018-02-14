import React from 'react';
import {Meteor} from 'meteor/meteor';

const QuestionListEmptyItem = () => {
  return (
    <div>
      <h5>There are no study questions available</h5>
      <p>Create a study question</p>
    </div>
  )
};

export default QuestionListEmptyItem;