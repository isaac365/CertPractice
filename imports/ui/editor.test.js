import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {Editor} from './Editor';
import {questions} from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick question message', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or create a question to get started');
    });

    it('should render not found message', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedQuestionId={questions[0]._id} />);
      expect(wrapper.find('p').text()).toBe('Question not found');
    });

    it('should remove question', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedQuestionId={questions[0]._id} question={questions[0]} />);
      
      wrapper.find('button').simulate('click')
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('questions.remove', questions[0]._id);
    });

    it('should update questionon testarea change', function () {
      const newQuestion = 'this is a new answer';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedQuestionId={questions[0]._id} question={questions[0]} />);
      
      wrapper.find('input').simulate('change', {
        target: {
          value: newQuestion
        }
      });
      expect(wrapper.state('question')).toBe(newQuestion);
      expect(call).toHaveBeenCalledWith('questions.update', questions[0]._id, {question: newQuestion});

    });

    it('should set state for new question', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedQuestionId: questions[0]._id,
        question: questions[0],
        answer1: questions[0],
        wrong1: questions[0],
        wrong2: questions[0],
        wrong3: questions[0]
      });
      expect(wrapper.state('question')).toBe(questions[0].question);
      expect(wrapper.state('answer1')).toBe(questions[0].answer1);
      expect(wrapper.state('wrong1')).toBe(questions[0].wrong1);
      expect(wrapper.state('wrong2')).toBe(questions[0].wrong2);
      expect(wrapper.state('wrong3')).toBe(questions[0].wrong3);
    });

    it('should not set state if question prop is not provided', function () {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedQuestionId: questions[0]._id
      });
      expect(wrapper.state('question')).toBe('');
      expect(wrapper.state('answer1')).toBe('');
      expect(wrapper.state('wrong1')).toBe('');
      expect(wrapper.state('wrong2')).toBe('');
      expect(wrapper.state('wrong3')).toBe('');
    });
  });

}
