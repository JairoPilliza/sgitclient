import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DerivacionService/ValoracionCasoService";
import ButtonCustom from "../../Formatos/ButtonCustom";

const DerivacionValoracionCaso = (props) => {
    const inhabilitar = true;
    const [valoracionCaso, setValoracionCaso] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceDerivacion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [editMode, setEditMode] = useState(false);
    useEffect(() => { reset(valoracionCaso) }, [valoracionCaso]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setValoracionCaso(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true)
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);

    const Save = (data) => {
        data.idDeceDerivacion = id;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableDerivacion")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDerivacion = id;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableDerivacion")
            } else {
                alert(result.message);
            }
        });;
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./DerivacionDatosPersonales"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">Valoració Del Caso</h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                        <div id="valoracion-caso">
                            <div className="mb-2 form-floating">
                                <textarea {...register("motivoReferencia")} className="form-control" id="motivoReferencia" style={{ height: '80px' }} rows="4" maxLength={"1000"} required></textarea>
                                <label htmlFor="motivoReferencia" className="form-label">Motivo de referencia: </label>
                            </div>
                            <div className="mb-2 form-floating">
                                <textarea {...register("descripcionProblematica")} className="form-control" id="descripcionProblematica" style={{ height: '80px' }} rows="4" maxLength={"1000"} required></textarea>
                                <label htmlFor="descripcionProblematica" className="form-label">Historia de la situación actual y
                                    antecedentes familiares, sociales y académico <small>(breve descripción de la historia de la
                                        problemática):</small> </label>
                            </div>
                            <div className="mb-2  form-floating">
                                <textarea {...register("accionDesarrollada")} className="form-control" id="accionDesarrollada" style={{ height: '80px' }} rows="3" maxLength={"1000"} required></textarea>
                                <label htmlFor="accionDesarrollada" className="form-label">Acciones desarrolladas: </label>
                            </div>
                            <div className="mb-2  form-floating">
                                <textarea {...register("observaciones")} className="form-control" id="observaciones" style={{ height: '80px' }} rows="3" maxLength={"1000"} required></textarea>
                                <label htmlFor="observaciones" className="form-label">Observaciones: </label>
                            </div>
                        </div>
                        <hr />
                        <ButtonCustom event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default DerivacionValoracionCaso;