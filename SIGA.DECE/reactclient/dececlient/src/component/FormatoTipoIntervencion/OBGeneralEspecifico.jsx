import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../resource/resource";
import sitem1 from "../../services/TipoIntervencionService/OBGeneralEspecificoService";
import ButtonCustom from "../Formatos/ButtonCustom";

const GeneralEspecifico = (props) => {

    const [objetivoGeneral, setObjetivoGeneral] = useState({})
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceIntervencion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(objetivoGeneral) }, [objetivoGeneral]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setObjetivoGeneral(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true)
                    const block=true
                    if(block){setIhabilitar(false)}
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.esp = { objEspecifico: data.objEspecifico, objEspecifico2: data.objEspecifico2, objEspecifico3: data.objEspecifico3 };
        data.acc = { acciones: data.acciones, responsable: data.responsable, acciones2: data.acciones2, responsable2: data.responsable2, acciones3: data.acciones3, responsable3: data.responsable3, acciones4: data.acciones4, responsable4: data.responsable4, acciones5: data.acciones5, responsable5: data.responsable5, acciones6: data.acciones6, responsable6: data.responsable6, acciones7: data.acciones7, responsable7: data.responsable7, acciones8: data.acciones8, responsable8: data.responsable8, acciones9: data.acciones9, responsable9: data.responsable9 };
        data.idDeceIntervencion = id;

        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./ResultadosObservaciones")
            } else {
                alert(result.message);
            }
        });;
    }
    const Update = (data) => {
        data.esp = { idDeceIntervencionObjetivoEspecifico: data.idDeceIntervencionObjetivoEspecifico, idDeceIntervencionObjetivoGeneral: data.idDeceIntervencionObjetivoGeneral, objEspecifico: data.objEspecifico, objEspecifico2: data.objEspecifico2, objEspecifico3: data.objEspecifico3 };
        data.acc = { idDeceIntervencionAccionEstrategia: data.idDeceIntervencionAccionEstrategia, idDeceIntervencionObjetivoEspecifico: data.idDeceIntervencionObjetivoEspecifico, acciones: data.acciones, responsable: data.responsable, acciones2: data.acciones2, responsable2: data.responsable2, acciones3: data.acciones3, responsable3: data.responsable3, acciones4: data.acciones4, responsable4: data.responsable4, acciones5: data.acciones5, responsable5: data.responsable5, acciones6: data.acciones6, responsable6: data.responsable6, acciones7: data.acciones7, responsable7: data.responsable7, acciones8: data.acciones8, responsable8: data.responsable8, acciones9: data.acciones9, responsable9: data.responsable9 };
        data.idDeceIntervencion = id;

        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./ResultadosObservaciones")
            } else {
                alert(result.message);
            }
        });;
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data) }

    const back = () => { props.history.push("./TipoIntervencion"); }
    const next = () => { props.history.push("./ResultadosObservaciones"); }
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title">Lineamientos del Proceso de Intervención</h6>
                </div>
                <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <div className="form-floating">
                            <textarea  {...register("descripcion")} type="text" className="form-control" id={"descripcion"} style={{ height: '80px' }} maxLength={"500"} required />
                            <label htmlFor="descripcion">Objetivo General</label>
                        </div>
                    </div>
                    <div className="card-body row g-2 ">
                        <div className="form-floating col-md-4 d-grid">
                            <textarea  {...register("objEspecifico")} type="text" className="form-control" id={"objEspecifico"} style={{ height: '60px' }} maxLength={"300"} required />
                            <label htmlFor="objEspecifico">Objetivo Específico</label>
                            <div className="card-body row g-2 ">
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones")} type="text" className="form-control" id={"acciones"} style={{ height: '60px' }} maxLength={"100"} required />
                                    <label htmlFor="acciones">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable")} type="text" className="form-control" id={"responsable"} style={{ height: '60px' }} maxLength={"100"} required />
                                    <label htmlFor="responsable">Responsables</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones2")} type="text" className="form-control" id={"acciones2"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones2">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable2")} type="text" className="form-control" id={"responsable2"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable2">Responsables</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones3")} type="text" className="form-control" id={"acciones3"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones3">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable3")} type="text" className="form-control" id={"responsable3"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable3">Responsables</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating col-md-4 d-grid">
                            <textarea  {...register("objEspecifico2")} type="text" className="form-control" id={"objEspecifico2"} style={{ height: '60px' }} maxLength={"300"} />
                            <label htmlFor="objEspecifico2">Objetivo Específico</label>
                            <div className="card-body row g-2 ">
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones4")} type="text" className="form-control" id={"acciones4"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones4">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable4")} type="text" className="form-control" id={"responsable4"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable4">Responsables</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones5")} type="text" className="form-control" id={"acciones5"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones5">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable5")} type="text" className="form-control" id={"responsable5"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable5">Responsables</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones6")} type="text" className="form-control" id={"acciones6"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones6">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable6")} type="text" className="form-control" id={"responsable6"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable6">Responsables</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating col-md-4 d-grid">
                            <textarea  {...register("objEspecifico3")} type="text" className="form-control" id={"objEspecifico3"} style={{ height: '60px' }} maxLength={"300"} />
                            <label htmlFor="objEspecifico3">Objetivo Específico</label>
                            <div className="card-body row g-2 ">
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones7")} type="text" className="form-control" id={"acciones7"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones7">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable7")} type="text" className="form-control" id={"responsable7"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable7">Responsables</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones8")} type="text" className="form-control" id={"acciones8"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones8">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable8")} type="text" className="form-control" id={"responsable8"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable8">Responsables</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("acciones9")} type="text" className="form-control" id={"acciones9"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="acciones9">Acciones</label>
                                </div>
                                <div className="form-floating col-md-6 d-grid">
                                    <textarea  {...register("responsable9")} type="text" className="form-control" id={"responsable9"} style={{ height: '60px' }} maxLength={"100"} />
                                    <label htmlFor="responsable9">Responsables</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                </form>
            </div >
        </Fragment >
    );
}
export default GeneralEspecifico;