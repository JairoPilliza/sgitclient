import React, { Fragment, useContext, useEffect, useState } from "react";
import Resource from "../../resource/resource";
import sitem1 from "../../services/AtencionCasoIndividualService/CasoIndividualService"
import ButtonForm from "../Formatos/ButtonForm";
import General from "../Acordion/AcordionGeneral";
import Swal from "sweetalert2";
import loadContext from "../../contexts/loaderContext";
import ButtonTable from "../Formatos/ButtonOptionTable";
import SweetAlert from "../SweetAlert/SweetAlert";

const TableCasoIndividual = (props) => {
    localStorage.setItem("idDeceSeguimientoCasoIndividual", 0)
    const [load, setLoad] = useState(0);
    const setLook = useContext(loadContext);
    const [listaCasoIndividual, setListaCasoIndividual] = useState([]);
    const id = JSON.parse(localStorage.getItem("idDeceSeguimientoCasoIndividual"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLook(true);
        sitem1.GetT(qs).then(async (result) => {
            if (result.code === "1") {
                setListaCasoIndividual(result.payload ? JSON.parse(result.payload) : [])
                setLook(false);
            } else {
                console.log(result.message + "vacio");
                setLook(false);
            }
        }).catch(e => {
            const error = e.message;
            SweetAlert.Warning(error);
            setLook(false)
        });
    }, [load]);
    
    const UpdateEvent = (item) => {
        localStorage.setItem("idDeceSeguimientoCasoIndividual", JSON.stringify(item.idDeceSeguimientoCasoIndividual))
        props.history.push("./CasoIndividual");
    }
    const deleteItem = (item) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "¡No se podrá revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceSeguimientoCasoIndividual });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceSeguimientoCasoIndividual", 0);
                        setLoad(load + 1)
                        Swal.fire(
                            'Eliminado!',
                            'El registro ha sido eliminado.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            result.message + '!',
                            'El registro no ha sido eliminado.',
                            'error'
                        )
                    }
                });

            }
        })

    }
    const handleClickOpen = () => { setOpen(true); };
    const formShow = () => { props.history.push("./CasoIndividual"); }
    const cancel = () => { props.history.push("./"); }
    return (
        <Fragment>
            {<General event={formShow} open={open} setOpen={setOpen} />}
            <div className="card">
                <div className="card-header">
                    <h6 >Seguimiento de Casos Individuales</h6>
                </div>
                <div className="card-body" >
                    <div className="d-grid gap-2 d-md-flex justify-content-md mt-2">
                        <ButtonForm event2={handleClickOpen} event1={cancel} name={"NUEVO"} name2={"CANCELAR"} class={"btn btn-primary "} class2={"btn btn-danger "}
                            classCancel={"btn btn-danger "} icon={"fa-solid fa-plus"} icon2={"fa-solid fa-x"} />
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-hover small mt-2">
                                <thead>
                                    <tr className="table-primary">
                                        <th>#</th>
                                        <th>F. Apertura</th>
                                        <th>Alumno</th>
                                        <th>Curso</th>
                                        <th>Remitente</th>
                                        <th>Institución</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listaCasoIndividual.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.fechaAperturaSeguimiento}</td>
                                                <td>{item.nombreAlumno}</td>
                                                <td>{item.curso}</td>
                                                {/* <td>{item.fechaNacimiento}</td> */}
                                                <td>{item.nombreRemitente}</td>
                                                <td>{item.nombreInstitucion}</td>
                                                <ButtonTable event={UpdateEvent} event2={deleteItem} item={item} />
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default TableCasoIndividual;