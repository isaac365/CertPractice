import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
  
    it('should use title prop as h1 text', function () {
      const title = 'test title here';
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}} />)
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    });

    it('should call handleLogout on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Title" handleLogout={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
  });
}