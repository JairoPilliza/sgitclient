import React, { Fragment } from "react";
import ButtonForm from "../Formatos/ButtonForm";

const CardContenedor = (props) => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                    <h6>{props.titulo}</h6>
                </div>
                <div className="card-body">
                    <div className="d-grid gap-2 d-md-flex justify-content-md mt-2">
                        <ButtonForm event2={props.handleClickOpen} icon={"fa-solid fa-plus"} />
                    </div>
                    {props.table}
                </div>
            </div>
        </Fragment>
    )
}
export default CardContenedor;