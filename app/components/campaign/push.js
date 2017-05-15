/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {showAlert, sendPushCampaign} from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import Notifications from 'material-ui/svg-icons/alert/add-alert';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import SelectAudience from './selectAudience'

export class PushCampaign extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            title: '',
            progress: false,
            query: null,
            totalAudience: 0,
            os: [],
            channels: []
        }
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    componentWillMount() {
        // redirect if active app not found
        if (!this.props.appData.viewActive) {
            this.context.router.push('/')
        } else {
            let query = new CB.CloudQuery("Device")
            query.find().then((data) => {
                this.setState({totalAudience: data.length})
            }, (err) => {
                console.log(err)
            })
        }
    }
    sendPushCampaign() {
        if (this.state.message) {
            this.setState({progress: true})
            let messageObject = {
                message: this.state.message,
                title: this.state.title || ''
            }
            sendPushCampaign(messageObject, this.state.query).then(() => {
                this.setState({progress: false})
                showAlert('success', "Push Campaign Success")
            }, (err) => {
                this.setState({progress: false})
                let error = err.response.data || 'No users found'
                if (err.response.status == 500) {
                    error = "Server Error"
                }
                showAlert('error', error)
            })
        } else
            showAlert('error', "Please enter a message.")
    }
    buildQuery(query, os, channels) {
        this.setState({query: query, os: os, channels: channels})
        if (query) {
            query.find().then((data) => {
                this.setState({totalAudience: data.length})
            }, (err) => {
                console.log(err)
                showAlert('error', "Select Audience Error")
            })
        }
    }
    changeHandler(which, e) {
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    render() {
        return (
            <div id="" style={{
                backgroundColor: '#FFF'
            }}>
                <div className="cache campaign">
                    <div className="" style={{
                        width: '100%'
                    }}>
                        <div className="flex-general-column-wrapper-center" style={{
                            width: '100%',
                            marginTop: 20
                        }}>
                            <div style={{
                                width: '100%'
                            }} className="solo-horizontal-center">
                                <span style={{
                                    color: '#169CEE',
                                    fontSize: 24,
                                    fontWeight: 700
                                }}>Create an push campaign</span>
                            </div>
                            <div style={{
                                width: '100%'
                            }} className="solo-horizontal-center">
                                <span style={{
                                    color: '#4F4F4F',
                                    fontSize: 14
                                }}>The best campaigns use short and direct messaging.</span>
                            </div>
                            <div className="push-box" style={{
                                marginTop: 15
                            }}>

                                <div style={{
                                    width: '100%',
                                    height: 100,
                                    backgroundColor: '#F7F7F7',
                                    borderBottom: '1px solid #C4C2C2'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%'
                                    }} className="flex-general-row-wrapper">
                                        <div style={{
                                            width: '40%',
                                            height: '100%',
                                            padding: 35
                                        }}>
                                            <span style={{
                                                color: '#353446',
                                                fontSize: 16,
                                                fontWeight: 700
                                            }}>Title</span>
                                        </div>
                                        <div className="solo-vertical-center" style={{
                                            width: '60%',
                                            height: '100%',
                                            backgroundColor: 'white',
                                            padding: 10
                                        }}>
                                            <input type="text" className="emailinputcampaign" placeholder="Your notification title" style={{
                                                width: '100%',
                                                height: 40,
                                                fontSize: 16,
                                                paddingLeft: 4
                                            }} value={this.state.title} onChange={this.changeHandler.bind(this, 'title')}/>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    width: '100%',
                                    height: 100,
                                    backgroundColor: '#F7F7F7'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%'
                                    }} className="flex-general-row-wrapper">
                                        <div style={{
                                            width: '40%',
                                            height: '100%',
                                            padding: 35
                                        }}>
                                            <span style={{
                                                color: '#353446',
                                                fontSize: 16,
                                                fontWeight: 700
                                            }}>Message</span>
                                        </div>
                                        <div className="solo-vertical-center" style={{
                                            width: '60%',
                                            height: '100%',
                                            backgroundColor: 'white',
                                            padding: 10
                                        }}>
                                            <textarea rows={10} cols={90} style={{
                                                height: '100%',
                                                border: 0,
                                                fontSize: 16,
                                                resize: 'none'
                                            }} placeholder="Your notification message" className="emailtextareacampaign" value={this.state.message} onChange={this.changeHandler.bind(this, 'message')}/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{
                                width: '100%'
                            }} className="solo-horizontal-center">
                                <span style={{
                                    color: '#169CEE',
                                    fontSize: 24,
                                    fontWeight: 700,
                                    marginTop: "20px"
                                }}>Target your audience</span>
                            </div>
                            <div style={{
                                width: '100%'
                            }} className="solo-horizontal-center">
                                <span style={{
                                    color: '#4F4F4F',
                                    fontSize: 14
                                }}>Send to everyone, or use an audience to target the right users.</span>
                            </div>
                            <div className="audiencecontainerpush">
                                <div className="topdiv">
                                    <span className="leftspanaud">
                                        <i className="fa fa-hashtag icon" aria-hidden="true"></i>Channels</span>
                                    <span className="rightspanaud">
                                        {this.state.channels.length > 0
                                            ? this.state.channels.map((x, i) => <span key={i} className="channelslist">{x}</span>)
                                            : <span className="channelslist">All Channels</span>
}
                                    </span>
                                </div>
                                <div className="bottomdiv">
                                    <span className="leftspanaud">
                                        <i className="fa fa-apple icon" aria-hidden="true"></i>OS</span>
                                    <span className="rightspanaud">
                                        {this.state.os.length > 0 && this.state.os.length < 6
                                            ? this.state.os.map((x, i) => <span key={i} className="channelslist">{x}</span>)
                                            : <span className="channelslist">All OS</span>
}
                                    </span>
                                </div>
                                <span className="audsize">AUDIENCE SIZE - {this.state.totalAudience}</span>
                                <SelectAudience buildQuery={this.buildQuery.bind(this)}/>
                            </div>
                            <div style={{
                                width: '100%',
                                height: 50,
                                marginTop: 15,
                                marginBottom: 40
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%'
                                }} className="flex-general-column-wrapper-center">
                                    <div className="solo-vertical-center" style={{
                                        height: '100%'
                                    }}>
                                        <RaisedButton label="Send campaign" labelPosition="before" primary={true} className="emailcampbtn" disabled={this.state.progress} onClick={this.sendPushCampaign.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {appData: state.manageApp}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PushCampaign);
