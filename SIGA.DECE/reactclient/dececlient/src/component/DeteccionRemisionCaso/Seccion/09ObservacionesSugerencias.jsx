import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/09ObservacionesSugerenciasService";
import ButtonCustom from "../../Formatos/ButtonCustom";
const ObservacionesSugerencias = (props) => {

    const [obsSugerencia, setObsSugerencia] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(obsSugerencia) }, [obsSugerencia]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setObsSugerencia(result.payload ? JSON.parse(result.payload) : []);
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
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./InformeSeguimiento")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./InformeSeguimiento")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./SeguimientoDece"); }
    const next = () => { props.history.push("./InformeSeguimiento"); }
    return (
        <Fragment>

            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start"> 10.- Observaciones y/o Sugerencia Emitidas Por el Dece</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
export default ObservacionesSugerencias;