'use strict';
import React from 'react';
import {connect} from 'react-redux';
import OptionsModal from './optionsModal';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import {Modal, Button} from 'react-bootstrap';

export class DeleteApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonState: false
        };
    }

    handleKeyChange(e) {
        if (e.keyCode === 13 && !this.props.deleteButtonState)
            this.props.onDelete(this.props.appId)
    }

    render() {

        return (

            <Modal show={this.props.show} dialogClassName='developers-modal' onHide={this.props.close}>
                <Modal.Header style={{
                    paddingTop: 10
                }} className="modal-header-style">
                    <Modal.Title>

                        <span className="modal-title-style">
                            Add Developers
                        </span>
                        <i className="ion ion-android-person-add modal-icon-style pull-right"></i>

                        <div className="modal-title-inner-text">Add Developers to contribute to your app.
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OptionsModal loading={this.props.loading} id={this.props.id} appId={this.props.appId} masterKey={this.props.masterKey} clientKey={this.props.clientKey} planId={this.props.planId} developers={this.props.developers} invited={this.props.invited} selectedTab={this.props.selectedTab}/>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteApp);
