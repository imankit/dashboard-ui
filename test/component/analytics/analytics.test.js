import React from 'react';
import Analytics from '../../../app/components/analytics/analytics.js';

describe('<Analytics />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Analytics />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});