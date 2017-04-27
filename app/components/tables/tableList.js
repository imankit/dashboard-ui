/**
 * Created by Darkstar on 1/2/2017.
 */
'use strict';

import React from 'react';
import Search from 'material-ui/svg-icons/action/search';
import {grey500} from 'material-ui/styles/colors';
import {FormControl, FormGroup, InputGroup, Modal, Button} from 'react-bootstrap';
import TablesContainer from './tableContainer';
import {createTable, setTableSearchFilter, updateBeacon} from '../../actions';
import {connect} from 'react-redux';

const iconStyles = {
    marginRight: 12,
    marginLeft: 12
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
        if (this.state.value) {
            this.props.updateBeacon(this.props.beacons, 'firstTable');
            this.props.createTable(this.props.activeAppId, this.props.masterKey, this.state.value);
            this.setState({showModal: false, value: ''});

        }
    }

    render() {
        return (
            <div className="tables">
                <div className="container">
                    <div className="tables-head">
                        <p>{this.props.name}</p>
                        <FormGroup>
                            <div className="btn" onClick={this.open.bind(this)}>
                                <span className={!this.props.beacons.firstTable
                                    ? "gps_ring new_table_beacon"
                                    : 'hide'}></span>+ New Table</div>
                            <InputGroup className="search">
                                <InputGroup.Addon>
                                    <Search style={iconStyles} color={grey500}/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Search" onChange={(e) => this.props.setTableSearchFilter(e.target.value)}/>
                            </InputGroup>
                        </FormGroup>
                        <Modal show={this.state.showModal} onHide={this.close.bind(this)} dialogClassName="custom-modal">
                            <Modal.Header>
                                <Modal.Title>
                                    New Table
                                </Modal.Title>
                                <div className="modalicon" style={{
                                    paddingRight: 8,
                                    height: 56,
                                    width: 56,
                                    borderRadius: 50,
                                    backgroundColor: '#0F6DA6'
                                }}>
                                    <div className="flex-general-column-wrapper-center" style={{
                                        height: 56,
                                        width: 56
                                    }}>
                                        <i className="fa fa-table" style={{
                                            fontSize: 30,
                                            color: 'white'
                                        }}/>
                                    </div>
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <FormControl type="text" value={this.state.value} placeholder="Pick a good name" onChange={this.handleChange.bind(this)} required={true} style={{
                                    border: 'none',
                                    boxShadow: 'none',
                                    textAlign: 'center'
                                }}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button bsStyle="primary" onClick={this.onCreateTable.bind(this)}>
                                    <span className={!this.props.beacons.firstTable
                                        ? "gps_ring create_app_beacon"
                                        : 'hide'}></span>Create Table</Button>
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
    return {activeAppId: state.manageApp.appId, masterKey: state.manageApp.masterKey, name: state.manageApp.name, beacons: state.beacons};
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTable: (activeAppId, masterKey, name) => dispatch(createTable(activeAppId, masterKey, name)),
        setTableSearchFilter: (filter) => dispatch(setTableSearchFilter(filter)),
        updateBeacon: (beacons, field) => dispatch(updateBeacon(beacons, field))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
