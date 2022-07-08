import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Button.css"

const ButtonCustom = (props) => {
    const [hover, setHover] = useState("button-cursor-hover-event");
    const [event, setEvent] = useState("btn btn-outline-primary pointer-events-none");
    const [des, setDes] = useState(true);
    useEffect(() => {
        if (props.inhabilitar !== true) {
            setHover("");
            setEvent("btn btn-outline-primary")
            setDes(false)
        }
    })
    return (
        <Fragment>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <div>
                    <button onClick={() => props.event1()} className="btn btn-outline-primary " type="button" hidden={props.ocult2} disabled={props.ocult2}>
                        {<FontAwesomeIcon icon="fa-solid fa-arrow-left" />} ANTERIOR
                    </button>
                </div>
                <div>
                    <button className="btn btn-outline-success" type="submit" hidden={props.ocultA} disabled={props.ocultA} >
                        {<FontAwesomeIcon icon="fa-solid fa-check" />} GUARDAR
                    </button>
                </div>
                <div className={hover}>
                    <button onClick={() => props.event2()} className={event} type="button" hidden={props.ocult2} disabled={des}>
                        {<FontAwesomeIcon icon="fa-solid fa-arrow-right" />} SIGUIENTE
                    </button>
                </div>
            </div>
        </Fragment>
    );
}
export default ButtonCustom;

