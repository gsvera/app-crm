import React from 'react'

class FiltroSeguimiento extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div className='back-filtro px-2 pt-3'>
                <h5 className='text-primary font-weight-bold text-center'>Filtros</h5>
                <hr></hr>
                <div>
                    <div className='form-group'>
                        <label className='text-secondary font-weight-bold' htmlFor="nameClient">Nombre cliente</label>
                        <input className='form-control' id="nameClient" type="text"/>
                    </div>
                    <div className='form-group'>
                        <label className='text-secondary font-weight-bold' htmlFor="fechaInicio">Fecha cita inicio</label>
                        <input className='form-control' id="fechaInicio" type="date" />
                    </div>
                    <div className='form-group'>
                        <label className='text-secondary font-weight-bold' htmlFor="fechaFin">Fecha cita fin</label>
                        <input className='form-control' id="fechaFin" type="date" />
                    </div>  
                    <div className='form-group'>
                        <label className='text-secondary font-weight-bold' htmlFor="estatus">Estatus</label>
                        <select className='form-control' id="estatus">
                            <option value="">Seleccione una opción</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default FiltroSeguimiento;