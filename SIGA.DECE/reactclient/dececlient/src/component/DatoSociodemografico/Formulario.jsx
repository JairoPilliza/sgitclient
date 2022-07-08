import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StateMachineProvider, createStore } from "little-state-machine";
import DatosIdentificacion from "./Seccion/01DatosIdentificacion";
import DatosFamiliares from "./Seccion/02DatosFamiliares";
import ReferenciaFamiliarEconomica from "./Seccion/03ReferenciaFamiliarEconomica";
import ReferenciaSocioeconomica from "./Seccion/04ReferenciaSocioeconomica";
import PeriodoPrenatalHistoriaVital from "./Seccion/05PeriodoPrenatalHistorialVital";
import DatosSalud from "./Seccion/06DatosSalud";
import HistoriaEduccional from "./Seccion/07HistoriaEducacional";
import TableListar from "./TablaListar"

createStore({});

const SocioDemografico = (props) => {

    // console.log(Resource.convertObjectToQueryString({ id: 45, nombre: "Jonathan" }))
    // console.log(Resource.convertObjectToQueryStringUnique("json",{ id: 45, nombre: "Jonathan" }))

    return (
        <Fragment>
          
        </Fragment>
    );
}



export default SocioDemografico;