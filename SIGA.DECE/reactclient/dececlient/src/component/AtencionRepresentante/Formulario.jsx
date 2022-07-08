import React, { Fragment, useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import Resource from "../../resource/resource";
import sitem1 from "../../services/AtencionRepresentanteService/AtencionRepresentanteService"
import ButtonCustom from "../Formatos/ButtonCustom";
const AtencionPadre = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [inhabilitar, setIhabilitar] = useState(true)
    const [atencionRepresentante, setAtencionRepresentante] = useState({});
    const { register, formState: { errors }, handleSubmit, reset
    } = useForm();

    const id = JSON.parse(localStorage.getItem("idDeceAtencionRepresentante"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    useEffect(() => { setAtencionRepresentante(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(atencionRepresentante) }, [atencionRepresentante]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code == "1") {
                    if (!(result.payload == null)) {
                        setAtencionRepresentante(JSON.parse(result.payload))
                        setEditMode(true)
                    }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        sitem1.Post(data).then(async (result) => {
            if (result.code == "1") {
                props.history.push("./TableAtencionRepresentante")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code == "1") {
                props.history.push("./TableAtencionRepresentante")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./TableAtencionRepresentante"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header clearfix">
                    <h5 className="float-start" > Registro de Atención a Padres</h5>
                </div>
                <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                    <div className="row g-3 mt-1" hidden>
                        <div className="col-md-3" ><input name="idModalidad" {...register('idModalidad')} type="text" className="form-control" id="idModalidad" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="modalidad" {...register('modalidad')} type="text" className="form-control" id="modalidad" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idGrado" {...register('idGrado')} type="text" className="form-control" id="idGrado" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="codigoGrado" {...register('codigoGrado')} type="text" className="form-control" id="codigoGrado" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="descripcionGrado" {...register('descripcionGrado')} type="text" className="form-control" id="descripcionGrado" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idParalelo" {...register('idParalelo')} type="text" className="form-control" id="idParalelo" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="paralelo" {...register('paralelo')} type="text" className="form-control" id="paralelo" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idTurno" {...register('idTurno')} type="text" className="form-control" id="idTurno" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="turno" {...register('turno')} type="text" className="form-control" id="turno" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="gestion" {...register('gestion')} type="text" className="form-control" id="gestion" maxLength={"500"} /></div>
                        <div className="col-md-3" ><input name="idSucursal" {...register('idSucursal')} type="text" className="form-control" id="idSucursal" maxLength={"500"} /></div>
                    </div>
                    <div className="card-body">
                        <div className="row g-3 ">
                            <div className="col-md-4">
                                <div className="form-floating ">
                                    <input {...register("codigo")} type="text" className="form-control" id="codigo" required />
                                    <label htmlFor="codigo">Código:</label>
                                </div>
                            </div>
                            <div className="col-md-3" >
                                <div className="form-floating">
                                    <input readOnly {...register("codAlumno", { required: true })} type="text" id="codAlumno" className="form-control" required />
                                    <label htmlFor="codAlumno">Código Alumno:</label>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-floating">
                                    <input {...register("curso")} id="curso" type="text" className="form-control" maxLength="100" required />
                                    <label htmlFor="curso">Curso:</label>
                                </div>
                            </div>
                        </div>

                        <div className="row g-2 mt-1">
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("fechaAtencion")} type="date" className="form-control" required />
                                    <label htmlFor="fechaAtencion">Fecha y hora de atencion:</label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-floating">
                                    <input {...register("medioAtencion")} id="medioAtencion" type="text" className="form-control" maxLength="100" required />
                                    <label htmlFor="medioAtencion">Medio de atención:</label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.medioAtencion?.type === 'required' && " ⚠ Campo requerido "}</p> */}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("nombreAlumno")} id="nombreAlumno" type="text" className="form-control" maxLength="100" required />
                                    <label htmlFor="nombreAlumno">Nombre del estudiante:</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("representante")} id="representante" type="text" className="form-control" maxLength="100" required />
                                    <label htmlFor="representante">Nombre del representante:</label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.representante?.type === 'required' && " ⚠ Campo requerido "}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 mt-1">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("asunto")} id="asunto" type="text" className="form-control" maxLength="100" required />
                                    <label htmlFor="Asunto">Asunto:</label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.asunto?.type === 'required' && " ⚠ Campo requerido "}</p> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <textarea {...register("actividadRealizada")} id="actividadRealizada" type="text" className="form-control" maxLength="100" required />
                                    <label htmlFor="actividadRealizada">Acitividad realizada: </label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.actividad?.type === 'required' && " ⚠ Campo requerido "}</p> */}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <textarea {...register("acuerdosCompromisos")} id="acuerdosCompromisos" type="text" className="form-control" maxLength="300" required />
                                    <label htmlFor="acuerdosCompromisos">Acuerdos o compromisos: </label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.acuerdos?.type === 'required' && " ⚠ Campo requerido "}</p> */}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <textarea {...register("evidencia")} id="evidencia" type="text" className="form-control" maxLength="300" required />
                                    <label htmlFor="evidencia">Evidencia: </label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.evidencia?.type === 'required' && " ⚠ Campo requerido "}</p> */}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <ButtonCustom event1={back} inhabilitar={inhabilitar} />
                    </div>
                </form>
            </div>
            <div>
            </div>
        </Fragment>
    );
}
export default AtencionPadre;