import React, { Fragment, useEffect, useState } from "react";
import ButtonSubmitCustom from "./ButtonSubmitCustom";
import { useForm, useFormState } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ButtonForm = (props) => {

    return (
        <Fragment>
                <button onClick={()=>props.event2()} className={"btn btn-outline-primary"} type="button" >
                    {<FontAwesomeIcon icon={props.icon} />} Nuevo Formulario
                    {/* {props.name} */}
                </button>
                {/* <button onClick={() => props.event1()} className={""} type="button"hidden={props.ocult2} disabled={props.ocult2}>
                    {<FontAwesomeIcon icon={props.icon2} />} {props.name2}
                </button> */}
        </Fragment>
    );
}
export default ButtonForm;