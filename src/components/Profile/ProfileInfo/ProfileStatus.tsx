import React from "react";
import s from './ProfileInfo.module.css'
import {render} from "react-dom";

class ProfileStatus extends React.Component<any> {

    state = {
        editMode: false,
        status: this.props.status
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
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
        console.log('componentDidUpdate')
        let a = this.state
        let b = this.props
    }

    render()
    {
        return (

            <div>
                {this.state.editMode
                ? <div><input onChange={this.onStatusChange} type="text" value={this.state.status} autoFocus={true} onBlur={() => this.deactivateEditMode()}/></div>
                : <div><span onDoubleClick={this.activateEditMode}>{this.props.status || 'add status'}</span></div>
                }
            </div>
        )
    }
}

export default ProfileStatus;