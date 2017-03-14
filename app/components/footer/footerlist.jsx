'use strict';

import React from 'react';

const Footerlist = React.createClass({
    render: function() {
        return (
            <span >
                <a className="link" href="https://cloudboost.io/" target="_blank">© 2017 CloudBoost</a>
                <a className="link" href="https://cloudboost.io/terms" target="_blank">Terms</a>
                <a className="link" href="https://cloudboost.io/privacy" target="_blank">Privacy</a>
                <a className="link" href="https://slack.cloudboost.io/" target="_blank">Help</a>
               {/* <a className="link" href="https://cloudboost.io/terms" target="_blank">Feedback</a>*/}
            </span>
        );
    }
});

export default Footerlist;
