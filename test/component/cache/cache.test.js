import React from 'react';
import Cache from '../../../app/components/cache/cache.js';

describe('<Cache />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Cache />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});