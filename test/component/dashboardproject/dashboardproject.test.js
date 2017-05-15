import React from 'react';
import Dashboardproject from '../../../app/components/dashboardproject/dashboardproject.jsx';

describe('<Dashboardproject />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Dashboardproject />, themeContext);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});