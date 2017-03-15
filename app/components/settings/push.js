/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {upsertAppSettingsFile,showAlert,updateSettings} from '../../actions';

//mui
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';

class Push extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            android:{
                credentials:[]
            },
            windows:{
                credentials:[]
            },
            apple:{
                certificates:[]
            }
        }
    }
    componentWillMount(){
        if(this.props.pushSettings){
            this.setState({ ...this.props.pushSettings.settings })
        }
    }
    androidChangeHandler(which,e){
        if(this.state.android.credentials.length == 0){
            this.state.android.credentials.push({
                apiKey:'',
                senderId:''
            })
        }
        this.state.android.credentials[0][which] = e.target.value
        this.setState(this.state)
    }
    windowsChangeHandler(which,e){
        if(this.state.windows.credentials.length == 0){
            this.state.windows.credentials.push({
                securityId:'',
                clientSecret:''
            })
        }
        this.state.windows.credentials[0][which] = e.target.value
        this.setState(this.state)
    }
    changeFile(e){
        let file = e.target.files[0]
        if(file.type.includes('/x-pkcs12')){
            this.props.upsertAppSettingsFile(this.props.appData.appId,this.props.appData.masterKey,file,'push',{ ...this.state })
        } else {
            showAlert('error','Only .p12 type files are allowed.')
        }
    }
    openChangeFile(){
        document.getElementById("fileBox").click()
    }
    deleteFile(fileId){
        this.setState({apple:{certificates:[]}})
        setTimeout(() => {
            this.updateSettings()
        }, 0)
    }
    updateSettings(){
        this.props.updateSettings(this.props.appData.appId,this.props.appData.masterKey,'push',{ ...this.state })
    }
    render() {

        return (
            <div className="contentsubdiv" style={{fontFamily: 'Signika'}}>
                <div style={{width: '100%'}} className="solo-horizontal-center">
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>Push Notifications Settings</span>
                </div>


                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-apple" style={{marginRight: 4}} />
                            Apple Push Certificates
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Certificate file</span>
                            <span className="smallp">Upload your .p12 certificate file to enable push for iOS and OS X.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <i className={ this.state.apple.certificates.length ? 'fa fa-file-o appIcon' : 'hide' } aria-hidden="true"></i>
                            <p onClick={ this.openChangeFile.bind(this) } className={ this.state.apple.certificates.length ? "hide" : "addfile" }>+ Add Certificate</p>
                            <input type="file" style={{display:"none"}} onChange={ this.changeFile.bind(this) } id="fileBox"/>
                            <RaisedButton
                              className={ this.state.apple.certificates.length ? "buttondeleteicon" : "hide" }
                              icon={<Delete />}
                              onClick={ this.deleteFile.bind(this) }
                            />
                        </div>
                        </div>
                    </div>

                </div>

                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-android" style={{marginRight: 4}} />
                            Android Push Credentials
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Sender ID</span>
                            <span className="smallp">This is an integer listed under "Project Number" in the Google API console.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.android.credentials.length ? this.state.android.credentials[0].senderId : '' } onChange={ this.androidChangeHandler.bind(this,'senderId') } className="emailinputcampaign" placeholder="Enter Sender ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>API Key</span>
                            <span className="smallp">This is listed under the "Authentication" section of the Google API console.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.android.credentials.length ? this.state.android.credentials[0].apiKey : '' } onChange={ this.androidChangeHandler.bind(this,'apiKey') } className="emailinputcampaign" placeholder="Enter API Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                </div>

                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-windows" style={{marginRight: 4}} />
                            Windows Push Credentials
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Package Security Identifier (SID)</span>
                            <span className="smallp">The unique identifier of your Windows Store app.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.windows.credentials.length ? this.state.windows.credentials[0].securityId : '' } onChange={ this.windowsChangeHandler.bind(this,'securityId') } className="emailinputcampaign" placeholder="Enter Security Identifier" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client Secret</span>
                            <span className="smallp">The secret key.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" value={ this.state.windows.credentials.length ? this.state.windows.credentials[0].clientSecret : '' } onChange={ this.windowsChangeHandler.bind(this,'clientSecret') } className="emailinputcampaign" placeholder="Enter Client Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
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
    let pushSettings = null
    if(state.settings.length){
        pushSettings = state.settings.filter(x => x.category == 'push')[0]
        console.log(pushSettings)
    }

    return {
        appData: state.manageApp,
        pushSettings:pushSettings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upsertAppSettingsFile: (appId,masterKey,fileObj,category,settingsObject) => dispatch(upsertAppSettingsFile(appId,masterKey,fileObj,category,settingsObject)),
        updateSettings: (appId,masterKey,categoryName,settingsObject) => dispatch(updateSettings(appId,masterKey,categoryName,settingsObject)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Push);
