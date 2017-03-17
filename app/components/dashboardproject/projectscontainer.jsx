'use strict';

import React from 'react';
import Project from './project.jsx';
import { manageApp, fetchApps, addApp } from '../../actions';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap'


const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-around'
    }
};

class Projectscontainer extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            value:''
        }
    }
    componentWillMount() {

    }
    changeHandler(e){
        this.setState({value:e.target.value})
    }
    addApp(e){
        e.preventDefault()
        if(this.state.value){
            this.props.dispatch(addApp(this.state.value));
            this.setState({value:''})
        }
    }

    render() {

        return (
            <div style={styles.root}>
                <Grid className="projects-container">
                    <Row className="show-grid">
                        {
                            this.props.apps.length ? 
                                this.props.apps.map(app =>
                                    <Col xs={8} sm={6} md={4} lg={4} key={app._id} className="project-grid">
                                        <Project key={app._id} {...app}
                                            onProjectClick={this.props.onProjectClick} currentUser={this.props.currentUser} />
                                    </Col>
                                ) :
                                <form onSubmit={ this.addApp.bind(this) }>
                                    <div className="noappfound">
                                        <p className="welcome">Welcome!</p>
                                        <p className="subhead">Let's create your first app:</p>
                                        <input required type="text" placeholder="Name your app" value={this.state.value} onChange={ this.changeHandler.bind(this) }/>
                                        <button className="btn btn-primary" type="submit">Create App</button>
                                    </div>
                                </form>
                        }
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apps: state.apps || [],
        currentUser: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onProjectClick: (appId, masterKey, name, from) => dispatch(manageApp(appId, masterKey, name, from)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Projectscontainer);
