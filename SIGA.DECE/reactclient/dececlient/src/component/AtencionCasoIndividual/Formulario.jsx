import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { StateMachineProvider, createStore } from "little-state-machine";
import Resource from "../../resource/resource";
import sitem1 from "../../services/AtencionCasoIndividualService/CasoIndividualService"
import ButtonCustom from "../Formatos/ButtonCustom";

createStore({});

const CasoIndividual = (props) => {
    const inhabilitar = true;
    const [editMode, setEditMode] = useState(false);
    const [casoIndividual, setCasoIndividual] = useState({});
    const { register, handleSubmit, reset } = useForm();
    useEffect(() => { setCasoIndividual(JSON.parse(localStorage.getItem("alumno"))) }, [])
    const id = JSON.parse(localStorage.getItem("idDeceSeguimientoCasoIndividual"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    useEffect(() => { setCasoIndividual(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(casoIndividual) }, [casoIndividual]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setCasoIndividual(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true)
                } else {
                    console.log(result.message);
                }
            });
        }
    }, []);
    const Save = (data) => {
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableCasoIndividual")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableCasoIndividual")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => {
        props.history.push("./TableCasoIndividual");
    }

    return (

        <Fragment>
            <StateMachineProvider>
                <div className="card mt-1">
                    <div className="card-header clearfix">
                        <h5 className="float-start"  >Registro De Seguimiento De Casos Individuales</h5>
                    </div>
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                        <div className="card-body" >
                            <div className="row g-3 ">
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
                                <div className="col-md-6">
                                    <div className="form-floating ">
                                        <input name="nombreAlumno" {...register('nombreAlumno')} type="text" className="form-control" id="nombreAlumno" maxLength={"500"} required />
                                        <label htmlFor="nombreAlumno">Nombre del estudiante:</label>
                                    </div>
                                </div>
                                <div className="col-md-3 ">
                                    <div className="form-floating ">
                                        <input {...register("fechaNacimiento")} type="date" className="form-control" id="fechaNacimiento" required />
                                        <label htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                                    </div>
                                </div>
                                <div className="col-md-3"  >
                                    <div className="form-floating">
                                        <input readOnly {...register("codAlumno", { required: true })} type="text" id="codAlumno" className="form-control" />
                                        <label htmlFor="codAlumno">Código Alumno:</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3 mt-1">
                                <div className="col-md-6">
                                    <div className="form-floating ">
                                        <input {...register("curso")} type="text" className="form-control" id="curso" maxLength={"100"} required />
                                        <label htmlFor="curso">Curso/Sección:</label>
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <div className="form-floating ">
                                        <input {...register("fechaAperturaSeguimiento")} type="date" className="form-control" id="fechaAperturaSeguimiento" required />
                                        <label htmlFor="fechaAperturaSeguimiento">Fecha de apertura del seguimiento:</label>
                                        {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.fechaAperturaSeguimiento?.type === 'required' && " ⚠ Campo requerido"}</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body" >
                                <div className="row g-3 ">
                                    <div className="col-md-6  form-floating">
                                        <input {...register("nombreRemitente")} type="text" className="form-control" id="nombreRemitente" maxLength={"100"} required />
                                        <label htmlFor="nombreRemitente"> En caso de haber sido remitido indicar quien:</label>
                                        <div className="valid-feedback">
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-floating">
                                        <input {...register("nombreInstitucion")} type="text" className="form-control" id="nombreInstitucion" maxLength={"100"} required />
                                        <label htmlFor="nombreInstitucion"> Área de la comunidad educativa a la que pertenece:</label>
                                        <div className="valid-feedback">
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mt-2">
                                    <textarea {...register("accionesRealizadas")} className="form-control" id="accionesRealizadas" style={{ height: "100px" }} maxLength={"1000"} required />
                                    <label htmlFor="accionesRealizadas">Describir las acciones realizadas:</label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.descripcionAccionesR?.type === 'required' && " ⚠ Campo requerido"}</p> */}
                                </div>
                                <div className="form-floating mt-2">
                                    <textarea {...register("acuerdos", { required: true })} className="form-control" id="acuerdos" style={{ height: "100px" }} maxLength={"1000"} required />
                                    <label htmlFor="acuerdos">Acuerdos a los que se llegó:</label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.acuerdos?.type === 'required' && " ⚠ Campo requerido"}</p> */}
                                </div>
                                <div className="form-floating mt-2">
                                    <textarea {...register("recomendacionesSugerencias", { required: true })} className="form-control" id="recomendacionesSugerencias" style={{ height: "100px" }} maxLength={"1000"} required />
                                    <label htmlFor="recomendacionesSugerencias">Recomendaciones y Sugerencias:</label>
                                    {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.recomendacionesCaso?.type === 'required' && " ⚠ Campo requerido"}</p> */}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <ButtonCustom event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </StateMachineProvider>
        </Fragment>
    );
}
export default CasoIndividual;  