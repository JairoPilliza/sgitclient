import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import methods from "../../services/Service";
const CompromisoRepresentanteInit = (props) => {
    const { register, errors, handleSubmit, setValue, reset } = useForm();

    const Save = (data) => {
        methods.Post("CompromisoRepresentanteDetalle/Post", data).then(async (result) => {
            if (result.code == "1") {
                localStorage.setItem("idDeceAtencionAlumno", JSON.stringify(result.payload))
                props.history.push("./TableCompromiso");
            } else {
                alert(result.message);
                console.log(result.payload);
            }
        });
    }

    return (
        <Fragment>
            <div className="row g-2 ">
                <div className="col-md-10">
                    <div className="form-floating">
                        <h6>Encargada del DECE de la Institución realizo el siguiente documento en el cual me comprometo a:</h6>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion" />
                    <label htmlFor="descripcion"></label>
                    <button className="btn btn-outline-primary" type="button" id="button-addon2"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                </div>
            </div>
        </Fragment>
    );
}

export default CompromisoRepresentanteInit;