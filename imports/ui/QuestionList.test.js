import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {QuestionList} from './QuestionList';

const questions = [
  {
    _id: 'questionId1',
    question: 'Test question',
    answer1: '',
    wrong1: '',
    wrong2: '',
    wrong3: '',
    updatedAt: 0,
    userId: 'userId1'
  }, {
    _id: 'questionId2',
    question: 'Test question',
    answer1: '',
    wrong1: '',
    wrong2: '',
    wrong3: '',
    updatedAt: 0,
    userId: 'userId2'
  }
];

if (Meteor.isClient) {
  describe('QuestionList', function () {

    it('should render QuestionListItem for each question', function () {
      const wrapper = mount (<QuestionList questions={questions}/>);

      expect(wrapper.find('QuestionListItem').length).toBe(2);
      expect(wrapper.find('QuestionListEmptyItem').length).toBe(0);
    });

    it('should render QuestionListEmptyItem if zero question', function () {
      const wrapper = mount (<QuestionList questions={[]}/>);

      expect(wrapper.find('QuestionListItem').length).toBe(0);
      expect(wrapper.find('QuestionListEmptyItem').length).toBe(1);
    });

  });
}