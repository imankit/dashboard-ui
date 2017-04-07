/**
 * Created by Darkstar on 12/21/2016.
 */
/**
 * Created by Darkstar on 12/2/2016.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {deleteApp} from '../../actions';
import {
    FormGroup,
    InputGroup,
    FormControl,
    Clearfix,
    Button,
    Modal
} from 'react-bootstrap';

import IconDelete from 'material-ui/svg-icons/action/delete';
import {grey500} from 'material-ui/styles/colors';
const iconStyles = {
    marginRight: 12,
    marginLeft: 12
};

class DeleteApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonState: false
        };
    }

    render() {

        return (

            <Modal show={this.props.showDeleteModal} onHide={this.props.closeDeleteModal}>
                <Modal.Header className="delete-modal-header-style">
                    <Modal.Title>
                        Delete App
                        <img className="delete-modal-icon-style pull-right"></img>
                        <div className="modal-title-inner-text">Please type
                            <strong>"DELETE"</strong>&nbsp; in the box below.
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="delete-modal-body">
                    <input onChange={this.props.handleChange} className="" value={this.state.value} id="createApp" placeholder='Please type "DELETE"' onChange={this.props.handleChange} required={true}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-primary delete-btn" disabled={this.props.deleteButtonState} onClick={() => this.props.onDelete(this.props.appId)}>Delete App</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (appId) => {
            dispatch(deleteApp(appId));
        }
    };
};

export default connect(null, mapDispatchToProps)(DeleteApp);
