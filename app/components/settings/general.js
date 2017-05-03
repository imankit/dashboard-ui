/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {upsertAppSettingsFile, showAlert, updateSettings} from '../../actions';

//mui
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Delete from 'material-ui/svg-icons/action/delete';

class General extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            appIcon: null,
            appInProduction: false,
            appName: null
        }
    }
    componentWillMount() {
        if (this.props.generalSettings) {
            this.setState({
                ...this.props.generalSettings.settings
            })
        }
    }
    textChangeHandler(which, e) {
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    toggleChangeHandler(which, e, val) {
        this.state[which] = val
        this.setState(this.state)
    }
    changeFile(e) {
        let file = e.target.files[0]
        if (file.type.includes('/png')) {
            this.props.upsertAppSettingsFile(this.props.appData.appId, this.props.appData.masterKey, file, 'general', {
                ...this.state
            })
        } else {
            showAlert('error', 'Only .png type images are allowed.')
        }
    }
    openChangeFile() {
        document.getElementById("fileBox").click()
    }
    deleteFile(fileId) {
        this.setState({appIcon: null})
        setTimeout(() => {
            this.updateSettings()
        }, 0)
    }
    updateSettings() {
        this.props.updateSettings(this.props.appData.appId, this.props.appData.masterKey, 'general', {
            ...this.state
        })
    }
    render() {

        return (
            <div className="contentsubdiv" style={{
                fontFamily: 'Signika'
            }}>
                <div style={{
                    width: '100%'
                }} className="solo-horizontal-center">
                    <span style={{
                        color: '#169CEE',
                        fontSize: 24,
                        fontWeight: 700
                    }}>General Settings</span>
                </div>
                <div className="push-box" style={{
                    marginTop: 15
                }}>

                    <div style={{
                        width: '100%',
                        height: 100,
                        backgroundColor: '#F7F7F7',
                        borderBottom: '1px solid #C4C2C2'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%'
                        }} className="flex-general-row-wrapper">
                            <div style={{
                                width: '40%',
                                height: '100%',
                                padding: 35
                            }}>
                                <span style={{
                                    color: '#353446',
                                    fontSize: 16,
                                    fontWeight: 700
                                }}>App Name</span>
                                <span className="smallp">The name of your app</span>
                            </div>
                            <div className="solo-vertical-center" style={{
                                width: '60%',
                                height: '100%',
                                backgroundColor: 'white',
                                padding: 10
                            }}>
                                <input type="text" value={this.state.appName || ''} onChange={this.textChangeHandler.bind(this, 'appName')} className="emailinputcampaign" placeholder="Enter App Name" style={{
                                    width: '100%',
                                    height: 40,
                                    fontSize: 16,
                                    paddingLeft: 4
                                }}/>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        width: '100%',
                        height: 100,
                        backgroundColor: '#F7F7F7',
                        borderBottom: '1px solid #C4C2C2'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%'
                        }} className="flex-general-row-wrapper">
                            <div style={{
                                width: '40%',
                                height: '100%',
                                padding: 35
                            }}>
                                <span style={{
                                    color: '#353446',
                                    fontSize: 16,
                                    fontWeight: 700
                                }}>App Icon</span>
                                <span className="smallp">Your app icon</span>
                            </div>
                            <div className="solo-vertical-center" style={{
                                width: '60%',
                                height: '100%',
                                backgroundColor: 'white',
                                padding: 10
                            }}>
                                <img src={this.state.appIcon
                                    ? this.state.appIcon
                                    : ''} className={this.state.appIcon
                                    ? 'appIcon'
                                    : 'hide'}/>
                                <p onClick={this.openChangeFile.bind(this)} className={this.state.appIcon
                                    ? "hide"
                                    : "addfile"}>+ Add Icon</p>
                                <input type="file" style={{
                                    display: "none"
                                }} onChange={this.changeFile.bind(this)} id="fileBox"/>
                                <RaisedButton className={this.state.appIcon
                                    ? "buttondeleteicon"
                                    : "hide"} icon={< Delete />} onClick={this.deleteFile.bind(this)}/>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        width: '100%',
                        height: 100,
                        backgroundColor: '#F7F7F7'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%'
                        }} className="flex-general-row-wrapper">
                            <div style={{
                                width: '40%',
                                height: '100%',
                                padding: 35
                            }}>
                                <span style={{
                                    color: '#353446',
                                    fontSize: 16,
                                    fontWeight: 700
                                }}>App In Production</span>
                                <span className="smallp">Is your app in production?</span>
                            </div>
                            <div className="solo-vertical-center" style={{
                                width: '60%',
                                height: '100%',
                                backgroundColor: 'white',
                                padding: 10
                            }}>
                                <Toggle className="togglegeneral" onToggle={this.toggleChangeHandler.bind(this, 'appInProduction')} toggled={this.state.appInProduction}/>
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{
                    width: '100%',
                    height: 50,
                    marginTop: 15,
                    marginBottom: 40
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%'
                    }} className="flex-general-column-wrapper-center">
                        <div className="solo-vertical-center" style={{
                            height: '100%'
                        }}>
                            <RaisedButton label="Save" labelPosition="before" primary={true} className="emailcampbtn" onClick={this.updateSettings.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    let generalSettings = null
    if (state.settings.length) {
        generalSettings = state.settings.filter(x => x.category == 'general')[0]
    }

    return {appData: state.manageApp, generalSettings: generalSettings}
}

const mapDispatchToProps = (dispatch) => {
    return {
        upsertAppSettingsFile: (appId, masterKey, fileObj, category, settingsObject) => dispatch(upsertAppSettingsFile(appId, masterKey, fileObj, category, settingsObject)),
        updateSettings: (appId, masterKey, categoryName, settingsObject) => dispatch(updateSettings(appId, masterKey, categoryName, settingsObject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(General);
