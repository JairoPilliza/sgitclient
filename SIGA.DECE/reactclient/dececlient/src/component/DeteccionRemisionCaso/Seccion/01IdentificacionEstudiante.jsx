import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import Radio from "../../Radio";
import sitem1 from "../../../services/DeteccionRemisionCasoService/01IdentificacionEstudianteService";
import ButtonCustom from "../../Formatos/ButtonCustom";

const IdentificacionEstudiante = (props) => {
    const listaData = [{ "codigoReportadoX": 1, "codigo": 1, "opcionTipo": 1, "nombrePropiedad": "tutor", "atributoName": "reporte", "descripcion": "Tutor", "fechaRegistro": "2022-05-09T12:24:29.033", "estado": true, "data": { "id": 0, "value": false, "descripcion": "" } },
    { "codigoReportadoX": 2, "codigo": 2, "opcionTipo": 1, "nombrePropiedad": "docente", "atributoName": "reporte", "descripcion": "Docente", "fechaRegistro": "2022-05-09T12:24:29.033", "estado": true, "data": { "id": 0, "value": false, "descripcion": "" } },
    { "codigoReportadoX": 3, "codigo": 3, "opcionTipo": 1, "nombrePropiedad": "inspector/a", "atributoName": "reporte", "descripcion": "Inspector/a", "fechaRegistro": "2022-05-09T12:24:29.033", "estado": true, "data": { "id": 0, "value": false, "descripcion": "" } },
    { "codigoReportadoX": 4, "codigo": 4, "opcionTipo": 1, "nombrePropiedad": "pastorE", "atributoName": "reporte", "descripcion": "Pastor E", "fechaRegistro": "2022-05-09T12:24:29.033", "estado": true, "data": { "id": 0, "value": false, "descripcion": "" } }]
    const [listaIdentificacion, setListaIdentificacion] = useState({});
    const [listReportado, setListReportado] = useState(listaData);
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { setListaIdentificacion(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(listaIdentificacion) }, [listaIdentificacion]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaIdentificacion(result.payload ? JSON.parse(result.payload) : []);
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
        data.codigoReportadoX = Resource.getId(listReportado, "codigoReportadoX");
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                localStorage.setItem("idDeceDeteccionRemisionCaso", JSON.stringify(result.payload))
                props.history.push("./MotivoReporte")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id;
        data.codigoReportadoX = Resource.getId(listReportado, "codigoReportadoX");
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./MotivoReporte")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./TableDeteccionRemisionCaso"); }
    const next = () => { props.history.push("./MotivoReporte"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header clearfix">
                    <h5 className="float-start">1.- Datos de Identificación del Estudiante</h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            {
                                listReportado.map((item, index) => {
                                    return (
                                        <div key={index} className="col-md-3">
                                            <Radio
                                                index={index}
                                                key={index}
                                                valueRadio={item.data.value}
                                                nameRadio={item.nombrePropiedad}
                                                atributoRadio={item.atributoName}
                                                descripcionRadio={item.descripcion}
                                                lista={listReportado}
                                                setLista={setListReportado}
                                                register={register}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
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
                        <div className="row g-1 mt-1">
                            <div className="col-md-3">
                                <div className="form-floating">
                                    <input {...register("codigo")} type="text" className="form-control" id="codigo" maxLength={"50"} required />
                                    <label htmlFor="codigo">Código</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input {...register("fechaDeteccionRemision")} type="Date" className="form-control" id="fechaDeteccionRemision" required />
                                    <label htmlFor="fechaDeteccionRemision">Fecha de Detección</label>
                                </div>
                            </div>
                            <div className="col-md-3"  >
                                <div className="form-floating">
                                    <input readOnly {...register("codAlumno", { required: true })} type="number" id="codAlumno" className="form-control" required />
                                    <label htmlFor="codAlumno">Código Alumno:</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-1 mt-1">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input {...register("nombreAlumno")} type="text" className="form-control" id="nombreAlumno" maxLength={"500"} required />
                                    <label htmlFor="nombreAlumno">Estudiante</label>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-floating">
                                    <input {...register("curso")} className="form-control" id="curso" maxLength={"50"} required />
                                    <label htmlFor="curso">Grado/Curso</label>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-floating">
                                    <input {...register("fechaNacimiento")} type="date" className="form-control" id="fechaNacimiento" required />
                                    <label htmlFor="fechaNacimiento">Fecha Nacimiento </label>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-floating">
                                    <input {...register("fechaReporte")} type="Date" className="form-control" id="fechaReporte" required />
                                    <label htmlFor="fechaReporte">Fecha Reporte</label>
                                </div>
                            </div>
                        </div>
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment >
    );
}
export default IdentificacionEstudiante;