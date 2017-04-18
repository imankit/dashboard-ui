/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Toolbar from './toolbar/toolbar.js';
import Footer from './footer/footer.jsx';
import { manageApp, fetchApps } from '../actions';
const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;

class AppSelected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected:'tables'
        }
    }
    static get contextTypes() {
        return { router: React.PropTypes.object.isRequired }
    }
    componentWillMount() {
        if(this.props.isAppActive === false){
            let appFound = false
            this.props.apps.map((app) => {
                if(app.appId == this.props.params.appId){
                    appFound = true
                    this.props.manageApp(app.appId,app.keys.master,app.name)
                }
            })
            if(!appFound) browserHistory.push('/')
        }
    }
    componentWillReceiveProps(props){
        // select nav button wrt to path
        if(props.routes[2].path){
            this.setState({selected:props.routes[2].path})
        }
    }
    redirectTo(where) {
        this.context.router.push('/' + this.props.params.appId + "/" + where)
    }
    render() {
        return (
            <div className="manageappcontainer">
                <div className="sidenavbar">
                    <button className={ this.state.selected == "tables" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'tables')}>
                        <i className="fa fa-bars buttonicon" aria-hidden="true"></i>
                        Tables
                    </button>
                    <button className={ this.state.selected == "analytics" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'analytics')}>
                        <i className="fa fa-bar-chart buttonicon" aria-hidden="true"></i>
                        Analytics
                    </button>
                    <button className={ this.state.selected == "settings" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'settings')}>
                        <i className="fa fa-cog buttonicon" aria-hidden="true"></i>
                        Settings
                    </button>
                    <button className={ this.state.selected == "cache" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'cache')}>
                        <i className="fa fa-bolt buttonicon" aria-hidden="true"></i>
                        Cache
                    </button>
                    <button className={ this.state.selected == "queue" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'queue')}>
                        <i className="fa fa-exchange buttonicon" aria-hidden="true"></i>
                        Queue
                    </button>
                    <button className={ this.state.selected == "push" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'push')}>
                        <i className="fa fa-bell-o buttonicon" aria-hidden="true"></i>
                        Push Notifications
                    </button>
                    <button className={ this.state.selected == "email" ? "navbuttonselected navbutton": "navbutton" } onClick={this.redirectTo.bind(this, 'email')}>
                        <i className="fa fa-envelope-o buttonicon" aria-hidden="true"></i>
                        Email Campaign
                    </button>
                </div>
                <div className="manageappcontainermain">
                    {   
                        this.props.isAppActive ? this.props.children : ''
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
        manageApp: (appId, masterKey, name, from) => dispatch(manageApp(appId, masterKey, name, from)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelected);
