/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import FirstDisplay from './firstDisplay.js'
import CacheCRUD from './cacheCRUD.js'
import {fetchCache,resetCacheState} from '../../actions';

class Cache extends React.Component {

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
        this.props.resetCacheState()
    }
    render() {
        let compToDisplay = ''
        if(this.props.loaded){
            compToDisplay = this.props.noCacheFound ? <FirstDisplay/> : <CacheCRUD/>
        }
        return (
            <div id= "" style={{backgroundColor: '#FFF'}}>
                <Toolbar isDashboardMainPage={false}/>
                <div className="cache tables">
                    { compToDisplay }
                </div>
                <Footer id="app-footer"/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {

    let noCacheFound = state.cache.allCaches.length == 0
    return {
        appData: state.manageApp,
        allCache: state.cache.allCaches,
        noCacheFound:noCacheFound,
        loaded:state.cache.loaded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(fetchCache()),
        resetCacheState: () => dispatch(resetCacheState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cache);
