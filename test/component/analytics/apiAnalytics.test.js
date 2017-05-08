import React from 'react';
import APIAnalytics from '../../../app/components/analytics/apiAnalytics.js';

describe('<APIAnalytics />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<APIAnalytics />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});