import React from 'react';
import AppSelected from '../../app/components/appSelected.js';

describe('<AppSelected />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<AppSelected />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});