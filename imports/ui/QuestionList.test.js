import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {questions} from '../fixtures/fixtures';
import {QuestionList} from './QuestionList';

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