import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Resource from "../../resource/resource";
import sitem1 from "../../services/ProcesoSesionSeguimientoService/RegistroSesionSeguimientoService";
import ButtonCustom from "../Formatos/ButtonCustom";
import Swal from "sweetalert2";

const RegistroSesionSeguimiento = (props) => {
    const inhabilitar = true;
    const [seguimientoDetalle, setSeguimientoDetalle] = useState([])
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [limpiar, setLimpiar] = useState(null);
    const id = JSON.parse(localStorage.getItem("idDeceSesionSeguimiento"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [current, setCurrent] = useState(null);
    useEffect(() => { reset(current) }, [current])
    const [load, setLoad] = useState(0);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setSeguimientoDetalle(result.payload ? JSON.parse(result.payload) : [])
                } else {
                    console.log(result.message + "vacio");
                }
            });;
        }
    }, [load]);
    useEffect(() => { setLimpiar({}); }, []);
    useEffect(() => { reset(limpiar); }, [limpiar]);
    const Save = (data) => {
        data.idDeceSesionSeguimiento = id;
        data.ssd = seguimientoDetalle;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                //props.history.push("./TableSesionSeguimiento")
                setLoad(load + 1)
                setCurrent(null)
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSesionSeguimiento = id;
        data.ssd = seguimientoDetalle;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                setEditMode(false)
                setLoad(load + 1)
            } else {
                alert(result.message);
            }
        });;
    }
    const onSubmit = (data, evento) => {
        setCurrent({ fecha: "", areasTrabajadas: "", actividadesPlanificadas: "", materialesUtilizar: "", observaciones: "", avances: "" })
        if (editMode) {
            Update(data)

        } else {
            Save(data);

        }
    }
    const onPass = () => {
        props.history.push("./TableSesionSeguimiento")
    }
    const back = () => { props.history.push("./ProcesoSesionSeguimiento"); }
    const getToEdit = (item) => {
        setEditMode(true);
        const value = seguimientoDetalle.filter(x => x.idDeceSesionSeguimientoDetalle === item.idDeceSesionSeguimientoDetalle);
        if (value.length === 0) return;
        setCurrent(value[0]);
    }
    const itemDelete = (item) => {
        Swal.fire({
            title: "Está seguro de eliminar?",
            text: "¡No se podrá revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceSesionSeguimientoDetalle });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
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
    return (
        <Fragment>
            <div className="card ">
                <div className="card-header ">
                    <h5 className="float-start" id="exampleModalLabel">Registro de Sesión y Seguimiento</h5>
                </div>
                <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                    <div className="card-body">
                        <div className="row g-2">

                            <div className="col-md-3">
                                <div className="form-floating">
                                    <input type="date"{...register("fecha")} className="form-control" id="fecha" required />
                                    <label htmlFor="fecha">Fecha de Sesión</label>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-floating">
                                    <input {...register("areasTrabajadas")} type="text" className="form-control" id="areasTrabajadas" maxLength={"300"} required />
                                    <label htmlFor="areasTrabajadas">Areas trabajadas</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating ">
                                    <input {...register("actividadesPlanificadas")} type="text" className="form-control" id="actividadesPlanificadas" maxLength={"300"} required />
                                    <label htmlFor="actividadesPlanificadas">Actividades Planificadas</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 mt-1">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input {...register("materialesUtilizar")} type="text" className="form-control" id="materialesUtilizar" maxLength={"300"} required />
                                    <label htmlFor="materialesUtilizar">Materiales a utilizar</label>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="form-floating">
                                    <textarea {...register("observaciones")} className="form-control" id="observaciones" style={{ height: "100px" }} maxLength={"300"} required />
                                    <label htmlFor="observaciones">Observaciones</label>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-floating">
                                    <textarea {...register("avances")} className="form-control" id="avances" style={{ height: "100px" }} maxLength={"300"} required />
                                    <label htmlFor="avances">Avances</label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-primary" type="submit" >{<FontAwesomeIcon icon="fa-solid fa-check" />} AGREGAR</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive mt-2">
                            <table className="table table-hover small mt-2">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Fecha</th>
                                        <th>Areas trabajadas</th>
                                        <th>Actividades Planificadas</th>
                                        <th>Materiales a utilizar</th>
                                        <th>Observaciones</th>
                                        <th>Avances</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        seguimientoDetalle.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.fecha}</td>
                                                <td>{item.areasTrabajadas}</td>
                                                <td>{item.actividadesPlanificadas}</td>
                                                <td>{item.materialesUtilizar}</td>
                                                <td>{item.observaciones}</td>
                                                <td>{item.avances}</td>
                                                <td className="d-grid gap-2 d-md-flex justify-content-md">
                                                    <button onClick={() => getToEdit(item, index)} type="button" className="btn btn-warning" data-bs-toggle="" data-bs-target="">
                                                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square"></FontAwesomeIcon>
                                                    </button>
                                                    <button onClick={() => itemDelete(item, index)} type="button" className="btn btn-danger" data-bs-toggle="" data-bs-target="">
                                                        <FontAwesomeIcon icon="fa-solid fa-trash-can"></FontAwesomeIcon>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
                <form onSubmit={handleSubmit(onPass)}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <ButtonCustom event1={back} inhabilitar={inhabilitar} />
                    </div>
                </form>
            </div >
        </Fragment >
    );
}
export default RegistroSesionSeguimiento;