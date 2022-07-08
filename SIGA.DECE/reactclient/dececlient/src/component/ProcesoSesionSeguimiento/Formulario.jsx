import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../resource/resource";
import sitem1 from "../../services/ProcesoSesionSeguimientoService/ProcesoSesionSeguimientoService";
import ButtonCustom from "../Formatos/ButtonCustom";
import Dinamic from "../Formatos/DinamicComponent";
const ProcesoSesionSeguimiento = (props) => {
    const [listaSesion, setListaSesion] = useState();
    const [listaSeguimientoOp, setListaSeguimientoOp] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceSesionSeguimiento"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(listaSesion) }, [listaSesion]);
    useEffect(() => { setListaSesion(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => {
        if (id > 0) {
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaSesion(result.payload ? JSON.parse(result.payload) : [])
                } else {
                    console.log(result.message)
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaSeguimientoOp(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload);
                        edit.map((item, index) => {
                            if (item.data.value === true) {
                                setEditMode(true)
                                const block = true;
                                if (block) { setIhabilitar(false) }
                            }
                        })
                    }
                } else {
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceIntervencionSesionSeguimientoOpcion = Resource.getId(listaSeguimientoOp, "idDeceIntervencionSesionSeguimientoOpcion"); //getId();
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                localStorage.setItem("idDeceSesionSeguimiento", JSON.stringify(result.payload))
                props.history.push("./RegistroSesionSeguimiento")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSesionSeguimiento = id;
        data.idDeceIntervencionSesionSeguimientoOpcion = Resource.getId(listaSeguimientoOp, "idDeceIntervencionSesionSeguimientoOpcion"); //getId();
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./RegistroSesionSeguimiento")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./RegistroSesionSeguimiento") }
    const cancel = () => { props.history.push("./TableSesionSeguimiento") }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header clearfix">
                    <h5 className="float-start"  >Registro de Sesión y Seguimiento: Individual, Familiar, Grupal/ Comunitaria e Intitucional</h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                        <Dinamic lista={listaSeguimientoOp} setLista={setListaSeguimientoOp} horientacion={true} />
                        <div className="row g-3 mt-1" hidden >
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
                        <div className="input-group">
                            <span name="nombreAlumno" className="input-group-text">Nombre del estudiante:</span>
                            <input {...register("nombreAlumno")} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="nombreAlumno" maxLength={"500"} required />
                        </div>
                        <div className="input-group">
                            <span name="codAlumno" className="input-group-text">Código Alumno:</span>
                            <input readOnly {...register("codAlumno", { required: true })} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="codAlumno" />
                        </div>
                        <div className="input-group">
                            <span name="curso" className="input-group-text">Año y paralelo del que forma parte el estudiante:</span>
                            <input {...register("curso")} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="curso" maxLength={"100"} required />
                        </div>
                        <div className="input-group">
                            <span name="dificultadDetectada" className="input-group-text">Dificultad detectada:</span>
                            <input {...register("dificultadDetectada")} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="Dificultad" maxLength={"100"} required />
                        </div>
                        <div className="input-group">
                            <span name="nombreProfesional" className="input-group-text">Nombre del profesional quién lo atiende:</span>
                            <input {...register("nombreProfesional")} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="ProfesionalA" maxLength={"254"} required />
                        </div>
                        <div className="input-group">
                            <span name="fechaInicioIntervencion" className="input-group-text">Fecha de inicio del plan de intervención:</span>
                            <input {...register("fechaInicioIntervencion")} type="Date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="FPintervencion" required />
                        </div>
                        <ButtonCustom event2={next} event1={cancel} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment >
    );
}



export default ProcesoSesionSeguimiento;