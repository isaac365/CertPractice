import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {QuestionListHeader} from './QuestionListHeader';
import {questions} from '../fixtures/fixtures';

if(Meteor.isClient) {
  describe('QuestionListHeader', function () {
    let meteorCall;
    let Session;

    beforeEach(function () {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });
    
    it('Should call meteorCall on click', function () {
      const wrapper = mount(<QuestionListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, questions[0]._id)
      expect(meteorCall.calls[0].arguments[0]).toBe('questions.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedQuestionId', questions[0]._id);
    });

    it('Should not set session for failed insert', function () {
      const wrapper = mount(<QuestionListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('questions.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}