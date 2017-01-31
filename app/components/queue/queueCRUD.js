/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {deleteQueue,selectQueue,deleteItemFromQueue,resetQueueState} from '../../actions';
import {grey500} from 'material-ui/styles/colors';
import {FormControl, FormGroup, InputGroup, Modal, Button} from 'react-bootstrap';
import Search from 'material-ui/svg-icons/action/search';
import CreateQueue from './createQueue'
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Lock from 'material-ui/svg-icons/action/lock';
import Edit from 'material-ui/svg-icons/image/edit';
import TextField from 'material-ui/TextField';
import MessageModal from './addMessageModal'
import EditMessage from './editMessageModal'
import ACL from './ACL'

const iconStyles = {
    marginLeft: 10
};

class QueueCRUD extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            key:'',
            value:'',
            searchQueue:'',
            showEditMessageModal:false,
            showACLModal:false,
            selectedMessage:null,
            selectedQueue:null,
        }
    }
    componentWillMount(){

    }
    deleteQueue(selectedQueue,e){
        e.stopPropagation()
        this.props.deleteQueue(selectedQueue)
    }
    changeHandler(which,e,value){
        this.state[which] = value
        this.setState(this.state)
    }
    changeHandlerSearch(e){
        this.setState({searchQueue:e.target.value})
    }
    deleteItemFromQueue(itemId){
        this.props.deleteItemFromQueue(this.props.selectedQueue,itemId)
    }

    closeEditMessageModal = () => this.setState({showEditMessageModal: false,selectedMessage:null})
    updateMessage(selectedMessage){
        this.setState({showEditMessageModal: true, selectedMessage:selectedMessage})
    }
    closeACLModal = () => this.setState({showACLModal: false})
    updateACL(selectedQueue,e){
        e.stopPropagation()
        this.setState({showACLModal:true, selectedQueue:selectedQueue})
    }

    dateFormat(date){
        if(date)
            return new Date(date).toISOString().slice(0,10).replace(/-/g,"/") + ", " + new Date(date).getHours()+":"+new Date(date).getMinutes()
    }
    componentWillUnmount(){
        this.props.resetQueueState()
    }
    render() {
        let queues = this.props.allQueues
        .filter((x)=>{
            if(this.state.searchQueue == ''){
                    return true
            } else {
                let string = x.name.toLowerCase()
                return string.includes(this.state.searchQueue.toLowerCase())
            }
        })
        .map((x,i)=>{
            return  <div key={ i } className={ this.props.selectedQueue.name == x.name ? "cacheDivSelected" : "cacheDiv" } onClick={ this.props.selectQueue.bind(this,x) }>
                        <div className="cacheicondiv">
                            <i className="fa fa-exchange cacheI"></i>
                        </div>
                        <div className="cachecontent">
                            <div className="cacheNamediv">
                                <p className="cachename">{ x.name }</p>
                            </div>
                            <div className="cacheProps">
                                <p className="cachesizeitems">QUEUE SIZE:<span className="cacheitemssizecontent">{ x.size || "EMPTY" }</span></p>
                            </div>
                        </div>
                        <div className="cachebuttonsdiv">
                            <RaisedButton
                              className="buttoncachedelete"
                              icon={<Delete />}
                              style={iconStyles}
                              onClick={ this.deleteQueue.bind(this,x) }
                            />
                            <RaisedButton
                              className="buttoncacheminus"
                              icon={<Lock />}
                              style={iconStyles}
                              onClick={ this.updateACL.bind(this,x) }
                            />
                        </div>
                    </div>
        })
        return (
                <div className="container">
                    <div className="tables-head">
                        <p>{this.props.name}</p>
                        <FormGroup>
                            <CreateQueue>
                                <div className="btn" onClick={this.open}>+ Create Queue</div>
                            </CreateQueue>
                            
                            <InputGroup className="search">
                                <InputGroup.Addon>
                                    <Search style={iconStyles} color={grey500}/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Search Queue.." value={ this.state.searchQueue } onChange={ this.changeHandlerSearch.bind(this) }/>
                            </InputGroup>
                        </FormGroup>
                        {   this.state.showACLModal ? 
                                <ACL closeACLModal={this.closeACLModal} showACLModal={this.state.showACLModal} selectedQueue={ this.state.selectedQueue }/> : ''
                        }
                    </div>
                    <div className="col-sm-6 cacheleft">
                        { queues }
                    </div>
                    <div className="col-sm-6 cacheright">
                        <div className="cacheaddfieldsdiv">
                            <MessageModal/>
                            {
                                this.props.selectedQueueItems.map((x,i)=>{
                                    return  <div key={ i } className="queueitemsdiv">
                                                <div className="messagequediv">
                                                    <div className="messagequeuemessage">
                                                        <span className="messagemessage">{ x.message }</span>
                                                    </div>
                                                </div>
                                                <div className="messagequeueprops">
                                                    <p className="cachesizeitems">TIMEOUT:<span className="cacheitemssizecontent">{ x.timeout }</span></p>
                                                    <p className="cachesizeitems">DELAY:<span className="cacheitemssizecontent">{ x.delay }</span></p>
                                                    <p className="cachesizeitems">EXPIRES:<span className="cacheitemssizecontent">{ x.expires ? this.dateFormat(x.expires) :'NOT SET' }</span></p>
                                                </div>
                                                <div className="messagequeueicons">
                                                    <RaisedButton
                                                      className="buttonquemessage"
                                                      icon={<Delete />}
                                                      onClick={ this.deleteItemFromQueue.bind(this,x.id) }
                                                    />
                                                    <RaisedButton
                                                      className="buttonquemessage"
                                                      icon={<Edit />}
                                                      onClick={ this.updateMessage.bind(this,x) }
                                                    />
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                        { 
                            this.state.selectedMessage ? 
                                <EditMessage closeEditMessageModal={this.closeEditMessageModal} showEditMessageModal={this.state.showEditMessageModal} messageData={ this.state.selectedMessage }/> : ''
                        }
                    </div>
                </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        name: state.manageApp.name,
        allQueues: state.queue.allQueues || [],
        selectedQueueItems:state.queue.selectedQueueItems || [],
        selectedQueue:state.queue.selectedQueue || {}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectQueue: (selectedQueue) => dispatch(selectQueue(selectedQueue)),
        deleteQueue: (selectedQueue) => dispatch(deleteQueue(selectedQueue)),
        deleteItemFromQueue: (selectedQueue,itemId) => dispatch(deleteItemFromQueue(selectedQueue,itemId)),
        resetQueueState: () => dispatch(resetQueueState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QueueCRUD);
