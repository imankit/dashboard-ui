/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {} from '../../actions';

//mui
import RaisedButton from 'material-ui/RaisedButton';


class Push extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentWillMount(){

    }
    render() {

        return (
            <div className="contentsubdiv">
                <div style={{width: '100%'}} className="solo-horizontal-center">
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>Push Notifications Settings</span>
                </div>


                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-apple" style={{marginRight: 4}} />
                            Apple Push Certificates
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Certificate file</span>
                            <span className="smallp">Upload your .p12 certificate file to enable push for iOS and OS X.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <p className="addfile">+ Add Certificate</p>
                        </div>
                        </div>
                    </div>

                </div>

                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-android" style={{marginRight: 4}} />
                            Android Push Credentials
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Sender ID</span>
                            <span className="smallp">This is an integer listed under "Project Number" in the Google API console.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Sender ID" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>API Key</span>
                            <span className="smallp">This is listed under the "Authentication" section of the Google API console.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter API Key" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                </div>

                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', marginTop: 25,backgroundColor: '#169cee',padding:'5px'}} className="flex-general-column-wrapper-center">
                        <div className="width:100%;">
                        <span style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                            <i className="fa fa-windows" style={{marginRight: 4}} />
                            Windows Push Credentials
                        </span>
                        </div>
                        <div className="width:100%;">
                        <span style={{fontSize: 14, color: 'white'}} />
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Package Security Identifier (SID)</span>
                            <span className="smallp">The unique identifier of your Windows Store app.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Security Identifier" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Client Secret</span>
                            <span className="smallp">The secret key.</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter Client Secret" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                </div>


                <div style={{width: '100%', height: 50, marginTop: 15, marginBottom: 40}}> 
                    <div style={{width: '100%', height: '100%'}} className="flex-general-column-wrapper-center">
                    <div className="solo-vertical-center" style={{height: '100%'}}>
                        <RaisedButton
                            label="Save"
                            labelPosition="before"
                            primary={true}
                            className="emailcampbtn"
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
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Push);
