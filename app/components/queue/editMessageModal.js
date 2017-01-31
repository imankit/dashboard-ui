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
import {updateQueueMessage} from '../../actions';

class EditMessage extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    close = () => {
        this.setState({
            messageType:'text',
            jsonValue:'',
            textValue:'',
            timeout:'',
            delay:'',
            expires:null
        })
        this.props.closeEditMessageModal()
    }

    componentDidMount(){
        let state = {}
        try {
            JSON.parse(this.props.messageData.message)
            state.messageType = 'json'
            state.jsonValue = this.props.messageData.message
        } catch(e){
            state.messageType = 'text'
            state.textValue = this.props.messageData.message
        }
        state.timeout  = this.props.messageData.timeout || ''
        state.delay  = this.props.messageData.delay || ''
        state.expires  = this.props.messageData.expires ? new Date(this.props.messageData.expires) : null
        this.setState(state)
    }

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
    updateMessage(e){
        if(this.state.messageType == 'text') this.props.messageData.message = this.state.textValue
            else this.props.messageData.message = this.state.jsonValue
        this.props.messageData.expires = this.state.expires
        this.props.messageData.delay = this.state.delay
        this.props.messageData.timeout = this.state.timeout
        this.props.updateQueueMessage(this.props.selectedQueue,this.props.messageData)
        this.close()
    }

    render() {
        return (
            <Modal show={this.props.showEditMessageModal} onHide={ this.close } dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Message</Modal.Title>
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
                        <DatePicker name="EXPIRES" container="inline" mode="landscape" onChange={this.expiresChangeHandler.bind(this)} value={ this.state.expires } className="textinputaddmessage"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Cancel</Button>
                    <Button bsStyle="primary" onClick={this.updateMessage.bind(this)}>Edit</Button>
                </Modal.Footer>
            </Modal>
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
        updateQueueMessage: (selectedQueue,selectedMessage) => dispatch(updateQueueMessage(selectedQueue,selectedMessage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMessage);
