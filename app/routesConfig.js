/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';
import App from './components/app';
import TablesPage from './components/manageapps/tables/tablesPage';
import Manager from './components/manageapps/manager';
import Cache from './components/cache/cache';

const routesConfig = [
    {path: '/', component: App},
    {path: '/tables', component: TablesPage},
    {path: '/appmanager', component: Manager},
    {path: '/cache', component: Cache}
];
export default routesConfig;
