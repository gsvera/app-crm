import React from 'react'
import Button from './../../microComponents/Button'
import CardStatus from '../../microComponents/CardStatus'

class EstatusTarea extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalTitle: "Nuevo Estatus",
            name_status: "",
            orden: "",
            id_status: 0,
            description_status: "",
            classbutton: "btn btn-success",
            textButton: "Guardar",
            color: "#000000",
            listStatus: []
        }
        this.handleName = this.handleName.bind(this)
        this.handleOrder = this.handleOrder.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.cleanInputs = this.cleanInputs.bind(this)
        this.saveStatus = this.saveStatus.bind(this)
        this.loadStatusTask = this.loadStatusTask.bind(this)
        this.selectRegister = this.selectRegister.bind(this)
        this.deleteStatus = this.deleteStatus.bind(this)
        this.handleColor = this.handleColor.bind(this)
    }
    handleName(e){
        this.setState({name_status:e.target.value})
    }
    handleOrder(e){
        this.setState({orden:e.target.value})
    }
    handleDescription(e){
        this.setState({description_status:e.target.value})
    }
    handleColor(e)
    {
        this.setState({color:e.target.value})
    }
    componentDidMount(){
        this.loadStatusTask(true)
    }
    
    cleanInputs(){
        $("#newStatus").modal('hide')        

        this.setState({
            modalTitle: "Nuevo Estatus",
            classbutton:"btn btn-success",
            textButton:"Agregar",
            name_status:"",
            description_status:"",
            orden:"",
            color: "#000000",
            id_status:0
        })
    }
    loadStatusTask(loader){
        if(loader == true){
            activeLoader("Cargando...", "Obteniendo datos")
        }
        fetch('/funct/getStatusTask')
        .then(res => res.json())
        .then((result) => {
            if(result.error != true){
                this.setState({listStatus:result.data})
            }
            if(loader == true){
                closeAlert()
            }
        })
    }
    selectRegister(e, id){
        e.preventDefault()
        
        const itemStatus = this.state.listStatus.filter(item => item.id_status_task == id)

        this.setState({
            modalTitle: "Actualizar Estatus",
            name_status: itemStatus[0].name_status,
            orden: itemStatus[0].orden,
            id_status: itemStatus[0].id_status_task,
            description_status: itemStatus[0].description_status,
            color: itemStatus[0].color,
            classbutton: "btn btn-primary",
            textButton: "Actualizar",
        })

        $("#newStatus").modal('show')

    }
    deleteStatus(e, id){
        e.preventDefault()
        
        let idStatus = {id_status_task: id}

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
                  fetch('/funct/deleteStatusTask',{
                      method: 'post',
                      body: JSON.stringify(idStatus),
                      headers:headConexion
                  })
                  .then(res => res.json())
                  .then((result) => {
                    closeAlert()
                    if(result.error == false){
                        this.loadStatusTask(false)
                        setTimeout(function(){
                            successAlert('Hecho', result.message)
                        },100)
                    }else{
                        errorAlert("Error", result.message)
                    }
                  })
              }
          })
    }
    saveStatus(e){
        e.preventDefault
        if(this.state.name_status == ''){
            warningAlert("Advertencia", "El campo nombre de estatus es obligatorio")
            return false
        }

        let newStatus = {
            name_status:this.state.name_status, 
            description_status:this.state.description_status,
            orden:this.state.orden,
            id_status_task: this.state.id_status,
            color:this.state.color
        }   

        let url = '/funct/newStatusTask'

        if(this.state.id_status > 0 ){
            url = '/funct/updateStatusTask'
        }

        activeLoader("Guardando...","Enviando datos")

        fetch(url,{
            method: 'post',
            body: JSON.stringify(newStatus),
            headers: headConexion
        })
        .then(res => res.json())
        .then((result) => {
            closeAlert()
            if(result.error == false){
                this.cleanInputs()
                this.loadStatusTask(false)
                setTimeout(function(){
                    successAlert("Hecho", result.message)
                },100)
            }else{
                errorAlert("Error", result.message)
            }
        })
    }
    render(){
        return(
            <>
                <h1>Catálogo de estatus tareas</h1>
                <div className="d-flex justify-content-end m-2">
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newStatus">
                            <i className="fa fa-plus" aria-hidden="true"></i> Nuevo Estatus
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newStatus" tabIndex="-1" role="dialog" aria-labelledby="rolModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <form className='modal-content'>
                            <div className='modal-header'>
                                <h2>{this.state.modalTitle}</h2>
                            </div>
                            <div className='modal-body'>
                                <div className='d-flex'>
                                    <div className='form-group col-8'>
                                        <label className='text-secondary'>Nombre de estatus</label>
                                        <input className='form-control' type="text" placeholder="Ingrese el nombre de un estatus" onChange={this.handleName} value={this.state.name_status}/>
                                    </div>
                                    <div className='form-group col-2'>
                                        <label className='text-secondary'>orden</label>
                                        <input className='form-control' type="number" min="1" onChange={this.handleOrder} value={this.state.orden}/>
                                    </div>
                                    <div className='form-group col-2'>
                                        <label className='text-secondary'>Color</label>
                                        <input className='form-control' type="color" value={this.state.color} onChange={this.handleColor}/>
                                    </div>
                                </div>
                                <div className='form-group col-12'>
                                    <label className='text-secondary'>Descripción de estatus</label>
                                    <textarea className='form-control' placeholder='Ingrese una descripción' onChange={this.handleDescription} value={this.state.description_status} />
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
                    {this.state.listStatus.map(item => 
                        <CardStatus 
                            key={item.id_status_task} 
                            color={item.color}
                            nameStatus={item.name_status} 
                            descriptionStatus={item.description_status} 
                            position={item.orden}
                            action={(event) => this.selectRegister(event, item.id_status_task)}
                            actionD={(event) => this.deleteStatus(event, item.id_status_task)}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default EstatusTarea;