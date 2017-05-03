/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar/toolbar.js';
import Footer from './footer/footer.jsx';
import {manageApp, fetchApps} from '../actions';
const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;

class AppSelected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'tables'
        }
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    componentWillMount() {
        // if no app data is found in memory , then find the app and set that data
        if (this.props.isAppActive === false) {
            let appFound = false
            this.props.apps.map((app) => {
                if (app.appId == this.props.params.appId) {
                    appFound = true
                    // save app data in memory
                    this.props.manageApp(app.appId, app.keys.master, app.name)
                }
            })
            // if app not found , send back to home page
            if (!appFound)
                browserHistory.push('/')
        }
    }
    componentWillReceiveProps(props) {
        // select nav button wrt to path
        if (props.routes[2].path) {
            this.setState({selected: props.routes[2].path})
        }
    }
    redirectTo(where) {
        this.context.router.push('/' + this.props.params.appId + "/" + where)
    }
    openFiles() {
        window.location.href = FILES_URL + "/" + this.props.params.appId
    }
    render() {
        return (
            <div className="manageappcontainer row">
                <div className="sidenavbar col-md-3 col-sm-3 col-xs-2 col-lg-2">
                    <div className="affix sidebarcontainer">
                        <button className={this.state.selected == "tables"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'tables')}>
                            <i className={this.state.selected == "tables"
                                ? "fa fa-bars buttonicon"
                                : "buttonicon fa fa-bars red"} aria-hidden="true"></i>
                            Tables
                        </button>
                        <button className={this.state.selected == "analytics"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'analytics')}>
                            <i className={this.state.selected == "analytics"
                                ? "fa fa-bar-chart buttonicon"
                                : "buttonicon fa fa-bar-chart blue"} aria-hidden="true"></i>
                            Analytics
                        </button>
                        <button className={this.state.selected == "settings"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'settings')}>
                            <i className={this.state.selected == "settings"
                                ? "fa fa-cog buttonicon"
                                : "buttonicon fa fa-cog green"} aria-hidden="true"></i>
                            Settings
                        </button>
                        <button className={this.state.selected == "cache"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'cache')}>
                            <i className={this.state.selected == "cache"
                                ? "fa fa-bolt buttonicon"
                                : "buttonicon fa fa-bolt purple"} aria-hidden="true"></i>
                            Cache
                        </button>
                        <button className={this.state.selected == "queue"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'queue')}>
                            <i className={this.state.selected == "queue"
                                ? "fa fa-exchange buttonicon"
                                : "buttonicon fa fa-exchange blue"} aria-hidden="true"></i>
                            Queue
                        </button>
                        <button className={this.state.selected == "push"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'push')}>
                            <i className={this.state.selected == "push"
                                ? "fa fa-bell-o buttonicon"
                                : "buttonicon fa fa-bell-o orange"} aria-hidden="true"></i>
                            Push Notifications
                        </button>
                        <button className={this.state.selected == "email"
                            ? "navbuttonselected navbutton"
                            : "navbutton"} onClick={this.redirectTo.bind(this, 'email')}>
                            <i className={this.state.selected == "email"
                                ? "fa fa-envelope-o buttonicon"
                                : "buttonicon fa fa-envelope-o blue"} aria-hidden="true"></i>
                            Email Campaign
                        </button>
                        <button className="navbutton" onClick={this.openFiles.bind(this)}>
                            <i className="buttonicon fa fa-file-o purple" aria-hidden="true"></i>
                            Files
                        </button>
                    </div>
                </div>
                <div className="manageappcontainermain col-md-9 col-sm-9 col-xs-10 col-lg-10">
                    {this.props.isAppActive
                        ? this.props.children
                        : ''
}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let isAppActive = state.manageApp.viewActive || false
    return {
        apps: state.apps || [],
        isAppActive
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        manageApp: (appId, masterKey, name, from) => dispatch(manageApp(appId, masterKey, name, from))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelected);
