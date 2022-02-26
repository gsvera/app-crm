import React from "react";

class Button extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <button type="button" className={this.props.styleButton} onClick={this.props.method}>{this.props.textButton}</button>
        )
    }
}

export default Button;