import { Fragment, useEffect, useState } from 'react';
import './App.css';
/* librerias */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { StateMachineProvider } from "little-state-machine";
import { fas, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Link, Switch, HashRouter, useParams } from 'react-router-dom';

import TableListar from './component/DatoSociodemografico/TablaListar';
import DatosIdentificacion from './component/DatoSociodemografico/Seccion/01DatosIdentificacion';
import DatosFamiliares from './component/DatoSociodemografico/Seccion/02DatosFamiliares';
import ReferenciaFamiliarEconomica from './component/DatoSociodemografico/Seccion/03ReferenciaFamiliarEconomica';
import ReferenciaSocioeconomica from './component/DatoSociodemografico/Seccion/04ReferenciaSocioeconomica';
import PeriodoPrenatalHistoriaVital from './component/DatoSociodemografico/Seccion/05PeriodoPrenatalHistorialVital';
import DatosSalud from './component/DatoSociodemografico/Seccion/06DatosSalud';
import HistoriaEduccional from './component/DatoSociodemografico/Seccion/07HistoriaEducacional';

import TableDerivacion from './component/FormatoDerivacion/TablaListar';
import TipoDerivacion from './component/FormatoDerivacion/Formulario';

import TableAtencionRepresentante from './component/AtencionRepresentante/TablaListar';
import AtencionPadre from './component/AtencionRepresentante/Formulario';

import TableAtencionEstudiante from './component/AtencionEstudiante/TablaListar';
import AtencionEstudiante from './component/AtencionEstudiante/Formulario';

import TableCasoIndividual from './component/AtencionCasoIndividual/TablaListar';
import CasoIndividual from './component/AtencionCasoIndividual/Formulario';

import TableDeteccionRemisionCaso from './component/DeteccionRemisionCaso/TablaListar';
import IdentificacionEstudiante from './component/DeteccionRemisionCaso/Seccion/01IdentificacionEstudiante';
import MotivoReporte from './component/DeteccionRemisionCaso/Seccion/02MotivoReporte';
import DescripcionCaso from './component/DeteccionRemisionCaso/Seccion/03DescripcionCaso';
import SeguimientoDocente from './component/DeteccionRemisionCaso/Seccion/04SeguimientoDocente';
import SeguimientoTutorInspector from './component/DeteccionRemisionCaso/Seccion/05SeguimientoTutorInspector';
import AccionesTutorInspector from './component/DeteccionRemisionCaso/Seccion/06AccionesTutorInspector';
import SeguimientoCapellania from './component/DeteccionRemisionCaso/Seccion/07SeguimientoCapellania';
import SeguimientoDece from './component/DeteccionRemisionCaso/Seccion/08SeguimientoDece';
import ObservacionesSugerencias from './component/DeteccionRemisionCaso/Seccion/09ObservacionesSugerencias';
import InformeSeguimiento from './component/DeteccionRemisionCaso/Seccion/10InformeSeguimiento';
import TableTipoIntervencion from './component/FormatoTipoIntervencion/TablaListar';
import TipoIntervencion from './component/FormatoTipoIntervencion/Formulario';
import TableSesionSeguimiento from './component/ProcesoSesionSeguimiento/TablaListar';
import ProcesoSesionSeguimiento from './component/ProcesoSesionSeguimiento/Formulario';
import TableCompromiso from './component/FormatoCompromiso/TablaListar';
import CompromisoPadres from './component/FormatoCompromiso/Formulario';
import RegistroSesionSeguimiento from './component/ProcesoSesionSeguimiento/ProcesoSesionSeguimiento';
import GeneralEspecifico from './component/FormatoTipoIntervencion/OBGeneralEspecifico';
import ResultadosObservaciones from './component/FormatoTipoIntervencion/RSObRecomendaciones';
import DerivacionInstitucionExterna from './component/FormatoDerivacion/Seccion/DerivacionInstitucionExterna';
import DerivacionDatosPersonales from './component/FormatoDerivacion/Seccion/DerivacionDatosPersonalesDerivado';
import DerivacionValoracionCaso from './component/FormatoDerivacion/Seccion/DerivacionValoracionCaso';
//import $ from "https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"
//import '../src/index.css'
import Loader from './component/Loader/Loader'
import loadContext from './contexts/loaderContext';
import LogIn from './component/Login/Login';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import NavBar from "../src/component/Layout/NavBar";
import PiePagina from "../src/component/Layout/PiePagina";
import SideNav from "../src/component/Layout/SideNav";

library.add(fas, fab, faCheckSquare, faCoffee);

const mdTheme = createTheme();

const App = (props) => {
  const [look, setLook] = useState(false);
  const [open, setOpen] = useState(true);
  const [login, setLogin] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const go = JSON.parse(localStorage.getItem("go"));
    setLogin(go === false ? false : true);
  })

  const urlIN = (urlOfTheLibrary) => {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
  }

  //bloquea pantalla
  //if (look) return <Loader look={look} />

  // verifica login
  if (login) return <LogIn />

  return (
    <Fragment >
      {urlIN("https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js")}
      {
        look ? <Loader look={look} /> : null
      }
      {/* {
        login ? <LogIn /> : null
      } */}
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* 
          NavBar Menu Lateral Izquierdo 
          */}
          <NavBar open={open} toggleDrawer={toggleDrawer} ></NavBar>{" "}
          {/* 
          NavBar Menu Lateral Izquierdo 
          */}

          {/* 
          Side Menu Lateral Izquierdo
           */}
          <SideNav open={open} toggleDrawer={toggleDrawer} ></SideNav>
          {/* 
          Side Menu Lateral Izquierdo 
          */}
          {/* Contenedor main */}
          <Box
            component="main"
            // overflow={"auto"}
            sx={{
              backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              width: "100%",
            }}
          >
            {/* 
              Simulacion de br
            */}
            <Toolbar />
            {/* 
            Simulacion de br
             */}
            {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}
            <Container sx={{ mt: 2, mb: 2 }}>
              <Grid container >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <loadContext.Provider value={setLook} >
                    <HashRouter>
                      {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                      <Switch>
                        {/* Login */}
                        {/* <Route exact path='/Login' component={LogIn} /> */}
                        {/* Sociodemografico*/}
                        <Route path='/TableListar' component={TableListar} />
                        {/* <Route path='/acordion' component={General} /> */}
                        {/* <Route path='/SocioDemografico' component={SocioDemografico} /> */}
                        <Route path='/DatosIdentificacion' component={DatosIdentificacion} />
                        <Route path='/DatosFamiliares' component={DatosFamiliares} />
                        <Route path='/ReferenciaFamiliarEconomica' component={ReferenciaFamiliarEconomica} />
                        <Route path='/ReferenciaSocioeconomica' component={ReferenciaSocioeconomica} />
                        <Route path='/PeriodoPrenatalHistoriaVital' component={PeriodoPrenatalHistoriaVital} />
                        <Route path='/DatosSalud' component={DatosSalud} />
                        <Route path='/HistoriaEduccional' component={HistoriaEduccional} />
                        {/* Sociodemografico*/}
                        {/* Derivacion */}
                        <Route path='/TableDerivacion' component={TableDerivacion} />
                        <Route path='/TipoDerivacion' component={TipoDerivacion} />
                        <Route path='/DerivacionInstitucionExterna' component={DerivacionInstitucionExterna} />
                        <Route path='/DerivacionDatosPersonales' component={DerivacionDatosPersonales} />
                        <Route path='/DerivacionValoracionCaso' component={DerivacionValoracionCaso} />
                        {/* Derivacion */}

                        {/* Atencion Representante */}
                        <Route path='/TableAtencionRepresentante' component={TableAtencionRepresentante} />
                        <Route path='/AtencionPadre' component={AtencionPadre} />
                        {/* Atencion Representante */}

                        {/* Atencion Estudiante */}
                        <Route path='/TableAtencionEstudiante' component={TableAtencionEstudiante} />
                        <Route path='/AtencionEstudiante' component={AtencionEstudiante} />
                        {/* Atencion Estudiante */}

                        {/* Atencion caso individual */}
                        <Route path='/TableCasoIndividual' component={TableCasoIndividual} />
                        <Route path='/CasoIndividual' component={CasoIndividual} />
                        {/* Atencion caso individual */}
                        {/*Deteccion Remision caso*/}
                        <Route path='/TableDeteccionRemisionCaso' component={TableDeteccionRemisionCaso} />
                        <Route path='/IdentificacionEstudiante' component={IdentificacionEstudiante} />
                        <Route path='/MotivoReporte' component={MotivoReporte} />
                        <Route path='/DescripcionCaso' component={DescripcionCaso} />
                        <Route path='/SeguimientoDocente' component={SeguimientoDocente} />
                        <Route path='/SeguimientoTutorInspector' component={SeguimientoTutorInspector} />
                        <Route path='/AccionesTutorInspector' component={AccionesTutorInspector} />
                        <Route path='/SeguimientoCapellania' component={SeguimientoCapellania} />
                        <Route path='/SeguimientoDece' component={SeguimientoDece} />
                        <Route path='/ObservacionesSugerencias' component={ObservacionesSugerencias} />
                        <Route path='/InformeSeguimiento' component={InformeSeguimiento} />
                        {/*Deteccion Remision caso*/}
                        {/*Tipo de Intervencion */}
                        <Route path='/TableTipoIntervencion' component={TableTipoIntervencion} />
                        <Route path='/TipoIntervencion' component={TipoIntervencion} />
                        <Route path='/GeneralEspecifico' component={GeneralEspecifico} />
                        <Route path='/ResultadosObservaciones' component={ResultadosObservaciones} />
                        {/*Tipo de Intervencion */}
                        {/*Tipo de Proceso Sesion Seguimiento */}
                        <Route path='/TableSesionSeguimiento' component={TableSesionSeguimiento} />
                        <Route path='/ProcesoSesionSeguimiento' component={ProcesoSesionSeguimiento} />
                        {/* <Route path='/ProcesoSesionSeguimiento/:id/' render={({match})=>
                        {return <ProcesoSesionSeguimiento id={match.params.id}/>}}  /> */}
                        <Route path='/RegistroSesionSeguimiento' component={RegistroSesionSeguimiento} />
                        {/*Tipo de Proceso Sesion Seguimiento */}
                        {/*Formato Compromiso */}
                        <Route path='/TableCompromiso' component={TableCompromiso} />
                        <Route path='/CompromisoPadres' component={CompromisoPadres} />
                        {/* <Route path='/CompromisoPadres/:id' render={({ match }) => { return <CompromisoPadres bg={match.params.id} /> }} /> */}
                        {/*Formato Compromiso */}
                      </Switch>
                    </HashRouter>
                  </loadContext.Provider>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <PiePagina></PiePagina>
      </ThemeProvider>

      {/* <StateMachineProvider></StateMachineProvider> */}

    </Fragment >
  );
}
export default App;
