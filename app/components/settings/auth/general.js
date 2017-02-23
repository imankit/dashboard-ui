/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import { cloudBoostAPI, appSettings } from '../../../config';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TwitterPicker } from 'react-color';


class General extends React.Component {

    constructor(props) {
        super(props)
        this.state = appSettings.authSettings.settings.general
    }
    componentWillMount() {
        if (this.props.generalSettings) {
            this.setState({ ...this.props.generalSettings })
        }
    }
    URLChangeHandler(e) {
        this.state.callbackURL = e.target.value
        this.setState(this.state)
        this.update()
    }
    colorChangeHandler(color) {
        this.state.primaryColor = color.hex
        this.setState(this.state)
        this.update()
    }
    update() {
        setTimeout(() => {
            this.props.updateSettingsFromChildComps({ general: this.state })
        }, 100)
    }
    render() {
        let loginPageURL = cloudBoostAPI + "/page/" + this.props.appData.appId + "/authentication"
        return (
            <div className="push-box" style={{ marginTop: 15 }}>

                <div style={{ width: '100%', marginTop: 25, backgroundColor: '#169cee', padding: '5px' }} className="flex-general-column-wrapper-center">
                    <div className="width:100%;">
                        <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                            <i className="ion ion-gear-b" style={{ marginRight: 4 }} />
                            General Settings
                    </span>
                    </div>
                    <div className="width:100%;">
                        <span style={{ fontSize: 14, color: 'white' }} />
                    </div>
                </div>

                <div style={{ width: '100%', height: 100, backgroundColor: '#FFF', borderBottom: '1px solid #C4C2C2' }}>
                    <div style={{ width: '100%', height: '100%' }} className="flex-general-row-wrapper">
                        <div style={{ width: '100%', height: '100%', padding: 35 }}>
                            <span style={{ color: '#353446', fontSize: 16, fontWeight: 700 }}>Your Authentication Page</span>
                            <span className="smallp">This is the login and sign up page that you can use for your app.</span>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid' }} className="flex-general-row-wrapper">
                    <div style={{ width: '10%', marginLeft: 10, height: '100%', fontSize: 15, color: 'black', paddingLeft: 5 }} className="solo-vertical-center">
                        Login URL
                    </div>
                    <div className="solo-vertical-center" style={{ width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6 }}>
                        <div style={{ paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA', wordBreak: 'break-word' }} className="solo-vertical-center" >
                            {loginPageURL || ''}
                        </div>
                    </div>
                    <CopyToClipboard text={loginPageURL || ''}>
                        <div className="flex-general-column-wrapper-center" style={{ width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6 }}>
                            <div className="flex-general-column-wrapper-center" >
                                <i className="icon ion-ios-copy-outline" style={{ fontSize: 19 }} />
                            </div>
                        </div>
                    </CopyToClipboard>
                </div>

                <div style={{ width: '100%', height: 500, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2' }}>
                    <div style={{ width: '100%', height: '100%' }} className="flex-general-row-wrapper">
                        <div style={{ width: '100%', height: '100%' }}>
                            <div style={{ width: '100%', height: 540, overflowY: 'auto' }}>
                                <div className="flex-general-column-wrapper-center" style={{ height: '100%', position: 'relative' }}>
                                    {/*Login or Sing Up form*/}
                                    <div id="authenticate-card" style={{ width: 300, marginTop: '-50px' }}>
                                        <div className style={{ height: 'auto', borderRadius: 2, border: '1px solid #BAB8B8' }}>
                                            {/*Header*/}
                                            <div style={{ width: '100%', height: 117, backgroundColor: '#dddddd', padding: 15 }}>
                                                <div style={{ width: '100%' }} className="flex-general-column-wrapper-center">
                                                    <div style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }}>
                                                        <img src={this.props.appIcon ? this.props.appIcon : "/assets/images/CbLogoIcon.png"} style={{ width: 50, height: 50 }} />
                                                    </div>
                                                </div>
                                                <div style={{ width: '100%', marginTop: '15px' }} className="flex-general-column-wrapper-center">
                                                    <h3 style={{ fontWeight: 500, color: 'black' }} >{this.props.appName ? this.props.appName : 'App on CloudBoost'}</h3>
                                                </div>
                                            </div>
                                            {/*Header*/}
                                            {/*Main Body Content*/}
                                            <div id="authenticate-mainbody">
                                                {/*Body*/}
                                                <div style={{ backgroundColor: 'white', paddingTop: 5 }}>
                                                    {/*Login and Sing Up buttons*/}
                                                    <div className="flex-general-column-wrapper-center" style={{ marginTop: 20 }}>
                                                        <div className="flex-general-row-wrapper">
                                                            <div className="width:100%;height:30px;">
                                                                <button className="default-inputfield login-btn">LOG IN</button>
                                                            </div>
                                                            <div className="width:100%;height:30px;">
                                                                <button className="default-inputfield sinup-btn">SIGN UP</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ backgroundColor: 'white', paddingBottom: 24, paddingLeft: 20, paddingRight: 20 }}>
                                                        <div className="flex-general-column-wrapper-center" style={{ marginTop: 5, width: '100%' }}>
                                                            <div className="solo-horizontal-center" style={{ width: '98%' }}>
                                                                {/*facebook*/}
                                                                <div className={ this.props.isfacebookEnabled ? "social-btns facebook flex-general-column-wrapper-center" : 'hide'}>
                                                                    <i className="fa fa-facebook" />
                                                                </div>
                                                                {/*twitter*/}
                                                                <div className={ this.props.istwitterEnabled ? "social-btns twitter flex-general-column-wrapper-center" : 'hide'}>
                                                                    <i className="fa fa-twitter" />
                                                                </div>
                                                                {/*google*/}
                                                                <div className={ this.props.isgoogleEnabled ? "social-btns google flex-general-column-wrapper-center" : 'hide'}>
                                                                    <i className="fa fa-google" />
                                                                </div>
                                                                {/*linkedin*/}
                                                                <div className={ this.props.islinkedinEnabled ? "social-btns linkedin flex-general-column-wrapper-center" : 'hide'}>
                                                                    <i className="fa fa-linkedin" aria-hidden="true" />
                                                                </div>
                                                                {/*github*/}
                                                                <div className={ this.props.isgithubEnabled ? "social-btns github flex-general-column-wrapper-center" : 'hide'}>
                                                                    <i className="fa fa-github" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ backgroundColor: 'white', paddingBottom: 24, paddingLeft: 20, paddingRight: 20 }}>

                                                        {/*Login Input Fields*/}
                                                        <div id="login-inputfields" style={{ width: '100%', marginTop: 8 }} className="solo-horizontal-center">
                                                            <div style={{ width: '95%' }}>
                                                                <div id="login-username-wrap" className="flex-general-row-wrapper input-field" style={{}}>
                                                                    <div className="flex-general-column-wrapper-center" style={{ width: '13%', height: 35, backgroundColor: '#f1f1f1' }}>
                                                                        <i className="icon ion-ios-person" style={{ color: 'gray', fontSize: 22 }} />
                                                                    </div>
                                                                    <div style={{ width: '86.98%', height: 35 }}>
                                                                        <input id="login-username" type="text" placeholder="Username" className="default-inputfield" required style={{ width: '100%', height: '100%', paddingLeft: 12 }} />
                                                                    </div>
                                                                </div>
                                                                <div id="login-password-wrap" className="flex-general-row-wrapper input-field" style={{}}>
                                                                    <div className="flex-general-column-wrapper-center" style={{ width: '13%', height: 35, backgroundColor: '#f1f1f1' }}>
                                                                        <i className="icon ion-ios-locked-outline" style={{ color: 'gray', fontSize: 22 }} />
                                                                    </div>
                                                                    <div style={{ width: '86.98%', height: 35 }}>
                                                                        <input id="login-password" type="password" placeholder="Password" className="default-inputfield" required style={{ width: '100%', height: '100%', paddingLeft: 12 }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*/Login Input Fields*/}
                                                        {/*Forgot Password*/}
                                                        <div id="forget-password-block" style={{ width: '100%', marginTop: 15 }} className="solo-horizontal-center">
                                                            <span id="forget-password" style={{ color: 'gray', cursor: 'pointer', fontSize: '12px' }}>Don't remember your password?</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Body*/}
                                                {/*Button*/}
                                                <div className="final-btn" style={{ backgroundColor: this.state.primaryColor }}>
                                                    <div style={{ width: '100%', height: 30 }} className="flex-general-column-wrapper-center">
                                                        <span style={{ color: 'white', fontSize: 34 }}>
                                                            <i className="icon ion-log-in" />
                                                        </span>
                                                    </div>
                                                </div>
                                                {/*Button*/}
                                            </div>
                                            {/*/Main Body Content*/}
                                        </div>
                                    </div>
                                    {/*/Login or Sing Up form*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2' }}>
                    <div style={{ width: '100%', height: '100%' }} className="flex-general-row-wrapper">
                        <div style={{ width: '50%', height: '100%', padding: 35 }}>
                            <span style={{ color: '#353446', fontSize: 16, fontWeight: 700 }}>Your App URL</span>
                            <span className="smallp">This is the URL we redirect to after authentication.</span>
                        </div>
                        <div className="solo-vertical-center" style={{ width: '50%', height: '100%', backgroundColor: 'white', padding: 10 }}>
                            <input type="text" value={this.state.callbackURL || ''} onChange={this.URLChangeHandler.bind(this)} className="emailinputcampaign" placeholder="Enter App Callback URL" style={{ width: '100%', height: 40, fontSize: 16, paddingLeft: 4 }} />
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', height: 120, backgroundColor: '#F7F7F7' }}>
                    <div style={{ width: '100%', height: '100%' }} className="flex-general-row-wrapper">
                        <div style={{ width: '50%', height: '100%', padding: 35 }}>
                            <span style={{ color: '#353446', fontSize: 16, fontWeight: 700 }}>Primary Color for your Login Page</span>
                            <span className="smallp">Set this to the brand color of your app.</span>
                        </div>
                        <div className="solo-vertical-center" style={{ width: '50%', height: '100%', backgroundColor: 'white', padding: 10 }}>
                            <TwitterPicker
                                triangle={'hide'}
                                color={this.state.primaryColor}
                                onChange={this.colorChangeHandler.bind(this)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}


export default General
