import React from 'react'
import Button from './../../microComponents/Button'
import ButtonDelete from './../../microComponents/ButtonDelete'

class TipoProducto extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id_tipo: 0,
            modalTitle: "Nuevo tipo",
            name_type: "",
            classbutton: "btn btn-success",
            textButton: "Guardar",
            listTypeProduct: []
        }
        this.handleName = this.handleName.bind(this)
        this.cleanInputs = this.cleanInputs.bind(this)
        this.saveStatus = this.saveStatus.bind(this)
        this.loadRegister = this.loadRegister.bind(this)
        this.editType = this.editType.bind(this)
        this.deleteType = this.deleteType.bind(this)
    }
    componentDidMount()
    {
        this.loadRegister(true)    
    }
    loadRegister(load)
    {
        if(load == true)
        {
            activeLoader("Cargando..", "Obteniendo datos.")
        }
        fetch("/funct/getTypeProduct")
        .then(res => res.json())
        .then((resp) => {
            if(resp.error == false)
            {
                this.setState({listTypeProduct: resp.data})
            }
            if(load == true)
            {
                closeAlert()
            }
        })
    }
    handleName(e)
    {
        e.preventDefault()
        this.setState({name_type:e.target.value})
    }
    cleanInputs()
    {
        $("#newType").modal('hide')
        this.setState({
            id_tipo:0,
            modalTitle:"Nuevo tipo",
            classbutton:"btn btn-success",
            textButton:"Guardar",
            name_type:""
        })
    }
    saveStatus(e)
    {
        e.preventDefault()
        if(this.state.name_type == "")
        {
            warningAlert("Advertencia", "El campo nombre del tipo es obligatorio")
            return false;
        }

        let newType = {
            id_tipo: this.state.id_tipo,
            name_tipo:this.state.name_type
        }

        let url = '/funct/newTypeProduct'
        
        if(this.state.id_tipo > 0)
        {
            url = '/funct/updateTypeProduct'
        }

        activeLoader("Guardando...", "Enviando datos.")

        fetch(url,{
            method: 'post',
            body: JSON.stringify(newType),
            headers:headConexion
        })
        .then(res => res.json())
        .then((result) => {
            closeAlert()
            if(result.error == false)
            {
                this.cleanInputs()
                this.loadRegister(false)
                setTimeout(function(){
                    successAlert("Hecho", result.message)
                },100)
            }
            else
            {
                errorAlert("Error", result.message)
            }
        })
    }
    editType(e, id_tipo)
    {
        e.preventDefault()
        let register = this.state.listTypeProduct.filter((item) => item.id_tipo_product == id_tipo)

        $("#newType").modal("show")

        this.setState({
            id_tipo: id_tipo,
            modalTitle: "Actualizar tipo",
            name_type: register[0].name_tipo,
            classbutton: "btn btn-primary",
            textButton: "Actualizar",
        })

    }
    deleteType(e, id_tipo)
    {
        e.preventDefault()
        Swal.fire({
            title: 'Estas seguro?',
            text: "No se podra revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        })
        .then((result) => {
            if(result.isConfirmed){
                activeLoader("Eliminando...", "Se esta eliminando el registro")
                fetch('/funct/deleteTypeProduct',{
                    method: 'post',
                    body: JSON.stringify({id_tipo: id_tipo}),
                    headers:headConexion
                })
                .then(res => res.json())
                .then((result) => {
                    console.log(result)
                    closeAlert()
                    if(result.error == false)
                    {
                        this.loadRegister(false)
                        setTimeout(function(){
                            successAlert('Hecho', result.message)
                        },100)
                    }
                    else
                    {
                        errorAlert("Error", result.message)
                    }
                })
            }
        })
    }
    render(){
        return(
            <>
                <h1>Catálogo de tipo de producto</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newType">
                            <i className="fa fa-plus" aria-hidden="true"></i> Agregar tipo
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newType" tabIndex="-1" role="dialog" aria-labelledby="rolModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-md" role="document">
                        <form className='modal-content'>
                            <div className='modal-header'>
                                <h2>{this.state.modalTitle}</h2>
                            </div>
                            <div className='modal-body'>
                                <div className='d-flex'>
                                    <div className='form-group col-10'>
                                        <label className='text-secondary'>Tipo producto</label>
                                        <input className='form-control' type="text" placeholder="Ingrese nombre de tipo de producto" onChange={this.handleName} value={this.state.name_type}/>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <Button styleButton="btn btn-secondary" textButton="Cerrar" method={this.cleanInputs}/>
                                <Button styleButton={this.state.classbutton} textButton={this.state.textButton} method={this.saveStatus}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='d-flex'>
                    {this.state.listTypeProduct.map(item => 
                        <div className='card-status p-3 m-2' key={item.id_tipo_product}>
                            <h4>{item.name_tipo}</h4>
                            <div className='mt-2 justify-content-around d-flex'>
                                <Button styleButton="btn btn-primary btn-sm mr-2" textButton="Editar" method={(event) => this.editType(event, item.id_tipo_product)} />
                                <ButtonDelete styleButtonD="btn btn-danger btn-sm" textButtonD="Borrar" action={(event) => this.deleteType(event, item.id_tipo_product)}/>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default TipoProducto;