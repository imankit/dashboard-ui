import { jsdom } from 'jsdom';

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = { userAgent: 'all' };
global.__isDevelopment = true
global.__isHosted = process.env["CLOUDBOOST_HOSTED"] || false
global.__isBrowser = false;
if(__isHosted){
	global.USER_SERVICE_URL = "https://service.cloudboost.io"
	global.SERVER_DOMAIN = "cloudboost.io"
	global.SERVER_URL='https://api.cloudboost.io'
	global.DASHBOARD_URL='https://dashboard.cloudboost.io'
	global.ACCOUNTS_URL='https://accounts.cloudboost.io'
} else {
	global.USER_SERVICE_URL = "http://localhost:3000"
	global.SERVER_DOMAIN = "localhost:4730"
	global.SERVER_URL="http://localhost:4730"
	global.DASHBOARD_URL="http://localhost:1440"
	global.ACCOUNTS_URL="http://localhost:1447"
}