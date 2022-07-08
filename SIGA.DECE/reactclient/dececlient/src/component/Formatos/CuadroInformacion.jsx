import React, { Fragment } from "react";

const CuadroInformacion = () => {
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <br />
                        <input className=" form-control" type="text" placeholder="Buscar...."/>
                    </div>
                </div>
            </div>
            <div className="row g-3 mt-1 mb-2" >
                <div className="card col-md-2">
                    <div className="card-body" type="submit">
                        <h5 className="card-title">Alumno:</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Seccion:</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Grado:</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Paralelo:</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Edad:</h6>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default CuadroInformacion;