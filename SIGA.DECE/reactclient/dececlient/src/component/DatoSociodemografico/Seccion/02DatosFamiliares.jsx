import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import sitem1 from "../../../services/SocioDemograficoService/DatoFamiliarService";
import sitemG from "../../../services/GeneralService";
import Resource from "../../../resource/resource";
import AcordionComponent from "../AcordionComponent";
import ButtonCustom from "../../Formatos/ButtonCustom";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import { saveNotification, errorNotification } from "../../SweetAlert/test";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const DatosFamiliares = (props) => {
    const [itemForm, setItemForm] = useState([]);
    const [limpiar, setLimpiar] = useState(null);
    const [listaEstadoCivil, setListaEstadoCivil] = useState([]);
    const [listaGradoInstruccion, setListaGradoInstruccion] = useState([]);
    const [listaParentesco, setListaParentesco] = useState([]);
    const [load, setLoad] = useState(0);
    const { register, handleSubmit, reset } = useForm();
    const id = JSON.parse(localStorage.getItem("idDeceSociodemografico"));
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id, numeroItem: 2 });
    const [editMode, setEditMode] = useState(false);
    const [inhabilitar, setIhabilitar] = useState(true)
    useEffect(() => { if (id >= 0) { sitemG.Get(props, Resource, qs, setListaEstadoCivil); } }, []);
    useEffect(() => { if (id >= 0) { sitemG.Get1(props, Resource, qs, setListaGradoInstruccion); } }, []);
    useEffect(() => { if (id >= 0) { sitemG.Get2(props, Resource, qs, setListaParentesco); } }, []);
    useEffect(() => { setLimpiar({}); }, []);
    useEffect(() => { reset(limpiar); }, [limpiar]);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        // setExpandedMargin(isExpanded ? expandedMargin : '4px')
        // console.log(panel)
        //  console.log(event.target)
    };
    useEffect(() => {
        if (id > 0) {
            sitem1.Get(qs).then(async (result) => {
                if (result.code === "1") {
                    setItemForm(result.payload ? JSON.parse(result.payload) : []);
                    setEditMode(true);
                    const block = true
                    if (block) { setIhabilitar(false) }
                } else {
                    console.log(result.message + "vacio");
                }
            });
        }
    }, [load]);
    const Save = (data) => {
        data.idReligion = "1";
        data.numeroItem = 2;
        data.idDeceSociodemografico = id;
        data.telefono = Resource.convertStringToArray(data.telefono);
        data.celular = Resource.convertStringToArray(data.celular);
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                setLoad(load + 1)
                saveNotification();
            } else {
                errorNotification(result.message);
            }
        }); reset()
    }
    const Update = (data) => {
        data.idReligion = "1";
        data.numeroItem = 2;
        data.telefono = Resource.convertStringToArray(data.telefono);
        data.celular = Resource.convertStringToArray(data.celular);
        console.log(data)
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                setLoad(load + 1)
                saveNotification();
            } else {
                errorNotification(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => { if (id > 0) { Save(data) } }
    const next = () => { props.history.push("./ReferenciaFamiliarEconomica"); }
    const back = () => { props.history.push("./DatosIdentificacion"); }
    const deleteItem = (item) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "¡No se podrá revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDeceSDDatoFamiliar });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        localStorage.setItem("idDeceSDDatoFamiliar", 0)
                        setLoad(load + 1)
                        Swal.fire(
                            'Eliminado!',
                            'El registro ha sido eliminado.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            result.message + '!',
                            'El registro no ha sido eliminado.',
                            'error'
                        )
                    }
                });
            }
        })
    }
    return (
        <Fragment>
            {/* Formulario */}

            <div className="card">
                <div className="card-header">
                    <h5 >2.- Datos Familiares</h5>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <ButtonCustom event2={next} event1={back} ocultA={true} inhabilitar={inhabilitar} />
                    </div>
                </div>
                <ToastContainer />
                <Accordion className='mb-2 mt-1'
                    // style={{ marginTop: expandedMargin, marginBottom: expandedMargin}}
                    // style={{ margin: expandedMargin}}
                    expanded={expanded === 'panel'} onChange={handleChange('panel')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel1bh-content"}
                        id={"panel1bh-header"}
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Agregar Familiar
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid >
                            <form className="g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div className="accordion-body">
                                    <div className="modal-body">
                                        <div className="row g-2">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <select {...register("idTipoRelacion")} className="form-select" id="idTipoRelacion" aria-label="Floating label select example" required>
                                                        <option value="">::seleccionar::</option>
                                                        {
                                                            listaParentesco.length > 0 ?
                                                                listaParentesco.map((item, index) =>
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
                                                            listaEstadoCivil.length > 0 ?
                                                                listaEstadoCivil.map((item, index) =>
                                                                    <option key={index} value={item.codEstadoCivil}>{item.descripcion}</option>

                                                                ) : ""
                                                        }
                                                    </select>
                                                    <label htmlFor="idEstadoCivil">Estado Civil</label>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-floating">
                                                    <input {...register("fechaNacimiento")} type="Date" className="form-control" id="fechaNacimiento" required />
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
                                                            listaGradoInstruccion.length > 0 ?
                                                                listaGradoInstruccion.map((item, index) =>
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
                                        <div className="row g-3 mt-1">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input {...register("telefono")} type="text" className="form-control" id="telefono" maxLength={"20"} required />
                                                    <label htmlFor="telefono">Teléfono</label>
                                                    <small className="text-danger">Agregue los Teléfonos separados por comas</small>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input {...register("celular")} type="text" className="form-control" id="celular" maxLength={"20"} required />
                                                    <label htmlFor="celular">Celular</label>
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
                                        {/* <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /> */}

                                    </div>
                                    <ButtonCustom ocult={true} ocult2={true} />
                                </div>
                            </form>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div className="card" >
                {
                    itemForm.map((item, index) => {
                        // if (item.opcionTipo == 6) {
                        return (<AcordionComponent
                            key={index}
                            item={item}
                            collapse={index}
                            giList={listaGradoInstruccion}
                            ecList={listaEstadoCivil}
                            pList={listaParentesco}
                            update={Update}
                            deleteItem={deleteItem}
                        //register={register}
                        />)

                    })
                }
            </div>
        </Fragment >
    );
}
export default DatosFamiliares;