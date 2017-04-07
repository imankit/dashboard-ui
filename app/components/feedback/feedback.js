import React from 'react';
import Popover from 'material-ui/Popover';
import {ToolbarTitle} from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
require('./style.css')
class Notifications extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            disableSendBtn: true
        }
    }
    handleTouchTap = (event) => {
        event.preventDefault();
        this.setState({open: true, anchorEl: event.currentTarget, feedbackSent: false})
    }

    handleRequestClose = () => {
        this.setState({open: false})
    }
    handleChange(e, value) {
        if (value) {
            this.setState({disableSendBtn: false});
        } else {
            this.setState({disableSendBtn: true});
        }

    }
    sendFeedback() {
        this.setState({feedbackSent: true});
    }

    render() {

        return (
            <div>
                <IconButton touch={true} onClick={this.handleTouchTap.bind(this)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 -4 26 26">
                        <g fill="none" fill-rule="evenodd"><path fill="#9e9e9e" d="M2.666 11.995a304.44 304.44 0 0 1-1.841-.776s-.41-.14-.558-.638c-.148-.498-.187-1.058 0-1.627.187-.57.558-.735.558-.735s9.626-4.07 13.64-5.43c.53-.179 1.18-.156 1.18-.156C17.607 2.702 19 6.034 19 9.9c0 3.866-1.62 6.808-3.354 6.84 0 0-.484.1-1.18-.135-2.189-.733-5.283-1.946-7.971-3.035-.114-.045-.31-.13-.338.177v.589c0 .56-.413.833-.923.627l-1.405-.566c-.51-.206-.923-.822-.923-1.378v-.63c.018-.29-.162-.362-.24-.394zM15.25 15.15c1.367 0 2.475-2.462 2.475-5.5s-1.108-5.5-2.475-5.5-2.475 2.462-2.475 5.5 1.108 5.5 2.475 5.5z"/></g>
                    </svg>
                </IconButton>
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom'
                }} targetOrigin={{
                    horizontal: 'right',
                    vertical: 'top'
                }} onRequestClose={this.handleRequestClose} className="">

                    <TextField floatingLabelText="Feedback about this page?" multiLine={true} rows={2} className={!this.state.feedbackSent
                        ? "feedback-textarea"
                        : 'hide'} onChange={this.handleChange.bind(this)}/><br/>
                    <RaisedButton label="Cancel" className={!this.state.feedbackSent
                        ? "feedback-cancelbtn"
                        : 'hide'} labelStyle={{
                        fontSize: 10
                    }} buttonStyle={{
                        height: 30,
                        lineHeight: 'inherit'
                    }} onTouchTap={this.handleRequestClose}/>
                    <RaisedButton label="Send Feedback" disabled={this.state.disableSendBtn} primary={true} className={!this.state.feedbackSent
                        ? "feedback-sendbtn"
                        : 'hide'} labelStyle={{
                        fontSize: 10
                    }} buttonStyle={{
                        height: 30,
                        lineHeight: 'inherit'
                    }} onTouchTap={this.sendFeedback.bind(this)}/>
                    <div className={this.state.feedbackSent
                        ? 'feedbackSent'
                        : 'hide'}>
                        <IconButton touch={true} onClick={this.handleTouchTap.bind(this)} style={{
                            marginLeft: '37%',
                            marginTop: -30
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 -4 26 26">
                                <g fill="none" fill-rule="evenodd"><path fill="#549afc" d="M2.666 11.995a304.44 304.44 0 0 1-1.841-.776s-.41-.14-.558-.638c-.148-.498-.187-1.058 0-1.627.187-.57.558-.735.558-.735s9.626-4.07 13.64-5.43c.53-.179 1.18-.156 1.18-.156C17.607 2.702 19 6.034 19 9.9c0 3.866-1.62 6.808-3.354 6.84 0 0-.484.1-1.18-.135-2.189-.733-5.283-1.946-7.971-3.035-.114-.045-.31-.13-.338.177v.589c0 .56-.413.833-.923.627l-1.405-.566c-.51-.206-.923-.822-.923-1.378v-.63c.018-.29-.162-.362-.24-.394zM15.25 15.15c1.367 0 2.475-2.462 2.475-5.5s-1.108-5.5-2.475-5.5-2.475 2.462-2.475 5.5 1.108 5.5 2.475 5.5z"/></g>
                            </svg>

                        </IconButton>
                        <span className="thanks-text">Thanks</span>
                        <span className="note-text">We really appreciate your feedback!</span>
                    </div>

                </Popover>
            </div>
        )
    }

}

export default Notifications;
