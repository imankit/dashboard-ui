/**
 * Created by Darkstar on 1/13/2017.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {Clearfix} from 'react-bootstrap';
import Setting from 'material-ui/svg-icons/action/settings';
import {grey500} from 'material-ui/styles/colors';

const iconStyles = {
    marginRight: 12,
    marginLeft: 12,
    height:15,
    width:15,
    verticalAlign:"text-bottom"
};

const AppSetting = (props) => (
    <div className="app-setting">
        <div id="header" className="title-bar">
            <div className="container">
                <hgroup id="active-app">
                    <div className="project-icon"
                         style={{backgroundImage: 'url(https://ionic-apps.s3.amazonaws.com/icons/2.png)'}}>
                    </div>
                    <h1 className="name">
                        test
                        <span> ID: 9596620c </span>
                    </h1>
                </hgroup>
            </div>
        </div>
        <div className="container">
            <div id="app-config" className="fade-transition">

                <div className="panel menu-panel">
                    <div className="menu-wrapper">
                        <div className="panel-menu">
                            <ul>
                                <li className="active"> <Setting style={iconStyles} viewBox="0 0 24 24" color={grey500}/> General</li>
                                <li>Email</li>
                                <li>Push Notifications</li>
                                <li>Authentications</li>
                                <li>Import/Export Data</li>
                                <li>MongoDB Access</li>
                            </ul>
                        </div>
                        <div className="panel-body ng-scope">
                            <h2 className="head">General Information</h2>
                            <div >
                                <form name="general-settings-form" role="form">
                                    <div className="small-form-row">
                                        <div className="control-label">
                                            <label>App Icon</label>
                                            <p className="label-desc">
                                                Upload your own app icon to replace the default ionic icon
                                            </p>
                                        </div>
                                        <div className="control">
                                            <div className="icon-preview">
                                                <image-preview id="oldIconImage"
                                                               className="icon"
                                                               style={{
                                                                   height: 64,
                                                                   backgroundImage: 'url(https://ionic-apps.s3.amazonaws.com/icons/2.png)'
                                                               }}
                                                />
                                            </div>
                                            <div className="icon-actions">
                                                <input type="file" id="iconFile" className="file-control"
                                                       name="icon"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="small-form-row transfer-row">
                                        <div className="control-label">
                                            <label className="danger">Transfer Ownership</label>
                                            <p className="label-desc">
                                                Careful! You will no longer be the owner of this app if you
                                                transfer ownership.
                                            </p>
                                        </div>
                                        <div className="control">
                                            <div>
                                                <p>
                                                    If you transfer ownership of this app to another account,
                                                    you will no longer be the owner, but will be added as a
                                                    collaborator of the app instead. This will give the new
                                                    owner full control of the app, which means they can remove
                                                    your access to the app.
                                                </p>
                                                <p>
                                                    To transfer ownership, enter the e-mail of the account you
                                                    wish to transfer ownership to:
                                                </p>
                                                <input type="text" className="form form-control"
                                                       name="owner-transfer-email" placeholder="account e-mail"/>
                                                <a style={{marginTop: 15}} className="btn btn-danger">Change
                                                    Owner</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="small-form-row delete-row">
                                        <div className="control-label">
                                            <label className="danger">Delete App</label>
                                            <p className="label-desc">Careful! Deleting your app cannot be
                                                undone</p>
                                        </div>
                                        <div className="control">
                                            <div>
                                                <p>
                                                    If you delete this app, you will no longer be able to view or
                                                    edit it</p>
                                                <a className="btn btn-danger">Delete App</a>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" name="_method" value="PATCH" className="btn btn-primary">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="end-menu"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>);

const mapStateToProps = (state, selfProps) => {
    return {};
};

export default connect(mapStateToProps, null)(AppSetting);
