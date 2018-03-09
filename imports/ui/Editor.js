import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

import {studyQuestions} from '../api/questions';

export class Editor extends React.Component{
  constructor(props) {
    super(props);
      this.state = {
        question: '',
        answer1: '',
        wrong1: '',
        wrong2: '',
        wrong3: ''
    };
  }
  handleAnswerChange(e) {
    const answer1 = e.target.value;
    this.setState({answer1})
    this.props.call('questions.update', this.props.question._id, {answer1});
  }
  handleQuestionChange(e) {
    const question = e.target.value;
    this.setState({question});
    this.props.call('questions.update', this.props.question._id, {question});
  }
  handleWrongAnswer1Change(e) {
    const wrong1 = e.target.value;
    this.setState({wrong1});
    this.props.call('questions.update', this.props.question._id, {wrong1});
  }
  handleWrongAnswer2Change(e) {
    const wrong2 = e.target.value;
    this.setState({wrong2});
    this.props.call('questions.update', this.props.question._id, {wrong2});
  }
  handleWrongAnswer3Change(e) {
    const wrong3 = e.target.value;
    this.setState({wrong3});
    this.props.call('questions.update', this.props.question._id, {wrong3});
  }
  handleRemoval() {
    this.props.call('questions.remove', this.props.question._id);
    this.props.browserHistory.push('/courses/20764C/study');
  }
  componentDidUpdate(prevProps, preState) {
    const currentQuestionId = this.props.question ? this.props.question._id : undefined ;
    const prevQuestionId = prevProps.question ? prevProps.question._id : undefined ;

    if (currentQuestionId && currentQuestionId !== prevQuestionId) {
      this.setState({
        question: this.props.question.question,
        answer1: this.props.question.answer1,
        wrong1: this.props.question.wrong1,
        wrong2: this.props.question.wrong2,
        wrong3: this.props.question.wrong3,
      });
    }
  }
  render() {
    // Shuffle sort
    let shuffleSort = () => (0.5 - Math.random());

    // Get your textareas
    let txtAreas = Array.from(document.querySelectorAll('.random textarea'))

    // Define a few grid areas
    let styles = ["one", "two", "three", "four"];

    // Shuffle textareas and add the styles in order by index
    txtAreas.sort(shuffleSort).forEach((textarea, i) => {
      textarea.classList.add(styles[i])
    })

    if (this.props.question) {
      if(Meteor.userId() == this.props.question.userId) {
        return (
          <div className="editor">
            <textarea className="editor__question" value={this.state.question} placeholder="Untitled Question" onChange={this.handleQuestionChange.bind(this)}></textarea>
            <textarea className="editor__answers" value={this.state.answer1} placeholder="Your answer here" onChange={this.handleAnswerChange.bind(this)} ></textarea>
            <textarea className="editor__answers" value={this.state.wrong1} placeholder="Wrong answer here" onChange={this.handleWrongAnswer1Change.bind(this)} ></textarea>
            <textarea className="editor__answers" value={this.state.wrong2} placeholder="Wrong answer here" onChange={this.handleWrongAnswer2Change.bind(this)} ></textarea>
            <textarea className="editor__answers" value={this.state.wrong3} placeholder="Wrong answer here" onChange={this.handleWrongAnswer3Change.bind(this)} ></textarea>
            <div>
              <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Question</button>
            </div> 
          </div>
        );
      } else {
        return (

          
          
          <div className="editor">
            <textarea className="editor__question" spellCheck="false" readOnly placeholder={this.props.question.question}></textarea>

            <div className="random">
              <textarea className="editor__answers1 editor__right" spellCheck="false" readOnly placeholder={this.props.question.answer1}></textarea>
              <textarea className="editor__answers1 editor__wrong" spellCheck="false" readOnly placeholder={this.props.question.wrong1}></textarea>
              <textarea className="editor__answers1 editor__wrong" spellCheck="false" readOnly placeholder={this.props.question.wrong2}></textarea>
              <textarea className="editor__answers1 editor__wrong" spellCheck="false" readOnly placeholder={this.props.question.wrong3}></textarea>
            </div>
            
          </div>
        );
      }

    } else {
      return (
        <div className="editor">
        <p className="editor__message">{ this.props.selectedQuestionId ? 'Question not found' : 'Pick or create a question to get started'}</p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  question: PropTypes.object,
  selectedQuestionId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedQuestionId = Session.get('selectedQuestionId');

  return {
    selectedQuestionId,
    question: studyQuestions.findOne(selectedQuestionId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);