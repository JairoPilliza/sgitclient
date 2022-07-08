import React, { Fragment, useContext, useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import Resource from "../../resource/resource";
import sitem1 from "../../services/SocioDemograficoService/DatoIdentificacionService";
import General from "../Acordion/AcordionGeneral";
import loadContext from "../../contexts/loaderContext";
import Swal from "sweetalert2";
import CardContenedor from "../InicialTable/CardContenedor";
import TableDinamic from "../InicialTable/TableDinamic";
import SweetAlert from "../SweetAlert/SweetAlert";

const TableListar = (props) => {
    localStorage.setItem("idDeceSociodemografico", 0)
    const columns = [{ columnas: "#" }, { columnas: "Alumno" }, { columnas: "Curso" }, { columnas: "F. Nacimiento" }, { columnas: "Domicilio" }, { columnas: "Opciones" }]
    const setLook = useContext(loadContext);
    const [load, setLoad] = useState(0);
    const [listaSocioDemografico, setListaSocioDemografico] = useState([])
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    const formShow = () => { props.history.push("./DatosIdentificacion") }
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLook(true);
        sitem1.GetT(qs).then(async (result) => {
            if (result.code === "1") {
                setListaSocioDemografico(result.payload ? JSON.parse(result.payload) : []);
                setLook(false);
            } else {
                console.log(result.message + "vacio");
                setLook(false);
            }
        }).catch(e => {
            const error = e.message;
            SweetAlert.Warning(error);
            setLook(false)
        });
    }, [load]);
    const UpdateEvent = (item) => {
        localStorage.setItem("idDeceSociodemografico", JSON.stringify(item.idDeceSociodemografico));
        props.history.push('./DatosIdentificacion');
    }
    const deleteItem = (item) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "¡No se podrá revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceSociodemografico });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceSociodemografico", 0);
                        setLoad(load + 1)
                        Swal.fire(
                            'Eliminado!',
                            'El registro ha sido eliminado.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            result.message + '!',
                            'El registro no ha sido eliminado.',
                            'error'
                        )
                    }
                });
            }
        })
    }
    const handleClickOpen = () => { setOpen(true); };
    return (
        <Fragment>
            <General event={formShow} open={open} setOpen={setOpen} />
            <CardContenedor titulo={"Datos Sociodemográficos"} icon={""} table={<TableDinamic columns={columns}
                lista={listaSocioDemografico} UpdateEvent={UpdateEvent} deleteItem={deleteItem} />} handleClickOpen={handleClickOpen} />
        </Fragment>
    );
}
export default withRouter(TableListar);