/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { logOut } from '../../actions';
import Storage from 'material-ui/svg-icons/device/storage';
import Analytics from 'material-ui/svg-icons/editor/insert-chart';
import Setting from 'material-ui/svg-icons/action/settings';
import Cache from 'material-ui/svg-icons/image/flash-on';
import Queues from 'material-ui/svg-icons/action/compare-arrows';
import Notifications from 'material-ui/svg-icons/alert/add-alert';
import Email from 'material-ui/svg-icons/communication/email';
import People from 'material-ui/svg-icons/social/people';
import { grey500 } from 'material-ui/styles/colors';
import NotificationsModal from './notification'

const toolbartitle = {
    fontSize: 18
};

const iconStyles = {
    marginRight: 12,
    marginLeft: 12,
    cursor: "pointer"
};

class ToolBar extends React.Component {
    constructor() {
        super()
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    componentWillMount() {

    }
    redirectTo(where,noAppId) {
        if (noAppId) {
            this.context.router.push('/' + where )
        } else {
            this.context.router.push('/' + this.props.currentApp + "/" + where)
        }
    }
    render() {
        let userImage = "/assets/images/user-image.png"
        if (this.props.currentUser.file) {
            userImage = this.props.currentUser.file.document.url
        }
        return (
            <div id="nav-dash" style={{ backgroundColor: '#FFF', paddingTop: 2 }}>
                <div className="container">
                    <Toolbar className='toolbar' style={{ backgroundColor: '#FFF' }}>
                        <ToolbarGroup>
                            <img style={{ marginLeft: -25 }} className="icon cp" src="/assets/images/cblogo.png" alt="cloud" onClick={this.redirectTo.bind(this,'', true)} />

                        </ToolbarGroup>
                        {
                            !this.props.isDashboardMainPage ? (
                                <ToolbarGroup>
                                    <Storage style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'tables', false)} />
                                    <Analytics style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'analytics', false)} />
                                    <Setting style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'settings', false)} />
                                    <Cache style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'cache', false)} />
                                    <Queues style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'queue', false)} />
                                    <Notifications style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'push', false)} />
                                    <Email style={iconStyles} color={grey500} onClick={this.redirectTo.bind(this, 'email', false)} />
                                    <ToolbarSeparator />
                                    <ToolbarTitle style={toolbartitle} text="" />
                                    <ToolbarTitle style={toolbartitle} text="Quickstart" />
                                    <NotificationsModal />
                                    {
                                        this.props.isAdmin ? <People style={iconStyles} onClick={this.redirectTo.bind(this, 'admin', true)} /> : ''
                                    }
                                    <ToolbarSeparator />
                                    <IconMenu
                                        iconButtonElement={
                                            <IconButton touch={true}>
                                                <img className="userhead"
                                                    src={userImage}
                                                    alt="" />
                                            </IconButton>
                                        }
                                    >
                                        <MenuItem primaryText="My Profile" onClick={this.redirectTo.bind(this, 'profile' , true)} />
                                        <MenuItem primaryText="Billing" />
                                        <MenuItem primaryText="Logout" onClick={() => onLogoutClick()} />
                                    </IconMenu>
                                </ToolbarGroup>) : <ToolbarGroup><ToolbarTitle style={toolbartitle} text="Quickstart" />
                                    <NotificationsModal />
                                    {
                                        this.props.isAdmin ? <People style={iconStyles} onClick={this.redirectTo.bind(this, 'admin' , true)} /> : ''
                                    }
                                    <ToolbarSeparator />
                                    <IconMenu
                                        iconButtonElement={
                                            <IconButton touch={true}>
                                                <img className="userhead"
                                                    src={userImage}
                                                    alt="" />
                                            </IconButton>
                                        }
                                    >
                                        <MenuItem primaryText="My Profile" onClick={this.redirectTo.bind(this, 'profile' , true)} />
                                        <MenuItem primaryText="Billing" />
                                        <MenuItem primaryText="Logout" onClick={() => this.props.onLogoutClick()} />
                                    </IconMenu></ToolbarGroup>
                        }
                    </Toolbar>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let isAdmin = false
    if (state.user.user) {
        isAdmin = state.user.user.isAdmin
    }
    return {
        currentApp: state.manageApp.appId,
        currentUser: state.user,
        isAdmin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logOut());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
