/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {showAlert,enableMongoAccess,getAccessURL} from '../../actions';
import {makeUrlFromData,makeConnectionStringFromData,makeServerUrlFromData} from '../../helper'
import RaisedButton from 'material-ui/RaisedButton';
import CopyToClipboard from 'react-copy-to-clipboard';


class MongoAccess extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            accessUrlEnabled:false
        }
    }
    componentWillMount(){
        this.getAccessDetails()
    }
    enableMongoAccess(){
        enableMongoAccess(this.props.appData.appId).then((res)=>{
            showAlert('success','Success enabling MongoDB access.')
            this.getAccessDetails()
        },(err)=>{
            console.log(err)
            showAlert('error','Error enabling MongoDB access.')
        })
    }
    getAccessDetails(){
        getAccessURL(this.props.appData.appId).then((res)=>{
            this.setState({
                accessUrlString : makeUrlFromData(res.data),
                connectionString : makeConnectionStringFromData(res.data),
                serverUrl : makeServerUrlFromData(res.data),
                accessUsername : res.data.data.username,
                accessPassword : res.data.data.password,
                accessUrlEnabled : true
            })
        },(err)=>{
            console.log(err)
        })
    }
    render() {

        return (
            <div className="contentsubdiv" style={{fontFamily: 'Signika'}}>
                <div style={{width: '100%'}} className="solo-horizontal-center">
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>MongoDB Access</span>
                </div>

                <div className={ this.state.accessUrlEnabled ? "" : "hide" }>
                    <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper push-box">
                        <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                            Shell
                        </div>
                        <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                            <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                                { this.state.accessUrlString || '' }
                            </div>
                        </div>
                        <CopyToClipboard text={this.state.accessUrlString || ''}>
                            <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                                <div className="flex-general-column-wrapper-center" >
                                    <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper push-box">
                        <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                            Connection String
                        </div>
                        <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                            <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                                { this.state.connectionString || '' }
                            </div>
                        </div>
                        <CopyToClipboard text={this.state.connectionString || ''}>
                            <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                                <div className="flex-general-column-wrapper-center" >
                                    <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper push-box">
                        <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                            Server Url
                        </div>
                        <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                            <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                                { this.state.serverUrl || '' }
                            </div>
                        </div>
                        <CopyToClipboard text={this.state.serverUrl || ''}>
                            <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                                <div className="flex-general-column-wrapper-center" >
                                    <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper push-box">
                        <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                            Username
                        </div>
                        <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                            <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                                { this.state.accessUsername || '' }
                            </div>
                        </div>
                        <CopyToClipboard text={this.state.accessUsername || ''}>
                            <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                                <div className="flex-general-column-wrapper-center" >
                                    <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper push-box">
                        <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                            Password
                        </div>
                        <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                            <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                                { this.state.accessPassword || '' }
                            </div>
                        </div>
                        <CopyToClipboard text={this.state.accessPassword || ''}>
                            <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                                <div className="flex-general-column-wrapper-center" >
                                    <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>

                    <div style={{width: '100%', backgroundColor: 'white', height: 52, borderWidth: '0px 1px 1px 1px', borderColor: '#EDEDED', borderStyle: 'solid'}} className="flex-general-row-wrapper push-box">
                        <div style={{width: '10%', marginLeft: 10, height: '100%', fontSize: 15,color:'black',paddingLeft:5}} className="solo-vertical-center">
                            Database
                        </div>
                        <div className="solo-vertical-center" style={{width: '80%', marginLeft: 6, height: '100%', fontSize: 14, padding: 6}}>
                            <div style={{paddingLeft: 7, width: '100%', height: '100%', borderRadius: 2, border: '1px solid #EDEDED', backgroundColor: '#EDEAEA',wordBreak: 'break-word'}} className="solo-vertical-center" >
                                { this.props.appData.appId || '' }
                            </div>
                        </div>
                        <CopyToClipboard text={this.props.appData.appId || ''}>
                            <div className="flex-general-column-wrapper-center" style={{width: '7%', height: '100%', cursor: 'pointer', fontSize: 14, padding: 6}}>
                                <div className="flex-general-column-wrapper-center" >
                                    <i className="icon ion-ios-copy-outline" style={{fontSize: 19}} />
                                </div>
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>


                <div style={{width: '100%', height: 50, marginTop: 15, marginBottom: 40}}> 
                    <div style={{width: '100%', height: '100%'}} className="flex-general-column-wrapper-center">
                    <div className="solo-vertical-center" style={{height: '100%'}}>
                        <RaisedButton
                            label="Enable Access"
                            labelPosition="before"
                            primary={true}
                            className={ this.state.accessUrlEnabled ? "hide" : "emailcampbtn" }
                            onClick={ this.enableMongoAccess.bind(this) }
                        />
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        appData: state.manageApp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MongoAccess);
