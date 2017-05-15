/**
 * Created by Darkstar on 11/30/2016.
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router'

// custom comps
import App from './components/app';
import AppSelected from './components/appSelected';
import Dashboardproject from './components/dashboardproject/dashboardproject.jsx';
import TablesPage from './components/tables/tablesPage';
import Cache from './components/cache/cache';
import Queue from './components/queue/queue';
import EmailCampaign from './components/campaign/email';
import Analytics from './components/analytics/analytics';
import PushCampaign from './components/campaign/push';
import Profile from './components/profile/profile';
import Settings from './components/settings/settings';
import Admin from './components/admin/admin';
import PageNotFound from './components/pageNotFound/index'

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Dashboardproject}/>
        <Route path="admin" component={Admin}/>
        <Route path="profile" component={Profile}/>
        <Route path=":appId" component={AppSelected}>
            <IndexRoute component={TablesPage}/>
            <Route path="tables" component={TablesPage}/>
            <Route path="cache" component={Cache}/>
            <Route path="queue" component={Queue}/>
            <Route path="push" component={PushCampaign}/>
            <Route path="email" component={EmailCampaign}/>
            <Route path="analytics" component={Analytics}/>
            <Route path="settings" component={Settings}/>
        </Route>
        <Route path="*" component={PageNotFound}/>
    </Route>
)
