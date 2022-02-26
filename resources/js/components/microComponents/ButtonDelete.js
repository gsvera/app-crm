import React from 'react'

class ButtonDelete extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <button type='button' className={this.props.styleButtonD} onClick={this.props.action}>{this.props.textButtonD}</button>
        )
    }
}

export default ButtonDelete
