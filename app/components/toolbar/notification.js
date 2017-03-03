import React from 'react';
import {connect} from 'react-redux';
import {updateNotificationsSeen,deleteInvite,addDeveloper} from '../../actions';
import Popover from 'material-ui/Popover';
import {ToolbarTitle} from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';



const toolbartitle = {
    fontSize: 18
};

class Notifications extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            open: false,
        }
    }
    handleTouchTap = (event) => {
        event.preventDefault()
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    handleRequestClose = () => {
        this.props.updateNotificationsSeen()
        this.setState({
            open: false
        })
    }
    deleteInvite(appId,user){
        this.props.deleteInvite(appId,user.email)
    }
    acceptInvite(appId,user){
        this.props.addDeveloper(appId,user.email)
    }
    render() {
        let pendingTasks = this.props.notifications.length
        let notificationsUnSeen = this.props.notifications.filter(x => !x.seen).length
        let notifications = this.props.notifications.map((x,i) => {
            return  <div className="notificationdiv" key={ i }>
                        <i className="fa fa-bell notinvicon"></i>
                        <p className="nottextinv" dangerouslySetInnerHTML={{__html: x.text}}></p>
                        <div className="noteinvbtncontainer">
                            <button className="cancelbtnnotinv" onClick={ this.deleteInvite.bind(this,x.appId,this.props.user) }>Reject</button>
                            <button className="acceptbtnnotinv" onClick={ this.acceptInvite.bind(this,x.appId,this.props.user) }>Accept</button>
                        </div>
                    </div>
        })
        return (
            <div>
                <ToolbarTitle style={toolbartitle} text="" onTouchTap={this.handleTouchTap}/>
                <Badge
                    badgeContent={notificationsUnSeen}
                    primary={true}
                    className="notebadge"
                    onTouchTap={this.handleTouchTap}
                >
                    <NotificationsIcon/>
                </Badge>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    className="popovernotifications"
                >
                    <p className="notpendingtasks">You have { pendingTasks } pending tasks.</p>
                    { notifications }
                </Popover>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    let notifications = state.user.notifications ? state.user.notifications : []
    let user = state.user.user
    return {
        notifications:notifications,
        user:user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNotificationsSeen: () => dispatch(updateNotificationsSeen()),
        deleteInvite: (appId, email) => dispatch(deleteInvite(appId, email)),
        addDeveloper: (appId, email) => dispatch(addDeveloper(appId, email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
