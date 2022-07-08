import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import Radio from "../../Radio";
import sitem1 from "../../../services/DerivacionService/DerivacionDatosPersonalesService";
import ButtonCustom from "../../Formatos/ButtonCustom";

const DerivacionDatosPersonales = (props) => {

    const [listaGenero, setListaGenero] = useState([]);
    const [datospersonal, setDatosPersonal] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDerivacion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    const [edadC, setEdadC] = useState({})
    useEffect(() => { setDatosPersonal(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => { reset(datospersonal) }, [datospersonal]);
    useEffect(() => { reset(edadC) }, [edadC]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setDatosPersonal(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true);
                    const block = true;
                    if (block) { setIhabilitar(false) }
                } else {
                    console.log(result.message);
                    const fecha = document.getElementById("fechaNacimiento").value;
                    calcEdad(fecha);
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaGenero(JSON.parse(result.payload))
                    }
                } else {
                    console.log(result.message);
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idGenero = Resource.getId(listaGenero, "codGenero");
        data.idDeceDerivacion = id;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DerivacionValoracionCaso")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idGenero = Resource.getId(listaGenero, "codGenero");
        data.idDeceDerivacion = id;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DerivacionValoracionCaso")
            } else {
                alert(result.message);
            }
        });
    }
    const calcEdad = (fechaNacimiento) => {
        const fecha = new Date(fechaNacimiento)
        const fechaActual = new Date();
        const mesActual = parseInt(fechaActual.getMonth() + 1)
        const mesNacimiento = parseInt(fecha.getMonth() + 1)
        const diaActual = parseInt(fechaActual.getDate())
        const diaNacimiento = parseInt(fecha.getDate() + 1)
        let edad = parseInt(fechaActual.getFullYear()) - parseInt(fecha.getFullYear())
        if (edad > 0) {
            if (mesActual < mesNacimiento) {
                edad = edad - 1;
                setEdadC({ edad: edad });
            } else if (mesActual === mesNacimiento) {
                if (diaActual < diaNacimiento) {
                    edad = edad - 1;
                    setEdadC({ edad: edad });
                } else {
                    setEdadC({ edad: edad });
                }
            } else {
                setEdadC({ edad: edad });
            }
        } else {
            setEdadC({ edad: "0" });
        }
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./DerivacionInstitucionExterna"); }
    const next = () => { props.history.push("./DerivacionValoracionCaso"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header clearfix">
                    <h5 className="float-start">Datos Personales Del Derivado</h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
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
                        </div>
                        <div id="datos-personales-privado">

                            <div className="row g-1 mt-1">
                                <div className="col-md-9">
                                    <div className="form-floating ">
                                        <input {...register("nombreAlumno")} type="text" className="form-control" id="nombreAlumno" maxLength={"100"} required />
                                        <label htmlFor="nombreAlumno">Apellidos y nombres completos: </label>
                                    </div>
                                </div>
                                <div className="col-md-3" >
                                    <div className="form-floating">
                                        <input readOnly {...register("codAlumno", { required: true })} type="number" id="codAlumno" className="form-control" required />
                                        <label htmlFor="codAlumno">Código Alumno:</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-1 mt-2">
                                <div className="col">
                                    <div className="form-floating mb-2">
                                        <input readOnly {...register("edad", { required: true })} type="number" className="form-control" id="edad" required />
                                        <label htmlFor="edad">Edad: </label>
                                    </div>
                                    <div className="form-floating mt-4 mb-2">
                                        <input {...register("fechaNacimiento")} onChange={(e) => calcEdad(e.target.value)} type="date" className="form-control" id="fechaNacimiento" required />
                                        <label htmlFor="fechaNacimiento">Fecha nacimiento: </label>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <input {...register("direccionDomiciliaria")} type="text" className="form-control" id="direccionDomiciliaria" maxLength={"500"} required />
                                        <label htmlFor="direccionDomiciliaria">Dirección domiciliaria: </label>
                                    </div>
                                    <div className="form-floating mt-3 mb-2">
                                        <input {...register("nombrePadre", { required: true })} type="text" className="form-control" id="nombrePadre" maxLength={"100"} required />
                                        <label htmlFor="nombrePadre">Nombre del padre: </label>
                                        {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.nombrePadre?.type === 'required' && " ⚠ Campo requerido"}</p> */}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-2">
                                        <input {...register("curso")} type="text" className="form-control" id="curso" maxLength={"100"} required />
                                        <label htmlFor="curso">Año que cursa: </label>
                                    </div>
                                    <div className="table-responsive">
                                        <div className="genero">
                                            <h6 >Sexo: </h6>
                                        </div>
                                        {
                                            listaGenero.map((item, index) => {
                                                return (<Radio
                                                    index={index}
                                                    key={index}
                                                    valueRadio={item.data.value}
                                                    nameRadio={item.descripcion}
                                                    atributoRadio={'genero'}
                                                    descripcionRadio={item.cod}
                                                    lista={listaGenero}
                                                    setLista={setListaGenero}
                                                    register={register}
                                                />)
                                            })
                                        }
                                    </div>
                                    <div className="form-floating mt-1 mb-3">
                                        <input {...register("numeroTelefonico")} type="text" className="form-control" id="numeroTelefonico" maxLength={"20"} required />
                                        <label htmlFor="numeroTelefonico">Número telefónico: </label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input {...register("nombreMadre", { required: true })} type="text" className="form-control" id="nombreMadre" maxLength={"20"} required />
                                        <label htmlFor="nombreMadre">Nombre de la madre: </label>
                                        {/* <p style={{ color: '#bf1650', display: "inline" }}> {errors.nombreMadre?.type === 'required' && " ⚠ Campo requerido"}</p> */}
                                    </div>
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
export default DerivacionDatosPersonales;