/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Toolbar from './toolbar/toolbar.js';
import Footer from './footer/footer.jsx';
import { manageApp, fetchApps } from '../actions';

class AppSelected extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {
        if(this.props.isAppActive === false){
            this.props.apps.map((app)=>{
                if(app.appId == this.props.params.appId){
                    this.props.manageApp(app.appId,app.keys.master,app.name)
                }
            })
        }
    }
    render() {
        return (
            <div>
                {   
                    this.props.isAppActive ? this.props.children : ''
                }
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
