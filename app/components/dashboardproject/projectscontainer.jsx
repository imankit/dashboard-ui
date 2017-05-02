'use strict';

import React from 'react';
import Project from './project.jsx';
import {
    manageApp,
    fetchApps,
    addApp,
    exitApp,
    updateBeacon,
    fetchAppSettings,
    upsertAppSettingsFile,
    showAlert
} from '../../actions';
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
            value: '',
            appSettingObj: {
                appIcon: null,
                appInProduction: false,
                appName: null
            }
        }
    }
    componentWillMount() {}
    changeHandler(e) {
        this.setState({value: e.target.value})
    }
    addApp(e) {
        e.preventDefault()
        if (this.state.value) {
            this.props.dispatch(addApp(this.state.value))
            this.props.dispatch(updateBeacon(this.props.beacons, 'firstApp'))
            this.setState({value: ''})
        }
    }
    onDeleteDev(appId) {
        this.props.dispatch(exitApp(appId, this.props.currentUser.user._id))
    }
    onProjectClick(appId, masterKey, name, from) {
        this.props.dispatch(updateBeacon(this.props.beacons, 'tableDesignerLink'))
        this.props.dispatch(manageApp(appId, masterKey, name, from))
    }
    fetchAppSettings(appId, masterKey, file) {
        if (file.type.includes('/png')) {
            this.props.dispatch(fetchAppSettings(appId, masterKey, '/')).then(() => {
                if (this.props.generalSettings) {
                    // this.setState({
                    //     ...this.props.generalSettings.settings
                    // })
                    this.props.dispatch(upsertAppSettingsFile(appId, masterKey, file, 'general', {
                        ...this.state
                    }))

                }
            })
        } else {
            showAlert('error', 'Only .png type images are allowed.')
        }

    }
    render() {
        const content = (this.props.apps.length
            ? this.props.apps.map(app => <Col xs={8} sm={6} md={4} lg={4} key={app._id} className="project-grid">
                <Project key={app._id} fetchAppSettings={this.fetchAppSettings.bind(this)} {...app} onProjectClick={this.onProjectClick.bind(this)} currentUser={this.props.currentUser} onDeleteDev={this.onDeleteDev.bind(this)} beacons={this.props.beacons} selectedPlan={app.planId}/>
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
    let generalSettings = null
    if (state.settings.length) {
        generalSettings = state.settings.filter(x => x.category == 'general')[0]
    }
    return {
        apps: state.apps || [],
        currentUser: state.user,
        loading: state.loader.modal_loading,
        beacons: state.beacons,
        generalSettings: generalSettings

    };
};

export default connect(mapStateToProps, null)(Projectscontainer);
