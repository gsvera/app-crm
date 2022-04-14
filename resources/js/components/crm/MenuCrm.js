import React from "react";
import ReactDOM from "react-dom"
import Clientes from './Clientes'
import Seguimiento from './Seguimiento'
import Reportes from "./Reportes"
import EstatusCliente from "./catalogos/EstatusCliente"
import EstatusTarea from "./catalogos/EstatusTarea"
import Folios from "./catalogos/Folios"
import TipoProducto from "./catalogos/TipoProducto"
import Tareas from "./Tareas"

class MenuCrm extends React.Component{
    constructor(props){
        super(props)
    }
    viewClientes(){       
        if(document.getElementById('content')){
            ReactDOM.render(<Clientes />, document.getElementById('content'))
        }
    }
    viewSeguimiento(){
        if(document.getElementById('content')){
            ReactDOM.render(<Seguimiento />, document.getElementById('content'))
        }
    }
    viewReportes(){
        if(document.getElementById('content')){
            ReactDOM.render(<Reportes />, document.getElementById('content'))
        }
    }
    viewEstatusCliente(){
        if(document.getElementById('content')){
            ReactDOM.render(<EstatusCliente />, document.getElementById('content'))
        }
    }
    viewEstatusTarea(){
        if(document.getElementById('content')){
            ReactDOM.render(<EstatusTarea />, document.getElementById('content'))
        }
    }
    viewFolios(){
        if(document.getElementById('content')){
            ReactDOM.render(<Folios />, document.getElementById('content'))
        }
    }
    viewTipoProducto(){
        if(document.getElementById('content')){
            ReactDOM.render(<TipoProducto />, document.getElementById('content'))
        }
    }
    viewTareas(){
        if(document.getElementById('content')){
            ReactDOM.render(<Tareas />, document.getElementById('content'))
        }
    }
    render(){
        return(
            <nav className="pt-3">
                <div className="text-center element-menu-home">
                    <a className="bd-toc-link text-white font-weight-bold" href="/modulos">
                        <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="element-menu">
                    <a className="item-menu" onClick={this.viewClientes}>
                        <i className="fa fa-address-card-o" aria-hidden="true"></i>  Clientes
                    </a>
                </div>
                <div className="element-menu">
                    <a className="item-menu" onClick={this.viewSeguimiento}>
                        <i className="fa fa-calendar-check-o" aria-hidden="true"></i>  Seguimiento
                    </a>
                </div>
                <div className="element-menu">
                    <a className="item-menu" onClick={this.viewTareas}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>  Tareas
                    </a>
                </div>
                <div className="element-menu">
                    <a className="item-menu" >
                        <i className="fa fa-cube" aria-hidden="true"></i>  Productos
                    </a>
                </div>
                <div className="element-menu">
                    <a className="item-menu" >
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>  Ventas
                    </a>
                </div>
                <div className="element-menu">
                    <a className="item-menu" onClick={this.viewReportes}>
                        <i className="fa fa-line-chart" aria-hidden="true"></i>  Reportes
                    </a>
                </div>
                <div className="element-menu">
                    <div className="btn-group dropright">
                        <a className="item-menu" type="button" data-toggle="dropdown" aria-expanded="false">
                            <i className="fa fa-folder-open" aria-hidden="true"></i>  Catalogos
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={this.viewEstatusCliente}>Estatus cliente</a>
                            <a className="dropdown-item" onClick={this.viewEstatusTarea}>Estatus tarea</a>
                            <a className="dropdown-item" onClick={this.viewFolios}>Folios</a>
                            <a className="dropdown-item" onClick={this.viewTipoProducto}>Tipos producto</a>
                        </div>
                    </div>
                </div>

            </nav>
        )
    }
}

export default MenuCrm

if(document.getElementById('menuCrm')){
    ReactDOM.render(<MenuCrm />,  document.getElementById('menuCrm'))
}

