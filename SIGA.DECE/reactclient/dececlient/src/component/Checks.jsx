import React, { Fragment } from "react";

const Checks = (props) => {
    const handleCheckBox = (check) => {
        const newInstancia = props.lista.map((item, index) => {
            item.data.value = (check.index === index) ? !item.data.value : item.data.value;
            return item;
        })
        props.setLista(newInstancia);
    }
    return (
        <Fragment>
            <div className="form-check form-switch">
                <input
                    onChange={() => handleCheckBox(props)}
                    id={props.nameCheck}
                    name={props.atributoCheck}
                    defaultChecked={props.valueCheck}
                    type="checkbox"
                    className="form-check-input"
                />
                <label
                    htmlFor={props.nameCheck}
                    className="form-check-label">
                    {props.descripcionCheck}
                </label>
            </div>
        </Fragment>
    );
}
export default Checks;