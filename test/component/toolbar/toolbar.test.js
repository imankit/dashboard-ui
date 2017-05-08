import React from 'react';
import ToolBar from '../../../app/components/toolbar/toolbar.js';

describe('<ToolBar />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<ToolBar />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});