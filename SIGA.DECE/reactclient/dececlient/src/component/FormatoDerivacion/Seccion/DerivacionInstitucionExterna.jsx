import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DerivacionService/InstitucionExternaService";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Dinamic from "../../Formatos/DinamicComponent";

const DerivacionInstitucionExterna = (props) => {

    const [listaInstitucionExterna, setListaInstitucionExterna] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { handleSubmit } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceDerivacion"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => {
        if (id >= 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    if (!(result.payload === null)) {
                        setListaInstitucionExterna(JSON.parse(result.payload))
                        const edit = JSON.parse(result.payload);
                        edit.map((item, index) => {
                            if (item.data.value === true) {
                                setEditMode(true)
                                const block = true;
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
        data.idDeceDerivacion = id;
        data.dieop = Resource.getRows(listaInstitucionExterna);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DerivacionDatosPersonales")
            } else {
                alert(result.message);
            }
        });;
    }

    const Update = (data) => {
        data.dieop = Resource.getRows(listaInstitucionExterna);
        data.idDeceDerivacion = id;
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./DerivacionDatosPersonales")
            } else {
                alert(result.message);
            }
        });;
    }

    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }

    const back = () => { props.history.push("./TipoDerivacion"); }
    const next = () => { props.history.push("./DerivacionDatosPersonales"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">Institución Externa</h5>
                </div>
                <div className="card-body">
                    <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                        <Dinamic lista={listaInstitucionExterna} setLista={setListaInstitucionExterna} />
                        <hr />
                        <ButtonCustom event2={next} event1={back} inhabilitar={inhabilitar} />
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default DerivacionInstitucionExterna;