import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/08SeguimientoDeceService";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";
const SeguimientoDece = (props) => {
    const [acuerdosItem8, setAcuerdosItem8] = useState({});
    const [listaSItem8Opciones, setListaSItem8Opciones] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(acuerdosItem8) }, [acuerdosItem8]);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaSItem8Opciones(result.payload ? JSON.parse(result.payload) : []);
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
                    setAcuerdosItem8(result.payload ? JSON.parse(result.payload) : []);
                    setEditMode(true);
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
        data.ace = { descripcion: data.descripcion }
        data.issp = Resource.getRows(listaSItem8Opciones);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./ObservacionesSugerencias")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        data.ace = { descripcion: data.descripcion }
        data.issp = Resource.getRows(listaSItem8Opciones);
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./ObservacionesSugerencias")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./ObservacionesSugerencias"); }
    const back = () => { props.history.push("./SeguimientoCapellania"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">
                        8.- Informe de Atención / Seguimiento del Dece <small className="text-black-50">(Lo que el profesional ha hecho con el estudiante)</small>
                    </h5>
                </div>
                <Dinamic lista={listaSItem8Opciones} setLista={setListaSItem8Opciones} />
            </div>
            <div className="card ">
                <div className="card-header">
                    <h5 className="float-start">9.- Acuerdos Establecidos con el Estudiante / Representante / Docente / Tutor / Administrativos / Externos</h5>
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion" maxLength={"500"} required ></textarea>
                        </div>
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default SeguimientoDece;