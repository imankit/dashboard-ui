/**
 * Created by Darkstar on 12/21/2016.
 */
/**
 * Created by Darkstar on 12/2/2016.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {genClientKey, genMasterKey} from '../../actions';
import {FormGroup, InputGroup, FormControl, Clearfix} from 'react-bootstrap';
import Help from 'material-ui/svg-icons/action/help';
import {grey500} from 'material-ui/styles/colors';
import ReactTooltip from 'react-tooltip';
import CopyToClipboard from 'react-copy-to-clipboard';

const iconStyles = {
    height: 15,
    width: 15
};

class Keys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: false
        };
    }
    copyText(field) {
        this.state = {};
        this.state[field] = true;
        this.setState(this.state);
    }
    render() {
        return (
            <div className="tab-content">
                <FormGroup validationState={this.state.appIdCopied
                    ? 'success'
                    : null}>
                    <label>App ID</label><br/>
                    <label className="label-description">App ID is the unique identifier.</label>&nbsp;
                    <label className={this.state.appIdCopied
                        ? 'copy-span'
                        : 'hide'}>Copied!</label>

                    <InputGroup>
                        <FormControl type="text" value={this.props.appId} disabled/>
                        <InputGroup.Addon>
                            <CopyToClipboard text={this.props.appId} onCopy={this.copyText.bind(this, 'appIdCopied')}>
                                <i className="ion ion-ios-copy-outline copy-icon"></i>
                            </CopyToClipboard>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup validationState={this.state.masterKeyCopied
                    ? 'success'
                    : null}>
                    <label htmlFor="firstName">Master Key</label><br/>
                    <label className="label-description">Master key is private key and it ignore all the security rules.</label>
                    <label className={this.state.masterKeyCopied
                        ? 'copy-span'
                        : 'hide'}>Copied!</label>

                    <InputGroup>
                        <FormControl type="text" value={this.props.masterKey} disabled/>

                        <InputGroup.Addon>
                            <CopyToClipboard text={this.props.masterKey} onCopy={this.copyText.bind(this, 'masterKeyCopied')}>
                                <i className="ion ion-ios-copy-outline copy-icon"></i>
                            </CopyToClipboard>
                        </InputGroup.Addon>
                        <InputGroup.Addon onClick={() => this.props.onGenMasterKey(this.props.appId)}>
                            <i className="ion ion-ios-loop-strong new-icon"></i>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup validationState={this.state.clientKeyCopied
                    ? 'success'
                    : null}>
                    <label htmlFor="firstName">Client Key</label><br/>
                    <label className="label-description">Client key is the public key and can be used in your apps.</label>&nbsp;
                    <label className={this.state.clientKeyCopied
                        ? 'copy-span'
                        : 'hide'}>Copied!</label>

                    <InputGroup>
                        <FormControl type="text" value={this.props.clientKey} disabled/>
                        <InputGroup.Addon>
                            <CopyToClipboard text={this.props.clientKey} onCopy={this.copyText.bind(this, 'clientKeyCopied')}>
                                <i className="ion ion-ios-copy-outline copy-icon"></i>
                            </CopyToClipboard>
                        </InputGroup.Addon>
                        <InputGroup.Addon onClick={() => this.props.onGenClientKey(this.props.appId)}>
                            <i className="ion ion-ios-loop-strong new-icon"></i>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Clearfix/>
                <ReactTooltip place="bottom" type="info"/>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGenMasterKey: (appId) => {
            dispatch(genMasterKey(appId));
        },
        onGenClientKey: (appId) => {
            dispatch(genClientKey(appId));
        }
    };
};

export default connect(null, mapDispatchToProps)(Keys);
