import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import FirstDisplay from './firstDisplay.js'
import {fetchQueue} from '../../actions';
import QueueCRUD from './queueCRUD.js'

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
    render() {
        let compToDisplay = ''
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
        onLoad: () => dispatch(fetchQueue())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
