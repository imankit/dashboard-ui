'use strict';

import React, {PropTypes} from 'react';
import ProjectName from './projectname.js';
import Progressbar from './progressbar.jsx';
import {Modal,Button} from 'react-bootstrap';
import OptionsModal from './optionsModal';

import IconDelete from 'material-ui/svg-icons/action/delete';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import Key from 'material-ui/svg-icons/communication/vpn-key';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Icon from 'material-ui/svg-icons/file/cloud';
import ManageApp from 'material-ui/svg-icons/navigation/apps';
import {grey500, blue500, grey300} from 'material-ui/styles/colors';
import ReactTooltip from 'react-tooltip'


const iconStyles = {
    marginRight: 12,
    marginLeft: 12
};

const logoStyles = {
    height: 50,
    width: 50,
    marginTop: 8,
};

const Project = React.createClass({

    getInitialState() {
        return {
            showModal: false,
            selectedTab: (typeof this.props.selectedTab !== 'undefined') ? this.props.selectedTab : "addDev"
        };
    },

    handleSelect(selectedKey) {
        alert('selected ' + selectedKey);
    },

    close() {
        this.setState({showModal: false});
    },

    open1() {
        this.setState({showModal: true, selectedTab: "addDev", displayText: "Add Developers"});
    },
    open2() {
        this.setState({showModal: true, selectedTab: "keys", displayText: "App Keys"});
    },
    open3() {
        this.setState({showModal: true, selectedTab: "upgrade", displayText: "Upgrade Plan"});
    },
    delete(){
        this.setState({showModal: true, selectedTab: "delete", displayText: "Delete App"});
    },
    isAppAdmin(){
        if(this.props.currentUser.user){
            return this.props.developers.filter((x)=> x.userId == this.props.currentUser.user._id && x.role === 'Admin').length
        } else return false
    },

    render: function () {
        
        let planName = "";
        if (this.props.planId == 1)
            planName = "Free Plan";

        return (
            <div className="project">
                <div className="plan-status" onClick={this.open3}>{planName}</div>
                <div className="app-info">
                    <div className="app-icon">
                        <Icon style={logoStyles} color={blue500}> </Icon>
                    </div>
                    <ProjectName
                        name={this.props.name}
                        appId={this.props.appId}
                    />
                    <Progressbar appId={this.props.appId} planId={this.props.planId}/>
                </div>
                <div className="project-option">
                    <div >
                    <ManageApp style={iconStyles}
                                   color={grey500}
                                   data-tip="Manage"
                                   onClick={() => this.props.onProjectClick(
                                       this.props.appId,
                                       this.props.keys.master,
                                       this.props.name,
                                       '/'
                                   )}
                    />
                    {
                        this.isAppAdmin() ?
                            <div style={{display:'inline'}}>
                                <PersonAdd style={iconStyles} data-tip="Manage Developers" color={grey500} onClick={this.open1}/>
                                <Key style={iconStyles} data-tip="Manage Keys" color={grey500} onClick={this.open2}/>
                                <FileFileUpload style={iconStyles} data-tip="Change Plan" color={grey500} onClick={this.open3}/>
                                <IconDelete style={iconStyles} data-tip="Delete App" color={grey500} onClick={this.delete}/>
                            </div>
                            :
                            <div style={{display:'inline'}}>
                                <PersonAdd style={iconStyles} data-tip="Manage Developers" color={grey300}/>
                                <Key style={iconStyles} data-tip="Manage Keys" color={grey500} onClick={this.open2}/>
                                <FileFileUpload style={iconStyles} data-tip="Change Plan" color={grey300}/>
                                <IconDelete style={iconStyles} data-tip="Delete App" color={grey300}/>
                            </div>
                    }

                    <ReactTooltip place="bottom" type="info" />
                    </div>
                    <Modal show={this.state.showModal} bsSize={ (this.state.selectedTab === 'upgrade') ? 'large' : null}
                           onHide={this.close} dialogClassName='options-modal'>
                        {
                            this.state.selectedTab == 'upgrade' ? '' :
                                <Modal.Header> 
                                    <Modal.Title>{ this.state.displayText}</Modal.Title>
                                    <div className="modalicon" style={{paddingRight: 8, height: 56, width: 56, borderRadius: 50, backgroundColor: '#0F6DA6'}}>
                                        <div className="flex-general-column-wrapper-center" style={{height: 56, width: 56}}>          
                                        <i className="ion-android-people" style={{fontSize: 30, color: 'white'}} />
                                        </div>
                                    </div>
                                </Modal.Header>
                        }
                        <Modal.Body>
                            <OptionsModal id={this.props._id}
                                        appId={this.props.appId}
                                        masterKey={this.props.keys.master}
                                        clientKey={this.props.keys.js}
                                        planId={this.props.planId}
                                        developers={this.props.developers}
                                        invited={this.props.invited}
                                        selectedTab={this.state.selectedTab}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
});

export default Project;
