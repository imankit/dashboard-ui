import React from 'react';
import {connect} from 'react-redux';
import {updateNotificationsSeen, deleteInvite, addDeveloper} from '../../actions';
import Popover from 'material-ui/Popover';
import {ToolbarTitle} from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const toolbartitle = {
    fontSize: 18
};

class Notifications extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    handleTouchTap = (event) => {
        event.preventDefault()
        this.setState({open: true, anchorEl: event.currentTarget})
    }

    handleRequestClose = () => {
        this.props.updateNotificationsSeen()
        this.setState({open: false})
    }
    deleteInvite(appId, user) {
        this.props.deleteInvite(appId, user.email)
    }
    acceptInvite(appId, user) {
        this.props.addDeveloper(appId, user.email)
    }
    render() {
        let pendingTasks = 2
        let notificationsUnSeen = 2
        let notifications = (
            <div className="notification-wrap">
                <div className="notificationdiv" key={1}>
                    <i className="fa fa-bell notinvicon"></i>
                    <p className="nottextinv" dangerouslySetInnerHTML={{
                        __html: 'You have been invited to collaborate on Student App. Do you want to accept the invite?'
                    }}></p>
                    <div className="noteinvbtncontainer">
                        <button className="cancelbtnnotinv ">Reject</button>
                        <button className="acceptbtnnotinv ">Accept</button>
                    </div>
                </div>
                <div className="notificationdiv" key={2}>
                    <img src="/assets/images/cblogo.png" className="notinvicon"></img>
                    <p className="nottextinv" dangerouslySetInnerHTML={{
                        __html: 'You have been invited to collaborate on Student App. Do you want to accept the invite?'
                    }}></p>

                </div>
                <div className="notificationdiv" key={3}>
                    <img src="/assets/images/cache-rocket.png" className="notinvicon"></img>
                    <p className="nottextinv" dangerouslySetInnerHTML={{
                        __html: 'You have been invited to collaborate on Student App. Do you want to accept the invite?'
                    }}></p>
                    <div className="noteinvbtncontainer">
                        <button className="okbtnnotinv ">Ok</button>
                    </div>
                </div>
                <div className="notificationdiv" key={4}>
                    <img src="/assets/images/user-default-image.jpg" className="notinvicon"></img>
                    <p className="nottextinv" dangerouslySetInnerHTML={{
                        __html: 'You have been invited to collaborate on Student App. Do you want to accept the invite?'
                    }}></p>
                    <div className="noteinvbtncontainer">
                        <button className="cancelbtnnotinv ">Reject</button>
                        <button className="acceptbtnnotinv ">Accept</button>
                    </div>
                </div>
            </div>
        )

        return (
            <div>
                <ToolbarTitle style={toolbartitle} text="" onTouchTap={this.handleTouchTap}/>
                <Badge badgeContent={notificationsUnSeen} primary={true} className="notebadge" onTouchTap={this.handleTouchTap}>
                    {/* <NotificationsIcon/> */}
                    <object type="image/svg+xml" data="/assets/images/bell.svg" onClick={this.handleTouchTap}>
                        Your browser does not support SVG
                    </object>

                </Badge>
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }} targetOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }} onRequestClose={this.handleRequestClose} className="popovernotifications">
                    <div className="profilepoparrow"></div>

                    <p className="headingpop">NOTIFICATIONS {pendingTasks
                            ? (' - ' + pendingTasks + ' Pending')
                            : ''}</p>
                    {!pendingTasks
                        ? <div style={{
                                textAlign: 'center'
                            }}>
                                <i className="ion-ios-bell notificationemptybell"></i>
                                <p className="notificationemptymessage">We'll let you know when we've got something new for you!</p>
                            </div>
                        : ''
}
                    {notifications}
                </Popover>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    let notifications = state.user.notifications
        ? state.user.notifications
        : []
    let user = state.user.user
    return {notifications: notifications, user: user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNotificationsSeen: () => dispatch(updateNotificationsSeen()),
        deleteInvite: (appId, email) => dispatch(deleteInvite(appId, email)),
        addDeveloper: (appId, email) => dispatch(addDeveloper(appId, email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
