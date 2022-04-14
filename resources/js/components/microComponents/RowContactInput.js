import React from 'react'

class RowContactInput extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            formContact: this.props.formContact,
            nameContact: this.props.nameContact,
            dataContact: this.props.dataContact
        }
        this.handlerFormContact = this.handlerFormContact.bind(this)
        this.handlerNameContact = this.handlerNameContact.bind(this)
        this.handlerDataContact = this.handlerDataContact.bind(this)
    }
    handlerFormContact(e)
    {
        this.setState({formContact: e.target.value})
    }
    handlerNameContact(e)
    {
        this.setState({nameContact: e.target.value})
    }
    handlerDataContact(e)
    {
        this.setState({dataContact: e.target.value})
    }

    render(){
        return(
            <tr>
                <td>
                    <select className='form-control formContact' value={this.state.formContact} onChange={this.handlerFormContact}>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Teléfono</option>
                        <option value="email">Email</option>
                    </select>
                </td>
                <td><input className='form-control nameContact' type="text" value={this.state.nameContact} onChange={this.handlerNameContact}/></td>
                <td><input className='form-control dataContact' type="text" value={this.state.dataContact} onChange={this.handlerDataContact}/></td>
                <td><button onClick={this.props.action} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>
            </tr>
        )
    }
}

export default RowContactInput;