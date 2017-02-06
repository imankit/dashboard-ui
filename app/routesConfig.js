/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';
import App from './components/app';
import TablesPage from './components/manageapps/tables/tablesPage';
import Manager from './components/manageapps/manager';
import Cache from './components/cache/cache';
import Queue from './components/queue/queue';
import EmailCampaign from './components/campaign/email';
import Analytics from './components/analytics/analytics';
import PushCampaign from './components/campaign/push';

const routesConfig = [
    {path: '/', component: App},
    {path: '/tables', component: TablesPage},
    {path: '/appmanager', component: Manager},
    {path: '/cache', component: Cache},
    {path: '/queue', component: Queue},
    {path: '/email', component: EmailCampaign},
    {path: '/analytics', component: Analytics},
    {path: '/push', component: PushCampaign}
];
export default routesConfig;
