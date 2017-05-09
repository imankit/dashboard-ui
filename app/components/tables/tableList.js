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
import {RefreshIndicator} from 'material-ui'

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
        if (this.state.value) {
            this.props.updateBeacon(this.props.beacons, 'firstTable');
            this.props.dispatch(createTable(this.props.activeAppId, this.props.masterKey, this.state.value)).then(() => {
                this.setState({showModal: false, value: ''})
            }, (err) => this.setState({showModal: false, value: ''}));

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
                                {/* <FormControl type="text" value={this.state.value} placeholder="Pick a good name" onChange={this.handleChange.bind(this)} required={true} style={{
                                    border: 'none',
                                    boxShadow: 'none',
                                    textAlign: 'center'
                                }}/> */}
                                <input value={this.state.value} id="createApp" placeholder="Pick a good name" onChange={this.handleChange.bind(this)} onKeyUp={this.handleKeyChange.bind(this)} required={true}/>

                            </Modal.Body>
                            <Modal.Footer>
                                {/* <Button bsStyle="primary" onClick={this.onCreateTable.bind(this)}>
                                    <span className={!this.props.beacons.firstTable
                                        ? "gps_ring create_app_beacon"
                                        : 'hide'}></span>Create Table</Button> */}
                                {this.props.loading
                                    ? <Button className="btnloadingg btn-primary create-btn " disabled>
                                            <RefreshIndicator loadingColor="#ececec" size={35} left={-10} top={0} status="loading" style={style.refresh}/>
                                            <span className="createAppLabel">Create Table</span>
                                        </Button>
                                    : <Button className="btn-primary create-btn" onClick={this.onCreateTable.bind(this)}>
                                        <div className={!this.props.beacons.firstTable
                                            ? "gps_ring create_app_beacon"
                                            : 'hide'}></div>
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
    return {activeAppId: state.manageApp.appId, masterKey: state.manageApp.masterKey, name: state.manageApp.name, beacons: state.beacons, loading: state.loader.modal_loading};
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTable: (activeAppId, masterKey, name) => dispatch(createTable(activeAppId, masterKey, name)),
        setTableSearchFilter: (filter) => dispatch(setTableSearchFilter(filter)),
        updateBeacon: (beacons, field) => dispatch(updateBeacon(beacons, field)),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
