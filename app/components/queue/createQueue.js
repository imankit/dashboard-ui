import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {createQueue} from '../../actions';
import {connect} from 'react-redux';
import {RefreshIndicator} from 'material-ui'

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

class CreateQueue extends React.Component {

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

    createQueue = () => {
        this.props.dispatch(createQueue(this.state.value))
        this.setState({showModal: false, value: ''});
    };
    handleKeyChange(e) {
        if (e.keyCode === 13)
            this.createQueue();
        }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {onClick: this.open})
}
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header className="modal-header-style">
                        <Modal.Title>
                            <span className="modal-title-style">
                                New Queue
                            </span>
                            <i className="fa fa-exchange modal-icon-style pull-right"></i>
                            <div className="modal-title-inner-text">
                                Create a new queue.
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input value={this.state.value} id="createApp" placeholder="Pick a good name" onChange={this.handleChange} onKeyUp={this.handleKeyChange.bind(this)} required={true}/>

                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.loading
                            ? <Button className="btnloadingg btn-primary create-btn " disabled>
                                    <RefreshIndicator loadingColor="#ececec" size={35} left={-10} top={0} status="loading" style={style.refresh}/>
                                    <span className="createAppLabel">Create Queue</span>
                                </Button>
                            : <Button className="btn-primary create-btn" onClick={this.createQueue}>
                                Create Queue
                            </Button>
}

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {loading: state.loader.modal_loading};
};

export default connect(mapStateToProps, null)(CreateQueue);
