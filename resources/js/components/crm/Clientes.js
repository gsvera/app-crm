import React from 'react'
import Button from '../microComponents/Button'
import CheckSwitch from '../microComponents/CheckSwitch'
import RowContactInput from '../microComponents/RowContactInput'

class Clientes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            titleModal:"Registro de cliente",
            classbutton:"btn btn-success",
            textButton: "Guardar",
            firstName:"",
            lastName:"",
            birthDay:"",
            adress:"",
            id_client:0,
            listClient:[],
            arrClients:[],
            detailContact:[],
            countRow:0
        }
        this.handleFirstName = this.handleFirstName.bind(this)
        this.handleLastName = this.handleLastName.bind(this)
        this.handleBirthDay = this.handleBirthDay.bind(this)
        this.handleAdress = this.handleAdress.bind(this)
        this.cleanInputs = this.cleanInputs.bind(this)
        this.saveClient = this.saveClient.bind(this)
        this.getClients = this.getClients.bind(this)
        this.changeActive = this.changeActive.bind(this)
        this.selectClient = this.selectClient.bind(this)
        this.deleteClient = this.deleteClient.bind(this)
        this.search = this.search.bind(this)
        this.addRowContact = this.addRowContact.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }
    componentDidMount()
    {
        this.getClients(true)
    }
    handleFirstName(e)
    {
        this.setState({firstName:e.target.value})
    }
    handleLastName(e)
    {
        this.setState({lastName:e.target.value})
    }
    handleBirthDay(e)
    {
        this.setState({birthDay:e.target.value})
    }
    handleAdress(e)
    {
        this.setState({adress:e.target.value})
    }
    cleanInputs()
    {
        $("#newClient").modal('hide')
        this.setState({
            titleModal:"Registro de cliente",
            classbutton:"btn btn-success",
            textButton: "Guardar",
            firstName:"",
            lastName:"",
            birthDay:"",
            adress:""
        })
    }
    saveClient()
    {
        if(this.state.firstName == "")
        {
            $("#errorName").removeClass('d-none')
            return false
        }
        else
        {
            $("#errorName").addClass('d-none')
        }

        if(this.state.lastName == "")
        {
            $("#errorLastName").removeClass('d-none')
            return false
        }
        else
        {
            $("#errorLastName").addClass('d-none')
        }

        let tableContact = document.getElementById('body-table'),
        detailContact = []

        for(let i = 0; i < tableContact.rows.length; i++)
        {
            let formContact = tableContact.rows[i].querySelector('.formContact').value,
            dataContact = tableContact.rows[i].querySelector('.dataContact').value,
            nameContact = tableContact.rows[i].querySelector('.nameContact').value

            if(formContact == 'email')
            {
                if(!regexEmail.test(dataContact))
                {
                    warningAlert("Advertencia.", "Ingrese un correo valido en metodo de contacto Email")
                    return false
                }
            }
            if(nameContact == "")
            {
                warningAlert("Advertencia.", "El nombre de contacto no puede estar vacio")
            }
            if(dataContact == "")
            {
                warningAlert("Advertencia.", "El dato de contacto no puede estar vacio")
            }

            detailContact.push({form_contact: formContact, name_contact: nameContact, data_contact: dataContact})
        }

        let register = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            birth_day: this.state.birthDay,
            adress: this.state.adress,
            id_client: this.state.id_client,
            detailContact: detailContact
        }

        let url = this.state.id_client == 0 ?'/funct/newClient':'/funct/updateClient'

        activeLoader("Guardando...", "Guardando los datos del cliente")

        fetch(url,{
            method:'post',
            body: JSON.stringify(register),
            headers: headConexion
        })
        .then(res => res.json())
        .then(resp => {
            closeAlert()
            if(resp.error == false)
            {
                this.cleanInputs()
                this.getClients(false)
                this.setState({detailContact:[]})
                setTimeout(function(){
                    successAlert("Hecho", resp.message)
                },100)
            }
            else
            {
                errorAlert("Error", resp.message)
            }
        })
    }
    getClients(loader)
    {
        if(loader == true)
        {
            activeLoader("Cargando...", "Obteniendo datos.")
        }
        fetch('/funct/getClients')
        .then(res => res.json())
        .then(result => {
            this.setState({listClient:result.data, arrClients:result.data})
            if(loader == true)
            {
                closeAlert()
            }
        })
    }
    selectClient(e, idClient)
    {
        e.preventDefault()

        let client = this.state.arrClients.filter(item => item.id_client == idClient)
        
        this.setState({
            titleModal:"Actualizar cliente",
            classbutton:"btn btn-primary",
            textButton: "Actualizar",
            firstName:client[0].first_name,
            lastName:client[0].last_name,
            birthDay:client[0].birth_day==null?"":client[0].birth_day,
            adress:client[0].adress==null?"":client[0].adress,
            id_client:idClient,
            detailContact:client[0]._detail_contact
        })

        $("#newClient").modal('show')
    }
    changeActive(idClient, check)
    {
        fetch('/funct/disableClient',{
            method:'post',
            body:JSON.stringify({id_client:idClient, check:check}),
            headers:headConexion
        })
        .then(res => res.json())
        .then(result => {
            if(result.data.enabled == true)
            {
                successAlert("Hecho", "Usuario habilitado.")
            }
            else
            {
                warningAlert("Hecho", "Usuario inhabilitado")
            }
        })
    }
    deleteClient(e, idClient)
    {
        let register = {id_client: idClient}
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
              if(result.isConfirmed == true)
              {
                activeLoader("Eliminando...", "Eliminando al cliente")  
                fetch('/funct/deleteClient',{
                    method:'post',
                    body:JSON.stringify(register),
                    headers:headConexion
                })
                .then(res => res.json())
                .then(result => {
                    closeAlert()
                    if(result.error == false)
                    {
                        this.getClients(false)
                        successAlert("Hecho", result.message)
                    }
                    else
                    {
                        errorAlert("Error", result.message)
                    }
                })
              }
          })
    }
    search(e)
    {
        e.preventDefault()

        let filterList = this.state.arrClients.filter(
            item => item.first_name.toUpperCase().match(e.target.value.toUpperCase()) 
            || item.last_name.toUpperCase().match(e.target.value.toUpperCase())
        )

        this.setState({listClient: filterList})
    }
    addRowContact(e)
    {
        e.preventDefault()
        
        let newRow = this.state.detailContact
        let m = this.state.detailContact.map(item => item.id_detail)
        let newCount = Math.max(...m) + 1

        newRow.push({id_detail: newCount, form_contact:"", name_contact:"", data_contact:""})
        this.setState({detailContact:newRow, countRow:newCount})
    }
    deleteRow(e, idRow)
    {
        e.preventDefault()

        let filterRow = this.state.detailContact.filter(item => item.id_detail != idRow)
        this.setState({detailContact:filterRow})
    }
    render(){
        return(
            <>
                <h3 className='mt-3'>Clientes</h3>
                <div className="d-flex justify-content-end m-2">
                    <div className="input-group mb-3 col-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="basic-addon1" onKeyUp={this.search} title="Buscar por nombre, apellido o email."/>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#newClient">
                            <i className="fa fa-plus" aria-hidden="true"></i> Nuevo cliente
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="newClient" tabIndex="-1" role="dialog" aria-labelledby="rolModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <form className='modal-content'>
                            <div className='modal-header'>
                                <h5>{this.state.titleModal}</h5>
                            </div>
                            <div className='modal-body row'>
                                <div className='form-group col-md-6'>
                                    <label className='text-primary font-weight-bold'>Nombre(s) <span className='text-danger'>*</span></label>
                                    <input type="text" className='form-control' value={this.state.firstName} onChange={this.handleFirstName}/>
                                    <span className='d-none text-danger' id="errorName">Campo obligatorio</span>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label className='text-primary font-weight-bold'>Apellido(s) <span className='text-danger'>*</span></label>
                                    <input type="text" className='form-control' value={this.state.lastName} onChange={this.handleLastName}/>                                    
                                    <span className='d-none text-danger' id="errorLastName">Campo obligatorio</span>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label className='text-primary font-weight-bold'>Cumpleaños</label>
                                    <input type="date" className='form-control' value={this.state.birthDay} onChange={this.handleBirthDay}/>
                                </div>
                                <div className='form-group col-md-12'>
                                    <label className='text-primary font-weight-bold'>Dirección</label>
                                    <input type="text" className='form-control' value={this.state.adress} onChange={this.handleAdress}/>
                                </div>
                                <div className='col'>
                                    <p className='text-center font-wieght-bold f-size-12'>Detalle de contacto</p>
                                    <button onClick={this.addRowContact} className='btn btn-info mb-3' style={{float:"left",marginTop:"-15px"}}><i className="fa fa-address-book" aria-hidden="true"></i> Nuevo contacto</button>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th className='text-center' scope="col">Forma de contacto</th>
                                                <th className='text-center' scope="col">Nombre contacto</th>
                                                <th className='text-center' scope="col">Numero / Email</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="body-table">
                                            {this.state.detailContact.map(item => 
                                                <RowContactInput key={item.id_detail} formContact={item.form_contact} nameContact={item.name_contact} dataContact={item.data_contact} action={(event) => this.deleteRow(event, item.id_detail)}/>
                                                // <tr key={item.position}>
                                                //     <td>
                                                //         <select className='form-control formContact' value={}>
                                                //             <option value="whatsapp">WhatsApp</option>
                                                //             <option value="phone">Teléfono</option>
                                                //             <option value="email">Email</option>
                                                //         </select>
                                                //     </td>
                                                //     <td><input className='form-control nameContact' type="text" /></td>
                                                //     <td><input className='form-control dataContact' type="text" /></td>
                                                //     <td><button onClick={(event) => this.deleteRow(event, item.position)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                                                // </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <Button styleButton="btn btn-secondary" textButton="Cerrar" method={this.cleanInputs}/>
                                <Button styleButton={this.state.classbutton} textButton={this.state.textButton} method={this.saveClient}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <table className='table'>
                        <thead className='thead-dark'>
                            <tr>
                                <th className='text-center' scope="col">Numero cliente</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Activar</th>
                                <th scope='col'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listClient.map((item) => 
                                <tr key={item.id_client}>
                                    <td className='text-center font-weight-bold'>{item.folio_client}</td>
                                    <td className='font-weight-bold'>{item.first_name} {item.last_name}</td>
                                    <td>
                                        <CheckSwitch idClient={item.id_client} active={item.enabled} method={this.changeActive}/>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-sm text-success" onClick={(event) => this.selectClient(event,item.id_client)} title="Editar cliente"><i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></button>
                                        <button type="button" className='btn btn-sm text-danger' onClick={(event) => this.deleteClient(event, item.id_client)} title="Eliminar cliente"><i className="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            )}                            
                        </tbody>
                    </table>
                </div>
            </>
        )
    }    
}

export default Clientes

