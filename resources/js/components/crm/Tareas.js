import { then } from 'laravel-mix'
import React from 'react'

class Tareas extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalTitle: "Nueva tarea",
            idClient: 0,
            dateTask: "",
            timeTask: "",
            clientTask: "",
            employeeTask: "",
            statusTask: "",
            descriptionTask: "",
            listClient: [],
            searchClient: [],
            inputSearchClient: "",
            listEmployee: [],
            listStatus: [],
            inputShow: "d-none"
        }
        this.handleDateTask = this.handleDateTask.bind(this)
        this.handleTimeTask = this.handleTimeTask.bind(this)
        this.handleClientTask = this.handleClientTask.bind(this)
        this.handleEmployeeTask = this.handleEmployeeTask.bind(this)
        this.handleStatusTask = this.handleStatusTask.bind(this)
        this.handleDescriptionTask = this.handleDescriptionTask.bind(this)
        this.getClients = this.getClients.bind(this)
        this.selectClient = this.selectClient.bind(this)
        this.handleInputSearchClient = this.handleInputSearchClient.bind(this)
        this.showListClient = this.showListClient.bind(this)
    }
    componentDidMount()
    {
        this.getClients()
    }
    handleDateTask(e)
    {
        this.setState({dateTask: e.target.value})
    }
    handleTimeTask(e)
    {
        this.setState({timeTask: e.target.value})
    }
    handleInputSearchClient(e)
    {
        this.setState({inputSearchClient: e.target.value})
    }
    handleClientTask(e)
    {
        e.preventDefault()
        const listFiler = this.state.listClient.filter(
            item => item.first_name.toUpperCase().match(e.target.value.toUpperCase()) || 
            item.last_name.toUpperCase().match(e.target.value.toUpperCase())
            )
        this.setState({searchClient: listFiler})
        if(e.target.value != ''){
            this.setState({inputShow:"box-search"})
        }else{
            this.setState({inputShow:"d-none"})
        }
    }
    showListClient()
    {
        this.setState({inputShow: "box-search", searchClient: this.state.listClient})
    }
    selectClient(e, idClient, nameClient)
    {
        e.preventDefault()
        this.setState({idclient: idClient, inputSearchClient: nameClient, inputShow:"d-none"})
    }
    handleEmployeeTask(e)
    {
        this.setState({employeeTask: e.target.value})
    }
    handleStatusTask(e)
    {
        this.setState({statusTask: e.target.value})
    }
    handleDescriptionTask(e)
    {
        this.setState({descriptionTask: e.target.value})
    }
    getClients()
    {
        fetch("/funct/getClientsActive")
        .then(res => res.json())
        .then(result => {
            this.setState({listClient: result.data})
        })
    }
    getEmployees()
    {
        // PRIMERO SE TIENE QUE RELACIONAR LOS EMPLEADOS CON LA COMPAÑIA ANTES DE ESTA CONSULTA
        fetch("/funct/getEmployeesActive")
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }
    render(){
        return(
            <>
                <h3 className='mt-3'>Tareas</h3>
                <div className="d-flex justify-content-end m-2">
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newTask">
                            <i className="fa fa-plus" aria-hidden="true"></i> Agregar tarea
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newTask" tabIndex="-1" role="dialog" aria-labelledby="rolModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5>{this.state.modalTitle}</h5>
                            </div>
                            <div className='moda-body'>
                                <div className='d-flex col'>
                                    <div className='form-group col-md-4'>
                                        <label className='text-secondary font-weight-bold'>Fecha</label>
                                        <input type="date" className='form-control' value={this.state.dateTask} onChange={this.handleDateTask}/>
                                    </div>
                                    <div className='form-group col-md-4'>
                                        <label className='text-secondary font-weight-bold'>Hora</label>
                                        <input type="time" className='form-control' value={this.state.timeTask} onChange={this.handleTimeTask}/>
                                    </div>
                                    <div className='form-group col-md-4'>
                                        <label className='text-secondary font-weight-bold'>Cliente</label>
                                        <input className="form-control" type="text" onKeyUp={this.handleClientTask} onClick={this.showListClient} onChange={this.handleInputSearchClient} value={this.state.inputSearchClient} placeholder="Buscar cliente"/>
                                        <div className={this.state.inputShow}>
                                            <ul className="list-item">
                                            {this.state.searchClient.map((item) =>
                                                <li className="selectInput" onClick={(event) => this.selectClient(event, item.id_client, (item.first_name + " " + item.last_name))} key={item.id_client}><i className="fa fa-user" aria-hidden="true"></i> {item.first_name + " " + item.last_name}</li>
                                            )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex col'>
                                    <div className='form-group col-md-4'>
                                        <label className='text-secondary font-weight-bold'>Empleado</label>
                                        <select className='form-control' value={this.state.employeeTask} onChange={this.handleEmployeeTask}>
                                            <option value="">Seleccione un empleado</option>
                                        </select>
                                    </div>
                                    <div className='form-group col-md-4'>
                                        <label className='text-secondary font-weight-bold'>Estatus</label>
                                        <select className='form-control' value={this.state.statusTask} onChange={this.handleStatusTask}>
                                            <option value="">Seleccione un estatus</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='d-flex col'>
                                    <div className='form-group col'>
                                        <label className='text-secondary font-weight-bold'>Descripción de la tarea</label>
                                        <textarea className='form-control' value={this.state.descriptionTask} onChange={this.handleDescriptionTask}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'></div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
}

export default Tareas;