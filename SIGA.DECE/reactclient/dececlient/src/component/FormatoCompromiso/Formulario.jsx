import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Resource from "../../resource/resource";
import sitem1 from "../../services/CompromisoService/CompromisoService";
import ButtonCustom from "../Formatos/ButtonCustom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorDatos } from "../SweetAlert/test";

const CompromisoPadres = (props) => {

    const inhabilitar = true;
    const [editMode, setEditMode] = useState(false);
    const [compromiso, setCompromiso] = useState({});
    const [detalleCompromiso, setDetalleCompromiso] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceCompromisoRepresentante"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [limpiar, setLimpiar] = useState(null);
    useEffect(() => { reset(limpiar); }, [limpiar]);
    useEffect(() => { reset(compromiso) }, [compromiso]);
    useEffect(() => { setCompromiso(JSON.parse(localStorage.getItem("alumno"))) }, [])
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setCompromiso(result.payload ? JSON.parse(result.payload) : [])
                    setEditMode(true);
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    setDetalleCompromiso(result.payload ? JSON.parse(result.payload) : [])
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.detalle = detalleCompromiso;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableCompromiso")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.detalle = detalleCompromiso;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("/TableCompromiso")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const insertDetalle = (item) => {
        if (document.getElementById("descripcion").value === "") {
            errorDatos()
            setLimpiar({ descripcion: "" })
        } else {
            item = document.getElementById("descripcion").value;
            setDetalleCompromiso([...detalleCompromiso, { descripcion: item }]);
            setLimpiar({ descripcion: "" })
        }

    }
    const itemDelete = (item, index) => {
        const newList = detalleCompromiso.filter((x, i) => i !== index);
        setDetalleCompromiso(newList);
    }
    const back = () => { props.history.push("./TableCompromiso"); }
    return (
        <Fragment>
            <ToastContainer></ToastContainer>
            <div className="card mt-2">
                <div className="card-header clearfix">
                    <h5 className="float-start"  >Compromiso de Padres de Familia</h5>
                </div>
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
                    <div className="card-body">
                        <div className="row g-2 mb-2 ">
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("codigo")} type="text" className="form-control" id="codigo" maxLength={"50"} required />
                                    <label htmlFor="codigo">Codigo:</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("fechaCompromiso")} type="date" className="form-control" id="fechaCompromiso" required />
                                    <label htmlFor="fechaCompromiso">Quito:</label>
                                </div>
                            </div>
                            <div className="col-md-4" >
                                <div className="form-floating">
                                    <input readOnly {...register("codAlumno", { required: true })} type="text" id="codAlumno" className="form-control" />
                                    <label htmlFor="codAlumno">Código Alumno:</label>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 ">
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("nombreRepresentante")} type="text" className="form-control" id="nombreRepresentante" maxLength={"100"} required />
                                    <label htmlFor="representante">Yo:</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("cedulaRepresentante")} type="text" className="form-control" id="cedulaRepresentante" maxLength={"20"} required />
                                    <label htmlFor="cedulaRepresentante">Con CI:</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("nombreAlumno")} id="nombreAlumno" type="text" className="form-control" maxLength={"100"} required />
                                    <label htmlFor="nombreAlumno">Resprensentante del estudiante:</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-floating">
                                    <input {...register("curso")} className="form-control" id="curso" maxLength={"100"} required />
                                    <label htmlFor="curso">Perteneciente al:</label>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="form-floating">
                                    <input {...register("docente")} type="text" className="form-control" id="docente" maxLength={"100"} required />
                                    <label htmlFor="docente">En presencia de la licenciada</label>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="form-floating">
                                    <h6>Encargada del DECE de la Institución realizo el siguiente documento en el cual me comprometo a:</h6>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion" maxLength={"300"} />
                            <label htmlFor="descripcion"></label>
                            <button onClick={() => insertDetalle()} className="btn btn-outline-primary" type="button" id="button-addon2">
                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                            </button>
                        </div>

                        {
                            detalleCompromiso.map((item, index) => {
                                return (
                                    <div key={index} className="input-group mb-3">
                                        <textarea readOnly value={item.descripcion} type="text" className="form-control" id={index} />
                                        <label htmlFor={index}></label>
                                        <button onClick={() => itemDelete(item, index)} className="btn btn-outline-danger" type="button">
                                            <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                                        </button>

                                    </div>
                                )
                            })
                        }

                        <ButtonCustom event1={back} inhabilitar={inhabilitar} />
                    </div>
                </form>

            </div>
        </Fragment>
    );
}

export default CompromisoPadres;