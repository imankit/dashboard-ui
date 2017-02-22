/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {cloudBoostAPI,appSettings} from '../../../config';
import CopyToClipboard from 'react-copy-to-clipboard';


class General extends React.Component {

    constructor(props){
        super(props)
        this.state = appSettings.authSettings.settings.general
    }
    componentWillMount(){
        if(this.props.generalSettings){
            this.setState({ ...this.props.generalSettings })
        }
    }
    render() {
        let loginPageURL = cloudBoostAPI + "/page/" + this.props.appData.appId + "/authentication"
        return (
            <div className="push-box" style={{marginTop: 15}}>
                
                <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                    <div className="width:100%;">
                    <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                        <i className="ion ion-gear-b" style={{marginRight: 4}} />
                            General Settings
                    </span>
                    </div>
                    <div className="width:100%;">
                    <span style={{fontSize: 14, color: 'white'}} />
                    </div>
                </div>

                <div style={{width: '100%', height: 100, backgroundColor: '#FFF',borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '100%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Your Authentication Page</span>
                            <span className="smallp">This is the login and sign up page that you can use for your app.</span>
                        </div>
                    </div>
                </div>

                <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper">
                    <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                        Login URL
                    </div>
                    <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                        <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                            { loginPageURL || '' }
                        </div>
                    </div>
                    <CopyToClipboard text={loginPageURL || '' }>
                        <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                            <div className="flex-general-column-wrapper-center" >
                                <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                            </div>
                        </div>
                    </CopyToClipboard>
                </div>


                <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7',borderBottom: '1px solid #C4C2C2'}}>
                    <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '50%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Your App URL</span>
                            <span className="smallp">This is the URL we redirect to after authentication.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '50%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter App Callback URL" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                    </div>
                </div>

                <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                    <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '50%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Primary Color for your Login Page</span>
                            <span className="smallp">Set this to the brand color of your app.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '50%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Sender ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}


export default General
