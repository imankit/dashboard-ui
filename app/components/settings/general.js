/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import {} from '../../actions';

//mui
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';


class General extends React.Component {

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
                    <span style={{color: '#169CEE', fontSize: 24, fontWeight: 700}}>General Settings</span>
                </div>
                <div className="push-box" style={{marginTop: 15}}>
                    
                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>App Name</span>
                            <span className="smallp">The name of your app</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <input type="text" className="emailinputcampaign" placeholder="Enter App Name" style={{width: '100%', height: 40, fontSize: 16, paddingLeft: 4}} />
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7', borderBottom: '1px solid #C4C2C2'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>App Icon</span>
                            <span className="smallp">Your app icon</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <p className="addfile">+ Add Icon</p>
                        </div>
                        </div>
                    </div>

                    <div style={{width: '100%', height: 100, backgroundColor: '#F7F7F7'}}>
                        <div style={{width: '100%', height: '100%'}} className="flex-general-row-wrapper">
                        <div style={{width: '40%', height: '100%', padding: 35}}>
                            <span style={{color: '#353446', fontSize: 16, fontWeight: 700}}>App In Production</span>
                            <span className="smallp">Is your app in production?</span>
                        </div>
                        <div className="solo-vertical-center" style={{width: '60%', height: '100%', backgroundColor: 'white', padding: 10}}>
                            <Toggle
                                className="togglegeneral"
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(General);
