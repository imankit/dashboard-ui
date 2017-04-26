import React from 'react';

class ChangeField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  render() {
    const editPassword = () => this.setState({ editMode: true });
    const closeEditing = () => {
        this.setState({ editMode: false });
    }
    
    if (this.state.editMode === false) {
        return (
            <input className="password-field passwordedit" ref={this.props.field} type="password" placeholder="Type here" value={this.props.value} onClick={editPassword} />
        );
    } else {
        return (
            <input className="password-field passwordeditenable" ref={this.props.field} type="password" value={this.props.value} placeholder="Type here" onChange={(event) => this.props.changeHandler(this.props.field, event)} onBlur={closeEditing} />
        );
    }
  }
}

export default ChangeField;