import React from 'react';
import App from '../../app/components/app.js';

describe('<App />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<App />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});