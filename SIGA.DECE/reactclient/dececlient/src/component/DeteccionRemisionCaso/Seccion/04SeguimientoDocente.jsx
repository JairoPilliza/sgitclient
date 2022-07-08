import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/04SeguimientoDocenteService";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";
const SeguimientoDocente = (props) => {

    const [listaSItem4Opciones, setListaSItem4Opciones] = useState([]);
    const { handleSubmit } = useForm();
    const [editMode, setEditMode] = useState(false);
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaSItem4Opciones(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload)
                        edit.map((item, index) => {
                            if (item.data.value) {
                                setEditMode(true)
                                const block = true
                                if(block){setIhabilitar(false)}
                            }
                            return(0);
                        })
                    }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        data.isiop = Resource.getRows(listaSItem4Opciones);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {

                props.history.push("./SeguimientoTutorInspector")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        data.isiop = Resource.getRows(listaSItem4Opciones);
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./SeguimientoTutorInspector")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const next = () => { props.history.push("./SeguimientoTutorInspector"); }
    const back = () => { props.history.push("./DescripcionCaso"); }
    return (

        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">
                        4.- Informe de Seguimiento del Docente <small className="text-black-50">(Todo lo que ha hecho por el estudiante)</small>
                    </h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                        <Dinamic lista={listaSItem4Opciones} setLista={setListaSItem4Opciones} />
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default SeguimientoDocente;