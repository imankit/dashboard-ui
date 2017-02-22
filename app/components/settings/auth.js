/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {upsertAppSettingsFile,showAlert,updateSettings,getDefaultTemplate} from '../../actions';
import {appSettings,cloudBoostAPI} from '../../config';
import CopyToClipboard from 'react-copy-to-clipboard';

//mui
import RaisedButton from 'material-ui/RaisedButton'

//sub comps
import General from './auth/general'
import Custom from './auth/custom'
import Social from './auth/social'


class AuthSettings extends React.Component {

    constructor(props){
        super(props)
        this.state = appSettings.authSettings.settings
    }
    componentWillMount(){
        if(this.props.authSettings){
            this.setState({ ...this.props.authSettings.settings })
        }
    }
    componentDidMount(){
        if(this.state.signupEmail.template == ''){
            getDefaultTemplate('sign-up').then((res)=>{
                this.state.signupEmail.template = res.data
                this.setState(this.state)
            },(err)=>{
                console.log(err)
            })
        }
        if(this.state.resetPasswordEmail.template == ''){
            getDefaultTemplate('reset-password').then((res)=>{
                this.state.resetPasswordEmail.template = res.data
                this.setState(this.state)
            },(err)=>{
                console.log(err)
            })
        }
    }
    updateSettingsFromChildComps(stateSlice){
        this.setState({...stateSlice})
    }
    updateSettings(){
        this.props.updateSettings(this.props.appData.appId,this.props.appData.masterKey,'auth',{ ...this.state })
    }
    numberChangeHandler(e){
        this.state.sessions.sessionLength = e.target.value
        this.setState(this.state)
    }
    render() {
        let loginPageUR = cloudBoostAPI + "/page/" + this.props.appData.appId + "/authentication"
        return (
            <div className="contentsubdiv">
                <div style={{width: '100%'}} className="solo-horizontal-center">
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>Authentication Settings</span>
                </div>

                <General
                    generalSettings={ { ...this.state.general } }
                    appData={ this.props.appData }
                
                />

                <Custom
                    customSettings={ {
                            custom : this.state.custom,
                            resetPasswordEmail : this.state.resetPasswordEmail,
                            signupEmail : this.state.signupEmail
                         } }
                    appData={ this.props.appData }
                    updateSettingsFromChildComps={this.updateSettingsFromChildComps.bind(this)  }
                
                />

                <div className="push-box" style={{marginTop: 15}}>
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-clock-o" style={{marginRight: 4}} />
                                User Sessions
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7',borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '60%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Session Length (in days)</span>
                            <span className="smallp">Set the session expiration in days</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '40%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="number" value={ this.state.sessions.sessionLength || 0 } onChange={ this.numberChangeHandler.bind(this) } className="emailinputcampaign" placeholder="Enter no. of days" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>
                </div>

                <Social
                    socialSettings={ {
                            google : this.state.google,
                            facebook : this.state.facebook,
                            twitter : this.state.twitter,
                            github : this.state.github,
                            linkedIn : this.state.linkedIn
                         } }
                    appData={ this.props.appData }
                    updateSettingsFromChildComps={this.updateSettingsFromChildComps.bind(this)  }
                
                />

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
    let authSettings = null
    if(state.settings.length){
        authSettings = state.settings.filter(x => x.category == 'auth')[0]
    }

    return {
        appData: state.manageApp,
        authSettings:authSettings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: (appId,masterKey,categoryName,settingsObject) => dispatch(updateSettings(appId,masterKey,categoryName,settingsObject))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSettings);
