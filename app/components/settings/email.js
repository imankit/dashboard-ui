/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {} from '../../actions';

//mui
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class Email extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            mailType:'mandrill'
        }
    }
    componentWillMount(){

    }
    selectMailType(e,val){
        this.setState({mailType:val})
    }
    render() {

        return (
            <div className="contentsubdiv">
                <div style={{width: '100%'}} className="solo-horizontal-center">
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>Email Settings</span>
                </div>
                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Email Provider</span>
                            <span className="smallp">Choose an email provider that you want to send emails with</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <RadioButtonGroup name="mailtype" valueSelected={ this.state.mailType } onChange={ this.selectMailType.bind(this) }>
                                <RadioButton
                                    value="mandrill"
                                    label="Mandrill"
                                />
                                <RadioButton
                                    value="mailgun"
                                    label="Mailgun"
                                />
                            </RadioButtonGroup>
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}} className={ this.state.mailType == 'mandrill' ? '' : 'hide' } >
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Mandrill API Key</span>
                            <span className="smallp">API Key of Mandrill email service.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Mandrill API Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}} className={ this.state.mailType == 'mailgun' ? '' : 'hide' }>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Mailgun API Key</span>
                            <span className="smallp">API Key of Mailgun email service.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Mailgun API Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}} className={ this.state.mailType == 'mailgun' ? '' : 'hide' }>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Mailgun Domain</span>
                            <span className="smallp">Domain listed in your Mailgun Dashboard.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Mailgun Domain" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>From Email</span>
                            <span className="smallp">Email address which you want an email to be sent from.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter From Email" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>From Name</span>
                            <span className="smallp">Name you want an email to be sent from.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter From Name" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                </div>
                <div style={{width: '100%', height: 50, marginTop: 15, marginBottom: 40}}> 
                    <div style={{width: '100%', height: '100%'}} className="flex-general-column-wrapper-center">
                    <div className="solo-vertical-center" style={{height: '100%'}}>
                        <RaisedButton
                            label="Save"
                            labelPosition="before"
                            primary={true}
                            className="emailcampbtn"
                        />
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);
