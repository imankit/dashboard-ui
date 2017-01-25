/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {logOut} from '../../actions';
import Storage from 'material-ui/svg-icons/device/storage';
import Analytics from 'material-ui/svg-icons/editor/insert-chart';
import Setting from 'material-ui/svg-icons/action/settings';
import Cache from 'material-ui/svg-icons/image/flash-on';
import Queues from 'material-ui/svg-icons/action/compare-arrows';
import Notifications from 'material-ui/svg-icons/alert/add-alert';
import Email from 'material-ui/svg-icons/communication/email';
import {grey500} from 'material-ui/styles/colors';

const toolbartitle = {
    fontSize: 18
};

const iconStyles = {
    marginRight: 12,
    marginLeft: 12,
    cursor:"pointer"
};

class ToolBar extends React.Component {
    constructor(){
        super()
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    redirectTo(where){
        this.context.router.push('/'+where)
    }
    render(){
        return(
            <div id= "nav-dash" style={{backgroundColor: '#FFF'}}>
                <div className="container">
                    <Toolbar className='toolbar' style={{backgroundColor: '#FFF'}}>
                        <ToolbarGroup>
                            <img className="icon cp" src="/assets/images/cblogo.png" alt="cloud" onClick={ this.redirectTo.bind(this,'') }/>

                        </ToolbarGroup>
                        {
                            !this.props.isDashboardMainPage ? (
                                    <ToolbarGroup>
                                        <Storage style={iconStyles} color={grey500} onClick={ this.redirectTo.bind(this,'tables') }/>
                                        <Analytics style={iconStyles} color={grey500}/>
                                        <Setting style={iconStyles} color={grey500}/>
                                        <Cache style={iconStyles} color={grey500} onClick={ this.redirectTo.bind(this,'cache') }/>
                                        <Queues style={iconStyles} color={grey500}/>
                                        <Notifications style={iconStyles} color={grey500}/>
                                        <Email style={iconStyles} color={grey500}/>
                                        <ToolbarSeparator />
                                        <ToolbarTitle style={toolbartitle} text=""/>
                                        <ToolbarTitle style={toolbartitle} text="Quickstart"/>
                                        <ToolbarTitle style={toolbartitle} text="Notifications"/>
                                        <ToolbarSeparator />
                                        <IconMenu
                                            iconButtonElement={
                                                <IconButton touch={true}>
                                                    <img className="userhead"
                                                         src="/assets/images/user-default-image.jpg"
                                                         alt=""/>
                                                </IconButton>
                                            }
                                        >
                                            <MenuItem primaryText="My Profile"/>
                                            <MenuItem primaryText="Billing"/>
                                            <MenuItem primaryText="Logout" onClick={() => onLogoutClick()}/>
                                        </IconMenu>
                                    </ToolbarGroup>) : <ToolbarGroup><ToolbarTitle style={toolbartitle} text="Quickstart"/>
                                    <ToolbarTitle style={toolbartitle} text="Notifications"/>
                                    <ToolbarSeparator />
                                    <IconMenu
                                        iconButtonElement={
                                            <IconButton touch={true}>
                                                <img className="userhead"
                                                     src="/assets/images/user-default-image.jpg"
                                                     alt=""/>
                                            </IconButton>
                                        }
                                    >
                                        <MenuItem primaryText="My Profile"/>
                                        <MenuItem primaryText="Billing"/>
                                        <MenuItem primaryText="Logout" onClick={() => this.props.onLogoutClick()}/>
                                    </IconMenu></ToolbarGroup>
                        }
                    </Toolbar>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showOthers: state.manageApp.viewActive,
        currentApp: state.manageApp.appId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logOut());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
