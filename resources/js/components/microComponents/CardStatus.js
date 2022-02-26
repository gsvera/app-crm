import React from 'react'
import Button from './Button'
import ButtonDelete from './ButtonDelete'

class CardStatus extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div className='card-status p-3 m-2'>
                <div className='text-right justify-content-end'>
                    <small className='col font-weight-bold'>Orden: {this.props.position}</small>
                    <div className='line-color-custom mb-3' style={{backgroundColor: this.props.color, float: 'right'}}></div>
                </div>
                <h4 className='text-center my-2'>{this.props.nameStatus}</h4>
                <small className='text-secondary font-italic text-justify'>{this.props.descriptionStatus}</small>
                <div className='mt-2'>
                    <Button styleButton="btn btn-info btn-sm text-white mx-1" textButton="Editar" method={this.props.action}/>
                    <ButtonDelete styleButtonD="btn btn-danger btn-sm mx-1" textButtonD="Eliminar" action={this.props.actionD}/>
                </div>
            </div>
        )
    }
}

export default CardStatus;