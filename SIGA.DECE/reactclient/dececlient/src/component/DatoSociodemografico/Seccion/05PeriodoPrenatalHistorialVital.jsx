import React, { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/SocioDemograficoService/PeriodoPrenatalHistorialService";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";

const PeriodoPrenatalHistoriaVital = (props) => {

    const [listaEmbarazoParto, setListaEmbarazoParto] = useState([]);
    const [listaDatoRecienNacido, setListaDatoRecienNacido] = useState({});
    const [listaAntecedenteP, setListaAntecedenteP] = useState([]);
    const [listaAntecedenteDEscolar, setListaAntecedenteDEscolar] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(listaDatoRecienNacido) }, [listaDatoRecienNacido]);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaEmbarazoParto(JSON.parse(result.payload))
                    }
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
                    setListaDatoRecienNacido(result.payload ? JSON.parse(result.payload) : []);
                    setEditMode(true)
                    const block = true
                    if (block) { setIhabilitar(false) }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get2(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaAntecedenteP(JSON.parse(result.payload))
                    }
                } else {
                    console.log(result.message + "vacio");
                }
            });;
        }
    }, []);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get3(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaAntecedenteDEscolar(JSON.parse(result.payload))
                    }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceSociodemografico = id;
        data.idDeceSDEmbarazoPartoOpcion = Resource.getId(listaEmbarazoParto, "idDeceSDEmbarazoPartoOpcion");
        data.antep = Resource.getRows(listaAntecedenteP);
        data.antecedenteEducacional = Resource.getRows(listaAntecedenteDEscolar);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DatosSalud")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSDEmbarazoPartoOpcion = Resource.getId(listaEmbarazoParto, "idDeceSDEmbarazoPartoOpcion");
        data.idDeceSociodemografico = id;
        data.antep = Resource.getRows(listaAntecedenteP);
        data.antecedenteEducacional = Resource.getRows(listaAntecedenteDEscolar);
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DatosSalud")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./ReferenciaSocioeconomica"); }
    const next = () => { props.history.push("./DatosSalud"); }
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="card mt-2 mb-2">
                    <div className="card-header">
                        <h5 className="float-start">5.- Antecedentes Del Periodo Prenatal E Historia Vital</h5>
                    </div>
                    <div className="card-body">
                        <h6 >5.1.-Embarazo y parto</h6>
                        <Dinamic lista={listaEmbarazoParto} setLista={setListaEmbarazoParto} />
                        <h6 className="caption-top mt-2">5.2.- Datos del/la niño/a recién nacido:</h6>
                        <div className="row g-3 mt-1 mb-4">
                            <div className="col-md-2 form-floating">
                                <input {...register("pesoNacer")} type="text" className="form-control" id="pesoNacer" maxLength={"100"} required />
                                <label htmlFor="pesoNacer">Peso al nacer:</label>
                            </div>
                            <div className="col-md-2 form-floating">
                                <input {...register("tallaNacer")} type="text" className="form-control" id="tallaNacer" maxLength={"100"} required />
                                <label htmlFor="tallaNacer">Talla al nacer:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("edadCaminar")} type="text" className="form-control" id="edadCaminar" maxLength={"100"} required />
                                <label htmlFor="edadCaminar">Edad en que empezó a caminar:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("edadHablar")} type="text" className="form-control" id="edadHablar" maxLength={"100"} required />
                                <label htmlFor="edadHablar">Edad a la que hablo por primera vez:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("periodoLactancia")} type="text" className="form-control" id="periodoLactancia" maxLength={"100"} required />
                                <label htmlFor="periodoLactancia">Período de lactancia:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("edadUsoBiberon")} type="text" className="form-control" id="edadUsoBiberon" maxLength={"100"} required />
                                <label htmlFor="edadUsoBiberon">Edad hasta la cual utilizó biberón:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("edadControlEsfinter")} type="text" className="form-control" id="edadControlEsfinter" maxLength={"100"} required />
                                <label htmlFor="edadControlEsfinter">Edad en que aprendió a controlar esfínteres:</label>
                            </div>
                            <div className="col-md-12 form-floating">
                                <input {...register("sufrioEnuresis")} type="text" className="form-control" id="sufrioEnuresis" maxLength={"3000"} required />
                                <label htmlFor="sufrioEnuresis">¿Sufrió una enuresis?:</label>
                            </div>
                        </div>

                        <div className="card-body">
                            <h6 className="caption-top">5.3.-Antecedentes Patológicos Familiares </h6>
                            <Dinamic lista={listaAntecedenteP} setLista={setListaAntecedenteP} />
                        </div>
                        <div className="card-body">
                            <h6 className="caption-top">5.4.- Antecedentes de dificultades escolares</h6>
                            <Dinamic lista={listaAntecedenteDEscolar} setLista={setListaAntecedenteDEscolar} />
                        </div>
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </div>
                </div>
            </form >
        </Fragment >
    );
}
export default PeriodoPrenatalHistoriaVital;