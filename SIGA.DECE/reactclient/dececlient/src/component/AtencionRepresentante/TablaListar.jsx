import React, { Fragment, useEffect, useState, useContext } from "react";
import Resource from "../../resource/resource";
import sitem1 from "../../services/AtencionRepresentanteService/AtencionRepresentanteService"
import ButtonForm from "../Formatos/ButtonForm";
import General from "../Acordion/AcordionGeneral";
import loadContext from "../../contexts/loaderContext";
import Swal from "sweetalert2";
import ButtonTable from "../Formatos/ButtonOptionTable";
import SweetAlert from "../SweetAlert/SweetAlert";

const TableAtencionRepresentante = (props) => {
    localStorage.setItem("idDeceAtencionRepresentante", 0);
    const setLook = useContext(loadContext);
    const [load, setLoad] = useState(0);
    const [listaAtencionRepresentante, setListaAtencionRepresentante] = useState([]);
    const id = JSON.parse(localStorage.getItem("idDeceAtencionRepresentante"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLook(true)
        sitem1.GetT(qs).then(async (result) => {
            if (result.code === "1") {
                setListaAtencionRepresentante(result.payload ? JSON.parse(result.payload) : [])
                setLook(false)
            } else {
                console.log(result.message + "vacio");
                setLook(false)
            }
        }).catch(e => {
            const error = e.message;
            SweetAlert.Warning(error);
            setLook(false)
        });
        // sitem1.GetT({ history: props.history, re: Resource, qs: qs, set: setListaAtencionRepresentante });
    }, [load]);
    const formShow = () => { props.history.push("./AtencionPadre") }
    const cancel = () => { props.history.push("./"); }
    const UpdateEvent = (item) => {
        localStorage.setItem("idDeceAtencionRepresentante", JSON.stringify(item.idDeceAtencionRepresentante))
        props.history.push("./AtencionPadre");
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
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceAtencionRepresentante });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceAtencionRepresentante", 0);
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
    return (
        <Fragment>
            {/* //{ LOOK} */}
            {<General event={formShow} open={open} setOpen={setOpen} />}
            <div className="card">
                <div className="card-header">
                    <h6>Atención a Padres</h6>
                </div>
                <div className="card-body">
                    <div className="d-grid gap-2 d-md-flex justify-content-md mt-2">
                        <ButtonForm event2={handleClickOpen} event1={cancel} name={"NUEVO"} name2={"CANCELAR"} class={"btn btn-primary "} class2={"btn btn-danger "}
                            classCancel={"btn btn-danger "} icon={"fa-solid fa-plus"} icon2={"fa-solid fa-x"} />
                    </div>

                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-hover small mt-2">
                                <thead>
                                    <tr className="table-primary">
                                        <th escope="col">#</th>
                                        <th escope="col">Código</th>
                                        <th escope="col">Fecha</th>
                                        <th escope="col">Curso</th>
                                        <th escope="col">Estudiante</th>
                                        <th escope="col">Representante</th>
                                        <th escope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listaAtencionRepresentante.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.codigo}</td>
                                                <td>{item.fechaAtencion}</td>
                                                <td>{item.curso}</td>
                                                <td>{item.nombreAlumno}</td>
                                                <td>{item.representante}</td>
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
export default TableAtencionRepresentante;