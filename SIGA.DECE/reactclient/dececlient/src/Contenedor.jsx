import { Fragment, useState, useEffect } from 'react';
const Contenedor = (props) => {

    const HandleEvent = (item) => {
        props.history.push("./" + item.nameRoute)
    }

    const fltemp = [

        { nameView: "Sociodemográfico", nameRoute: "TableListar", estado: true, activeClass: "active" },
        { nameView: "Detección Derivación Seguimiento", nameRoute: "TableDeteccionRemisionCaso", estado: false, activeClass: "" },
        { nameView: "Tipo Derivación", nameRoute: "TableDerivacion", estado: false, activeClass: "" },
        { nameView: "Tipo Intervención", nameRoute: "TableTipoIntervencion", estado: false, activeClass: "" },
        { nameView: "Proceso Sesión Seguimiento", nameRoute: "TableSesionSeguimiento", estado: false, activeClass: "" },
        { nameView: "Registro Atención Estudiantes", nameRoute: "TableAtencionEstudiante", estado: false, activeClass: "" },
        { nameView: "Registro Atención Representantes", nameRoute: "TableAtencionRepresentante", estado: false, activeClass: "" },
        { nameView: "Caso Individual", nameRoute: "TableCasoIndividual", estado: false, activeClass: "" },
        { nameView: "Compromiso Padres", nameRoute: "TableCompromiso", estado: false, activeClass: "" }
    ]
    const [formularioLista, setFormularios] = useState(fltemp);
    return (
        <Fragment>
            <ul className="nav nav-pills nav-tabs" id="myTab" role="tablist">
                {
                    formularioLista.map((item, index) => (
                        <li key={index} className="nav-item" role="presentation">
                            <button
                                onClick={() => HandleEvent(item)}
                                className={"nav-link " + item.activeClass}
                                id={item.nameRoute + "-tab"}
                                data-bs-toggle="tab"
                                data-bs-target={"#" + item.nameRoute}
                                type="button"
                                role="tab"
                                aria-controls={item.nameRoute}
                                aria-selected={item.estado}>
                                {item.nameView}
                            </button>
                        </li>
                    ))
                }
            </ul>

            <div className="tab-content">
                <br />
                <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">

                </div>
                <div className="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                </div>
                <div className="tab-pane" id="messages" role="tabpanel" aria-labelledby="messages-tab">

                </div>
                <div className="tab-pane" id="settings" role="tabpanel" aria-labelledby="settings-tab">

                </div>
            </div>





        </Fragment>
    );
}

export default Contenedor;