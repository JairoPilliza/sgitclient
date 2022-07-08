import React, { Fragment } from "react";
const CheckText = (props) => {
    const handleCheckBox = (check) => {

        const newInstancia = props.lista.map((item, index) => {
            item.data.value = (check.index === index) ? !item.data.value : item.data.value;
            return item;
        })
        props.setLista(newInstancia);
    }
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
            <div className="row g-3 mt-1 mb-2"  >
                <div className="col-md-12">
                    <div className="form-check form-switch">
                        <input onChange={() => handleCheckBox(props)}
                            id={props.nameCheck}
                            defaultChecked={props.valueCheck}
                            className="form-check-input"
                            type="checkbox" />
                        <label className="form-check-label" htmlFor={props.nameCheck}>
                            {props.descripcionCheck}
                        </label>
                    </div>
                    <div className="form-floating">
                        <input
                            onChange={(e) => handleInput(e, props.nameInput)}
                            defaultValue={props.valueDescripcion}
                            id={props.index}
                            type="text"
                            className="form-control" />
                        <label htmlFor={"InputText" + props.nameInput}>
                            {props.descripcionInput}
                        </label>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
export default CheckText;