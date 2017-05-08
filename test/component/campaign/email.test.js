import React from 'react';
import EmailCampaign from '../../../app/components/campaign/email.js';

describe('<EmailCampaign />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<EmailCampaign />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});