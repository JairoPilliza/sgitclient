import React, { Fragment } from "react";

const InputText = (props) => {
    const handleInput = (event, id) => {
        console.log(event.target.value)
        const newInstancia = props.lista.map((item, index) => {
            item.data.descripcion = (index === id) ? event.target.value : item.data.descripcion;
            return item;
        })
        props.setLista(newInstancia);
    }
    return (
        <Fragment>
            <div className="form-floating mt-3 mb-3">
                <input
                    onChange={(e) => handleInput(e, props.nameInput)}
                    //defaultValue={props.valueDescripcionInput}                  
                    id={"InputText" + props.nameInput}
                    type="text"
                    className="form-control"
                />
                <label htmlFor={"InputText" + props.nameInput}>
                    {props.descripcionInput}
                </label>
            </div>
        </Fragment>
    );
}
export default InputText;