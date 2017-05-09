import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {addApp, updateBeacon} from '../../actions';
import {connect} from 'react-redux';
import {RefreshIndicator, IconButton} from 'material-ui';

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
    handleKeyChange(e) {
        if (e.keyCode === 13)
            this.createApp();
        }

    createApp = () => {
        if (this.state.value) {
            this.props.dispatch(addApp(this.state.value)).then(() => {
                this.setState({showModal: false, value: ''});
                this.props.dispatch(updateBeacon(this.props.beacons, 'firstApp'))
            }, (err) => {
                this.setState({showModal: false, value: ''});
            })
        }
    }

    render() {
        return (
            <div className="project-head">
                <h1 className="dashboard-title pull-left" style={{
                    fontSize: '30px'
                }}>Your Apps</h1>
                <div className={!this.props.beacons.firstApp
                    ? "btn newAppBtn"
                    : "btn"} onClick={this.open}>
                    <span className={!this.props.beacons.firstApp
                        ? "joyride-beacon new_app_beacon"
                        : "hide"}>
                        <span className="joyride-beacon__inner"></span>
                        <span className="joyride-beacon__outer"></span>
                    </span>

                    <span className={!this.props.beacons.firstApp
                        ? "newAppLabel"
                        : ""}>+ New App</span>
                </div>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header className="modal-header-style">
                        <Modal.Title>
                            <span className="modal-title-style">
                                New App
                            </span>
                            <i className="fa fa-cloud modal-icon-style pull-right"></i>
                            <div className="modal-title-inner-text">
                                Create a new app.
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >

                        <input className="" value={this.state.value} id="createApp" placeholder="Pick a good name" onChange={this.handleChange} onKeyUp={this.handleKeyChange.bind(this)} required={true}/>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.loading
                            ? <Button className="btnloadingg btn-primary create-btn " disabled>
                                    <RefreshIndicator loadingColor="#ececec" size={35} left={-10} top={0} status="loading" style={style.refresh}/>
                                    <span className="createAppLabel">Create App</span>
                                </Button>
                            : <Button className={!this.props.beacons.firstApp
                                ? "btn-primary create-btn createBtnBeacon"
                                : "btn-primary create-btn"} onClick={this.createApp}>
                                <span className={!this.props.beacons.firstApp
                                    ? "joyride-beacon new_app_beacon"
                                    : "hide"}>
                                    <span className="joyride-beacon__inner"></span>
                                    <span className="joyride-beacon__outer"></span>
                                </span>

                                <span className={!this.props.beacons.firstApp
                                    ? "createAppBtnLabel"
                                    : ""}>Create App</span>
                            </Button>
}
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {loading: state.loader.modal_loading, beacons: state.beacons};
};

export default connect(mapStateToProps, null)(Projecthead);
