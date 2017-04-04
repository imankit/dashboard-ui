import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {addApp} from '../../actions';
import {connect} from 'react-redux';

class Projecthead extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            value: ''
        };
    }

    close = () => this.setState({showModal: false});

    open = () => this.setState({showModal: true});

    handleChange = (e) => this.setState({value: e.target.value});

    createApp = () => {
        if (this.state.value) {
            this.props.dispatch(addApp(this.state.value));
            this.setState({showModal: false, value: ''});
        }
    };

    render() {
        return (
            <div className="project-head">
                <h1 className="dashboard-title pull-left" style={{
                    fontFamily: 'Signika',
                    color: '#555555'
                }}>Your Apps</h1>
                <div className="btn" onClick={this.open}>+ New App</div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header className="modal-header-style">
                        <Modal.Title>
                            <span className="modal-title-style">
                                New App
                            </span>
                            <i className="fa fa-cloud modal-icon-style pull-right"></i>
                            <div className="modal-title-inner-text">Create a new app.</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >

                        <input className="" value={this.state.value} id="createApp" placeholder="Pick a good name" onChange={this.handleChange} required={true}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-primary create-btn" onClick={this.createApp}>Create App</Button>

                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default connect(null, null)(Projecthead);
