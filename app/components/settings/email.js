/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {showAlert,updateSettings} from '../../actions';

//mui
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


class Email extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            mandrill: {
                apiKey: null,
                enabled: true
            },
            mailgun: {
                apiKey: null,
                domain: null,
                enabled: false
            },
            fromEmail: null,
            fromName: null
        }
    }
    componentWillMount(){
        if(this.props.emailSettings){
            this.setState({ ...this.props.emailSettings.settings })
        }
    }
    textChangeHandler(which,e){
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    mailKeysChangeHandler(mailType,which,e){
        this.state[mailType][which] = e.target.value
        this.setState(this.state)
    }
    selectMailType(e,val){
        if(val == 'mandrill'){
            this.setState({
                mandrill: {
                    enabled: true
                },
                mailgun: {
                    enabled: false
                }
            })
        } else this.setState({
                    mandrill: {
                        enabled: false
                    },
                    mailgun: {
                        enabled: true
                    }
                })
    }
    updateSettings(){
        if(this.state.mandrill.enabled){
            if(this.state.mandrill.apiKey && this.state.fromName && this.state.fromEmail){
                this.props.updateSettings(this.props.appData.appId,this.props.appData.masterKey,'email',{ ...this.state })
            } else showAlert('error','Please fill all the fields.')
        } else {
            if(this.state.mailgun.apiKey && this.state.mailgun.domain && this.state.fromName && this.state.fromEmail){
                this.props.updateSettings(this.props.appData.appId,this.props.appData.masterKey,'email',{ ...this.state })
            } else showAlert('error','Please fill all the fields.')
        }
    }
    render() {
        return (
            <div className="contentsubdiv" style={{fontFamily: 'Signika'}}>
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
                            <RadioButtonGroup name="mailtype" valueSelected={ this.state.mandrill.enabled ? 'mandrill' : 'mailgun' } onChange={ this.selectMailType.bind(this) }>
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

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}} className={ this.state.mandrill.enabled ? '' : 'hide' } >
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Mandrill API Key</span>
                            <span className="smallp">API Key of Mandrill email service.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.mandrill.apiKey || '' } onChange={ this.mailKeysChangeHandler.bind(this,'mandrill','apiKey') } className="emailinputcampaign" placeholder="Enter Mandrill API Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}} className={ this.state.mailgun.enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Mailgun API Key</span>
                            <span className="smallp">API Key of Mailgun email service.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.mailgun.apiKey || '' } onChange={ this.mailKeysChangeHandler.bind(this,'mailgun','apiKey') } className="emailinputcampaign" placeholder="Enter Mailgun API Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}} className={ this.state.mailgun.enabled ? '' : 'hide' }>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Mailgun Domain</span>
                            <span className="smallp">Domain listed in your Mailgun Dashboard.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.mailgun.domain || '' } onChange={ this.mailKeysChangeHandler.bind(this,'mailgun','domain') } className="emailinputcampaign" placeholder="Enter Mailgun Domain" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
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
                            <input value={ this.state.fromEmail || '' } onChange={ this.textChangeHandler.bind(this,'fromEmail') } type="text" className="emailinputcampaign" placeholder="Enter From Email" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
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
                            <input value={ this.state.fromName || '' } onChange={ this.textChangeHandler.bind(this,'fromName') } type="text" className="emailinputcampaign" placeholder="Enter From Name" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
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
                            onClick={ this.updateSettings.bind(this) }
                        />
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    let emailSettings = null
    if(state.settings.length){
        emailSettings = state.settings.filter(x => x.category == 'email')[0]
    }

    return {
        appData: state.manageApp,
        emailSettings:emailSettings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: (appId,masterKey,categoryName,settingsObject) => dispatch(updateSettings(appId,masterKey,categoryName,settingsObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Email)
