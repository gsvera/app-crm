import React from 'react'
import ReactDOM from 'react-dom'

class CardModules extends React.Component{
    constructor(){
        super()
        this.state = {modules: []}
    }

    componentDidMount(){
        fetch('/funct/modules')
        .then(res => res.json())
        .then((item) => {  
            this.setState({modules: item})
        })
    }

    render(){
        return(
            <div className="m-3 row justify-content-center">
                {this.state.modules.map((item) => 
                    <div className="card col-4 back-card" key={item.id_module}>
                        <div className="card-body">
                            <img src={item.img_logo} className="img-modulo mx-auto"/>
                            <h4 className="card-title font-weight-bold">{item.name_module}</h4>
                            <p className="card-text">{item.description_module}</p>
                            <a href={item.link_module} className="btn btn-primary btn-block">Abrir</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default CardModules

// if(document.getElementById('modules')){
//     ReactDOM.render(<CardModules />, document.getElementById('modules'))
// }