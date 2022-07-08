import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";

const ButtonTable = (props) => {

    return (
        <Fragment>
            <td className="d-grid gap-2 d-md-flex justify-content-md">
                <button
                    onClick={() => props.event(props.item)}
                    type="button"
                    className="btn btn-outline-warning"
                    data-bs-toggle=""
                    data-bs-target="">
                    <FontAwesomeIcon icon={"fa-solid fa-pen-to-square"} />
                </button>
                <button
                    onClick={() => props.event2(props.item)}
                    type="button"
                    className="btn btn-outline-danger"
                    data-bs-toggle=""
                    data-bs-target="">
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-toggle=""
                    data-bs-target="">
                    <FontAwesomeIcon icon="fa-solid fa-print" />
                </button>
            </td>
        </Fragment>
    );
}
export default ButtonTable;