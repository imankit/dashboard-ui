/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';

const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

// custom configs impprts
import reducers from './reducers';
import {xhrDashBoardClient} from './xhrClient';
import {accountsURL} from './config';
import routesConfig from './routesConfig';


class Routes extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loaded : false,
            user:{}
        }
    }
    componentWillMount(){
        xhrDashBoardClient.get('/user')
            .then(response => {
                this.setState({ user:response.data,loaded:true })
            })
            .catch(error => {
                // debugger
                window.location = accountsURL;
            })
    }
    getStoreProvider(){
        const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
        return createStoreWithMiddleware(reducers,{
            user:{
                isLogggedIn:true,
                ...this.state.user
            }
        })
    }
    render() {
        let app = ""
        if(this.state.loaded){
            app =   <Provider store={ this.getStoreProvider() }>
                        <div>
                            <Router history={browserHistory}>
                                { routesConfig }
                            </Router>
                        </div>
                    </Provider>
        }
        return (
            <div>
                { app }
            </div>
        );
    }
}

export default Routes;
