import React from 'react'

class CheckSwitch extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            active: this.props.active
        }
        this.handleCheck = this.handleCheck.bind(this)
    }
    handleCheck()
    {        
        this.setState(({active}) => ({active:!active}))
        this.props.method(this.props.idClient, !this.state.active)
    }
    render()
    {
        return(
            <label className="switch">
                <input type="checkbox" onChange={this.handleCheck} checked={this.state.active}/>
                <span className="slider round"></span>
            </label>
        )
    }
}

export default CheckSwitch;