/**
 * Created by Darkstar on 1/2/2017.
 */
'use strict';

import React from 'react';
import Search from 'material-ui/svg-icons/action/search';
import {grey500} from 'material-ui/styles/colors';
import {FormControl, FormGroup, InputGroup, Modal, Button} from 'react-bootstrap';
import TablesContainer from './tableContainer';
import {createTable, setTableSearchFilter, updateBeacon, showAlert} from '../../actions';
import {connect} from 'react-redux';
import {RefreshIndicator} from 'material-ui'
import _ from 'underscore'

const iconStyles = {
    marginRight: 12,
    marginLeft: 12
};
const style = {
    refresh: {
        display: 'inline-block',
        position: 'relative',
        background: 'none',
        boxShadow: 'none',
        float: 'right',
        marginLeft: '40px'
    }
};

class TableList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            value: ''
        };
    }

    close() {
        return this.setState({showModal: false});
    }

    open() {
        return this.setState({showModal: true});
    }

    handleChange(e) {
        return this.setState({value: e.target.value});
    }

    onCreateTable() {
        let {value} = this.state
        if (value) {

            let sameTableName = _.filter(this.props.tables, function(table) {
                return table.name.toLowerCase() === value.toLowerCase();
            });
            if (sameTableName.length === 0) {
                this.props.updateBeacon(this.props.beacons, 'firstTable');
                this.props.dispatch(createTable(this.props.activeAppId, this.props.masterKey, this.state.value)).then(() => {
                    this.setState({showModal: false, value: ''})
                }, (err) => this.setState({showModal: false, value: ''}));
            } else {
                this.props.showAlert('error', 'Table Name already exists.');
            }
        }
    }
    handleKeyChange(e) {
        if (e.keyCode === 13)
            this.onCreateTable();
        }

    render() {
        return (
            <div className="tables">
                <div className="container">
                    <div className="tables-head">
                        <FormGroup>
                            <div className="btn" onClick={this.open.bind(this)}>
                                <span className={this.props.beacons.firstTable
                                    ? "hide"
                                    : 'gps_ring new_table_beacon'}></span>+ New Table</div>
                            <InputGroup className="search">
                                <InputGroup.Addon>
                                    <Search style={iconStyles} color={grey500}/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Search" onChange={(e) => this.props.setTableSearchFilter(e.target.value)}/>
                            </InputGroup>
                        </FormGroup>

                        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                            <Modal.Header className="modal-header-style">
                                <Modal.Title>

                                    <span className="modal-title-style">
                                        New Table
                                    </span>
                                    <i className="fa fa-table modal-icon-style pull-right"></i>
                                    <div className="modal-title-inner-text">
                                        Create a new table.
                                    </div>
                                </Modal.Title>

                            </Modal.Header>
                            <Modal.Body>
                                <input value={this.state.value} id="createApp" placeholder="Pick a good name" onChange={this.handleChange.bind(this)} onKeyUp={this.handleKeyChange.bind(this)} required={true}/>

                            </Modal.Body>
                            <Modal.Footer>

                                {this.props.loading
                                    ? <Button className="btnloadingg btn-primary create-btn " disabled>
                                            <RefreshIndicator loadingColor="#ececec" size={35} left={-10} top={0} status="loading" style={style.refresh}/>
                                            <span className="createAppLabel">Create Table</span>
                                        </Button>
                                    : <Button className="btn-primary create-btn" onClick={this.onCreateTable.bind(this)}>
                                        <div className={this.props.beacons.firstTable
                                            ? 'hide'
                                            : "gps_ring create_app_beacon"}></div>
                                        Create Table
                                    </Button>
}

                            </Modal.Footer>
                        </Modal>
                    </div>
                    <TablesContainer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let tables = state.apps.filter(app => (app.appId === state.manageApp.appId))[0].tables;

    return {
        activeAppId: state.manageApp.appId,
        masterKey: state.manageApp.masterKey,
        name: state.manageApp.name,
        beacons: state.beacons,
        loading: state.loader.modal_loading,
        tables: tables
            ? tables.filter(t => t.name.toLowerCase().search(state.manageApp.tableFilter
                ? state.manageApp.tableFilter
                : '') >= 0)
            : []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTable: (activeAppId, masterKey, name) => dispatch(createTable(activeAppId, masterKey, name)),
        setTableSearchFilter: (filter) => dispatch(setTableSearchFilter(filter)),
        updateBeacon: (beacons, field) => dispatch(updateBeacon(beacons, field)),
        showAlert,
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
