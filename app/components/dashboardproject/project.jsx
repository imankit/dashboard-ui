'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ProjectName from './projectname.js';
import Progressbar from './progressbar.jsx';
import {Modal, Button} from 'react-bootstrap';
import OptionsModal from './optionsModal';
import {RefreshIndicator} from 'material-ui'
import Dropzone from 'react-dropzone';

import IconDelete from 'material-ui/svg-icons/action/delete';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Icon from 'material-ui/svg-icons/file/cloud';
import ManageApp from 'material-ui/svg-icons/navigation/apps';
import {grey500, blue500, grey300} from 'material-ui/styles/colors';
import ReactTooltip from 'react-tooltip';
import DeleteApp from './deleteApp';
import ExitApp from './exitApp';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Upgrade from '../payment';
import AddDeveloper from './addDeveloper';
import ManageKeys from './manageKeys';

import planList from '../../fakeAPI/plans'

const iconStyles = {
    marginRight: 12,
    marginLeft: 12
};

const logoStyles = {
    height: 50,
    width: 50,
    marginTop: 8
};

const styles = {
    beacon: {
        marginTop: -33
    }
}
export const Project = React.createClass({

    getInitialState() {
        return {
            showModal: false,
            showDeleteModal: false,
            showUpgradeModal: false,
            deleteButtonState: true,
            showExitModal: false,
            showDeveloperModal: false,
            showKeysModal: false,
            selectedTab: (typeof this.props.selectedTab !== 'undefined')
                ? this.props.selectedTab
                : "addDev"
        };
    },

    handleSelect(selectedKey) {
        alert('selected ' + selectedKey);
    },

    close() {
        this.setState({showModal: false});
    },
    closeDeleteModal() {
        this.setState({showDeleteModal: false});
    },
    closeUpgradeModal() {
        this.setState({showUpgradeModal: false});
    },
    closeExitModal() {
        this.setState({showExitModal: false});
    },
    closeDeveloperModal() {
        this.setState({showDeveloperModal: false})
    },
    closeKeyModal() {
        this.setState({showKeysModal: false})
    },
    open1() {
        this.setState({showDeveloperModal: true});
    },
    open2() {
        this.setState({showKeysModal: true});
    },
    open3() {
        this.setState({showUpgradeModal: true});
    },
    delete() {
        this.setState({showDeleteModal: true});
    },

    isAppAdmin() {
        if (this.props.currentUser.user) {
            return this.props.developers.filter((x) => x.userId == this.props.currentUser.user._id && x.role === 'Admin').length
        } else
            return false
    },
    handleChange(value, e) {
        if (e.target.value === value)
            this.setState({deleteButtonState: false});
        }
    ,
    openProject(appId, key, name, from, e) {
        if (e.target !== this.refs.project)
            return;
        this.props.onProjectClick(appId, key, name, from);
    },
    exitApp() {
        // this.props.onDeleteDev(this.props.appId)
        this.setState({showExitModal: true});
    },
    onDrop(acceptedFiles, rejectedFiles) {
        this.props.fetchAppSettings(this.props.appId, this.props.keys.master, acceptedFiles[0]);
    },
    setImgFallbackUrl(e) {
        e.target.onError = null;
        e.target.src = '/assets/images/default-app-icon.png';
    },
    onProjectClick() {
        this.props.onProjectClick(this.props.appId, this.props.keys.master, this.props.name, '/')
    },

    render: function() {

        let planName = planList[this.props.planId - 1].label;

        return (
            <div className="project" ref="project">
                <div className="plan-status" onClick={this.open3}>{planName}</div>
                <div className="app-info">
                    <Dropzone accept="image/*" onDrop={this.onDrop} className="dropBody">
                        <div className="app-icon" style={{
                            background: 'url(' + SERVER_URL + '/appfile/' + this.props.appId + '/icon' + ') , url(/assets/images/default-app-icon.jpg)',
                            backgroundSize: 'contain'
                        }}>
                            <div className="app-icon-overlay ">
                                <i className="ion ion-edit overlay-icon"></i>
                            </div>
                            {/* <img height="20px" className="app-selector-img" src={SERVER_URL + '/appfile/' + this.props.appId + '/icon'} onError={this.setImgFallbackUrl}></img> */}
                        </div>
                    </Dropzone>
                    <ProjectName name={this.props.name} appId={this.props.appId} onProjectClick={this.onProjectClick}/>
                    <Progressbar appId={this.props.appId} planId={this.props.planId} onProjectClick={this.onProjectClick}/>
                </div>
                <div className="project-option">
                    <span className={this.props.beacons.tableDesignerLink
                        ? "hide"
                        : "joyride-beacon manage_app_beacon"} onClick={this.onProjectClick}>
                        <span className="joyride-beacon__inner"></span>
                        <span className="joyride-beacon__outer"></span>
                    </span>
                    <div style={this.props.beacons.tableDesignerLink
                        ? {}
                        : styles.beacon}>

                        <ManageApp style={iconStyles} color={grey500} data-tip="Manage" onClick={this.onProjectClick}/> {this.isAppAdmin()
                            ? <div style={{
                                    display: 'inline'
                                }}>
                                    <PersonAdd style={iconStyles} data-tip="Manage Developers" color={grey500} onClick={this.open1}/>
                                    <Key style={iconStyles} data-tip="Manage Keys" color={grey500} onClick={this.open2}/>
                                    <FileFileUpload style={iconStyles} data-tip="Upgrade Plan" color={grey500} onClick={this.open3}/>
                                    <IconDelete style={iconStyles} data-tip="Delete App" color={grey500} onClick={this.delete}/>
                                </div>
                            : <div style={{
                                display: 'inline'
                            }}>
                                {/*call deletedev for exit*/}
                                <Exit style={iconStyles} data-tip="Remove Yourself" color={grey500} onClick={this.exitApp}/>
                                <Key style={iconStyles} data-tip="Manage Keys" color={grey500} onClick={this.open2}/>
                                <FileFileUpload style={iconStyles} data-tip="Upgrade Plan" color={grey300}/>
                                <IconDelete style={iconStyles} data-tip="Delete App" color={grey300}/>
                            </div>
}

                        <ReactTooltip place="bottom" type="dark" delayShow={100}/>
                    </div>

                    {/*MODAL for project options*/}

                    {this.state.showDeleteModal
                        ? <DeleteApp showDeleteModal={this.state.showDeleteModal} closeDeleteModal={this.closeDeleteModal} handleChange={this.handleChange} deleteButtonState={this.state.deleteButtonState} appId={this.props.appId}/>
                        : ''
}
                    {this.state.showUpgradeModal
                        ? <Upgrade appId={this.props.appId} planId={this.props.planId} show={this.state.showUpgradeModal} close={this.closeUpgradeModal}/>
                        : ''
}

                    {this.state.showExitModal
                        ? <ExitApp handleChange={this.handleChange} deleteButtonState={this.state.deleteButtonState} appId={this.props.appId} show={this.state.showExitModal} close={this.closeExitModal} onDeleteDev={this.props.onDeleteDev}/>
                        : ''
}
                    {this.state.showDeveloperModal
                        ? <AddDeveloper show={this.state.showDeveloperModal} close={this.closeDeveloperModal} id={this.props._id} appId={this.props.appId} masterKey={this.props.keys.master} clientKey={this.props.keys.js} planId={this.props.planId} developers={this.props.developers} invited={this.props.invited} selectedTab={"addDev"}/>
                        : ''
}
                    {this.state.showKeysModal
                        ? <ManageKeys loading={this.props.loading} show={this.state.showKeysModal} close={this.closeKeyModal} id={this.props._id} appId={this.props.appId} masterKey={this.props.keys.master} clientKey={this.props.keys.js} planId={this.props.planId} developers={this.props.developers} invited={this.props.invited} selectedTab={"keys"}/>
                        : ''
}
                </div>
            </div>
        );
    }
});
const mapStateToProps = (state) => {

    return {loading: state.loader.loading};
};

export default connect(mapStateToProps, null)(Project);
