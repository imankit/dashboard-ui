/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {fetchAppSettings, resetAppSettings} from '../../actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';

// icons and mui comps
import {List, ListItem} from 'material-ui/List';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import NotificationsIcon from 'material-ui/svg-icons/alert/add-alert';
import AuthIcon from 'material-ui/svg-icons/social/person';
import ImportIcon from 'material-ui/svg-icons/communication/import-export';
import DBIcon from 'material-ui/svg-icons/device/storage';
import RaisedButton from 'material-ui/RaisedButton';
import {grey500, blue500, grey300} from 'material-ui/styles/colors';

import {Tabs, Tab} from 'material-ui/Tabs';
import {FontIcon} from 'material-ui';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

// sub comps
import General from './general'
import Email from './email'
import Push from './push'
import ImportExport from './import'
import MongoAccess from './mongo'
import Auth from './auth'

const navStyles = {
    backgroundColor: 'white',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    maxWidth: '300px',
    minWidth: '250px'
}

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 'general',
            renderComponent: false
        }
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    componentWillMount() {
        // load settings if not already found
        if (!this.props.settingsLoaded) {
            this.props.onLoad(this.props.appData.appId, this.props.appData.masterKey)
        }
    }
    componentWillUnmount() {
        this.props.resetAppSettings()
    }
    selectTab(whichTab) {
        this.setState({selected: whichTab})
    }
    getCompToRender(tab) {
        switch (tab) {
            case 'general':
                return <General/>
            case 'email':
                return <Email/>
            case 'push':
                return <Push/>
            case 'auth':
                return <Auth/>
            case 'import':
                return <ImportExport/>
            case 'mongo':
                return <MongoAccess/>
        }
    }
    handleActive(tab) {
        this.setState({renderComponent: true});
    }
    render() {
        const settingsIcon = <SettingIcon color="red"/>;

        return (
            <div id="" style={{
                backgroundColor: '#FFF'
            }}>
                <div className="settings tables campaign cache">

                    <Tabs className="settingtabs" tabItemContainerStyle={{
                        background: 'white'
                    }}>
                        <Tab className="tabbbb" icon={< i className = "ion ion-android-settings tabicon" > </i>} children={< General />}></Tab>
                        <Tab icon={< i className = "ion ion-email tabicon" />} children={< Email color = {
                            grey300
                        } />}></Tab>
                        <Tab icon={< i className = "ion ion-ios-bell tabicon" />} children={< Push />}></Tab>
                        <Tab icon={< i className = "ion ion-android-person tabicon" />} onActive={this.handleActive.bind(this, 'auth')} children={< Auth renderComponent = {
                            this.state.renderComponent
                        } />}></Tab>
                        <Tab icon={< i className = "ion ion-arrow-swap tabicon" />} children={< ImportExport />}></Tab>
                        <Tab icon={< i className = "ion ion-android-list tabicon" />} children={< MongoAccess />}></Tab>
                    </Tabs>

                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {appData: state.manageApp, loading: state.loader.secondary_loading, settingsLoaded: state.settings.length}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (appId, masterKey) => dispatch(fetchAppSettings(appId, masterKey)),
        resetAppSettings: () => dispatch(resetAppSettings())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
