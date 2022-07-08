import React, { Fragment } from "react";
import ButtonTable from "../Formatos/ButtonOptionTable";

const TableDinamic = (props) => {
    return (
        <Fragment>
            <div className="table-responsive">
                <table className="table table-hover small mt-2">
                    <thead>
                        <tr className="table-primary">
                            {
                                props.columns.map((item, index) => {
                                    return (
                                        <th key={index}>{item.columnas}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {

                            props.lista.map.length > 0 ?
                                props.lista.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nombreAlumno}</td>
                                        <td>{item.curso}</td>
                                        <td>{item.fechaNacimiento}</td>
                                        <td>{item.domicilio} </td>

                                        <ButtonTable event={props.UpdateEvent} event2={props.deleteItem} item={item}></ButtonTable>
                                    </tr>
                                )) : []
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
export default TableDinamic;