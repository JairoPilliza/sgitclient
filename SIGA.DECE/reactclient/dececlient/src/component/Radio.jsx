import React, { Fragment } from "react";

const Radio = (props) => {
    const handleCheckRadio = (radio) => {
        const newInstancia = props.lista.map((item, index) => {
            item.data.value = (radio.index === index) ? !item.data.value : item.data.value;
            return item;
        })
        props.setLista(newInstancia);

    }

    return (
        <Fragment>
            <div className="form-check">
                <input
                    onChange={() => handleCheckRadio(props)}
                    id={props.nameRadio}
                    name={props.atributoRadio}
                    type="radio"
                    className="form-check-input"
                    defaultChecked={props.valueRadio}

                />
                <label
                    htmlFor={props.nameRadio}
                    className="form-check-label">
                    {props.descripcionRadio}
                </label>
            </div>
        </Fragment>
    );
}
export default Radio;