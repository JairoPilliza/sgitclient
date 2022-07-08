import { Fragment } from 'react';
/* librerias */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StateMachineProvider } from "little-state-machine";
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

import Contenedor from "../src/Contenedor"
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

const Routes = () => {
    return (
        <Fragment >
            <StateMachineProvider>
                <Router>
                    <Route exact path='/' component={Contenedor} />
                    {/* Sociodemografico*/}
                    <div className="tab-content">
                        <Route path='/TableListar' component={TableListar} />
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
                        {/*Formato Compromiso */}
                    </div>
                </Router>
            </StateMachineProvider>
        </Fragment>
    );
}
export default Routes;
