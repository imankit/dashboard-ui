import React from 'react';

class ChangeField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  render() {
    const editName = () => this.setState({ editMode: true });
    const closeEditing = () => {
        this.setState({ editMode: false });
    }
    
    if (this.state.editMode === false) {
        return (
            <div className="relative-pos">
                <h3>
                    <input className="nameedit" ref={this.props.field} type="password" defaultValue={this.props.value} onClick={editName} />
                </h3>
            </div>
        );
    } else {
        return (
            <div className="relative-pos">
                <h3>
                    <input className="nameeditenable" ref={this.props.field} type="password" defaultValue={this.props.value} onChange={(event) => this.props.changeHandler(this.props.field, event)} onBlur={() => {
                        closeEditing();
                    }} />

                </h3>
            </div>
        );
    }
  }
}

export default ChangeField;