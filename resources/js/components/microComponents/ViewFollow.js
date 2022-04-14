import React from "react";

class ViewFollow extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return(
            <>
                <div className='modal fade' id="detailFollow" tabIndex="-1" role="dialog" aria-labelledby='rolModal' aria-hidden="true" style={{zIndex: 1200}}>
                    <div className='modal-dialog modal-lg' role="document">
                        <div className='modal-content'>
                            <div className='modal-header font-weight-bold'>
                                Detalle del seguimiento
                            </div>
                            <div className='modal-body'>
                                <div className='justify-content-end row'>
                                    <div className='col-3'>
                                        <div className="back-gray-detail pl-2">
                                            Fecha de contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detDateContact}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="back-gray-detail pl-2">
                                            Hora de contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detTimeContact}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <div className="back-gray-detail pl-2">
                                            Usuario que contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detUserContact}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="back-gray-detail pl-2">
                                            Estatus de contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detStatusClient}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <div className="back-gray-detail pl-2">
                                            Opción de contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detOptionContact}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="back-gray-detail pl-2">
                                            Nombre del contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detNameContact}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="back-gray-detail pl-2">
                                            Dato de contacto
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detDataContact}
                                        </div>
                                    </div>                                    
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12">
                                        <div className="back-gray-detail pl-2">
                                            Comentarios
                                        </div>
                                        <div className="border-gray-detail pl-2">
                                            {this.props.detCommenContact}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className='btn btn-secondary' data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ViewFollow;