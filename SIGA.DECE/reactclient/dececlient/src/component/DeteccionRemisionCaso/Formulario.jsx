import { StateMachineProvider, createStore } from "little-state-machine";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Fragment } from "react";

createStore({});

const DeteccionDerivacionSeguimiento = (props) => {
    return (
        <Fragment>
            <StateMachineProvider>
                <Router>

                   
                </Router>
            </StateMachineProvider>
        </Fragment>
    );
}

export default DeteccionDerivacionSeguimiento;