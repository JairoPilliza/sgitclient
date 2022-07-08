import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Resource from "../../resource/resource";
import sitem1 from "../../services/TipoIntervencionService/RSObRecomendacionesService";
import ButtonCustom from "../Formatos/ButtonCustom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorDatos } from "../SweetAlert/test";

const ResultadosObservaciones = (props) => {
    const [resultadosObtenidos, setResultadosObtenidos] = useState([])
    const [obsRecomendacion, setObsRecomendacion] = useState([])
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceIntervencion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const inhabilitar = true
    const [limpiarD, setLimpiarD] = useState(null);
    useEffect(() => { reset(limpiarD); }, [limpiarD]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setResultadosObtenidos(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true)
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
                    setObsRecomendacion(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true)
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);

    const Save = (data) => {
        data.idDeceIntervencion = id;
        data.res = resultadosObtenidos;
        data.ior = obsRecomendacion;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                localStorage.setItem("idDeceIntervencion", JSON.stringify(result.payload))
                props.history.push("./TableTipoIntervencion")
            } else {
                alert(result.message);
            }
        });
    }

    const Update = (data) => {
        data.idDeceIntervencion = id;
        data.res = resultadosObtenidos;
        data.ior = obsRecomendacion;
        console.log(data)
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableTipoIntervencion")
            } else {
                alert(result.message);
            }
        });
    }

    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }

    const back = () => { props.history.push("./GeneralEspecifico"); }
    const insertResultado = (item) => {
        if (document.getElementById("descripcion").value === "") {
            errorDatos();
            setLimpiarD({ descripcion: "" })
        } else {
            item = document.getElementById("descripcion").value;
            setResultadosObtenidos([...resultadosObtenidos, { descripcion: item }]);
            setLimpiarD({ descripcion: "" })
        }
    }
    const itemDelete = (item, index) => {
        console.log(index)
        const newList = resultadosObtenidos.filter((x, i) => i !== index);
        console.log(newList)
        setResultadosObtenidos(newList);
    }
    const insertRecomendacion = (item) => {
        if (document.getElementById("recomendacion").value === "") {
            errorDatos();
            setLimpiarD({ recomendacion: "" })
        } else {
            item = document.getElementById("recomendacion").value;
            setObsRecomendacion([...obsRecomendacion, { descripcion: item }]);
            setLimpiarD({ recomendacion: "" })
        }
    }
    const itemDeleteR = (item, index) => {
        console.log(index)
        const newList1 = obsRecomendacion.filter((x, i) => i !== index);
        console.log(newList1)
        setObsRecomendacion(newList1);
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <ToastContainer></ToastContainer>
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Resultados Obtenidos</h6>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="input-group mb-3 ">
                                    <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion"
                                        style={{ height: "90px" }} maxLength={"300"} />
                                    <label htmlFor="descripcion"></label>
                                    <button onClick={(e) => insertResultado(e)} className="btn btn-outline-primary" type="button" id="button-addon1"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        resultadosObtenidos.map((item, index) => {

                            return (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <div className="input-group mb-3 form-floating">
                                            <textarea readOnly value={item.descripcion} type="text" className="form-control" id={index + 1}
                                                style={{ height: "90px" }} maxLength={"300"} />
                                            <label htmlFor={index + 1}>Resultados.</label>
                                            <button onClick={() => itemDelete(item, index)} className="btn btn-outline-danger" type="button" id={index + 1}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Observaciones Y Recomendaciones</h6>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="input-group mb-3 ">
                                    <textarea {...register("recomendacion")} type="text" className="form-control" id="recomendacion"
                                        style={{ height: "90px" }} />
                                    <label htmlFor="recomendacion"></label>
                                    <button onClick={(e) => insertRecomendacion(e)} className="btn btn-outline-primary" type="button" id="button-addon1"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        obsRecomendacion.map((item, index) => {
                            return (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <div className="input-group mb-3 form-floating">
                                            <textarea readOnly value={item.descripcion} type="text" className="form-control" id={index + 1}
                                                style={{ height: "90px" }} />
                                            <label htmlFor={index + 1}>Observacion O Recomendacion</label>
                                            <button onClick={() => itemDeleteR(item, index)} className="btn btn-outline-danger" type="button" id={index + 1}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                </div>
                <ButtonCustom event1={back} inhabilitar={inhabilitar} />
            </form>
        </Fragment>
    )

}
export default ResultadosObservaciones