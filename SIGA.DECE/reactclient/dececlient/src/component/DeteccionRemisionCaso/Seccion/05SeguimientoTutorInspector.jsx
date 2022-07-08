import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/05SeguimientoTutorInspector";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorDatos } from "../../SweetAlert/test";
const SeguimientoTutorInspector = (props) => {
    const [listaSItem5Opciones, setListaSItem5Opciones] = useState([]);
    const [listaAcuerdos, setListaAcuerdos] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [editMode, setEditMode] = useState(false);
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaSItem5Opciones(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload)
                        edit.map((item, index) => {
                            if (item.data.value) {
                                setEditMode(true)
                                const block = true
                                if (block) { setIhabilitar(false) }
                            }
                            return (0);
                        })
                    }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaAcuerdos(result.payload ? JSON.parse(result.payload) : []);
                    setEditMode(true)
                    const block = true
                    if (block) { setIhabilitar(false) }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        data.isop = Resource.getRows(listaSItem5Opciones);
        data.dae = listaAcuerdos;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./AccionesTutorInspector");
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        data.isop = Resource.getRows(listaSItem5Opciones);
        data.dae = listaAcuerdos;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./AccionesTutorInspector");
            } else {
                alert(result.message);
            }
        });
    }
    const insertAcuerdo = (ap, ae) => {
        if (document.getElementById("acuerdoPadre").value === "" && document.getElementById("acuerdoAlumno").value === "") {
            errorDatos()
        } else {
            ap = document.getElementById("acuerdoPadre").value;
            ae = document.getElementById("acuerdoAlumno").value;
            setListaAcuerdos([...listaAcuerdos, { acuerdoPadre: ap, acuerdoAlumno: ae }]); //setListaDetalle(listaDetalle.concat("hola"))
            reset();
        }
    }
    const itemDelete = (item, index) => {
        const newList = listaAcuerdos.filter((x, i) => i !== index);
        setListaAcuerdos(newList);
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./AccionesTutorInspector"); }
    const back = () => { props.history.push("./SeguimientoDocente"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <ToastContainer></ToastContainer>
                <div className="card-header">
                    <h5 className="float-start">
                        5.- Informe de Seguimiento del Tutor / Inspector <small className="text-black-50">(Todo lo que ha hecho por el estudiante)</small>
                    </h5>
                </div>
                <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                    <Dinamic lista={listaSItem5Opciones} setLista={setListaSItem5Opciones} />
                    <div className="mt-2">
                        <div className="card-header">
                            <h6 className="card-subtitle">
                                ACUERDOS ESTABLECIDOS CON EL ESTUDIANTE Y/O REPRESENTANTE LEGAL DEL ESTUDIANTE<small className="text-black-50">(Lo que las personas interesadas se compromenten a realizar)</small>
                            </h6>
                        </div>
                        <div className="card-body row g-2 mt-1" >
                            <div className="form-floating ">
                                <textarea {...register("acuerdoPadre")} type="text" className="form-control" id="acuerdoPadre" maxLength={"500"} />
                                <label htmlFor="acuerdoPadre">Padres</label>
                            </div>
                            <div className="form-floating ">
                                <textarea {...register("acuerdoAlumno")} type="text" className="form-control" id="acuerdoAlumno" maxLength={"500"} />
                                <label htmlFor="acuerdoAlumno">Estudiantes</label>
                            </div>
                            <button onClick={() => insertAcuerdo()} className="btn btn-outline-primary" type="button" id="button-addon2"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                        </div>
                    </div>
                    {
                        listaAcuerdos.map((item, index) => {
                            return (
                                <div key={index} className="accordion-body row g-2 mt-1" >
                                    <div className="mb-12 form-floating ">
                                        <textarea readOnly value={item.acuerdoPadre} type="text" className="form-control" id="acuerdoPadre" />
                                        <label htmlFor="acuerdoPadre">Padres</label>
                                    </div>

                                    <div className="mb-12 form-floating ">
                                        <textarea readOnly value={item.acuerdoAlumno} type="text" className="form-control" id="acuerdoAlumno" />
                                        <label htmlFor="acuerdoAlumno">Estudiantes</label>
                                    </div>
                                    <button onClick={() => itemDelete(item, index)} className="btn btn-outline-danger" type="button" id="button-addon2"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                                </div>
                            )
                        })
                    }
                    <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                </form>
            </div>
        </Fragment >
    );
}
export default SeguimientoTutorInspector;