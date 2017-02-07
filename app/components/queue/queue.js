import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import FirstDisplay from './firstDisplay.js'
import {fetchQueue,resetQueueState} from '../../actions';
import QueueCRUD from './queueCRUD.js'
import RefreshIndicator from 'material-ui/RefreshIndicator';

class Queue extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    componentWillMount(){
        // redirect if active app not found
        if(!this.props.appData.viewActive){
            this.context.router.push('/')
        } else {
            this.props.onLoad()
        }
    }
    componentWillUnmount(){
        this.props.resetQueueState()
    }
    render() {
        let compToDisplay = <RefreshIndicator
                                size={50}
                                left={70}
                                top={0}
                                status="loading"
                                className="loadermain"
                            />
        if(this.props.loaded){
            compToDisplay = this.props.noQueueFound ? <FirstDisplay/> : <QueueCRUD/>
        }
        return (
            <div id= "" style={{backgroundColor: '#FFF'}}>
                <Toolbar isDashboardMainPage={false}/>
                <div className="tables cache queue">
                    { compToDisplay }
                </div>
                <Footer id="app-footer"/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    let noQueueFound = state.queue.allQueues.length == 0
    return {
        appData: state.manageApp,
        noQueueFound:noQueueFound,
        loaded:state.queue.loaded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(fetchQueue()),
        resetQueueState: () => dispatch(resetQueueState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
