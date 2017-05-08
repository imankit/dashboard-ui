import React from 'react';
import TableList from '../../../app/components/tables/tableList.js';

describe('<TableList />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<TableList />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});