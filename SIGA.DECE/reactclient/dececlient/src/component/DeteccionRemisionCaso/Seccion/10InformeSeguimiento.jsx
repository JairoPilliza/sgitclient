import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Resource from "../../../resource/resource";
import sitem1 from "../../../services/DeteccionRemisionCasoService/10InformeSeguimientoService";
import ButtonCustom from "../../Formatos/ButtonCustom";
const InformeSeguimiento = (props) => {

    const inhabilitar = true;
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [seguimientoItem10, setSeguimientoItem10] = useState({});
    const id = JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    useEffect(() => { reset(seguimientoItem10) }, [seguimientoItem10]);
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setSeguimientoItem10(result.payload ? JSON.parse(result.payload) : []);
                    setEditMode(true);
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, []);
    const Save = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableDeteccionRemisionCaso")
            } else {
                alert(result.message);
            }
        });
    }
    const Update = (data) => {
        data.idDeceDeteccionRemisionCaso = id
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.history.push("./TableDeteccionRemisionCaso")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { (editMode) ? Update(data) : Save(data); }
    const back = () => { props.history.push("./ObservacionesSugerencias"); }
    return (
        <Fragment>
            <div className="card mt-2">
                <div className="card-header">
                    <h5 className="float-start">
                        11.- Informe del Seguimiento por el Docente / Tutor/ Inspección/ Pastor/ Dece<small className="text-black-50">(Evaluación de la eficacia de las acciones tomadas en base a los resultados de mejora estudiantil)</small>
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-2">
                            <textarea {...register("descripcion")} type="text" className="form-control" id="descripcion" style={{ height: '100px' }} maxLength={"500"} required></textarea>
                            <ButtonCustom event1={back} inhabilitar={inhabilitar} />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    );
}
export default InformeSeguimiento;