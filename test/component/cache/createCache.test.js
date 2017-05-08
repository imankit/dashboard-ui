import React from 'react';
import CreateCache from '../../../app/components/cache/createCache.js';

describe('<CreateCache />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<CreateCache />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});