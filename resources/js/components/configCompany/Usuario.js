import React from 'react'

class Usuario extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            titleModal:"Nuevo usuario",
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            confirmPassword:"",
            active:true,
            errorPassword:""
        }
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleActive = this.handleActive.bind(this)
    }
    handleFirstName(e){
        this.setState({first_name:e.target.value})
    }    
    handleLastName(e){
        this.setState({last_name:e.target.value})
    }
    handleEmail(e){
        this.setState({email:e.target.value})
    }
    handlePassword(e){
        this.setState({password:e.target.value})
    }
    handleConfirmPassword(e){
        this.setState({confirmPassword:e.target.value})
    }
    handleActive(e){
        this.setState(({active}) => ({active: !active}))
    }
    render(){
        return(
            <>
               <h1>Usuarios</h1>
               <div className="d-flex justify-content-end m-2">
                    <div className="input-group mb-3 col-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newUser">
                            <i className="fa fa-plus" aria-hidden="true"></i> Nuevo Usuario
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newUser" tabIndex="-1" role="dialog" aria-labelledby="userModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <form className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-bold" id="exampleModalLongTitle">{this.state.titleModal}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Nombre(s) <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese nombre" onChange={this.handleFirstName} value={this.state.first_name} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-6 col-xl-6">
                                        <label className="text-secondary font-weight-bold">Apellido(s) <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese apellido" onChange={this.handleLastName} value={this.state.last_name} required/>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Email <span className="text-danger">*</span></label>
                                        <input className="form-control" type="text" placeholder="Ingrese correo electrónico" onChange={this.handleEmail} value={this.state.email} required/>
                                        <span className="text-danger">{this.state.errorEmail}</span>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Contraseña <span className="text-danger">*</span></label>
                                        <input className="form-control" type="password" onChange={this.handlePassword} value={this.state.password} required/>
                                    </div>
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Repetir contraseña <span className="text-danger">*</span></label>
                                        <input className="form-control" type="password" onChange={this.handleConfirmPassword} value={this.state.confirmPassword} required/>
                                        <span className="text-danger">{this.state.errorPassword}</span>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-group col-12 col-lg-4 col-xl-4">
                                        <label className="text-secondary font-weight-bold">Activo</label>
                                        <input className="form-control" type="checkbox" onChange={this.handleActive} checked={this.state.active}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>                                
                                <button type="submit" className=""></button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Usuario;