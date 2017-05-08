import React from 'react';
import Footer from '../../../app/components/footer/footer.jsx';
import Footerlist from '../../../app/components/footer/footerlist.jsx';

describe('<Footer />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Footer />);
  }); 

  it('Component is rendering', () => {
    expect(wrapper).to.exist;
  });

  it('should have footer items', () => {
    expect(wrapper.find(Footerlist)).to.have.length(1);
    expect(wrapper.find(Footerlist).shallow().find('.link')).to.have.length(4);
  });
  
});