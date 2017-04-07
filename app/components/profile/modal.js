import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {saveUserImage, deleteUserImage, showAlert, updateUser} from '../../actions';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
    changeHandler(which, e, value) {
        this.state[which] = value
        this.setState(this.state)
    }
    render() {
        let userImage = "/assets/images/user_image.png"
        let fileId = null
        if (this.props.currentUser.file) {
            userImage = this.props.currentUser.file.document.url
            fileId = this.props.currentUser.file.document.id
        }
        return (
            <Dialog title="Edit Profile" modal={false} open={this.props.open} onRequestClose={this.props.close}>
                <Table >

                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Profile Pic</TableRowColumn>
                            <TableRowColumn>....</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Name</TableRowColumn>
                            <TableRowColumn>Ritish Gumber</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Email</TableRowColumn>
                            <TableRowColumn>ritishgumber@gmail.com</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>old Password</TableRowColumn>
                            <TableRowColumn>abcd</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>new Password</TableRowColumn>
                            <TableRowColumn>ritish12345</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>confirm Password</TableRowColumn>
                            <TableRowColumn>rtiish12345</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
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
