import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import Checks from "../../Checks";
import sitem1 from "../../../services/DeteccionRemisionCasoService/02MotivoReporteService";
import ButtonCustom from "../../Formatos/ButtonCustom";

const MotivoReporte = (props) => {
    const [listaMROpciones, setListaMROpciones] = useState([]);
    const [listaMROpcionesD, setListaMROpcionesD] = useState([]);
    const { register, handleSubmit } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setListaMROpciones(result.payload ? JSON.parse(result.payload) : []);
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
                    if (!(result.payload === null)) {
                        setListaMROpcionesD(result.payload ? JSON.parse(result.payload) : []);
                        const edit = JSON.parse(result.payload);
                        edit.map((item, index) => {
                            if (item.data.value === true) {
                                setEditMode(true)
                                const block = true
                                if (block) { setIhabilitar(false) }
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
    const Save = (data) => {
        data.ropdet = Resource.getRows(listaMROpcionesD);
        data.idDeceDeteccionRemisionCaso = id;
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DescripcionCaso")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.ropdet = Resource.getRows(listaMROpcionesD);
        data.idDeceDeteccionRemisionCaso = id
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DescripcionCaso")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./IdentificacionEstudiante"); }
    const next = () => { props.history.push("./DescripcionCaso"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">
                        2.- Seleccione el Aspecto en el que el Estudiante Muestre Dificultad <small className="text-black-50">(MOTIVO REPORTE)</small>
                    </h5>
                </div>
                <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card mt-2">
                        {
                            listaMROpciones.map((item, index) => {
                                return (
                                    <div key={index} className="card-body">
                                        <h6 key={index}>{item.descripcion}</h6>
                                        {
                                            listaMROpcionesD.map((item1, index1) => {
                                                if (item.idDeceDRCMotivoReporteOpcion === item1.idDeceDRCMotivoReporteOpcion) {
                                                    return (
                                                        <div key={index1} className="row g-1 mt-1">
                                                            <Checks
                                                                key={index1}
                                                                index={index1}
                                                                valueCheck={item1.data.value}
                                                                nameCheck={item1.nombrePropiedad}
                                                                descripcionCheck={item1.descripcion}

                                                                setLista={setListaMROpcionesD}
                                                                lista={listaMROpcionesD}

                                                                register={register}
                                                            />
                                                        </div>
                                                    )
                                                };
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                </form>
            </div>
        </Fragment>
    );
}
export default MotivoReporte;