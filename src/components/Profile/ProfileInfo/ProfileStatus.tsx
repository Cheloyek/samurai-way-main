import React from "react";

type PropsType = {
    status: string,
    updateStatus?: (status: string) => void
}
type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

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
        if (this.props.updateStatus)
        {
            this.props.updateStatus(this.state.status)
        }
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
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