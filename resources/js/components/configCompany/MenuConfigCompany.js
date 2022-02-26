import React from 'react'
import ReactDOM from 'react-dom'
import Usuario from './Usuario'
import RolesPermisos from './RolesPermisos'

class MenuConfigCompany extends React.Component{
    constructor(props){
        super(props)
    }
    viewUsuarios(){
        if(document.getElementById('content')){
            ReactDOM.render(<Usuario />, document.getElementById('content'))
        }
    }
    viewRolesPermisos(){
        if(document.getElementById('content')){
            ReactDOM.render(<RolesPermisos />, document.getElementById('content'))
        }
    }
    render(){
        return(
            <nav className="pt-3">
                <div className="text-center mb-3 element-menu">
                    <a className="bd-toc-link text-white font-weight-bold" href="/modulos">
                        <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="text-center mb-3 element-menu">
                    <a className="item-menu" onClick={this.viewUsuarios}>
                        Usuarios
                    </a>
                </div>
                <div className="text-center mb-3 element-menu">
                    <a className="item-menu" onClick={this.viewRolesPermisos}>
                        Roles y permisos
                    </a>
                </div>
            </nav>
        )
    }
}

export default MenuConfigCompany

if(document.getElementById('menuConfigCompany')){
    ReactDOM.render(<MenuConfigCompany />, document.getElementById('menuConfigCompany'))
}