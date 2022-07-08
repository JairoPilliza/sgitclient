import React, { Fragment, useContext } from "react";
import loadContext from "../../contexts/loaderContext";
import "../Loader/Loader.css"
const Loader = (props) => {

    const setLook = useContext(loadContext);

    // const screenLook = () => {
    //     setLook(true);
    //     perifericosEntrada();
    // };

    // const screenUnlook = () => {
    //     setLook(false);
    //     perifericosEntrada();
    // };

    // const perifericosEntrada = () => {
    //     // bloquea teclas de mause // bloquea teclado
    //     window.addEventListener("mousedown keydown", (event) => {
    //         if (look) return false;
    //     })
    // }
    // hidden={!props.look}
    return (
        <Fragment>
            <div className="semiTransparenDiv">
                <div className="sk-circle">
                    <div className="sk-circle1 sk-child"></div>
                    <div className="sk-circle2 sk-child"></div>
                    <div className="sk-circle3 sk-child"></div>
                    <div className="sk-circle4 sk-child"></div>
                    <div className="sk-circle5 sk-child"></div>
                    <div className="sk-circle6 sk-child"></div>
                    <div className="sk-circle7 sk-child"></div>
                    <div className="sk-circle8 sk-child"></div>
                    <div className="sk-circle9 sk-child"></div>
                    <div className="sk-circle10 sk-child"></div>
                    <div className="sk-circle11 sk-child"></div>
                    <div className="sk-circle12 sk-child"></div>
                </div>
            </div>
        </Fragment>
    )
};
export default Loader;





