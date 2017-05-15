'use strict';

import React from 'react';

class Component extends React.Component {
    constructor(props) {
        super(props);
        console.log('hi');
    }
    render() {
        return (
            <div className="dashproject app-dashproject" id="app-dashproject">
                <div className="container">
                    <img className="" src="/assets/images/cblogo.png"></img>
                    <h3>Error 404. Page not found.</h3>
                </div>
            </div>
        )
    }
}

export default Component;
