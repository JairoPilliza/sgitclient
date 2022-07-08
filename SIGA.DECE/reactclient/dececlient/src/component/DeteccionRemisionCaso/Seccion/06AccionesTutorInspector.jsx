import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/06AccionesTutorInspector";
import ButtonCustom from "../../Formatos/ButtonCustom";

const AccionesTutorInspector = (props) => {

    const [accionesItem6, setAccionesItem6] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(accionesItem6) }, [accionesItem6]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setAccionesItem6(result.payload ? JSON.parse(result.payload) : []);
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
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./SeguimientoCapellania");
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./SeguimientoCapellania");
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./SeguimientoCapellania"); }
    const back = () => { props.history.push("./SeguimientoTutorInspector"); }

    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">
                        6.- Acciones a Realizar Seguimiento por el Tutor / Inspección
                    </h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion" style={{ height: '100px' }} maxLength={"500"} required></textarea>
                        </div>
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default AccionesTutorInspector;

