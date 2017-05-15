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
import {fetchAnalyticsAPI, resetAnalytics, fetchAnalyticsStorage} from '../../actions';
import APIAnalytics from './apiAnalytics'
import StorageAnalytics from './storageAnalytics'
import RefreshIndicator from 'material-ui/RefreshIndicator';

export class Analytics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    componentWillMount() {
        // redirect if active app not found
        if (!this.props.appData.viewActive) {
            this.context.router.push('/')
        } else {
            this.props.fetchAnalyticsAPI(this.props.appData.appId)
            this.props.fetchAnalyticsStorage(this.props.appData.appId)
        }
    }
    componentWillUnmount() {
        this.props.resetAnalytics()
    }
    render() {
        return (
            <div id="" style={{
                backgroundColor: '#FFF'
            }}>
                <div className="cache">
                    <div className="chartcontainer">
                        <APIAnalytics analyticsApi={this.props.analyticsApi}/>
                        <StorageAnalytics analyticsStorage={this.props.analyticsStorage}/>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {appData: state.manageApp, analyticsApi: state.analytics.analyticsApi, analyticsStorage: state.analytics.analyticsStorage};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAnalyticsAPI: (appId) => dispatch(fetchAnalyticsAPI(appId)),
        fetchAnalyticsStorage: (appId) => dispatch(fetchAnalyticsStorage(appId)),
        resetAnalytics: () => dispatch(resetAnalytics())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
