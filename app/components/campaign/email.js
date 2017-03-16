/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {sendEmailCampaign,showAlert} from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import EmailIcon from 'material-ui/svg-icons/communication/email';

class EmailCampaign extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            subject:'',
            email:'',
            progress:false
        }
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    componentWillMount(){
        // redirect if active app not found
        if(!this.props.appData.viewActive){
            this.context.router.push('/')
        }
    }
    sendEmailCampaign(){
        if(this.state.subject && this.state.email){
            this.setState({progress:true})
            sendEmailCampaign(
                this.props.appData.appId,
                this.props.appData.masterKey,
                this.state.subject,
                this.state.email
            ).then(()=>{
                this.setState({progress:false})
                showAlert('success',"Email Campaign Success")
            },(err)=>{
                this.setState({progress:false})
                let error = 'No users found'
                if(err.response.status == 500){
                    error = "Server Error"
                }
                showAlert('error',error)
            })
        }
    }
    changeHandler(which,e){
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    render() {
        return (
            <div id= "" style={{backgroundColor: '#FFF'}}>
                <div className="cache campaign">
                    <div className="">
                        <div className="flex-general-column-wrapper-center" style={{width: '100%', marginTop: 20}}>
                            <div style={{width: '100%'}} className="solo-horizontal-center">
                                <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>Create an email campaign</span>
                            </div>
                            <div style={{width: '100%'}} className="solo-horizontal-center">
                                <span style={{color: '#4F4F4F', fontSize: 14}}>Email campaign is used to send email to all of your users. You can use it for announcements or anything else you like.</span>
                            </div>
                            <div className="push-box" style={{marginTop: 15}}>

                                <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                                  <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '40%', height: '100%', padding: 35}}>
                                      <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Subject</span>
                                    </div>
                                    <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                      <input type="text" className="emailinputcampaign" placeholder="Your email subject" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} value={ this.state.subject } onChange={ this.changeHandler.bind(this,'subject') }/>
                                    </div>
                                  </div>
                                </div>

                                <div style={{width: '100%', height: 300, backgroundColor: '#F7F7F7'}}>
                                  <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                                    <div style={{width: '40%', height: '100%', padding: 35}}>
                                      <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>Text</span>
                                    </div>
                                    <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                                      <textarea rows={10} cols={90} style={{height: '100%', border: 0, fontSize: 16, resize: 'none'}} placeholder="Your email text" className="emailtextareacampaign" value={ this.state.email } onChange={ this.changeHandler.bind(this,'email') }/>
                                    </div>
                                  </div>
                                </div>  

                            </div>
                            <div style={{width: '100%', height: 50, marginTop: 15, marginBottom: 40}}> 
                              <div style={{width: '100%', height: '100%'}} className="flex-general-column-wrapper-center">
                                <div className="solo-vertical-center" style={{height: '100%'}}>
                                    <RaisedButton
                                      label="Send campaign"
                                      labelPosition="before"
                                      primary={true}
                                      icon={<EmailIcon />}
                                      className="emailcampbtn"
                                      onClick={ this.sendEmailCampaign.bind(this) }
                                      disabled={ this.state.progress }
                                    />
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
    return {
        appData: state.manageApp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailCampaign);
