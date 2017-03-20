/**
 * Created by Darkstar on 12/2/2016.
 */
'use strict';


import {saveAppName} from '../../actions';
import {connect} from 'react-redux';
import React from 'react';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {grey500} from 'material-ui/styles/colors';

const iconStyles = {
    marginLeft: 5,
    width: 20,
    height: 20,
    marginBottom: -3
};

class ProjectName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: this.props.name
        };
    }

    render() {

        const editName = () => this.setState({editMode: true});
        const closeEditing = () => this.setState({editMode: false});
        const handleChange = (e) => this.setState({value: e.target.value});
        const handleKeyUp = (e) => {
            if(e.which === 13){
                this.props.onNameChange(this.props.appId, this.state.value)
                closeEditing()
            }
        }

        if (this.state.editMode === false) {
            return (
                <div className="relative-pos">
                    <h3>
                        <input className="nameedit" type="text" defaultValue={this.props.name}  onClick={editName}/>
                    </h3>
                </div>
            );
        }
        else {
            return (
                <div className="relative-pos">
                    <h3>
                        <input ref="input" className="nameeditenable" defaultValue={this.props.name} onChange={handleChange} onKeyUp={handleKeyUp}/>
                        <CloseIcon style={iconStyles} color={grey500} onClick={() => {
                            closeEditing();
                            this.props.onNameChange(this.props.appId, this.state.value);
                        }}/>
                    </h3>
                </div>
            );
        }
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: (appId, newName) => {
            dispatch(saveAppName(appId, newName));
        },
    };
};

export default connect(null, mapDispatchToProps)(ProjectName);
