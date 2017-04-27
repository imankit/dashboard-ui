'use strict';

import React from 'react';
import Project from './project.jsx';
import {manageApp, fetchApps, addApp, exitApp, updateBeacon} from '../../actions';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap'
import {RefreshIndicator, IconButton} from 'material-ui';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
        background: 'none',
        boxShadow: 'none',
        marginTop: '-6px',
        float: 'right'
    }
};

class Projectscontainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    componentWillMount() {}
    changeHandler(e) {
        this.setState({value: e.target.value})
    }
    addApp(e) {
        e.preventDefault()
        if (this.state.value) {
            this.props.addApp(this.state.value)
            this.props.dispatch(updateBeacon(this.props.beacons, 'firstApp'))
            this.setState({value: ''})
        }
    }
    onDeleteDev(appId) {
        this.props.exitApp(appId, this.props.currentUser.user._id)
    }
    onProjectClick(appId, masterKey, name, from) {
        this.props.dispatch(updateBeacon(this.props.beacons, 'tableDesignerLink'))
        this.props.dispatch(manageApp(appId, masterKey, name, from))
    }

    render() {
        const content = (this.props.apps.length
            ? this.props.apps.map(app => <Col xs={8} sm={6} md={4} lg={4} key={app._id} className="project-grid">
                <Project key={app._id} {...app} onProjectClick={this.onProjectClick.bind(this)} currentUser={this.props.currentUser} onDeleteDev={this.onDeleteDev.bind(this)} beacons={this.props.beacons} selectedPlan={app.planId}/>
            </Col>)
            : <form onSubmit={this.addApp.bind(this)}>
                <div className="noappfound">
                    <p className="welcome">Welcome!</p>
                    <p className="subhead">Let's create your first app:</p>
                    <input required type="text" placeholder="Name your app" value={this.state.value} onChange={this.changeHandler.bind(this)}/> {this.props.loading
                        ? <button className="btn btn-primary btnloading" type="submit">
                                <RefreshIndicator loadingColor="#ececec" size={40} left={0} top={0} status="loading" style={styles.refresh}/>
                                Create App</button>
                        : <button className="btn btn-primary" type="submit">
                            <span className={!this.props.beacons.firstApp
                                ? "gps_ring create_app_beacon"
                                : 'hide'}></span>
                            Create App</button>
}
                </div>
            </form>);
        return (
            <div style={styles.root}>
                <Grid className="projects-container">
                    <Row className="show-grid">
                        {content}
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apps: state.apps || [],
        currentUser: state.user,
        loading: state.loader.modal_loading,
        beacons: state.beacons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onProjectClick: (appId, masterKey, name, from) => dispatch(manageApp(appId, masterKey, name, from)),
        exitApp: (appId, userId) => dispatch(exitApp(appId, userId)),
        addApp: (name) => dispatch(addApp(name)),
        dispatch
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Projectscontainer);
