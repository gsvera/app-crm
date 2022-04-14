import React from 'react'
import FiltroSeguimiento from '../microComponents/FiltroSeguimiento'
import ButtonContact from '../microComponents/ButtonContact'
import Button from '../microComponents/Button'
import ViewFollow from '../microComponents/ViewFollow'

class Seguimiento extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title:"Seguimiento",
            listClients: [],
            clients: [],
            dateContact:"",
            timeContact:"",
            statusFollow:[],
            inputSearchClient:"",
            inputShow:"",
            clientSelect: 0,
            nameClient:"",
            dataContact:"",
            nameContact:"",
            inputContact:"",
            statusSelect:"",
            comment_contact:"",
            arrayContact:[],
            arrayDetailContact: [],
            detCommenContact: "",
            detDataContact: "",
            detDateContact: "",
            detIdLogContact: 0,
            detIdTask: 0,
            detNameContact:"",
            detOptionContact: "",
            detStatusClient: "",
            detTimeContact: "",
            detUserContact: ""
        }
        this.getClients = this.getClients.bind(this)
        this.handleInputSearchClient = this.handleInputSearchClient.bind(this)
        this.showListClient = this.showListClient.bind(this)
        this.searchClient = this.searchClient.bind(this)
        this.selectClient = this.selectClient.bind(this)
        this.showModal = this.showModal.bind(this)
        this.getStatusFollowing = this.getStatusFollowing.bind(this)
        this.handleContact = this.handleContact.bind(this)
        this.handlerFormContact = this.handlerFormContact.bind(this)
        this.handleDateContact = this.handleDateContact.bind(this)
        this.handleTimeContact = this.handleTimeContact.bind(this)
        this.saveFollowing = this.saveFollowing.bind(this)
        this.handleStatusFollow = this.handleStatusFollow.bind(this)
        this.handleCommentContact = this.handleCommentContact.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.showDetailFollow = this.showDetailFollow.bind(this)
        this.getDetailFollow = this.getDetailFollow.bind(this)
    }
    componentDidMount()
    {
        this.getClients()
        this.getStatusFollowing()
    }
    handleInputSearchClient(e)
    {
        this.setState({inputSearchClient: e.target.value})
    }
    handleContact(e)
    {
        this.setState({inputContact:e.target.value})
    }
    handleStatusFollow(e)
    {
        this.setState({statusSelect:e.target.value})
    }
    handleCommentContact(e)
    {
        this.setState({comment_contact: e.target.value})
    }
    handlerFormContact(e, formContact, dataContact, nameContact)
    {
        
        let today = new Date();
        let dd = today.getDate(); 
        let mm = today.getMonth() + 1;   
        let yyyy = today.getFullYear(); 
        
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        let todayDate = yyyy + '-' + mm + '-' + dd; 	
        
        let hours = today.getHours();
        
        if (hours < 10) {
            hours = '0' + hours;
        }
        let minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        let seconds = today.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        let hourNow = hours + ":" + minutes

        switch(formContact)
        {
            case "whatsapp":
                this.setState({inputContact:"WhatsApp", dateContact:todayDate, timeContact:hourNow, dataContact: dataContact, nameContact: nameContact})
                break;
            case "phone":
                this.setState({inputContact: "Llamada telefonica", dateContact:todayDate, timeContact:hourNow, dataContact: dataContact, nameContact: nameContact})
                break;
            case "email":
                this.setState({inputContact: "Envio de correo", dateContact:todayDate, timeContact:hourNow, dataContact: dataContact, nameContact: nameContact})
                break;
        }
    }
    handleDateContact(e)
    {
        this.setState({dateContact: e.target.value})
    }
    handleTimeContact(e)
    {
        this.setState({timeContact: e.target.value})
    }
    searchClient(e){
        e.preventDefault()
        const listFiler = this.state.clients.filter(
            item => item.first_name.toUpperCase().match(e.target.value.toUpperCase()) || 
            item.last_name.toUpperCase().match(e.target.value.toUpperCase())
            )
        this.setState({listClients: listFiler})
        if(e.target.value != ''){
            this.setState({inputShow:"box-search"})
        }else{
            this.setState({inputShow:"d-none"})
        }
    }
    showListClient()
    {
        this.setState({inputShow:"box-search", listClients: this.state.clients})
    }
    selectClient(e, idClient, nameclient)
    {
        this.setState({inputSearchClient: nameclient, clientSelect: idClient, inputShow:"d-none"})
    }
    showModal()
    {
        if(this.state.clientSelect != 0 || this.state.clientSelect != ""){
            fetch('/funct/clientById?idClient='+ this.state.clientSelect)
            .then(res => res.json())
            .then(result => {
                let register = result.data
                this.setState({
                    nameClient:register.first_name + " " + register.last_name,
                    arrayContact:register._detail_contact,
                    arrayDetailContact: register._detail_log_contact
                })
            })
            $("#newFollowing").modal("show")
        }
        else
        {
            warningAlert("Advertencia.", "No ha seleccionado un usuario.")
            return false
        }
    }
    closeModal()
    {
        this.setState({
            clientSelect:0, 
            inputSearchClient:"",
            arrayContact:[],
            arrayDetailContact: []
        })
        $("#newFollowing").modal("hide")
    }
    getClients()
    {
        fetch("/funct/getClientsActive")
        .then(res => res.json())
        .then(result => {
            this.setState({selectClients: result.data, clients: result.data})
        })
    }
    getStatusFollowing()
    {
        fetch("/funct/getStatusClient")
        .then(res => res.json())
        .then(result => {
            this.setState({statusFollow:result.data})
        })
    }
    saveFollowing()
    {
        let obj = {}
        obj.id_client = this.state.clientSelect
        obj.status_client = this.state.statusSelect
        obj.option_contact = this.state.inputContact
        obj.data_contact = this.state.dataContact
        obj.name_contact = this.state.nameContact
        obj.date_contact = this.state.dateContact
        obj.comment_contact = this.state.comment_contact
        obj.time_contact = this.state.timeContact
        
        
        activeLoader("Guardando...", "Guardando seguimiento")
        fetch("/funct/saveFollowClient",{
            method: "POST",
            body: JSON.stringify(obj),
            headers:headConexion
        })
        .then(res => res.json())
        .then(result => {
            closeAlert()
            if(result.error == false)
            {
                this.setState({
                    dateContact:"",
                    timeContact:"",
                    inputContact:"",
                    statusSelect:"",
                    comment_contact:""
                })
                this.getDetailFollow()
                setTimeout(function(){
                    successAlert("Hecho", result.message)
                },100)
            }
            else
            {
                setTimeout(function(){
                    errorAlert("Error", "No se pudo guardar el registro")
                },100)
                console.log(result.message)
            }
        })
    }
    getDetailFollow()
    {
        fetch('/funct/getFollowDetailByClient?idClient='+this.state.clientSelect)
        .then(res => res.json())
        .then(result => {
            if(result.error == false)
            {
                this.setState({arrayDetailContact:result.data})
            }
        })
    }
    showDetailFollow(e, idFollow)
    {
        e.preventDefault()

        let register = this.state.arrayDetailContact.filter((item) => item.id_log_contact == idFollow)

        this.setState({
            detCommenContact: register[0].comment_contact,
            detDataContact: register[0].data_contact,
            detDateContact: register[0].date_contact,
            detIdLogContact: register[0].id_log_contact,
            detIdTask: register[0].id_task,
            detNameContact: register[0].name_contact,
            detOptionContact: register[0].option_contact,
            detStatusClient: register[0].status_client,
            detTimeContact: register[0].time_contact.substring(0,5),
            detUserContact: register[0].user_contact
        })
        
        $("#detailFollow").modal("show")
        
    }
    render(){
        return(
            <>
                <div className='row'>
                    <div className='col-10 mt-3'>
                        <h3>Seguimiento</h3>
                        <div className="d-flex justify-content-end m-2">
                            <div className="input-group mb-3 col-5">
                                <div className='col'>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                                        <input className="form-control" type="text" onKeyUp={this.searchClient} onClick={this.showListClient} onChange={this.handleInputSearchClient} value={this.state.inputSearchClient} placeholder="Buscar cliente"/>
                                    </div>
                                    <div className={this.state.inputShow}>
                                        <ul className="list-item">
                                        {this.state.listClients.map((item) =>
                                            <li className="selectInput" onClick={(event) => this.selectClient(event, item.id_client, (item.first_name + " " + item.last_name))} key={item.id_client}><i className="fa fa-user" aria-hidden="true"></i> {item.first_name + " " + item.last_name}</li>
                                        )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-content-end">
                                <button className="btn btn-success text-right" type="button" onClick={this.showModal}>
                                    <i className="fa fa-search" aria-hidden="true"></i> Buscar...
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-2' style={{ paddingRight: 0}}>
                        <FiltroSeguimiento />
                    </div>
                </div>
                <div className="modal fade" id="newFollowing" tabIndex="-1" role="dialog" aria-labelledby="rolModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='mx-auto'>{this.state.title} a {this.state.nameClient}</h5>
                            </div>
                            <div className="modal-body">
                                <div className='row justify-content-end mr-5'>
                                    <p className='mt-3 font-weight-bold'>Opciones de Contacto:</p>
                                    {
                                        this.state.arrayContact.map(item =>

                                                <ButtonContact key={item.id_detail} dataContact={item.data_contact} nameContact={item.name_contact} formContact={item.form_contact} action={(event) => this.handlerFormContact(event, item.form_contact, item.data_contact, item.name_contact)}/>
                                        )
                                    }
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='form-group col-md-5'>
                                        <label className='font-weight-bold text-secondary'>Fecha de contacto</label>
                                        <input type="date" className='form-control' value={this.state.dateContact} onChange={this.handleDateContact}/>
                                    </div>
                                    <div className='form-group col-md-5'>
                                        <label className='font-weight-bold text-secondary'>Hora de contacto</label>
                                        <input type="time" className='form-control' value={this.state.timeContact} onChange={this.handleTimeContact}/>
                                    </div>
                                    <div className='form-group col-md-5'>
                                        <label className='font-weight-bold text-secondary'>Medio de Contacto</label>
                                        <select className='form-control' value={this.state.inputContact} onChange={this.handleContact}>
                                            <option>Seleccione una opción</option>   
                                            <option value="WhatsApp">WhatsApp</option>
                                            <option value="Llamada telefonica">Llamada telefonica</option>
                                            <option value="Envio de correo">Envío de correo</option>
                                            <option value="Otro">Otro</option> 
                                        </select>
                                    </div>
                                    <div className='form-group col-md-5'>
                                        <label className='font-weight-bold text-secondary'>Estatus</label>
                                        <select className='form-control' value={this.state.statusSelect} onChange={this.handleStatusFollow}>
                                            <option>Seleccione una opción</option>
                                            {this.state.statusFollow.map(item =>
                                                <option key={item.id_status_client} value={item.name_status}>{item.name_status}</option>    
                                            )}
                                        </select>
                                    </div>
                                    <div className='form-group col-md-10'>
                                        <label className='font-weight-bold text-secondary'>Comentario</label>
                                        <textarea className='form-control' value={this.state.comment_contact} onChange={this.handleCommentContact}/>
                                    </div>
                                    <div className='row col-md-10'>
                                        <button onClick={this.saveFollowing} className='btn btn-info text-white'><i className="fa fa-file-text-o" aria-hidden="true"></i> Guardar</button>
                                    </div>
                                </div>
                                <div>
                                    <table className='table table-hover mt-3'>
                                        <thead className='thead-dark'>
                                            <tr>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Hora</th>
                                                <th scope="col">Comentario</th>
                                                <th scope="col">Opción contacto</th>
                                                <th scope="col">Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.arrayDetailContact.map(item => 
                                                <tr key={item.id_log_contact}>
                                                    <td>{item.date_contact}</td>
                                                    <td>{item.time_contact.substring(0,5)}</td>
                                                    <td>{item.comment_contact}</td>
                                                    <td>{item.option_contact}</td>
                                                    <td><button onClick={(evente) => this.showDetailFollow(evente, item.id_log_contact)} className='btn btn-warning'><i className="fa fa-eye" aria-hidden="true"></i></button></td>
                                                </tr>   
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <Button styleButton="btn btn-secondary" textButton="Cerrar" method={this.closeModal}/>
                            </div>
                        </div>
                    </div>
                </div>

                <ViewFollow 
                    key={0} 
                    detCommenContact={this.state.detCommenContact}
                    detDataContact={this.state.detDataContact}
                    detDateContact={this.state.detDateContact}
                    detIdLogContact={this.state.detIdLogContact}
                    detIdTask={this.state.detIdTask}
                    detNameContact={this.state.detNameContact}
                    detOptionContact={this.state.detOptionContact}
                    detStatusClient={this.state.detStatusClient}
                    detTimeContact={this.state.detTimeContact}
                    detUserContact={this.state.detUserContact}
                />
  
            </>
        )
    }
}

export default Seguimiento

