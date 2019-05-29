import React from 'react';
import '..//vacations.css'

const Form = (props) => {

    const{description,destination,from_date,to_date,price} = props.data

    return(
        <div>
            <label>Description</label>
            <textarea className="form-control mb-2" placeholder="Description" value = {description} onChange = {({target}) => props.onChange(target.value,'description')}/>
            <div className="row">
                <div className="form-group col-6">
                    <label>Destination</label>
                    <input type="text" className="form-control mb-2" placeholder="Destination" value = {destination} onChange = {({target}) => props.onChange(target.value,'destination')}/>
                </div>
                <div className="form-group col-6">
                    <label>Price in USD</label>
                    <input className = "form-control mb-2" type = "number" value = {price} onChange = {({target}) => props.onChange(target.value,'price')}/>
                </div>
            </div>
            <label>Img</label>
            <input className="form-control mb-2" type="file" onChange = {({target}) => props.onChange(target.files[0],'img_url')}/>
            <div className="row">
                <div className="form-group col-6">
                    <label>From</label>
                    <input type="date" className="form-control mb-2" value = {from_date} onChange = {({target}) => props.onChange(target.value,'from_date')}/>
                </div>
                <div className="form-group col-6">
                    <label>To</label>
                    <input type="date" className="form-control mb-2" value = {to_date} onChange = {({target}) => props.onChange(target.value,'to_date')}/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-6">
                    <button onClick={() => props.clearForm()} data-toggle="collapse" data-target={"#form"} className="btn-block btn-danger mb-4 form-control">Cancel</button>
                </div>
                <div className="form-group col-6">
                    <button onClick={() => props.addVacation()} className="btn-block btn-success form-control" data-toggle="collapse" data-target={"#form"}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default Form;