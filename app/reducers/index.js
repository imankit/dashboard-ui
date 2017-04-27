import {combineReducers} from 'redux';
import apps from './apps';
import user from './user';
import userList from './userList';
import manageApp from './manageApp';
import cache from './cache';
import queue from './queue';
import analytics from './analytics';
import settings from './settings';
import loader from './loader';
import cards from './cards';
import beacons from './beacons'
import {reducer as formReducer} from 'redux-form';

const todoApp = combineReducers({
    apps,
    user,
    userList,
    manageApp,
    analytics,
    cache,
    queue,
    cards,
    loader,
    settings,
    form: formReducer,
    beacons
});

export default todoApp;
