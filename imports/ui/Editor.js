import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';

import {studyQuestions} from '../api/questions';

export class Editor extends React.Component{
  handleAnswerChange(e) {
    this.props.call('questions.update', this.props.question._id, {
      answer1: e.target.value
    });
  }
  handleQuestionChange(e) {
    this.props.call('questions.update', this.props.question._id, {
      question: e.target.value
    });
  }
  handleWrongAnswer1Change(e) {
    this.props.call('questions.update', this.props.question._id, {
      wrong1: e.target.value
    });
  }
  handleWrongAnswer2Change(e) {
    this.props.call('questions.update', this.props.question._id, {
      wrong2: e.target.value
    });
  }
  handleWrongAnswer3Change(e) {
    this.props.call('questions.update', this.props.question._id, {
      wrong3: e.target.value
    });
  }
  
  render() {
    if (this.props.question) {
      return (
        <div>
          <input value={this.props.question.question} placeholder="Untitled Question" onChange={this.handleQuestionChange.bind(this)}/>
          <textarea value={this.props.question.answer1} placeholder="Your answer here" onChange={this.handleAnswerChange.bind(this)} ></textarea>
          <textarea value={this.props.question.wrong1} placeholder="Wrong answer here" onChange={this.handleWrongAnswer1Change.bind(this)} ></textarea>
          <textarea value={this.props.question.wrong2} placeholder="Wrong answer here" onChange={this.handleWrongAnswer2Change.bind(this)} ></textarea>
          <textarea value={this.props.question.wrong3} placeholder="Wrong answer here" onChange={this.handleWrongAnswer3Change.bind(this)} ></textarea>
          <button>Delete Question</button>
        </div>
      );
    } else {
      return (
        <p>{ this.props.selectedQuestionId ? 'Question not found' : 'Pick or create a question to get started'}</p>
      );
    }
  }
};

Editor.propTypes = {
  question: PropTypes.object,
  selectedQuestionId: PropTypes.string
};

export default createContainer(() => {
  const selectedQuestionId = Session.get('selectedQuestionId');

  return {
    selectedQuestionId,
    question: studyQuestions.findOne(selectedQuestionId),
    call: Meteor.call
  };
}, Editor);