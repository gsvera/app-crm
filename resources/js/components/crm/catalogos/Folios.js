import React from "react"
import FormFolios from './../../microComponents/FormFolios'

class Folios extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id_folio: 0,
            count: 0,
            folio: "",
            modulo: "",
            submodulo: "",
            listFolios: []
        }
        this.getFolios = this.getFolios.bind(this)
    }
    componentDidMount()
    {
        this.getFolios(true)
    }
    getFolios(loader)
    {
        if(loader == true)
        {
            activeLoader("Cargado...", "Obteniendo datos.")
        }

        fetch('/funct/getFolios')
        .then(res => res.json())
        .then((res) => {
            if(res.error == false)
            {
                this.setState({listFolios: res.data})
            }
            if(loader == true)
            {
                closeAlert()
            }
        })
    }

    render(){
        return(
            <>
                <h1>Catálogo de folios</h1>
                
                <div className="row">
                    {this.state.listFolios.map(item => 
                        <FormFolios key={item.id_folio} idFolio={item.id_folio} count={item.count} folio={item.folio} subModulo={item.sub_modulo}/>
                    )}
                </div>
            </>
        )
    }
}

export default Folios;