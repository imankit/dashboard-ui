import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../toolbar/toolbar.js';
import Footer from '../footer/footer.jsx';
import {showAlert,getUsersBySkipLimit,updateUserActive,updateUserRole,deleteUser,addUser,getServerSettings,upsertAPI_URL} from '../../actions';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Delete from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

class Admin extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            email:'',
            name:'',
            password:'',
            myURL:''
        }
    }
    componentWillMount(){
        if(this.props.isAdmin){
            if(this.props.userList.length === 0){
                this.props.getUsersBySkipLimit(0,20,[])
            } else {
                getServerSettings().then((data)=>{
                    this.setState({myURL:data.data.myURL})
                },(err)=>{
                    showAlert('error','Cannot fetch server details.')
                })
            }
        } else {
            this.context.router.push('/')
        }
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        }
    }
    changeUserActive(userId,e,val){
        this.props.updateUserActive(userId,val)
    }
    changeUserRole(userId,e){
        let val = e.target.value == 'Admin'
        this.props.updateUserRole(userId,val)
    }
    deleteUser(userId){
        this.props.deleteUser(userId)
    }
    addUser(e){
        e.preventDefault()
        this.props.addUser(this.state.name,this.state.email,this.state.password,false)
        this.setState({
            email:'',
            name:'',
            password:''
        })
    }
    changeURL(){
        if(this.state.myURL){
            this.props.upsertAPI_URL(this.state.myURL)
        } else {
            showAlert('error','Please nter a valid URL')
        }
    }
    changeHandler(which,e){
        this.state[which] = e.target.value
        this.setState(this.state)
    }
    render() {
        return (
            <div id= "" style={{backgroundColor: '#FFF'}}>
                <div className="admin tables">
                    
                    <div className="adminContainer">


                        <div className="push-box" style={{ marginTop: 15,width:'100%',marginBottom: 50 }}>
                            <div style={{ width: '100%', height: 150, backgroundColor: '#FFF', borderBottom: '1px solid #C4C2C2' }}>
                                <div style={{ width: '100%', height: '100%' }} className="flex-general-row-wrapper">
                                    <div style={{ width: '100%', height: '100%', padding: 20 }}>
                                        <span style={{ color: '#353446', fontSize: 16, fontWeight: 500 }}>API URL</span>
                                        <input type="text" className="urladmininput" value={ this.state.myURL } onChange={this.changeHandler.bind(this,'myURL')}/>
                                        <RaisedButton label="Change" primary={true} className="changeurl" onClick={ this.changeURL.bind(this) }/>
                                        <p className="noteadmin">This is the login and sign up page that you can use for your app.</p>
                                        <br/>
                                        <span style={{ color: '#353446', fontSize: 16, fontWeight: 500 ,float:'left'}}>Allow Other Developers to sign up ?</span>
                                        <Toggle
                                            style={{float:'left',width:'30%'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="adduserdiv">
                            <h3 style={{textAlign:'center',marginBottom:25}}>Add User</h3>
                            <form onSubmit={ this.addUser.bind(this) }>
                                <input
                                    placeholder="Name"
                                    className="adminninputs"
                                    type="text"
                                    onChange={ this.changeHandler.bind(this,'name') }
                                    value={ this.state.name }
                                    required
                                />
                                <input
                                    placeholder="Email"
                                    className="adminninputs"
                                    type="email"
                                    onChange={ this.changeHandler.bind(this,'email') }
                                    value={ this.state.email }
                                    required
                                />
                                <input
                                    placeholder="Password"
                                    className="adminninputs"
                                    type="password"
                                    onChange={ this.changeHandler.bind(this,'password') }
                                    value={ this.state.password }
                                    required
                                />
                                <RaisedButton label="Add User" primary={true} className="passwordsubmitbtn" type="submit"/>
                            </form>
                        </div>
                        <div className="tablecontainer">
                            {
                                this.props.loading ?

                                    <RefreshIndicator
                                        size={50}
                                        left={70}
                                        top={0}
                                        status="loading"
                                        className="loaderadinsettings"
                                    />
                                    :
                                    <Table selectable={false} multiSelectable={false}>
                                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>S.No</TableHeaderColumn>
                                                <TableHeaderColumn>User Name</TableHeaderColumn>
                                                <TableHeaderColumn>Role</TableHeaderColumn>
                                                <TableHeaderColumn>Active ?</TableHeaderColumn>
                                                <TableHeaderColumn>Remove</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            {
                                                this.props.userList.map((user,i)=>{
                                                    return  <TableRow key={ i }>
                                                                <TableRowColumn><span>{ i+1 }</span></TableRowColumn>
                                                                <TableRowColumn><span>{ user.name }</span></TableRowColumn>
                                                                <TableRowColumn>
                                                                    <select className="adminroleseelct" value={ user.isAdmin ? 'Admin' : 'User' } onChange={ this.changeUserRole.bind(this,user._id) }>
                                                                        <option value="Admin">Admin</option>
                                                                        <option value="User">User</option>
                                                                    </select>
                                                                </TableRowColumn>
                                                                <TableRowColumn>
                                                                    <Toggle
                                                                        toggled={ user.isActive }
                                                                        className={ 'adminactivetoggle' }
                                                                        onToggle = { this.changeUserActive.bind(this,user._id) }
                                                                    />
                                                                </TableRowColumn>
                                                                <TableRowColumn>
                                                                    <RaisedButton
                                                                        className="buttonadmindelete"
                                                                        icon={<Delete />}
                                                                        onClick={ this.deleteUser.bind(this,user._id) }
                                                                    />
                                                                </TableRowColumn>
                                                            </TableRow>
                                                })
                                            }
                                        </TableBody>
                                    </Table>

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    let userList = []
    let isAdmin = false
    if (state.user.user) {
        isAdmin = state.user.user.isAdmin
    }
    if(Object.keys(state.userList).length){
        userList = Object.keys(state.userList).map((user) => {
            return state.userList[user]
        })
    }
    return {
        currentUser: state.user,
        loading: state.loader.loading,
        userList:userList,
        isAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersBySkipLimit:(skip,limit,skipUserIds) => dispatch(getUsersBySkipLimit(skip,limit,skipUserIds)),
        updateUserActive:(userId,isActive) => dispatch(updateUserActive(userId,isActive)),
        updateUserRole:(userId,isAdmin) => dispatch(updateUserRole(userId,isAdmin)),
        deleteUser:(userId) => dispatch(deleteUser(userId)),
        addUser:(name,email,password,isAdmin) => dispatch(addUser(name,email,password,isAdmin)),
        upsertAPI_URL:(apiURL) => dispatch(upsertAPI_URL(apiURL)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
