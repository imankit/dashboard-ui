'use strict';

import React from 'react';
import {fetchTables, deleteTable} from '../../actions';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import PowerOn from 'material-ui/svg-icons/action/power-settings-new';
import TableIcon from 'material-ui/svg-icons/device/storage';
import {grey500, grey50, white} from 'material-ui/styles/colors';
import IconDelete from 'material-ui/svg-icons/action/delete';
import RoleIcon from 'material-ui/svg-icons/hardware/security';
import UserIcon from 'material-ui/svg-icons/social/people';
import DeviceIcon from 'material-ui/svg-icons/hardware/smartphone';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const iconStyles = {
    marginTop: 14,
    color: 'white',
    fontSize: '36px',
    paddingBottom: '9px'
};
const iconStyles2 = {
    marginTop: 10,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 5,
    height: 25,
    width: 25,
    color: 'white'
};
const iconStyles3 = {
    marginTop: 33,
    marginRight: 12,
    marginLeft: 12,
    marginBottom: 5,
    height: 25,
    width: 25,
    color: 'white'
};

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-around'
    }
};

class TableContainer extends React.Component {

    componentWillMount() {
        if (this.props.tables.length === 0) {
            this.props.onLoad(this.props.activeAppId, this.props.masterKey);
        }
    }

    getIcon(tableType) {
        switch (tableType) {
            case 'role':
                return <i className="ion ion-locked" style={iconStyles}/>;
            case 'user':
                return <i className="ion ion-ios-people" style={iconStyles}/>;
            case 'device':
                return <i className="ion ion-iphone" style={iconStyles}/>;
                return;
            default:
                return <i className="ion ion-android-list" style={iconStyles}/>;
        }
    }
    redirectToTables(tableName) {
        window.location.href = DATABROWSER_URL + '/' + this.props.activeAppId + '/' + tableName
    }

    render() {
        return (
            <div style={styles.root}>
                <Grid className="tables-container">
                    <Row className="show-grid">
                        {this.props.loading
                            ? <RefreshIndicator size={50} left={70} top={0} status="loading" className="loadermain"/>
                            : this.props.tables.map((table) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={table.id}>
                                    <div className="table" onClick={this.redirectToTables.bind(this, table.name)}>
                                        {this.getIcon(table.type)}
                                        <p style={{
                                            color: white
                                        }}>{table.name}</p>
                                        {(table.type !== 'custom')
                                            ? (
                                                <div className="overlay">
                                                    <PowerOn style={iconStyles3} color={white}/>
                                                </div>
                                            )
                                            : (
                                                <div className="overlay">
                                                    <PowerOn style={iconStyles3} color={white}/> {/*<div className="bordertop"></div>
                                                        <IconDelete style={iconStyles2}
                                                                    color={white}
                                                                    onClick={
                                                                        () => this.props.deleteTable(
                                                                            this.props.activeAppId,
                                                                            this.props.masterKey,
                                                                            table.name)
                                                                    }
                                                        />*/}
                                                </div>
                                            )
}
                                    </div>
                                </Col>
                            ))
}
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let tables = state.apps.filter(app => (app.appId === state.manageApp.appId))[0].tables;
    return {
        activeAppId: state.manageApp.appId,
        loading: state.loader.secondary_loading,
        masterKey: state.manageApp.masterKey,
        tables: tables
            ? tables.filter(t => t.name.toLowerCase().search(state.manageApp.tableFilter
                ? state.manageApp.tableFilter
                : '') >= 0)
            : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (appId, masterKey) => dispatch(fetchTables(appId, masterKey)),
        deleteTable: (activeAppId, masterKey, name) => dispatch(deleteTable(activeAppId, masterKey, name))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
