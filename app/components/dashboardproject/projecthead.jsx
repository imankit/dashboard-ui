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
        if(this.state.value){
            this.props.dispatch(addApp(this.state.value));
            this.setState({
                showModal: false, value: ''
            });
        }
    };

    render() {
        return (
            <div className="project-head">
                <h1 className="dashboard-title pull-left">Apps</h1>
                <div className="btn" onClick={this.open}>+ New App</div>
                <Modal show={this.state.showModal} onHide={this.close} dialogClassName="custom-modal">
                    <Modal.Header>
                        <Modal.Title>Create New App</Modal.Title>
                        <div className="modalicon" style={{paddingRight: 8, height: 56, width: 56, borderRadius: 50, backgroundColor: '#0F6DA6'}}>
                            <div className="flex-general-column-wrapper-center" style={{height: 56, width: 56}}>          
                            <i className="fa fa-cloud" style={{fontSize: 30, color: 'white'}} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl type="text"
                                     value={this.state.value}
                                     placeholder="Pick a good name"
                                     onChange={this.handleChange}
                                     required={true}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.createApp}>Create App</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(null, null)(Projecthead);
