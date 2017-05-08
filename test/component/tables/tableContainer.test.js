import React from 'react';
import TableContainer from '../../../app/components/tables/tableContainer.js';

describe('<TableContainer />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<TableContainer />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});