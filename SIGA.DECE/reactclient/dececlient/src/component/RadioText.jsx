import React, { Fragment } from "react";

const RadioText = (props) => {
    return (
        <Fragment>
            <table className="table table-hover table-striped">
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <div className="form-check">
                                <input {...props.register(props.nameRadio)} defaultChecked={props.valueRadio} name={props.atributoRadio} id={props.nameRadio} className="form-check-input" type="radio" />
                                <label className="form-check-label" htmlFor={props.nameRadio}>
                                    {props.descripcionRadio}
                                </label>
                            </div>
                        </td>
                        <td>
                            <div className="form-floating">
                                <input {...props.register(props.nameInput)} defaultValue={props.valueInput} id={props.nameInput} type="text" className="form-control" />
                                <label htmlFor={props.nameInput}>
                                    {props.descripcionInput}
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
export default RadioText;