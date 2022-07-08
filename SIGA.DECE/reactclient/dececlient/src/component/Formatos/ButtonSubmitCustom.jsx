//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";

const ButtonSubmitCustom = (props) => {

    return (
        <Fragment>
            <button className={props.class} type={"submit"}>
                {/* {<FontAwesomeIcon icon={props.icon} />}  */}
                {props.name}
            </button>
        </Fragment>
    );
}
export default ButtonSubmitCustom;

