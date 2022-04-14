import React from 'react'

class ButtonContact extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            dataContact:"",
            faIcon:""
        }
    }
    componentDidMount()
    {
        switch(this.props.formContact)
        {
            case "whatsapp":
                this.setState({dataContact:"https://api.whatsapp.com/send?phone=+52"+this.props.dataContact, faIcon:"fa-whatsapp"})
                break;
            case "phone":
                this.setState({dataContact:"tel:"+this.props.dataContact, faIcon:"fa-phone"})
                break;
            case "email":
                this.setState({dataContact:"mailto:"+this.props.dataContact, faIcon:"fa-envelope"})
                break;
        }
    }
    render()
    {
        return(
            <a href={this.state.dataContact} className='icon-contact btn' target="_blank" onClick={this.props.action}>
                <i className={"fa " + this.state.faIcon} aria-hidden="true"></i> {this.props.nameContact}
            </a>
        )
    }
}

export default ButtonContact;