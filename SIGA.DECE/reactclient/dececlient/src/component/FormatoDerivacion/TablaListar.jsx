import React, { Fragment, useContext, useEffect, useState } from "react";
import Resource from "../../resource/resource";
import sitem1 from "../../services/DerivacionService/TipoDerivacionService";
import ButtonForm from "../Formatos/ButtonForm";
import General from "../Acordion/AcordionGeneral";
import Swal from "sweetalert2";
import loadContext from "../../contexts/loaderContext";
import ButtonTable from "../Formatos/ButtonOptionTable";
import SweetAlert from "../SweetAlert/SweetAlert";
const TableDerivacion = (props) => {
    localStorage.setItem("idDeceDerivacion", 0);

    const [load, setLoad] = useState(0);
    const setLook = useContext(loadContext);
    const [listaDerivacion, setListaDerivacion] = useState([]);
    const id = JSON.parse(localStorage.getItem("idDeceDerivacion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLook(true);
        sitem1.GetT(qs).then(async (result) => {
            if (result.code === "1") {
                setListaDerivacion(result.payload ? JSON.parse(result.payload) : [])
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
    const formShow = () => { props.history.push("./TipoDerivacion"); }
    const cancel = () => { props.history.push("./"); }
    const UpdateEvent = (item) => {
        localStorage.setItem("idDeceDerivacion", JSON.stringify(item.idDeceDerivacion))
        props.history.push("./TipoDerivacion");
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
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceDerivacion });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceDerivacion", 0);
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
                    <h6>Informe De Derivación </h6>
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
                                        <th escope="col">#</th>
                                        <th escope="col">T. Derivación</th>
                                        <th escope="col">Institución</th>
                                        {/* <th escope="col">Direccion Inst</th> */}
                                        {/* <th escope="col">Contanto Ins</th> */}
                                        <th escope="col">Persona que Deriva</th>
                                        <th escope="col">Alumno</th>
                                        <th escope="col" >Fecha Derivación</th>
                                        <th escope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listaDerivacion.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.descripcion}</td>
                                                <td>{item.nombreInstitucion}</td>
                                                {/* <td>{item.direccionInstitucion}</td> */}
                                                {/* <td>{item.contactoInstitucion}</td> */}
                                                <td>{item.nombreQuienDeriva}</td>
                                                <td>{item.nombreAlumno}</td>
                                                <td>{item.fechaDerivacion}</td>
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
export default TableDerivacion;