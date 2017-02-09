import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Modal, Button, FormControl} from 'react-bootstrap';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {addItemToQueue} from '../../actions';

class AddMessage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            messageType:'text',
            jsonValue:'',
            textValue:'',
            timeout:'',
            delay:'',
            expires:null
        }
    }

    close = () => this.setState({
        showModal: false,
        messageType:'text',
        jsonValue:'',
        textValue:'',
        timeout:'',
        delay:'',
        expires:null
    });

    open = () => this.setState({showModal: true});

    handleChangeMessageType = (event, index, value) => this.setState({messageType:value})

    messageChangeHandler(which,newValue) {
        this.state[which] = newValue.target ? newValue.target.value : newValue
        this.setState(this.state)
    }

    delayTmeoutChangeHandler(which,e,newValue) {
        this.state[which] = newValue
        this.setState(this.state)
    }

    expiresChangeHandler(e,newValue) {
        this.setState({expires:newValue})
    }
    addMessage(e){
        let message = ''
        if(this.state.messageType == 'text') message = this.state.textValue
            else message = this.state.jsonValue
        this.props.addItemToQueue(this.props.selectedQueue,message,this.state.timeout,this.state.delay,this.state.expires)
        this.close()
    }

    render() {
        return (
            <div>
                <RaisedButton label="Add Message" className="addmessgaebuttontop" onClick={ this.open } disabled={ !this.props.selectedQueue.name }/>
                <Modal show={this.state.showModal} onHide={ this.close } dialogClassName="custom-modal">
                    <Modal.Header>
                        <Modal.Title>Add Message</Modal.Title>
                        <div className="modalicon" style={{paddingRight: 8, height: 56, width: 56, borderRadius: 50, backgroundColor: '#0F6DA6'}}>
                            <div className="flex-general-column-wrapper-center" style={{height: 56, width: 56}}>          
                            <i className="fa fa-exchange" style={{fontSize: 30, color: 'white'}} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                            <SelectField
                              floatingLabelText="MESSAGE DATATYPE"
                              value={this.state.messageType}
                              onChange={this.handleChangeMessageType}
                            >
                              <MenuItem value={'text'} primaryText="Text" />
                              <MenuItem value={'json'} primaryText="JSON" />
                            </SelectField>
                            <p className="quesmessagtype">MESSAGE</p>
                            {   
                                this.state.messageType == 'text' ? 
                                    <textarea rows="4" cols="50" className="textareaaddmessage" onChange={this.messageChangeHandler.bind(this,'textValue')} value={ this.state.textValue }>
                                        
                                    </textarea>
                                    :
                                    <AceEditor
                                        mode="json"
                                        theme="github"
                                        onChange={this.messageChangeHandler.bind(this,'jsonValue')}
                                        value={ this.state.jsonValue }
                                        name="json"
                                        className="jsonmodal"
                                        setOptions={{wrapBehavioursEnabled:true}}
                                        minLines={5}
                                    />
                            }
                            <p className="quesmessagtype">TIMEOUT</p>
                            <TextField
                              type="number"
                              onChange={ this.delayTmeoutChangeHandler.bind(this,'timeout') }
                              value={ this.state.timeout }
                              className="textinputaddmessage"
                              name="timeout"
                            />
                            <p className="quesmessagtype">DELAY</p>
                            <TextField
                              type="number"
                              onChange={ this.delayTmeoutChangeHandler.bind(this,'delay') }
                              value={ this.state.delay }
                              className="textinputaddmessage"
                              name="DELAY"
                            />
                            <p className="quesmessagtype">EXPIRES</p>
                            <DatePicker name="EXPIRES" container="inline" mode="landscape" onChange={this.expiresChangeHandler.bind(this)} value={ this.state.expires } className="textinputaddmessage" minDate={new Date()}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.addMessage.bind(this)}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = (state) => {

    return {
        selectedQueue:state.queue.selectedQueue || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToQueue: (selectedQueue,message,timeout,delay,expires) => dispatch(addItemToQueue(selectedQueue,message,timeout,delay,expires))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);
