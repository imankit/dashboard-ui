'use strict';

import React, {PropTypes} from 'react';
import ProjectName from './projectname.js';
import Progressbar from './progressbar.jsx';
import {Modal, Button} from 'react-bootstrap';
import OptionsModal from './optionsModal';

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

const Project = React.createClass({

    getInitialState() {
        return {
            showModal: false,
            showDeleteModal: false,
            showUpgradeModal: false,
            deleteButtonState: true,
            showExitModal: false,
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
    open1() {
        this.setState({showModal: true, selectedTab: "addDev", displayText: "Add Developers", innertext: "Add Developers to contribute to your app."});
    },
    open2() {
        this.setState({showModal: true, selectedTab: "keys", displayText: "App Keys", innertext: null});
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
                    <Dropzone onDrop={this.onDrop} className="dropBody">
                        <div className="app-icon">
                            <img height="20px" className="app-selector-img" src={SERVER_URL + '/appfile/' + this.props.appId + '/icon'} onError={this.setImgFallbackUrl}></img>
                        </div>
                    </Dropzone>
                    <ProjectName name={this.props.name} appId={this.props.appId} onProjectClick={this.onProjectClick}/>
                    <Progressbar appId={this.props.appId} planId={this.props.planId} onProjectClick={this.onProjectClick}/>
                </div>
                <div className="project-option">
                    <div >
                        <span className={!this.props.beacons.tableDesignerLink
                            ? "gps_ring manage_app_beacon"
                            : 'hide'}></span>
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

                    <Modal show={this.state.showModal} dialogClassName='options-modal' onHide={this.close}>
                        <Modal.Header style={{
                            paddingTop: 10
                        }}>
                            <Modal.Title>{this.state.displayText}
                                <div className="modal-title-inner-text">
                                    {this.state.innertext
                                        ? this.state.innertext
                                        : 'Use keys to initialize your app.'}
                                </div>
                            </Modal.Title>
                            <div className="modalicon" style={{
                                paddingRight: 8,
                                height: 56,
                                width: 56,
                                borderRadius: 50,
                                backgroundColor: '#0F6DA6',
                                marginTop: 2
                            }}>
                                <div className="flex-general-column-wrapper-center" style={{
                                    height: 56,
                                    width: 56
                                }}>{this.state.selectedTab === 'addDev'
                                        ? <PersonAdd color="white"/>
                                        : <Key color="white"/>}
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <OptionsModal id={this.props._id} appId={this.props.appId} masterKey={this.props.keys.master} clientKey={this.props.keys.js} planId={this.props.planId} developers={this.props.developers} invited={this.props.invited} selectedTab={this.state.selectedTab}/>
                        </Modal.Body>
                    </Modal>

                    {/*MODAL for delete and upgrade*/}

                    {// only render component when its needed dont pollute DOM
                    this.state.showDeleteModal
                        ? <DeleteApp showDeleteModal={this.state.showDeleteModal} closeDeleteModal={this.closeDeleteModal} handleChange={this.handleChange} deleteButtonState={this.state.deleteButtonState} appId={this.props.appId}/>
                        : ''
}
                    {// only render component when its needed dont pollute DOM
                    this.state.showUpgradeModal
                        ? <Upgrade appId={this.props.appId} planId={this.props.planId} show={this.state.showUpgradeModal} close={this.closeUpgradeModal}/>
                        : ''
}

                    {// only render component when its needed dont pollute DOM
                    this.state.showExitModal
                        ? <ExitApp handleChange={this.handleChange} deleteButtonState={this.state.deleteButtonState} appId={this.props.appId} show={this.state.showExitModal} close={this.closeExitModal} onDeleteDev={this.props.onDeleteDev}/>
                        : ''
}
                </div>
            </div>
        );
    }
});

export default Project;
