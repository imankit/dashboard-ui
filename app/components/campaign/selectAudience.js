import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {} from '../../actions';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Chip from 'material-ui/Chip';

class SelectAudience extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            value: '',
            os:['ios','android','edge','chrome','firefox','windows'],
            channels:[],
            osPop:false,
            channelPop:false,
            channelInput:''
        };
    }

    close = () => this.setState({showModal: false});

    open = () => this.setState({showModal: true});

    handleTouchTap = (which,event) => {
        event.preventDefault()
        this.state[which] = true
        this.state['anchorEl'] = event.currentTarget
        this.setState(this.state)
    };

    handleRequestClose = (which) => {
        this.state[which] = false
        this.setState(this.state)
    };

    changeHandler(which,e){
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    addReomoveOS(which,e){
        if(which == 'all'){
            if(e.target.checked){
                this.state.os = ['ios','android','edge','chrome','firefox','windows']
            } else {
                this.state.os = []
            }
        } else {
            if(e.target.checked){
                this.state.os.push(which)
            } else {
                this.state.os = this.state.os.filter(x => x!= which)
            }
        }
        this.setState(this.state)
    }
    addChannel(){
        if(this.state.channelInput){
            this.state.channels.push(this.state.channelInput)
            this.setState(this.state)
            this.setState({channelInput:''})
        }
    }
    removeChannel(which){
        this.state.channels = this.state.channels.filter(x => x!= which)
        this.setState(this.state)
    }

    buildAudienceQuery = () => {
        let finalQuery = new CB.CloudQuery("Device")
        if(this.state.os.length > 0 && this.state.os.length < 6){
            finalQuery.equalTo('deviceOS',this.state.os[0])
            let osQueries = []
            this.state.os.map((x,i)=>{
                let query = new CB.CloudQuery("Device")
                query.equalTo('deviceOS',x)
                osQueries.push(query)
            })
            if(osQueries.length > 0) finalQuery = CB.CloudQuery.or(osQueries,finalQuery)
        }
        if(this.state.channels.length>0){
            finalQuery.containedIn('channels', this.state.channels)
        }
        this.props.buildQuery(finalQuery,this.state.os,this.state.channels)
        this.close()
    };

    render() {
        return (
            <div>
                <RaisedButton
                  label="Select Audience"
                  labelPosition="before"
                  primary={true}
                  icon={<FilterIcon />}
                  className="filteraud"
                  onClick={this.open}
                />
                <Modal show={this.state.showModal} onHide={this.close} dialogClassName="custom-modal">
                    <Modal.Header>
                        <Modal.Title>Select Audience</Modal.Title>
                        <div className="modalicon" style={{paddingRight: 8, height: 56, width: 56, borderRadius: 50, backgroundColor: '#0F6DA6'}}>
                            <div className="flex-general-column-wrapper-center" style={{height: 56, width: 56}}>          
                            <i className="fa fa-bell-o" style={{fontSize: 30, color: 'white'}} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{width: '100%', backgroundColor: 'white',height:"150px"}} className="audcontdivs">
                          <div style={{width: '30%', height: 150,"backgroundColor": "#f1f1f1",float:"left"}} className="flex-general-column-wrapper-center">
                            <span style={{color: '#353446', fontSize: 17, fontWeight: 500}}>Channels</span>
                          </div>
                          <div className="secondcontentdivselaud" style={{height:150}}>
                                <input className="inptchannel" type="text" value={this.state.channelInput } onChange={ this.changeHandler.bind(this,'channelInput') } />
                                <button className="inptchannelbtn" onClick={ this.addChannel.bind(this) }>Add Channel</button>
                                {
                                    this.state.channels.map((x,i)=>{
                                        return <Chip className="oschip" key={ i } onRequestDelete={this.removeChannel.bind(this,x)}>{ x }</Chip>
                                    })
                                }
                          </div>
                        </div>
                        <div style={{width: '100%', backgroundColor: 'white'}} className="audcontdivs">
                          <div style={{width: '30%', height: 100,"backgroundColor": "#f1f1f1",float:"left"}} className="flex-general-column-wrapper-center">
                            <span style={{color: '#353446', fontSize: 17, fontWeight: 500}}>OS</span>
                          </div>
                          <div className="secondcontentdivselaud">
                                <IconButton tooltip="Edit OS" className="filtericonmodalaud" onTouchTap={this.handleTouchTap.bind(this,'osPop')}>
                                  <FilterIcon />
                                </IconButton>
                                <Popover
                                  open={this.state.osPop}
                                  anchorEl={this.state.anchorEl}
                                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                  onRequestClose={this.handleRequestClose.bind(this,'osPop')}
                                  className="osPop"
                                >
                                    <div className="filterrowplane">
                                        <span className="tailnamefilter">ALL DEVICES <input type="checkbox" checked={ this.state.os.length == 6 } onChange={ this.addReomoveOS.bind(this,'all') } className="checkcardfilter"/></span>
                                        <span className="tailnamefilter">IOS<input type="checkbox" checked={ this.state.os.indexOf("ios") != -1 } onChange={ this.addReomoveOS.bind(this,'ios') } className="checkcardfilter"/></span>
                                        <span className="tailnamefilter">ANDROID<input type="checkbox" checked={ this.state.os.indexOf('android') != -1 } onChange={ this.addReomoveOS.bind(this,'android') } className="checkcardfilter"/></span>
                                        <span className="tailnamefilter">CHROME<input type="checkbox" checked={ this.state.os.indexOf('chrome') != -1 } onChange={ this.addReomoveOS.bind(this,'chrome') } className="checkcardfilter"/></span>
                                        <span className="tailnamefilter">WINDOWS<input type="checkbox" checked={ this.state.os.indexOf('windows') != -1 } onChange={ this.addReomoveOS.bind(this,'windows') } className="checkcardfilter"/></span>
                                        <span className="tailnamefilter">FIREFOX<input type="checkbox" checked={ this.state.os.indexOf('firefox') != -1 } onChange={ this.addReomoveOS.bind(this,'firefox') } className="checkcardfilter"/></span>
                                        <span className="tailnamefilter">EDGE<input type="checkbox" checked={ this.state.os.indexOf('edge') != -1 } onChange={ this.addReomoveOS.bind(this,'edge') } className="checkcardfilter"/></span>
                                    </div>
                                </Popover>
                                <div className="oschipdiv">
                                    {
                                        this.state.os.map((x,i)=>{
                                            return <Chip className="oschip" key={ i }>{ x }</Chip>
                                        })
                                    }
                                </div>
                          </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.buildAudienceQuery}>Select Audience</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default connect(null, null)(SelectAudience);
