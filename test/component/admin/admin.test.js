import React from 'react';
import Admin from '../../../app/components/admin/admin.js';

describe('<Admin />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Admin />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});