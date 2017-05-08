import React from 'react';
import Profile from '../../../app/components/profile/profile.js';

describe('<Profile />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Profile />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});