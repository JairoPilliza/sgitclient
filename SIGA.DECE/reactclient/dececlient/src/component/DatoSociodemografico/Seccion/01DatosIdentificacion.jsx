import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form" //import { useStateMachine } from "little-state-machine"; import updateAction from "../../updateAction"; //const { actions, state } = useStateMachine({ updateAction });//actions.updateAction(data);
import { withRouter } from 'react-router-dom';
import sitem1 from "../../../services/SocioDemograficoService/DatoIdentificacionService";
import Resource from "../../../resource/resource";
import ButtonCustom from "../../Formatos/ButtonCustom";

const DatosIdentificacion = (props) => {
    const [itemForm, setItemForm] = useState({});
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const [inhabilitar, setIhabilitar] = useState(true)
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    useEffect(() => { setItemForm(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(itemForm) }, [itemForm]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setItemForm(result.payload ? JSON.parse(result.payload) : []);
                    setEditMode(true);
                    const block=true
                    if(block){setIhabilitar(false)}
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.telefono = Resource.convertStringToArray(data.telefono);
        data.celular = Resource.convertStringToArray(data.celular);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                localStorage.setItem("idDeceSociodemografico", JSON.stringify(result.payload))
                props.history.push("./DatosFamiliares")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSociodemografico = id;
        data.telefono = Resource.convertStringToArray(data.telefono);
        data.celular = Resource.convertStringToArray(data.celular);
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DatosFamiliares")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./DatosFamiliares") }
    const back = () => { props.history.push("./TableListar") }
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                    <h6>1.- Datos De Identificación/Información</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            /* <svg  className="float-end" 
                                width="200" height="200" 
                                xmlns="http://www.w3.org/2000/svg" role="img" 
                                aria-label="Placeholder: 200x200" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <title>Placeholder</title>
                                <rect width="100" height="100" fill="#868e96"></rect>
                                <text x="1%" y="25%" fill="#dee2e6" dy=".3em">200x200</text>
                              </svg>
                              <img src="" width="200" height="200" className="rounded float-start" alt="" /> 
                            */
                        }
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
                        <div className="row g-3 mt-1">
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input {...register("codigo")} type="text" className="form-control" id="codigo" maxLength={"50"} required />
                                    <label htmlFor="codigo">N° Código:</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("curso")} type="text" className="form-control" id="curso" maxLength={"100"} required />
                                    <label htmlFor="curso">Curso:</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("fechaEntrevista")} type="date" className="form-control" id="fechaEntrevista" required />
                                    <label htmlFor="fechaEntrevista">Fecha de entrevista:</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col-md-8">
                                <div className="form-floating ">
                                    <input {...register("nombreAlumno")} type="text" className="form-control" id="nombreAlumno" maxLength={"500"} required />
                                    <label htmlFor="nombreAlumno">Apellidos y Nombres del/la Estudiante</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input readOnly {...register("codAlumno", { required: true })} type="text" id="codAlumno" className="form-control" />
                                    <label htmlFor="codAlumno">Código Alumno:</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col-md-8">
                                <div className="form-floating">
                                    <textarea {...register("lugarNacimiento")} type="text" className="form-control" id="lugarNacimiento" maxLength={"500"} required />
                                    <label htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("fechaNacimiento")} type="date" className="form-control" id="fechaNacimiento" required />
                                    <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <textarea {...register("domicilio")} type="text" className="form-control" id="domicilio" maxLength={"500"} required />
                                    <label htmlFor="domicilio">Domicilio</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <textarea {...register("sector")} type="text" className="form-control" id="sector" maxLength={"500"} required />
                                    <label htmlFor="sector">Sector</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <textarea {...register("cambioDomicilio")} type="text" className="form-control form-control-sm" id="cambioDomicilio" maxLength={"500"} required />
                                    <label htmlFor="cambioDomicilio" className="form-label-sm">Cambios de Domicilio</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mt-1">
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("telefono")} type="text" className="form-control" id="telefono" maxLength={"20"} required />
                                    <label htmlFor="telefono">Teléfono</label>
                                    <small className="text-danger">Agregue los Teléfonos separados por comas</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("celular")} type="text" className="form-control" id="celular" maxLength={"20"} required />
                                    <label htmlFor="celular">Celular</label>
                                    <small className="text-danger"> Agregue los Celulares separados por comas</small>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default withRouter(DatosIdentificacion);