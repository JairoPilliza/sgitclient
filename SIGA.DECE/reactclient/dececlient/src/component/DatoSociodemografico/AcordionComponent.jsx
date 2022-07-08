import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Resource from "../../resource/resource";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const QueryString = Resource.convertObjectToQueryStringUnique("json", { id: JSON.parse(localStorage.getItem("idDeceSociodemografico")) });

const AcordionComponent = (props) => {
    const { register, errors, handleSubmit, setValue, reset } = useForm();
    const [data, setData] = useState({});
    useEffect(() => {
        setData(props.item);
        reset(data);
    }, [])
    const [expanded, setExpanded] = React.useState(false);
    const [expandedMargin, setExpandedMargin] = React.useState('1px');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        // setExpandedMargin(isExpanded ? expandedMargin : '4px')
        // console.log(panel)
        //  console.log(event.target)
    };
    useEffect(() => {
        reset(data);
    }, [data])

    const onSubmit = (data, evento) => {
        props.update(data);
    }

    const Delete = (item, evento) => {
        props.deleteItem(item);
    }

    return (
        <Fragment>
            <Accordion className='mb-2 mt-1'
                // style={{ marginTop: expandedMargin, marginBottom: expandedMargin}}
                // style={{ margin: expandedMargin}}
                expanded={expanded === 'panel' + (props.index + 1)} onChange={handleChange('panel' + (props.index + 1))}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"panel" + (props.index + 1) + "bh-content"}
                    id={"panel" + (props.index + 1) + "bh-header"}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {props.item.primerNombre} {props.item.segundoNombre} {props.item.primerApellido}  {props.item.segundoApellido}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid >
                        <form className="g-3" onSubmit={handleSubmit(onSubmit)} >
                            <div className="modal-body">
                                <input {...register("idDeceSDDatoFamiliar")} type="text" readOnly hidden />
                                <div className="row g-2">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select {...register("idTipoRelacion")} className="form-select" id="idTipoRelacion" aria-label="Floating label select example" required>
                                                <option value="">::seleccionar::</option>
                                                {
                                                    props.pList.length > 0 ?
                                                        props.pList.map((item, index) =>
                                                            <option key={index} value={item.idTipoRelacion}>{item.descripcion}</option>
                                                        ) : ""
                                                }
                                            </select>
                                            <label htmlFor="idTipoRelacion">Parestesco</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <select name="idEstadoCivil"  {...register("idEstadoCivil")} className="form-select" id="idEstadoCivil" aria-label="Floating label select example" required>
                                                <option value="">::seleccionar::</option>
                                                {
                                                    props.ecList.length > 0 ?
                                                        props.ecList.map((item, index) =>
                                                            <option key={index} value={item.codEstadoCivil}>{item.descripcion}</option>

                                                        ) : ""
                                                }
                                            </select>
                                            <label htmlFor="idEstadoCivil">Estado Civil</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input {...register("fechaNacimiento")} type="date" className="form-control" id="fechaNacimiento" required />
                                            <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-2 mt-1">
                                    <div className="col-md-3">
                                        <div className="form-floating ">
                                            <input {...register("primerApellido")} type="text" className="form-control" id="primerApellido" maxLength={"20"} required />
                                            <label htmlFor="primerApellido">Primer Apellido</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input {...register("segundoApellido")} type="text" className="form-control" id="segundoApellido" maxLength={"20"} required />
                                            <label htmlFor="segundoApellido">Segundo Apellido</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input {...register("primerNombre")} type="text" className="form-control" id="primerNombre" maxLength={"20"} required />
                                            <label htmlFor="primerNombre">Primer Nombre</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input {...register("segundoNombre")} type="text" className="form-control" id="segundoNombre" maxLength={"20"} required />
                                            <label htmlFor="segundoNombre">Segundo Nombre</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-2 mt-2">
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <select {...register("idDeceSDInstruccionOpcion")} className="form-select" id="idDeceSDInstruccionOpcion" aria-label="Floating label select example" required>
                                                <option value="">::seleccionar::</option>
                                                {
                                                    props.giList.length > 0 ?
                                                        props.giList.map((item, index) =>
                                                            <option key={index} value={item.idDeceSDInstruccionOpcion}>{item.descripcion}</option>

                                                        ) : ""
                                                }
                                            </select>
                                            <label htmlFor="idDeceSDInstruccionOpcion">Instrucción</label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-floating">
                                            <input {...register("profesionOcupacion")} type="text" className="form-control" id="profesionOcupacion" maxLength={"500"} />
                                            <label htmlFor="profesionOcupacion">Profesión/Ocupación</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <textarea {...register("lugarTrabajoEmpresa")} type="text" className="form-control" id="lugarTrabajoEmpresa" maxLength={"500"} />
                                            <label htmlFor="lugarTrabajoEmpresa">Lugar de trabajo</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-2 mt-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input {...register("telefono")} type="text" className="form-control" id="telefono" maxLength={"20"} required />
                                            <label htmlFor="telefono">Teléfonos (xxx, yyy, zzz) </label>
                                            <small className="text-danger">Agregue los Teléfonos separados por comas</small>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input {...register("celular")} type="text" className="form-control" id="celular" maxLength={"20"} required />
                                            <label htmlFor="celular" className="form-label">Celulares (xxx, yyy, zzz)  </label>
                                            <small className="text-danger"> Agregue los Celulares separados por comas</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-2 mt-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input {...register("ingreso")} type="number" step={"any"} min="0.00" className="form-control" id="ingreso" required />
                                            <label htmlFor="ingreso"> </label>
                                            <small className="text-danger">Ingreso</small>
                                        </div>
                                    </div>

                                </div>
                                <hr />
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                                    <button onClick={() => Delete(props.item)} className="btn btn-danger" type="button" hidden={props.ocult} >
                                        {<FontAwesomeIcon icon="fa-solid fa-trash" />} DELETE
                                    </button>
                                    <button className="btn btn-success" type="submit"  >
                                        {<FontAwesomeIcon icon="fa-solid fa-check" />} GUARDAR
                                    </button>
                                </div>
                                {/* <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /> */}
                            </div>
                        </form>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Fragment>
    );
}
export default AcordionComponent;