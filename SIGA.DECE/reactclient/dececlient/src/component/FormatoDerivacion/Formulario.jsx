import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../resource/resource";
import sitem1 from "../../services/DerivacionService/TipoDerivacionService";
import ButtonCustom from "../Formatos/ButtonCustom";
import Dinamic from "../Formatos/DinamicComponent";

const TipoDerivacion = (props) => {
    const [listaTipoDerivacion, setListaTipoDerivacion] = useState([]);
    const [derivacion, setDerivacion] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [inhabilitar, setIhabilitar] = useState(true)
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceDerivacion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    useEffect(() => { reset(derivacion) }, [derivacion]);
    useEffect(() => { setDerivacion(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(derivacion) }, [derivacion]);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaTipoDerivacion(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload);
                        edit.map((item, index) => {
                            if (item.data.value) {
                                setEditMode(true)
                                const block = true;
                                if (block) {
                                    setIhabilitar(false)
                                }
                            }
                            return (0);
                        })
                    }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setDerivacion(result.payload ? JSON.parse(result.payload) : [])
                    localStorage.setItem("alumno", result.payload);
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceDerivacionOpcion = Resource.getId(listaTipoDerivacion, "idDeceDerivacionOpcion");
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                localStorage.setItem("idDeceDerivacion", JSON.stringify(result.payload))
                props.history.push("./DerivacionInstitucionExterna")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDerivacionOpcion = Resource.getId(listaTipoDerivacion, "idDeceDerivacionOpcion");
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DerivacionInstitucionExterna")
            } else {
                alert(result.message);
            }
        });;
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./TableDerivacion"); }
    const next = () => { props.history.push("./DerivacionInstitucionExterna"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 >Departamento De Consejería Estudiantil</h5>
                    <h5 >Informe De Derivación</h5>
                </div>
                <div className="card-body">
                    <form className="g-3 " onSubmit={handleSubmit(onSubmit)} >
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
                            <div className="col-md-3" ><input name="fechaNacimiento" {...register('fechaNacimiento')} type="date" className="form-control" id="fechaNacimiento" maxLength={"500"} /></div>
                            <div className="col-md-3" ><input name="curso" {...register('curso')} type="text" className="form-control" id="curso" maxLength={"500"} /></div>
                            <div className="col-md-3" ><input name="codAlumno" {...register('codAlumno')} type="text" className="form-control" id="codAlumno" maxLength={"500"} /></div>
                            <div className="col-md-3" ><input name="nombreAlumno" {...register('nombreAlumno')} type="text" className="form-control" id="nombreAlumno" maxLength={"500"} /></div>
                            <div className="col-md-3" ><input name="gestion" {...register('gestion')} type="text" className="form-control" id="gestion" maxLength={"500"} /></div>
                        </div>
                        <div className="row g-2 mb-2"  >
                            <div className="col-md-9">
                                <div id="institucion-externa">
                                    <h6>Tipo de Derivación:</h6>
                                    <Dinamic lista={listaTipoDerivacion} setLista={setListaTipoDerivacion} />
                                </div>
                            </div>
                            <div className="col-md-3 mt-5"  >
                                <div className="form-floating"  >
                                    <input {...register("fechaDerivacion")} style={{ float: "inline-end" }} type="date" className="form-control" id="fechaDerivacion" required />
                                    <label htmlFor="fechaDerivacion">Quito:</label>
                                </div>
                            </div>
                        </div>
                        <div id="datos-personales">
                            <h5 className="text-black-50 text-center">Datos Institucionales</h5>
                            <div className="form-floating mb-3">
                                <input {...register("nombreInstitucion")} type="text" className="form-control" id="nombreInstitucion" maxLength={"300"} required />
                                <label htmlFor="nombreInstitucion">Nombre de la institución educativa:</label>
                            </div>
                            <div className="row g-3 mt-1">
                                <div className="form-floating mb-3 col-md-6 " >
                                    <input {...register("direccionInstitucion")} type="text" className="form-control" id="direccionInstitucion" maxLength={"300"} required />
                                    <label htmlFor="direccionInstitucion">Dirección de la institución: </label>
                                </div>
                                <div className="form-floating mb-3 col-md-6 ">
                                    <input {...register("contactoInstitucion")} type="text" className="form-control" id="contactoInstitucion" maxLength={"15"} required />
                                    <label htmlFor="contactoInstitucion">Número telefónico de la institución: </label>
                                </div>
                            </div>
                            <div className="row g-3 mt-1">
                                <div className="form-floating mb-3 col-md-6 ">
                                    <input {...register("nombreQuienDeriva")} type="text" className="form-control" id="nombreQuienDeriva" maxLength={"100"} required />
                                    <label htmlFor="nombreQuienDeriva">Datos personales de quién deriva: </label>
                                </div>
                                <div className="form-floating mb-3 col-md-6 ">
                                    <input {...register("contactoQuienDeriva")} type="text" className="form-control" id="contactoQuienDeriva" maxLength={"15"} required />
                                    <label htmlFor="contactoQuienDeriva">Número telefónico de quién deriva: </label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input {...register("cargoQuienDeriva")} type="text" className="form-control" id="cargoQuienDeriva" maxLength={"100"} required />
                                <label htmlFor="cargoQuienDeriva">Cargo que ocupa la persona que deriva: </label>
                            </div>
                        </div>
                        <hr />
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div >
        </Fragment >
    );
}
export default TipoDerivacion;