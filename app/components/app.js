/**
 * Created by Darkstar on 11/30/2016.
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar/toolbar.js';
import Footer from './footer/footer.jsx';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {manageApp, fetchApps} from '../actions';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        this.props.onLoad()
    }
    render() {
        return (
            <div>
                <Toolbar isDashboardMainPage={['/','/admin','/profile'].indexOf(this.props.location.pathname) !== -1} />
                {
                    this.props.loading ?
                        <RefreshIndicator
                            size={50}
                            left={70}
                            top={0}
                            status="loading"
                            className="loadermain"
                        />
                        : this.props.children
                }
                <Footer id="app-footer" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {loading: state.loader.loading};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(fetchApps())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
