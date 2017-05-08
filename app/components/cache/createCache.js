import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {createCache} from '../../actions';
import {connect} from 'react-redux';

import {RefreshIndicator} from 'material-ui';

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
class CreateCache extends React.Component {

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

    createCache = () => {
        this.props.dispatch(createCache(this.state.value));
        this.setState({showModal: false, value: ''});
    };
    handleKeyChange(e) {
        if (e.keyCode === 13)
            this.createCache();
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
                                New Cache
                            </span>
                            <i className="fa fa-bolt modal-icon-style pull-right"></i>
                            <div className="modal-title-inner-text">
                                Create a new cache.
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
                                    <span className="createAppLabel">Create Cache</span>
                                </Button>
                            : <Button className="btn-primary create-btn" onClick={this.createCache}>

                                Create Cache
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

export default connect(mapStateToProps, null)(CreateCache);
