import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import sitem1 from "../../../services/SocioDemograficoService/ReferenciaSocioEconomicaService";
import Checks from "../../Checks";
import Radio from "../../Radio";
import RadioText from "../../RadioText";
import CheckText from "../../CkeckText";
import TextArea from "../../TextArea";
import Resource from "../../../resource/resource";
import ButtonCustom from "../../Formatos/ButtonCustom";

const ReferenciaSocioeconomica = (props) => {
    const [listaIngresoEgreso, setListaIngresoEgreso] = useState({});
    const [listaViviendaCondicion, setListaViviendaCondicion] = useState([]);
    const [listaServicioVivienda, setListaServicioVivienda] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { reset(listaIngresoEgreso) }, [listaIngresoEgreso]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaIngresoEgreso(result.payload ? JSON.parse(result.payload) : []);
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
            sitem1.Get1(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaViviendaCondicion(result.payload ? JSON.parse(result.payload) : []);
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
                    setListaServicioVivienda(result.payload ? JSON.parse(result.payload) : []);
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceSDViviendaCondicionOpcion = Resource.getId(listaViviendaCondicion, "idDeceSDViviendaCondicionOpcion");
        data.servicio = Resource.getRows(listaServicioVivienda);
        data.idDeceSociodemografico = id;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./PeriodoPrenatalHistoriaVital");
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSDViviendaCondicionOpcion = Resource.getId(listaViviendaCondicion, "idDeceSDViviendaCondicionOpcion");
        data.servicio = Resource.getRows(listaServicioVivienda);
        data.idDeceSociodemografico = id;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./PeriodoPrenatalHistoriaVital");
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./ReferenciaFamiliarEconomica"); }
    const next = () => { props.history.push("./PeriodoPrenatalHistoriaVital"); }
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card mt-2 mb-2">
                    <div className="card-header">
                        <h5 className="float-start">4.- Referencias Socioeconómicas Generales</h5>
                    </div>
                    <div className="card-body">
                        <div className="caption-top">Ingresos/egresos de los miembros de la familia</div>
                        <hr />
                        <div className="row g-3 mt-1 mb-4">
                            {/*CONSULTAR QUE HACE pattern="^[0-9]+"*/}
                            <div className="col-md-6 form-floating">
                                <input {...register("valorPadre")} type="number" step={"any"} min="0.00" className="form-control" id="valorPadre" required />
                                <label htmlFor="valorPadre">Ingreso Padre:</label>
                            </div>
                            <div className="col-md-6 form-floating">
                                <input {...register("valorMadre")} type="number" step={"any"} min="0.00" className="form-control" id="valorMadre" required />
                                <label htmlFor="valorMadre">Ingreso Madre:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("valorOtros")} type="number" step={"any"} min="0.00" className="form-control" id="valorOtros" required />
                                <label htmlFor="valorOtros">Otros Ingresos:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("valorIngresos")} type="number" step={"any"} min="0.00" className="form-control" id="valorIngresos" required />
                                <label htmlFor="valorIngresos">Total Ingresos:</label>
                            </div>
                            <div className="col-md-4 form-floating">
                                <input {...register("valorEgresos")} type="number" step={"any"} min="0.00" className="form-control" id="valorEgresos" required />
                                <label htmlFor="valorEgresos">Total Egresos:</label>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <div className="caption-top">Condiciones de vivienda</div>
                            <hr />
                            {
                                listaViviendaCondicion.map((item, index) => {
                                    const opcionTipo = item.opcionTipo;
                                    switch (opcionTipo) {
                                        case 0: {
                                            return (<TextArea
                                                key={index}
                                                index={index}
                                                valueDescripcionInput={item.data.descripcion}
                                                nameInput={index}
                                                descripcionInput={item.descripcion}
                                                lista={listaViviendaCondicion}
                                                setLista={setListaViviendaCondicion}

                                                register={register}
                                            />)
                                            break
                                        }
                                        case 1: {
                                            return (
                                                <Radio
                                                    index={index}
                                                    key={index}
                                                    valueRadio={item.data.value}
                                                    nameRadio={item.nombrePropiedad}
                                                    atributoRadio={item.atributoName}
                                                    descripcionRadio={item.descripcion}
                                                    lista={listaViviendaCondicion}
                                                    setLista={setListaViviendaCondicion}
                                                    register={register}
                                                />)
                                            break
                                        }
                                        case 2: {
                                            return (<Checks
                                                key={index}
                                                index={index}
                                                valueCheck={item.data.value}
                                                nameCheck={item.nombrePropiedad}
                                                descripcionCheck={item.descripcion}
                                                lista={listaViviendaCondicion}
                                                setLista={setListaViviendaCondicion}
                                                register={register}
                                            />)
                                            break
                                        }
                                        case 3: {
                                            return (<RadioText
                                                key={index}
                                                index={index}
                                                valueRadio={item.data.value}
                                                nameRadio={item.nombrePropiedad}
                                                descripcionRadio={item.descripcion}

                                                valueDescripcion={item.data.descripcion}
                                                nameInput={"CheckText" + index}
                                                descripcionInput={"Relación del niño:"}
                                                lista={listaViviendaCondicion}
                                                setLista={setListaViviendaCondicion}
                                                register={register}
                                            />)
                                            break
                                        }
                                        case 4: {
                                            return (<CheckText
                                                key={index}
                                                index={index}
                                                valueCheck={item.data.value}
                                                nameCheck={item.nombrePropiedad}
                                                descripcionCheck={item.descripcion}
                                                valueDescripcion={item.data.descripcion}
                                                nameInput={"CheckText" + index}
                                                descripcionInput={"Relación del niño:"}
                                                lista={listaViviendaCondicion}
                                                setLista={setListaViviendaCondicion}
                                                register={register}
                                            />)
                                            break
                                        }
                                    }
                                })
                            }
                        </div>
                        <div className="table-responsive mt-4">

                            <div className="caption-top">Servicios</div>
                            <hr></hr>
                            {
                                listaServicioVivienda.map((item, index) => {
                                    const opcionTipo = item.opcionTipo;
                                    switch (opcionTipo) {
                                        case 0: {
                                            return (<TextArea
                                                key={index}
                                                index={index}
                                                valueDescripcionInput={item.data.descripcion}
                                                nameInput={index}
                                                descripcionInput={item.descripcion}
                                                lista={listaServicioVivienda}
                                                setLista={setListaServicioVivienda}

                                                register={register}
                                            />)
                                            break
                                        }
                                        case 1: {
                                            return (<Radio
                                                index={index}
                                                key={index}
                                                valueRadio={item.data.value}
                                                nameRadio={item.nombrePropiedad}
                                                atributoRadio={item.atributoName}
                                                descripcionRadio={item.descripcion}
                                                lista={listaServicioVivienda}
                                                setLista={setListaServicioVivienda}
                                                register={register}
                                            />)
                                            break
                                        }
                                        case 2: {
                                            return (<Checks
                                                key={index}
                                                index={index}
                                                valueCheck={item.data.value}
                                                nameCheck={item.nombrePropiedad}
                                                descripcionCheck={item.descripcion}
                                                lista={listaServicioVivienda}
                                                setLista={setListaServicioVivienda}
                                                register={register}
                                            />)

                                            break
                                        }
                                        case 3: {
                                            return (<RadioText
                                                key={index}
                                                index={index}
                                                valueRadio={item.data.value}
                                                nameRadio={item.nombrePropiedad}
                                                descripcionRadio={item.descripcion}

                                                valueDescripcion={item.data.descripcion}
                                                nameInput={"CheckText" + index}
                                                descripcionInput={"Relación del niño:"}
                                                lista={listaServicioVivienda}
                                                setLista={setListaServicioVivienda}

                                                register={register}
                                            />)
                                            break
                                        }
                                        case 4: {
                                            return (<CheckText
                                                key={index}
                                                index={index}
                                                valueCheck={item.data.value}
                                                nameCheck={item.nombrePropiedad}
                                                descripcionCheck={item.descripcion}
                                                valueDescripcion={item.data.descripcion}
                                                nameInput={"CheckText" + index}
                                                descripcionInput={"Relación del niño:"}
                                                lista={listaServicioVivienda}
                                                setLista={setListaServicioVivienda}
                                                register={register}
                                            />)
                                            break
                                        }
                                    }
                                })
                            }

                        </div>
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </div>
                </div>
            </form>
        </Fragment >
    );
}
export default ReferenciaSocioeconomica;