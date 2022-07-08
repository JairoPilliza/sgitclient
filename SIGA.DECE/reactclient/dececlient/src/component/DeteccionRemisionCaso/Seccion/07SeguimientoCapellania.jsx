import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/07SeguimientoCapellaniaService";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorDatos } from "../../SweetAlert/test";
const SeguimientoCapellania = (props) => {
    const [listaSItem7Opciones, setListaSItem7Opciones] = useState([]);
    const [listaCapellania, setListaCapellania] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaSItem7Opciones(JSON.parse(result.payload))
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
                    setListaCapellania(result.payload ? JSON.parse(result.payload) : []);
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
        data.acr = listaCapellania;
        data.issop = Resource.getRows(listaSItem7Opciones);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./SeguimientoDece")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        data.acr = listaCapellania;
        data.issop = Resource.getRows(listaSItem7Opciones);
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./SeguimientoDece")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./SeguimientoDece"); }
    const back = () => { props.history.push("./AccionesTutorInspector"); }
    const insertAcuerdo = (ap) => {
        if (document.getElementById("descripcion").value === "") {
            errorDatos();
        } else {
            ap = document.getElementById("descripcion").value;
            setListaCapellania([...listaCapellania, { descripcion: ap }]);
            reset();
        }
    }
    const itemDelete = (item, index) => {
        const newList = listaCapellania.filter((x, i) => i !== index);
        setListaCapellania(newList);
    }
    return (
        <Fragment>
            <div className="card mt-2">
                <ToastContainer></ToastContainer>
                <div className="card-header">
                    <h5 className="float-start">
                        7.- Informe de Seguimiento de Capellanía <small className="text-black-50"> (Todo lo que ha hecho por el estudiante en caso de ser derivado)</small>
                    </h5>
                </div>
                <Dinamic lista={listaSItem7Opciones} setLista={setListaSItem7Opciones} />
                <div className="card-header">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group form-floating ">
                            <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion" />
                            <label htmlFor="descripcion">Acciones a Realizar(Seguimiento) Por Capellania</label>
                            <button onClick={() => insertAcuerdo()} className="btn btn-outline-primary" type="button" id="button-addon2"><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                        </div>
                        {
                            listaCapellania.map((item, index) => {
                                return (
                                    <div key={index} className="input-group mb-12 form-floating mt-2">
                                        <textarea readOnly value={item.descripcion} type="text" className="form-control" id="descripcion" maxLength={"500"} />
                                        <label htmlFor="descripcion">Acciones a Realizar(Seguimiento) Por Capellanía</label>
                                        <button onClick={() => itemDelete(item, index)} className="btn btn-outline-danger" type="button" id="button-addon2"><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                                    </div>
                                )
                            })
                        }
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form >
                </div>
            </div>
        </Fragment >
    );
}
export default SeguimientoCapellania;