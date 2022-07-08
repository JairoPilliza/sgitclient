import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import ButtonCustom from "./ButtonCustom";

const TableComponet = (props) => {

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        props.list.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    <button
                                        onClick={() => props.getToEdit(item) }
                                        className={"btn btn-warning"} >
                                        <FontAwesomeIcon icon={"fa-solid fa-pen-to-square"}></FontAwesomeIcon> Editar
                                    </button>
                                    <button
                                        onClick={() => props.confirmToDelete(item)}
                                        className={"btn btn-danger"} >
                                        <FontAwesomeIcon icon={"fa-solid fa-trash"}></FontAwesomeIcon> Eliminar
                                    </button>
                                    {/* <ButtonCustom name={"Editar"} id={item.id} evento={props.editar} icon={"fa-solid fa-pen-to-square"} className={"btn btn-warning"} />
                                    <ButtonCustom name={"Eliminar"} id={item.id} evento={props.eliminar} icon={"fa-solid fa-trash"} className={"btn btn-danger"} /> */}
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </Fragment>
    );

}
export default TableComponet;