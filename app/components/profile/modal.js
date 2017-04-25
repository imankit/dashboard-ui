import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {saveUserImage, deleteUserImage, showAlert, updateUser} from '../../actions';
import ChangeField from './ChangeField';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

const dialogStyle = {
    width: 400,
}

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            progress: false
        }
    }
    static get contextTypes() {
        return {router: React.PropTypes.object.isRequired}
    }
    changeFile(e) {
        if (e.target.files[0])
            this.props.saveUserImage(e.target.files[0])
    }
    openChangeFile() {
        document.getElementById("fileBox").click()
    }
    deleteFile(fileId) {
        if (fileId)
            this.props.deleteUserImage(fileId)
    }
    changePassword() {
        if (this.state.oldPassword && this.state.newPassword) {
            if (this.state.newPassword === this.state.confirmPassword) {
                this.setState({progress: true})
                updateUser(this.props.currentUser.user.name, this.state.oldPassword, this.state.newPassword).then(() => {
                    this.setState({oldPassword: '', newPassword: '', confirmPassword: '', progress: false})
                    showAlert('success', "Password Update Success.")
                }, (err) => {
                    if (err.response) {
                        let error = 'Invalid Password'
                        showAlert('error', error)
                    } else
                        showAlert('success', "Password Update Success.")
                    this.setState({oldPassword: '', newPassword: '', confirmPassword: '', progress: false})
                })
            } else
                showAlert('error', 'New passwords does not match.')
        } else {
            showAlert('error', 'Please fill all the fields.')
        }
    }
    changeHandler(which, e) {
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    render() {
        let userImage = "/assets/images/user_image.png"
        let fileId = null
        if (this.props.currentUser.file) {
            userImage = this.props.currentUser.file.document.url
            fileId = this.props.currentUser.file.document.id
        }
        const actionsBtn = (
            <FlatButton
                label="Save"
                primary={true}
                disabled={this.state.progress}
                onTouchTap={this.changePassword.bind(this)}
            />
        );
        let profilepicobj = (
            <div className="edit-profile-photo">
                <div className="user-icon medium" style={{
                    backgroundImage: `url('${userImage}')`
                }} onClick={this.openChangeFile.bind(this)}>
                    <input type="file" style={{
                        visibility: "collapse",
                        width: "0"
                    }} onChange={this.changeFile.bind(this)} id="fileBox" accept="image/*" />
                </div>
                <span>Click to Edit</span>
            </div>
        );
        return (
            <Dialog title="Edit Profile" modal={false} open={this.props.open} onRequestClose={this.props.close} contentStyle={dialogStyle} actions={actionsBtn}>
                <div className="edit-profile">
                    <Table >
                        <TableBody displayRowCheckbox={false} showRowHover={false}>
                            <TableRow>
                                <TableRowColumn>Profile Pic</TableRowColumn>
                                <TableRowColumn children={profilepicobj}></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Name</TableRowColumn>
                                <TableRowColumn>
                                {
                                    this.props.currentUser.user ? this.props.currentUser.user.name : ''
                                }
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Email</TableRowColumn>
                                <TableRowColumn>
                                {
                                    this.props.currentUser.user ? this.props.currentUser.user.email : ''
                                }
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Old Password</TableRowColumn>
                                <TableRowColumn>
                                    <ChangeField field="oldPassword" value={this.state.oldPassword} changeHandler={this.changeHandler.bind(this)}></ChangeField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>New Password</TableRowColumn>
                                <TableRowColumn>
                                    <ChangeField field="newPassword" value={this.state.newPassword} changeHandler={this.changeHandler.bind(this)}></ChangeField>
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Confirm Password</TableRowColumn>
                                <TableRowColumn>
                                    <ChangeField field="confirmPassword" value={this.state.confirmPassword} changeHandler={this.changeHandler.bind(this)}></ChangeField>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Dialog>
        );
    }

}

const mapStateToProps = (state) => {

    return {currentUser: state.user, loading: state.loader.loading}
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserImage: (file) => dispatch(saveUserImage(file)),
        deleteUserImage: (fileId) => dispatch(deleteUserImage(fileId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
