/**
 * Created by Darkstar on 1/4/2017.
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Toolbar from './../toolbar/toolbar.js';
import Footer from './../footer/footer.jsx';
import Dashboardproject from '../dashboardproject/dashboardproject.jsx';
import TableList from './tableList';

export class App extends React.Component {
    constructor(){
        super()
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    componentWillMount(){
    	if(!this.props.showOthers){
    		this.context.router.push('/')
    	}
    }
    render(){
        return(
            <div>
		        { this.props.showOthers ? <TableList /> : ''}
		    </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {showOthers: state.manageApp.viewActive};
};

export default connect(mapStateToProps)(App);
