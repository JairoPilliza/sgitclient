import React, { Fragment, useContext, useEffect, useState } from "react";
import Resource from "../../resource/resource";
import sitem1 from "../../services/TipoIntervencionService/TipoIntervencionService";
import ButtonForm from "../Formatos/ButtonForm";
import General from "../Acordion/AcordionGeneral";
import Swal from "sweetalert2";
import loadContext from "../../contexts/loaderContext";
import ButtonTable from "../Formatos/ButtonOptionTable";
import SweetAlert from "../SweetAlert/SweetAlert";
const TableTipoIntervencion = (props) => {
    localStorage.setItem("idDeceIntervencion", 0);
    const [load, setLoad] = useState(0);
    const setLook = useContext(loadContext);
    const [listaIntervencionD, setListaIntervencionD] = useState([]);
    const id = JSON.parse(localStorage.getItem("idDeceIntervencion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLook(true);
        sitem1.GetT(qs).then(async (result) => {
            if (result.code === "1") {
                setListaIntervencionD(result.payload ? JSON.parse(result.payload) : [])
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
    const formShow = () => { props.history.push("./TipoIntervencion"); }
    const cancel = () => { props.history.push("./"); }
    const UpdateEvent = (item) => {
        localStorage.setItem("idDeceIntervencion", JSON.stringify(item.idDeceIntervencion));
        props.history.push("./TipoIntervencion");
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
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceIntervencion });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceIntervencion", 0);
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
            {<General event={formShow} open={open} setOpen={setOpen} />}
            <div className="card">
                <div className="card-header">
                    <h6>Tipo De Intervención</h6>
                </div>
                <div className="card-body">
                    <div className="d-grid gap-2 d-md-flex justify-content-md mt-2">
                        <ButtonForm event2={handleClickOpen} event1={cancel} name={"NUEVO"} name2={"CANCELAR"} class={"btn btn-primary "} class2={"btn btn-danger "}
                            classCancel={"btn btn-danger "} icon={"fa-solid fa-plus"} icon2={"fa-solid fa-x"} />
                    </div>
                    <table className="table table-hover small mt-2">
                        <thead>
                            <tr className="table-primary">
                                <th>#</th>
                                <th>Destinatario</th>
                                <th>Tipo de intervención</th>
                                <th>Fecha de Registro</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaIntervencionD.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.destinatario}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.fechaRegistro}</td>
                                        <ButtonTable event={UpdateEvent} event2={deleteItem} item={item} />
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}
export default TableTipoIntervencion;