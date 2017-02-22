/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {cloudBoostAPI,appSettings} from '../../../config';
import CopyToClipboard from 'react-copy-to-clipboard';
import Toggle from 'material-ui/Toggle';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/monokai';


class Custom extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            custom: {
                enabled: true
            },
            signupEmail: {
                enabled: false,
                allowOnlyVerifiedLogins: false,
                template: ""
            },
            resetPasswordEmail: {
                enabled: false,
                template: "",
                redirectURL: {
                    enabled: false,
                    URL: null
                }
            },
            preview:false
        }
    }
    componentWillMount(){
        if(this.props.customSettings){
            this.setState({ ...this.props.customSettings })
        }
    }
    toggleChangeHandler(which,e,val){
        this.state[which]['enabled'] = val
        this.setState(this.state)
        this.update()

    }
    nestedToggleChangeHandler(which,e,val){
        if(which == 'allowOnlyVerifiedLogins'){
            this.state['signupEmail']['allowOnlyVerifiedLogins'] = val
        } else {
            this.state['resetPasswordEmail']['redirectURL']['enabled'] = val
        }
        this.setState(this.state)
        this.update()
    }
    URLChangeHandler(e){
        this.state.resetPasswordEmail.redirectURL.URL = e.target.value
        this.setState(this.state)
        this.update()
    }
    ACEchangeHandler(which,value){
        this.state[which]['template'] = value
        this.setState(this.state)
        this.update()
    }
    togglePreview(which){
        this.setState({preview:which})
        this.update()
    }
    update(){
        setTimeout(()=>{
            this.props.updateSettingsFromChildComps(this.state)
        },100)
    }
    render() {
        return (
            <div className="push-box" style={{marginTop: 15}}>
                
                <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                    <div className="width:100%;">
                    <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                        <i className="fa fa-bars" style={{marginRight: 4}} />
                            Custom Authentication
                    </span>
                    </div>
                    <div className="width:100%;">
                    <span style={{fontSize: 14, color: 'white'}} />
                    </div>
                </div>

                <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7',borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                    <div style={{width: '60%', height: '100%', padding: 35}}>
                        <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Enable Custom Authentication</span>
                        <span className="smallp">Enable this option to have username and password authentication for your app.</span>
                    </div>
                    <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                        <Toggle
                            className="togglegeneral"
                            onToggle={ this.toggleChangeHandler.bind(this,'custom') }
                            toggled={ this.state.custom.enabled }
                        />
                    </div>
                    </div>
                </div>
                
                {/*Condition = if custom is enabled*/}
                <div className={ this.state.custom.enabled ?  '' : 'hide' }>

                    <div style={{borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                            <div style={{width: '60%', height: '100%', padding: 35}}>
                                <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Enable Sign up Email</span>
                                <span className="smallp">Enable this option to send an email after user signup.</span>
                            </div>
                            <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                <Toggle
                                    className="togglegeneral"
                                    onToggle={ this.toggleChangeHandler.bind(this,'signupEmail') }
                                    toggled={ this.state.signupEmail.enabled }
                                />
                            </div>
                            </div>
                        </div>

                        {/*Condition = if signupemail and custom enabled*/}
                        <div className={ this.state.custom.enabled &&  this.state.signupEmail.enabled ?  '' : 'hide' }>
                            <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                                <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '60%', height: '100%', padding: 35}}>
                                        <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Prevent logins if not verified</span>
                                        <span className="smallp">Enable this option to prevent user logins if their email is not verified.</span>
                                    </div>
                                    <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                        <Toggle
                                            className="togglegeneral"
                                            onToggle={ this.nestedToggleChangeHandler.bind(this,'allowOnlyVerifiedLogins') }
                                            toggled={ this.state.signupEmail.allowOnlyVerifiedLogins }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{width: '100%', height: 500, backgroundColor: '#FFF'}}>
                                <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '100%', height: '100%', padding: 35,textAlign: 'center'}}>
                                        <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>SignUp Email Template</span>
                                        <span className="smallp">This email template will be sent after the user sign up.</span>
                                        <button className="htmlprev" onClick={ this.togglePreview.bind(this,false) }>HTML</button>
                                        <button className="htmlprev" onClick={ this.togglePreview.bind(this,true) }>PREVIEW</button>
                                        <AceEditor
                                            mode="markdown"
                                            theme="monokai"
                                            onChange={this.ACEchangeHandler.bind(this,'signupEmail')}
                                            name="signupemail"
                                            className={ this.state.preview ? "hide":"signupemailace" }
                                            value={this.state.signupEmail.template || ''}
                                        />
                                        <iframe srcDoc={this.state.signupEmail.template || ''} frameBorder="0" className={ !this.state.preview ? "hide":"signupemailace" }></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Condition = if signupemail and custom enabled ======= END ==========*/}
                    </div>

                    <div>
                        <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                            <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                            <div style={{width: '60%', height: '100%', padding: 35}}>
                                <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Enable Reset Password Email</span>
                                <span className="smallp">Enable this option to send reset password emails to your user.</span>
                            </div>
                            <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                <Toggle
                                    className="togglegeneral"
                                    onToggle={ this.toggleChangeHandler.bind(this,'resetPasswordEmail') }
                                    toggled={ this.state.resetPasswordEmail.enabled }
                                />
                            </div>
                            </div>
                        </div>

                        {/*Condition = if forgot and custom enabled*/}
                        <div className={ this.state.custom.enabled &&  this.state.resetPasswordEmail.enabled ?  '' : 'hide' }>
                            <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                                <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '60%', height: '100%', padding: 35}}>
                                        <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Redirect to custom URL</span>
                                        <span className="smallp">Enable this option to redirect user to custom URL after successful password reset.</span>
                                    </div>
                                    <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                        <Toggle
                                            className="togglegeneral"
                                            onToggle={ this.nestedToggleChangeHandler.bind(this,'redirectURL') }
                                            toggled={ this.state.resetPasswordEmail.redirectURL.enabled }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}} className={ this.state.custom.enabled &&  this.state.resetPasswordEmail.enabled &&  this.state.resetPasswordEmail.redirectURL.enabled ?  '' : 'hide' }>
                                <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '60%', height: '100%', padding: 35}}>
                                        <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Redirect URL</span>
                                        <span className="smallp">This is the URL we redirect to after successful password reset.</span>
                                    </div>
                                    <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                        <input type="text" value={ this.state.resetPasswordEmail.redirectURL.URL || '' } onChange={ this.URLChangeHandler.bind(this) } className="emailinputcampaign" placeholder="Enter Redirect URL" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                                    </div>
                                </div>
                            </div>

                            <div style={{width: '100%', height: 500, backgroundColor: '#FFF'}}>
                                <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '100%', height: '100%', padding: 35,textAlign: 'center'}}>
                                        <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Reset Password Email Template</span>
                                        <span className="smallp">This email template will be sent after the user requests to reset the password.</span>
                                        <button className="htmlprev" onClick={ this.togglePreview.bind(this,false) }>HTML</button>
                                        <button className="htmlprev" onClick={ this.togglePreview.bind(this,true) }>PREVIEW</button>
                                        <AceEditor
                                            mode="markdown"
                                            theme="monokai"
                                            onChange={this.ACEchangeHandler.bind(this,'resetPasswordEmail')}
                                            name="resetPasswordEmail"
                                            className={ this.state.preview ? "hide":"signupemailace" }
                                            value={this.state.resetPasswordEmail.template || ''}
                                        />
                                        <iframe srcDoc={this.state.resetPasswordEmail.template || ''} frameBorder="0" className={ !this.state.preview ? "hide":"signupemailace" }></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*Condition = if forgot and custom enabled ======= END ==========*/}
                    </div>

                </div>
                {/*Condition = if custom is enabled ============= END ==================*/}


            </div>
        );
    }

}


export default Custom
