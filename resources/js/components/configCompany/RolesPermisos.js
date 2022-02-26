import React from 'react'

class RolesPermisos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalTitle:"Nuevo Rol"
        }
    }
    render(){
        return(
            <>
                <h1>Roles y permisos</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newRol">
                            <i className="fa fa-plus" aria-hidden="true"></i> Nuevo Rol
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newRol" tabIndex="-1" role="dialog" aria-labelledby="rolModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <form className='modal-content'>
                            <div className='modal-header'>
                                <h2>{this.state.modalTitle}</h2>
                            </div>
                            <div className='modal-body'>
                                <div className='form-group col-4'>
                                    <label className='text-secondary'>Nombre Rol</label>
                                    <input className='form-control' type="text" />
                                </div>
                                <h3 className='text-primary text-center'>Tabla de permisos</h3>
                                <table className='table table-striped col-5 mx-auto'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>Modulo</th>
                                            <th className='text-center' scope='col'>Activo</th>
                                            <th scope='col'>Agregar</th>
                                            <th scope='col'>Editar</th>
                                            <th scope='col'>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Clientes</td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Tareas</td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                        </tr>
                                        <tr>
                                            <td>Reportes</td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                            <td className='text-center'><input type="checkbox" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='modal-footer'>

                            </div>
                        </form>
                    </div>    
                </div>
            </>
        )
    }
}

export default RolesPermisos;