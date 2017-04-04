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

const iconStyles = {
    height: 15,
    width: 15
};

class Keys extends React.Component {
    render() {
        return (
            <div className="tab-content">
                <FormGroup>
                    <label>App ID</label>
                    <InputGroup>
                        <FormControl type="text" value={this.props.appId} disabled/>
                        <InputGroup.Addon>
                            <i className="ion ion-ios-copy-outline copy-icon"></i>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="firstName">Master Key&nbsp;
                        <Help style={iconStyles} color={grey500} data-tip=" Master key is private key and it ignore all the security rules."/>
                    </label>
                    <InputGroup>
                        <FormControl type="text" value={this.props.masterKey} disabled/>
                        <InputGroup.Addon>
                            <i className="ion ion-ios-copy-outline copy-icon"></i>
                        </InputGroup.Addon>
                        <InputGroup.Addon onClick={() => this.props.onGenMasterKey(this.props.appId)}>
                            <i className="ion ion-ios-loop-strong new-icon"></i>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="firstName">Client Key&nbsp;
                        <Help style={iconStyles} color={grey500} data-tip="Client key is the public key and can be used in your apps. "/>
                    </label>
                    <InputGroup>
                        <FormControl type="text" value={this.props.clientKey} disabled/>
                        <InputGroup.Addon>
                            <i className="ion ion-ios-copy-outline copy-icon"></i>
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
