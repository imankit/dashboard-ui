import React from 'react';
import StorageAnalytics from '../../../app/components/analytics/storageAnalytics.js';

describe('<StorageAnalytics />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<StorageAnalytics />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});