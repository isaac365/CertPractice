import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {QuestionListHeader} from './QuestionListHeader';

if(Meteor.isClient) {
  describe('QuestionListHeader', function () {
    
    it('Should call meteorCall on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<QuestionListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled('questions.insert');
    });
  });
}