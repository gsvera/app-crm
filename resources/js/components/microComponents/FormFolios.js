import React from 'react'
import Button from './Button'


class FormFolios extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            id_folio:this.props.idFolio,
            count:this.props.count,
            folio:this.props.folio,
            subModulo:this.props.subModulo,
            labelFolio: this.props.folio + " - " + this.props.count
        }
        this.handleCount = this.handleCount.bind(this)
        this.handleFolio = this.handleFolio.bind(this)
        this.updateFolio = this.updateFolio.bind(this)
    }
    handleCount(e)
    {
        this.setState({count: e.target.value})
    }
    handleFolio(e)
    {
        this.setState({folio: e.target.value})
    }
    updateFolio()
    {
        Swal.fire({
            title: 'Estas seguro de cambiar los folios?',
            text: "Esta acción puede afectar tus registros!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Actualizar!'
        })
        .then((result) => {
            if(result.isConfirmed)
            {
                let register = {
                    id_folio: this.state.id_folio,
                    count: this.state.count,
                    folio: this.state.folio,
                }
        
                activeLoader("Actualizando folio...", "Guardando información")
        
                fetch('/funct/updateFolio',{
                    method:'post',
                    body: JSON.stringify(register),
                    headers: headConexion
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    closeAlert()
                    if(result.error == false)
                    {
                        this.setState({
                            labelFolio: this.state.folio + " - " + this.state.count
                        })
        
                        setTimeout(function(){
                            successAlert("Hecho", result.message);
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
    
    render()
    {
        return(
            <>
                <div className='card-folio'>
                    <div className='card-header-folio'>
                        <p>{this.state.subModulo}</p>
                        <h5 className='text-center'>
                            <b>{this.state.labelFolio}</b>
                        </h5>
                    </div>
                    <div className='card-body'>
                        <div className='form-group text-center'>
                            <label className='text-primary font-weight-bold'>Contador</label>
                            <input className='form-control text-center' type="number" value={this.state.count} onChange={this.handleCount}/>
                        </div>
                        <div className='form-group text-center'>
                            <label className='text-primary font-weight-bold'>Folio</label>
                            <input className='form-control text-center' type="text" value={this.state.folio} onChange={this.handleFolio}></input>
                        </div>
                        <div className='text-center'>
                            <Button styleButton="btn btn-primary" textButton="Actualizar" method={this.updateFolio}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FormFolios;