import React from 'react';
import Notifications from '../../../app/components/feedback/feedback.js';

describe('<Notifications />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Notifications />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});