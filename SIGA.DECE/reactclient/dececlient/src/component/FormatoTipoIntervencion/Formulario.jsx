import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Resource from "../../resource/resource";
import sitem1 from "../../services/TipoIntervencionService/TipoIntervencionService";
import ButtonCustom from "../Formatos/ButtonCustom";
import Dinamic from "../Formatos/DinamicComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorDatos } from "../SweetAlert/test";
const TipoIntervencion = (props) => {

    const [riesgo, setRiesgo] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [destinatario, setDestinatario] = useState([]);
    const [intervencion, setIntervencion] = useState([]);
    const [listaIntervencionOpciones, setListaIntervencionOpciones] = useState([]);
    const [listaAreaOpciones, setListaAreaOpciones] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceIntervencion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setInhabilitar] = useState(true)
    const [limpiarD, setLimpiarD] = useState(null);
    useEffect(() => { setIntervencion(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(intervencion) }, [intervencion]);
    useEffect(() => { reset(limpiarD); }, [limpiarD]);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaIntervencionOpciones(JSON.parse(result.payload));
                        const edit = JSON.parse(result.payload);
                        edit.map((item, index) => {
                            if (item.data.value === true) {
                                setEditMode(true)
                                setLimpiarD({ nombreAlumno: " " })
                                const block = true
                                if (block) { setInhabilitar(false) }
                            }
                            return (0);
                        })
                    }
                } else {

                }
            });
        }
    }, []);
    useEffect(() => {
        if (id > 0) {
            sitem1.GetT(qs).then(async (result) => {
                if (result.code === "1") {
                    setIntervencion(result.payload ? JSON.parse(result.payload) : [])
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaAreaOpciones(result.payload ? JSON.parse(result.payload) : [])
                } else {

                }
            });
        }
    }, []);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get2(qs).then(async (result) => {
                if (result.code === "1") {
                    setDestinatario(result.payload ? JSON.parse(result.payload) : [])
                } else {

                }
            });

        }
    }, []);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get3(qs).then(async (result) => {
                if (result.code === "1") {
                    setRiesgo(result.payload ? JSON.parse(result.payload) : [])
                } else {

                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceIntervencionSesionSeguimientoOpcion = Resource.getId(listaIntervencionOpciones, "idDeceIntervencionSesionSeguimientoOpcion"); //getId();
        data.dest = destinatario;
        data.ao = Resource.getRows(listaAreaOpciones);
        data.riesgo = riesgo;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                localStorage.setItem("idDeceIntervencion", JSON.stringify(result.payload))
                props.history.push("./GeneralEspecifico")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceIntervencion = id
        data.idDeceIntervencionSesionSeguimientoOpcion = Resource.getId(listaIntervencionOpciones, "idDeceIntervencionSesionSeguimientoOpcion"); //getId();;
        data.dest = destinatario;
        data.ao = Resource.getRows(listaAreaOpciones);
        data.riesgo = riesgo;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./GeneralEspecifico")
            } else {
                alert(result.message);
            }
        });;
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const insertSRiesgoI = (item) => {
        if (document.getElementById("descripcion").value === "") {
            errorDatos()
            setLimpiarD({ descripcion: "" })
        } else {
            item = document.getElementById("descripcion").value;
            setRiesgo([...riesgo, { descripcion: item }]);
            setLimpiarD({ descripcion: "" })
        }

    }
    const insertDestinatario = (item) => {
        if (document.getElementById("nombreAlumno").value === "") {
            errorDatos()
            setLimpiarD({ nombreAlumno: "" })
        } else {
            item = document.getElementById("nombreAlumno").value;
            setDestinatario([...destinatario, { destinatario: item }]);
            setLimpiarD({ nombreAlumno: "" })
        }

    }
    const itemDelete = (item, index) => {
        console.log(index)
        const newList = destinatario.filter((x, i) => i !== index);
        console.log(newList)
        setDestinatario(newList);
    }
    const itemDeleteR = (item, index) => {
        console.log(index)
        const newList1 = riesgo.filter((x, i) => i !== index);
        console.log(newList1)
        setRiesgo(newList1);
    }
    const back = () => { props.history.push("./TableTipoIntervencion"); }
    const next = () => { props.history.push("./GeneralEspecifico"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <ToastContainer></ToastContainer>
                <div className="card-header">
                    <h6 className="card-title">Tipo de Intervención</h6>
                </div>
                <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                    <div className="row g-3 mt-1" hidden  >
                        <div className="col-md-3" ><input name="idModalidad" {...register('idModalidad')} type="text" className="form-control" id="idModalidad" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="modalidad" {...register('modalidad')} type="text" className="form-control" id="modalidad" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idGrado" {...register('idGrado')} type="text" className="form-control" id="idGrado" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="codigoGrado" {...register('codigoGrado')} type="text" className="form-control" id="codigoGrado" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="descripcionGrado" {...register('descripcionGrado')} type="text" className="form-control" id="descripcionGrado" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idParalelo" {...register('idParalelo')} type="text" className="form-control" id="idParalelo" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="paralelo" {...register('paralelo')} type="text" className="form-control" id="paralelo" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idTurno" {...register('idTurno')} type="text" className="form-control" id="idTurno" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="turno" {...register('turno')} type="text" className="form-control" id="turno" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="codAlumno" {...register('codAlumno')} type="text" className="form-control" id="codAlumno" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="gestion" {...register('gestion')} type="text" className="form-control" id="gestion" maxLength={"500"} /></div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <Dinamic lista={listaIntervencionOpciones} setLista={setListaIntervencionOpciones} horientacion={true} />
                            <div className="input-group mb-3 form-floating">
                                <input {...register("nombreAlumno")} type="text" className="form-control" id="nombreAlumno"
                                    maxLength={"100"} />
                                <label htmlFor="nombreAlumno">Destinatarios</label>
                                <button onClick={(e) => insertDestinatario(e)} className="btn btn-outline-primary" type="button" id="button-addon1"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                            </div>
                        </div>
                    </div>
                    {
                        destinatario.map((item, index) => {
                            return (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <div className="input-group mb-3 form-floating">
                                            <input readOnly value={item.destinatario} type="text" className="form-control" id={index + 1} />
                                            <label htmlFor={index + 1}>Destinatarios</label>
                                            <button onClick={() => itemDelete(item, index)} className="btn btn-outline-danger" type="button" id={index + 1}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                    <div className="card">
                        <div className="card-body">
                            <div className="input-group mb-3 form-floating">
                                <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion"
                                    style={{ height: "80px" }} maxLength={"300"} />
                                <label htmlFor="descripcion">Situaciones de Riesgo identificadas</label>
                                <button onClick={(e) => insertSRiesgoI(e)} className="btn btn-outline-primary" type="button" id="button-addon2"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                            </div>
                        </div>
                    </div>
                    {
                        riesgo.map((item1, index1) => {
                            return (
                                <div key={index1} className="card">
                                    <div className="card-body">
                                        <div className="input-group mb-3 form-floating">
                                            <textarea readOnly value={item1.descripcion} type="text" className="form-control" id={index1 + "R"}
                                                style={{ height: "80px" }} />
                                            <label htmlFor={index1 + "R"}>Situaciones de Riesgo identificadas</label>
                                            <button onClick={() => itemDeleteR(item1, index1)} className="btn btn-outline-danger" type="button" id={index1 + "R"}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Áreas a intervenir</h6>
                        </div>
                    </div>
                    <Dinamic lista={listaAreaOpciones} setLista={setListaAreaOpciones} />
                    <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                </form>
            </div>
        </Fragment >
    );
}



export default TipoIntervencion;