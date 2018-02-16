import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {questions} from '../fixtures/fixtures';
import {QuestionListItem} from './QuestionListItem';

if(Meteor.isClient) {
  describe('QuestionListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });
     
    it('should render question and timestamp', function () {
      const wrapper = mount(<QuestionListItem question={questions[0]} Session={Session} /> );

      expect(wrapper.find('h5').text()).toBe(questions[0].question);
      expect(wrapper.find('p').text()).toBe('2/03/17');
    });

    it('should set default question if no question set', function () {
      const wrapper = mount(<QuestionListItem question={questions[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled question');
    });

    it('should call set on click', function () {
      const wrapper = mount(<QuestionListItem question={questions[1]} Session={Session}/> );

      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalled('selectedQuestionId', questions[0].id);
    });
  });
};