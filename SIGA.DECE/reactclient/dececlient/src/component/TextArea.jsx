import React, { Fragment } from "react";

const TextArea = (props) => {

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
            <div className="form-floating">
                <textarea
                    onChange={(e) => handleInput(e, props.nameInput)}
                    //defaultValue={props.valueDescripcionInput}                  
                    id={"AreaText" + props.nameInput}
                    type="text"
                    className="form-control" style={{ height: "60px" }} />
                <label htmlFor={props.nameTextArea}>
                    {props.descripcionInput}
                </label>
            </div>
        </Fragment>
    );
}
export default TextArea;