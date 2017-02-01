/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import FlatButton from 'material-ui/FlatButton';
import StorageIcon from 'material-ui/svg-icons/device/sd-storage';
import APIIcon from 'material-ui/svg-icons/action/compare-arrows';
import Footer from '../footer/footer.jsx'
import {fetchAnalyticsAPI,resetAnalytics} from '../../actions';
import APIAnalytics from './apiAnalytics'

class Analytics extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            selected:'api'
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
        } else {
            this.props.fetchAnalyticsAPI(this.props.appData.appId)
        }
    }
    selectType(which){
        this.setState({selected:which})
    }
    componentWillUnmount(){
        this.props.resetAnalytics()
    }
    render() {
        return (
            <div id= "" style={{backgroundColor: '#FFF'}}>
                <Toolbar isDashboardMainPage={false}/>
                <div className="cache">
                    <div className="buttondivanalytics">
                        <FlatButton
                          label="API"
                          labelPosition="before"
                          primary={true}
                          icon={<APIIcon />}
                          className="apistroagebtns"
                          backgroundColor = { this.state.selected == 'api' ? '#00BCD4' : '#EFF1F5' }
                          onClick={ this.selectType.bind(this,'api') }
                          style={{color:(this.state.selected == 'api' ? 'white' : '#00BCD4')}}
                        />
                        <FlatButton
                          label="STORAGE"
                          labelPosition="before"
                          primary={true}
                          icon={<StorageIcon />}
                          className="apistroagebtns"
                          backgroundColor = { this.state.selected == 'storage' ? '#00BCD4' : '#EFF1F5' }
                          onClick={ this.selectType.bind(this,'storage') }
                          style={{color:(this.state.selected == 'storage' ? 'white' : '#00BCD4')}}
                        />                    
                    </div>
                    <div className="chartcontainer">
                        {   
                            this.props.analyticsApi.totalApiCount ? <APIAnalytics analyticsApi={this.props.analyticsApi}/> : ''
                        }
                    </div>
                </div>
                <Footer id="app-footer"/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        appData: state.manageApp,
        analyticsApi: state.analytics.analyticsApi
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnalyticsAPI: (appId) => dispatch(fetchAnalyticsAPI(appId)),
        resetAnalytics: () => dispatch(resetAnalytics())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
