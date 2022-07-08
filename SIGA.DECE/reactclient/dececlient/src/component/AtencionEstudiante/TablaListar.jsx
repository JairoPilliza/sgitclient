import React, { Fragment, useContext, useEffect, useState } from "react";
import Resource from "../../resource/resource";
import sitem1 from "../../services/AtencionEstudianteService/AtencionEstudianteService";
import ButtonForm from "../Formatos/ButtonForm";
import General from "../Acordion/AcordionGeneral";
import Swal from "sweetalert2";
import loadContext from "../../contexts/loaderContext";
import ButtonTable from "../Formatos/ButtonOptionTable";
import SweetAlert from "../SweetAlert/SweetAlert";
const TableAtencionEstudiante = (props) => {
    localStorage.setItem("idDeceAtencionAlumno", 0);
    const [load, setLoad] = useState(0);
    const setLook = useContext(loadContext);
    const [listaAtencionEstudiante, setListaAtencionEstudiante] = useState([]);
    const id = JSON.parse(localStorage.getItem("idDeceAtencionAlumno"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLook(true);
        sitem1.GetT(qs).then(async (result) => {
            if (result.code === "1") {
                setLook(false);
                setListaAtencionEstudiante(result.payload ? JSON.parse(result.payload) : [])
            } else {
                setLook(false);
                console.log(result.message + "vacio");
            }
        }).catch(e => {
            const error = e.message;
            SweetAlert.Warning(error);
            setLook(false)
        })
    }, [load]);
    const UpdateEvent = (item) => {
        localStorage.setItem("idDeceAtencionAlumno", JSON.stringify(item.idDeceAtencionAlumno))
        props.history.push("./AtencionEstudiante");
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
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceAtencionAlumno });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceAtencionAlumno", 0);
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
    const formShow = () => { props.history.push("./AtencionEstudiante"); }
    const cancel = () => { props.history.push("./"); }
    const handleClickOpen = () => { setOpen(true); };
    return (
        <Fragment>
            {<General event={formShow} open={open} setOpen={setOpen} />}
            <div className="card">
                <div className="card-header">
                    <h6>Atención a Estudiantes</h6>
                </div>
                <div className="card-body">
                    <div className="d-grid gap-2 d-md-flex justify-content-md mt-2">
                        <ButtonForm event2={handleClickOpen} event1={cancel} name={"NUEVO"} name2={"CANCELAR"} class={"btn btn-primary "} class2={"btn btn-danger "} classCancel={"btn btn-danger "} icon={"fa-solid fa-plus"} icon2={"fa-solid fa-x"} />
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-hover small mt-2">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">#</th>
                                        <th scope="col">Código</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Curso</th>
                                        <th scope="col">Estudiante</th>
                                        <th scope="col">Asunto</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        listaAtencionEstudiante.map((item, index) => (
                                            <tr key={index}>
                                                <td >{index + 1}</td>
                                                <td>{item.codigo}</td>
                                                <td >{item.fechaAtencion}</td>
                                                <td>{item.curso}</td>
                                                <td>{item.nombreAlumno}</td>
                                                <td>{item.asunto}</td>
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
        </Fragment >
    );
}
export default TableAtencionEstudiante;