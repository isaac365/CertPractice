import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import QuestionListItem from './QuestionListItem';

if(Meteor.isClient) {
  describe('QuestionListItem', function () {
     
    it('should render title and timestamp', function () {
      const title = 'My test title';
      const updatedAt = 1486137505429;
      const wrapper = mount(<QuestionListItem question={{title, updatedAt}}/> );

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('2/03/17');
    });

    it('should set default question if no question set', function () {
      const title = '';
      const updatedAt = 1486137505429;
      const wrapper = mount(<QuestionListItem question={{title, updatedAt}}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled question');
    });
  });
};