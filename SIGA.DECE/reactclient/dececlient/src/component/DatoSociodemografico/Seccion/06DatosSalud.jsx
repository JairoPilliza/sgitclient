import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/SocioDemograficoService/DatoSaludServices";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";

const DatosSalud = (props) => {
    const [listaDatoSalud, setListaDatoSalud] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { handleSubmit } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaDatoSalud(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload)
                        edit.map((item, index) => {
                            if (item.data.value) {
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
        data.idDeceSociodemografico = id;
        data.datoS = Resource.getRows(listaDatoSalud);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./HistoriaEduccional")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSociodemografico = id;
        data.datoS = Resource.getRows(listaDatoSalud);
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./HistoriaEduccional")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./PeriodoPrenatalHistoriaVital"); }
    const next = () => { props.history.push("./HistoriaEduccional"); }
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="card mt-2 mb-2">
                    <div className="card-header">
                        <h5 className="float-start">6.- Datos De Salud</h5>
                    </div>
                    <Dinamic lista={listaDatoSalud} setLista={setListaDatoSalud} />
                    <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                </div>
            </form>
        </Fragment>
    );
}
export default DatosSalud;