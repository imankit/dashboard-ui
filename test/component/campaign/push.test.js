import React from 'react';
import PushCampaign from '../../../app/components/campaign/push.js';

describe('<PushCampaign />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<PushCampaign />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });
  
});