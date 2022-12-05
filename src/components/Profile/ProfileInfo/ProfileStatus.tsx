import React from "react";
import s from './ProfileInfo.module.css'
import {render} from "react-dom";

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render()
    {
        return (

            <div>
                {this.state.editMode
                ? <div><input type="text" value={this.props.status} autoFocus={true} onBlur={() => this.deactivateEditMode()}/></div>
                : <div><span onDoubleClick={() => this.activateEditMode()}>{this.props.status}</span></div>
                }
            </div>
        )
    }
}

export default ProfileStatus;