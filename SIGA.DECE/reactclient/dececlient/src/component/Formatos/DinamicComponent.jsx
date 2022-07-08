import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Checks from "../Checks";
import CheckText from "../CkeckText";
import InputText from "../InputText";
import Radio from "../Radio";
import RadioText from "../RadioText";
const Dinamic = (props) => {
    const [horientacion, setHorientacion] = useState("row mb-3 mt-2")
    const { register, errors, handleSubmit, reset } = useForm();
    useEffect(() => { if (props.horientacion !== true) { setHorientacion("card-body") } }, [])
    return (
        <Fragment>
            <div className={horientacion}>
                {
                    props.lista.map((item, index) => {
                        const opcionTipo = item.opcionTipo;
                        switch (opcionTipo) {
                            case 0: {
                                return (
                                    <InputText
                                        key={index}
                                        index={index}
                                        valueDescripcionInput={item.data.descripcion}
                                        nameInput={index}
                                        descripcionInput={item.descripcion}
                                        colSpan={"2"}
                                        lista={props.lista}
                                        setLista={props.setLista}

                                        register={register}
                                    />
                                )
                                break
                            }
                            case 1: {
                                return (<div key={index} className="col-md-3" ><Radio
                                    index={index}
                                    key={index}
                                    valueRadio={item.data.value}
                                    nameRadio={item.nombrePropiedad}
                                    atributoRadio={item.atributoName}
                                    descripcionRadio={item.descripcion}
                                    lista={props.lista}
                                    setLista={props.setLista}
                                    register={register}
                                /></div>)
                                break
                            }
                            case 2: {
                                return (<Checks
                                    index={index}
                                    key={index}
                                    valueCheck={item.data.value}
                                    nameCheck={item.nombrePropiedad}
                                    descripcionCheck={item.descripcion}
                                    register={register}
                                    lista={props.lista}
                                    setLista={props.setLista}
                                />)
                                break
                            }
                            case 3: {
                                return (<RadioText
                                    key={index}
                                    index={index}
                                    valueRadio={item.data.value}
                                    nameRadio={item.nombrePropiedad}
                                    descripcionRadio={item.descripcion}

                                    valueDescripcion={item.data.descripcion}
                                    nameInput={"CheckText" + index}
                                    descripcionInput={"Relación del niño:"}
                                    lista={props.lista}
                                    setLista={props.setLista}

                                    register={register}
                                />)
                                break
                            }
                            case 4: {
                                return (
                                    <CheckText
                                        key={index}
                                        index={index}
                                        valueCheck={item.data.value}
                                        nameCheck={item.nombrePropiedad}
                                        descripcionCheck={item.descripcion}

                                        valueDescripcion={item.data.descripcion}
                                        nameInput={"CheckText" + index}
                                        descripcionInput={"Relación del niño:"}
                                        colSpan={"0"}
                                        lista={props.lista}
                                        setLista={props.setLista}
                                        register={register}
                                    />)
                                break
                            }
                        }
                    })
                }
            </div>
        </Fragment >
    )

}
export default Dinamic;