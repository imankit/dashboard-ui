/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {DropDownMenu, MenuItem, IconButton, Popover, IconMenu} from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {logOut} from '../../actions';
import Storage from 'material-ui/svg-icons/device/storage';
import Analytics from 'material-ui/svg-icons/editor/insert-chart';
import Setting from 'material-ui/svg-icons/action/settings';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Book from 'material-ui/svg-icons/action/book';
import Cache from 'material-ui/svg-icons/image/flash-on';
import Queues from 'material-ui/svg-icons/action/compare-arrows';
import Notifications from 'material-ui/svg-icons/alert/add-alert';
import notifications from '../../fakeAPI/notifications'
import Email from 'material-ui/svg-icons/communication/email';
import People from 'material-ui/svg-icons/social/people';
import {grey500, grey700, grey300} from 'material-ui/styles/colors';

import NotificationsModal from '../notifications/notification';
import FeedbackModal from '../feedback/feedback';
import Profile from '../profile/modal'
import _ from 'underscore'

const toolbartitle = {
    fontSize: 18
};

const iconStyles = {
    marginRight: 12,
    marginLeft: 12,
    cursor: "pointer"
};

class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            appSelector: false,
            profileModal: false,
            options: false,
            value: 1
        }
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    componentWillMount() {}
    handleTouchTap = (which, event) => {
        event.preventDefault()
        this.state[which] = true
        this.state.anchorEl = event.currentTarget
        this.setState(this.state);
        // close the already opened popver after opening profile modal
        if (which === 'profileModal')
            this.setState({open: false})

    }
    handleChange = (event, index, value) => this.setState({value});

    handleRequestClose = () => {
        // close all popover
        this.setState({open: false, appSelector: false, options: false, profileModal: false})
    }
    redirectTo(where, noAppId) {
        if (noAppId) {
            this.context.router.push('/' + where)
        } else {
            this.context.router.push('/' + this.props.currentApp + "/" + where)
        }
        this.handleRequestClose()
    }
    redirectToApp(appId) {
        window.location.pathname = '/' + appId + "/" + window.location.pathname.split('/')[2]
        this.handleRequestClose()
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.currentUser.user.name)
            window.location = ACCOUNTS_URL;
        }
    setImgFallbackUrl(e) {
        e.target.onError = null;
        e.target.src = '/assets/images/default-app-icon.png';
    }
    render() {
        let userImage = "/assets/images/user-image.png"
        if (this.props.currentUser.file) {
            userImage = this.props.currentUser.file.document.url
        }

        let allApps = [];
        if (this.props.apps.length && !this.props.isDashboardMainPage && this.props.currentApp) {
            allApps = this.props.apps.map((app, i) => {
                let label = (
                    <div>
                        <img height="20px" className="app-selector-img" src={SERVER_URL + '/appfile/' + app.id + '/icon'} onError={this.setImgFallbackUrl}></img>
                        {app.name}</div>
                );
                let thisObj = this;
                return (
                    <MenuItem className={app.appId === thisObj.props.currentApp
                        ? 'selected-app app-list-item'
                        : 'app-list-item'} innerDivStyle={{
                        "display": "inline-flex",
                        "alignItems": "center"
                    }} value={i} primaryText={app.name} key={i} label={label} onClick={this.redirectToApp.bind(this, app.appId)}>
                        <img height="20px" className="app-selector-img" src={SERVER_URL + '/appfile/' + app.id + '/icon'} onError={this.setImgFallbackUrl}></img>
                    </MenuItem>
                );
            })
        }
        let value = 0
        if (this.props.allApps) {
            value = _.pluck(this.props.apps, 'id').indexOf(this.props.currentApp);
        }
        return (
            <div id="nav-dash" style={{
                backgroundColor: '#FFF',
                paddingTop: 2
            }}>
                <div className="container">
                    <Toolbar className='toolbar' style={{
                        backgroundColor: '#FFF'
                    }}>
                        <ToolbarGroup>
                            <img style={{
                                marginLeft: -25
                            }} className="icon cp" src="/assets/images/cblogo.png" alt="cloud" onClick={this.redirectTo.bind(this, '', true)}/> {!this.props.isDashboardMainPage
                                ? <DropDownMenu value={value} onChange={this.handleChange} underlineStyle={{
                                        display: "none"
                                    }} listStyle={{
                                        'paddingTop': '0px',
                                        'paddingBottom': '0px'
                                    }}>
                                        {allApps}

                                        <MenuItem innerDivStyle={{
                                            "display": "inline-flex",
                                            "alignItems": "center"
                                        }} primaryText={'Dashboard'} key={9999} onClick={this.redirectTo.bind(this, '', true)}>
                                            <img height="20px" className="app-selector-img" src={'/assets/images/dashboard-icon.png'}></img>
                                        </MenuItem>
                                    </DropDownMenu>
                                : ''
}

                        </ToolbarGroup>

                        <ToolbarGroup>

                            <FeedbackModal/>

                            <IconButton touch={true} onClick={this.handleTouchTap.bind(this, 'options')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 -4 26 26">
                                    <g fill="none" fillRule="evenodd"><path fill="#9e9e9e" d="M5.577 3c2.167 0 3.18.846 3.923 2.127v12.288c-.512 0-1.015-.337-1.33-.59-1.03-.828-3.057-.828-5.222-.828H1.945A.944.944 0 0 1 1 15.054V3.946c0-.522.423-.944.945-.944L5.577 3z"/><path fill="#AAB7C4" d="M13.423 3c-2.166 0-3.168.894-3.928 2.107L9.5 17.415c.512 0 1.015-.337 1.33-.59 1.03-.828 3.057-.828 5.222-.828h1.003a.944.944 0 0 0 .945-.945V3.947a.944.944 0 0 0-.945-.945L13.423 3z"/></g>
                                </svg>
                            </IconButton>

                            <Popover open={this.state.options} anchorEl={this.state.anchorEl} anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom'
                            }} targetOrigin={{
                                horizontal: 'right',
                                vertical: 'top'
                            }} onRequestClose={this.handleRequestClose} animated={true} className="optionpop">
                                <a href="https://tutorials.cloudboost.io/">
                                    <button className="optionBtn">Documentation</button>
                                </a>
                                <a href="https://slack.cloudboost.io/">
                                    <button className="optionBtn">Support</button>
                                </a>
                            </Popover>

                            <NotificationsModal notifications={notifications}/> {this.props.isAdmin
                                ? <People style={iconStyles} color={grey700} onClick={this.redirectTo.bind(this, 'admin', true)}/>
                                : ''
}
                            <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom'
                            }} targetOrigin={{
                                horizontal: 'right',
                                vertical: 'top'
                            }} onRequestClose={this.handleRequestClose} animated={true} className="profilepop">
                                <p className="headingpop">{this.props.currentUser.user
                                        ? this.props.currentUser.user.name.toUpperCase()
                                        : ''}</p>
                                <button className="coloptbtn" onClick={this.handleTouchTap.bind(this, 'profileModal')}>My Profile</button>
                                <button className="coloptbtn">Billing</button>
                                <button className="coloptbtn" onClick={this.props.onLogoutClick.bind(this)}>Logout</button>
                            </Popover>
                            <IconButton onClick={this.handleTouchTap.bind(this, 'open')}>
                                <img className="userhead" src={userImage} alt=""/>
                            </IconButton>
                        </ToolbarGroup>

                    </Toolbar>
                </div>
                <Profile open={this.state.profileModal} close={this.handleRequestClose}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let isAdmin = false
    if (state.user.user) {
        isAdmin = state.user.user.isAdmin
    }
    return {currentApp: state.manageApp.appId, currentUser: state.user, currentAppName: state.manageApp.name, isAdmin, apps: state.apps}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logOut());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
