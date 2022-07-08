import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/SocioDemograficoService/HistoriaEducacionalService";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";

const HistoriaEduccional = (props) => {
    const inhabilitar = true;
    const [listaHistorialEducacional, setListaHistorialEducacional] = useState([]);
    const { handleSubmit } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaHistorialEducacional(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload)
                        edit.map((item, index) => {
                            if (item.data.value) {
                                setEditMode(true)
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
        data.histE = Resource.getRows(listaHistorialEducacional)
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableListar")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceSociodemografico = id;
        data.histE = Resource.getRows(listaHistorialEducacional)
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableListar")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./DatosSalud"); }
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card mt-2 mb-2">
                    <div className="card-header">
                        <h5 className="float-start">7.- Historia Educacional</h5>
                    </div>
                    <Dinamic lista={listaHistorialEducacional} setLista={setListaHistorialEducacional} />
                </div>
                <ButtonCustom event1={back} inhabilitar={inhabilitar} />
            </form>
        </Fragment>
    );
}
export default HistoriaEduccional;