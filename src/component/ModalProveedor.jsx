import React, { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContribuyenteTipo from "services/Contribuyente/ContribuyenteService";
import ProveedorTipo from "services/Proveedor/ProveedorTipoService";
import IdentificacionTipo from "services/Identificacion/IdentificacionService";
import Pais from "services/Pais/PaisService";
import Canton from "services/Pais/CantonService";
import ParteRelacionada from "services/ParteRelacionada/ParteRelacionadaService";
import Proveedor from "services/Proveedor/ProveedorService";
import useNavigateParamsSearch from "hooks/useNavigateParamsSearch";
import ProveedorTalonario from "services/Proveedor/ProveedorTalonarioService";
import { ButtonDelete, ButtonEdit } from "utils/custom-all";
import Swal from "sweetalert2";
const ModalNuevoProveedor = (props) => {
    const params = useNavigateParamsSearch();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({});
    const [formTalonario, setFormTalonario] = useState({});
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [listaContribuyenteTipo, setListaContribuyenteTipo] = useState([]);
    const [listaProveedorTipo, setListaProveedorTipo] = useState([]);
    const [listaIdentificacionTipo, setIdentificacionTipo] = useState([]);
    const [listaPais, setListaPais] = useState([]);
    const [listaCanton, setListaCanton] = useState([])
    const [listaParteRelacionada, setListaParteRelacionada] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [editModeTaloanrio, setEditModeTalonario] = useState(false);

    const [listaProveedorTalonario, setListaProveedorTalonario] = useState([])
    const [load, setLoad] = useState(true)

   
    useEffect(() => { reset(form) }, [form]);
    useEffect(() => { reset(formTalonario) }, [formTalonario]);

    useEffect(() => {
        if (typeof params === "object") {
            setEditMode(true)
            setForm(props.proveedor);
        } else {
            setEditMode(false)
            setForm({})
        }
    }, [props.recarga]);


    useEffect(() => {
        ContribuyenteTipo.Get().then(async (result) => {
            if (result.code === "1") {
                setListaContribuyenteTipo(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        ProveedorTipo.Get().then(async (result) => {
            if (result.code === "1") {
                setListaProveedorTipo(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        IdentificacionTipo.Get().then(async (result) => {
            if (result.code === "1") {
                setIdentificacionTipo(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        Pais.Get().then(async (result) => {
            if (result.code === "1") {
                setListaPais(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        Canton.Get().then(async (result) => {
            if (result.code === "1") {
                setListaCanton(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        ParteRelacionada.Get().then(async (result) => {
            if (result.code === "1") {
                setListaParteRelacionada(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    const Save = (data) => {
        Proveedor.Post(data).then(async (result, data) => {
            if (result.code === "1") {

                props.onClose(false);
                props.setLoad(props.load + 1)
            } else {
                alert(result.message);

            }
        });
    }
    const Update = (data) => {

        Proveedor.Put({ id: params.id }, data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(props.load + 1)
            } else {
                alert(result.message);
            }
        });

    };

    const MuestraLista = () => {
        reset(listaProveedorTalonario)
        if (props.proveedor.idProveedor > 0) {
            ProveedorTalonario.Get({ id: params.id }).then(async (result) => {
                if (result.code === "1") {
                    setListaProveedorTalonario(result.payload ? JSON.parse(result.payload) : [])
                    
                    return;
                }
                console.log(result.message);
            }).catch(e => {
                console.log(e.message);
            });

        } else {
            setListaProveedorTalonario([])
        }


    }

    useEffect(() => {
        MuestraLista()
    }, [load]);


    const SaveTalonario = (data) => {
        ProveedorTalonario.Post(data).then(async (result) => {
            if (result.code === "1") {

                //props.onClose(false);
                setLoad(!load)
            } else {
                alert(result.message);

            }
        });
    }
    const UpdateTalonario = (data) => {
        ProveedorTalonario.Put({ id: params.id }, data).then(async (result) => {
            if (result.code === "1") {
                //props.onClose(false);
                setEditModeTalonario(false);
                setLoad(!load);
            } else {
                alert(result.message);
            }
        });
    };

    const onSubmit = (data, evento) => {
        data.idRol = 1;
        data.estado = true;
        (editMode) ? Update(data) : Save(data);

    }
    const talonario = (data, evento) => {

        console.log(data)
        data.idRol = 1;
        data.idProveedor = params.id;
        //data.estado = true;
        (editModeTaloanrio) ? UpdateTalonario(data) : SaveTalonario(data);

    }

    const RowChange = (item) => {

        if (typeof item === "object" && item) {
            setEditModeTalonario(true);
            setFormTalonario(item);
            // navigateParam('/Proveedor/ListarProveedor', { id: item.idProveedor });
        }
    };

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
                ProveedorTalonario.Delete({ id: item.idProveedorTalonario }).then(async (result) => {
                    if (result.code === "1") {
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
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="lg"
            >

                <DialogTitle id="scroll-dialog-title">Registrar Proveedor</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid container item spacing={2}>

                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">
                                            Tipo Proveedor
                                        </InputLabel>
                                        <Select
                                            {...register("idProveedorTipo")}
                                            labelId="demo-simple-select-helper-label"
                                            id="idProveedorTipo"
                                            name="idProveedorTipo"
                                            style={{ width: "100%" }}
                                            required
                                            label="Tipo Proveedor"
                                            defaultValue={props.proveedor.idProveedorTipo}
                                        >
                                            {
                                                listaProveedorTipo.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idProveedorTipo}>{row.descripcion}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Tipo Identificación</InputLabel>
                                        <Select
                                            {...register("idIdentificacionTipo")}
                                            labelId="demo-simple-select-helper-label"
                                            id="idIdentificacionTipo"
                                            name="idIdentificacionTipo"
                                            style={{ width: "100%" }}
                                            required
                                            label="Tipo Identificación"
                                            defaultValue={props.proveedor.idIdentificacionTipo}
                                        >
                                            {
                                                listaIdentificacionTipo.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idIdentificacionTipo}>{row.codigoSri} - {row.descripcion}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Tipo Contribuyente</InputLabel>
                                        <Select
                                            {...register("idContribuyenteTipo")}
                                            labelId="demo-simple-select-helper-label"
                                            id="idContribuyenteTipo"
                                            name="idContribuyenteTipo"
                                            style={{ width: "100%" }}
                                            required
                                            label="Tipo Contribuyente"
                                            defaultValue={props.proveedor.idContribuyenteTipo}
                                        >
                                            {
                                                listaContribuyenteTipo.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idContribuyenteTipo}>{row.descripcion} </MenuItem>

                                                ))
                                            }


                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                        {...register("numeroIdentificacion")}
                                        id="numeroIdentificacion"
                                        name="numeroIdentificacion"
                                        label="Número Identificacion:"
                                        placeholder="13 dígitos"
                                        helperText='Clickee fuera para validar el "RUC"'
                                        style={{ width: "100%" }}
                                        required


                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12}  >
                                    <TextField
                                        {...register("razonSocial")}
                                        id="razonSocial"
                                        name="razonSocial"
                                        label="Razón Social:"
                                        style={{ width: "100%" }}
                                        required


                                    />
                                </Grid>

                            </Grid>
                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                        {...register("direccion")}
                                        id="direccion"
                                        name="direccion"
                                        label="Dirección:"
                                        style={{ width: "100%" }}
                                        required


                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >

                                    <TextField
                                        {...register("email")}
                                        id="email"
                                        name="email"
                                        label="Email:"
                                        style={{ width: "100%" }}
                                        required


                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("telefono")}
                                        id="telefono"
                                        name="telefono"
                                        label="Teléfono:"
                                        style={{ width: "100%" }}
                                        required


                                    />

                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                        {...register("celular")}
                                        id="celular"
                                        name="celular"
                                        label="Celular:"
                                        style={{ width: "100%" }}


                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">País</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="idPais"
                                            name="idPais"
                                            style={{ width: "100%" }}
                                            required
                                            label="País"
                                            {...register("idPais")}
                                            defaultValue={props.proveedor.idPais}
                                        >

                                            {
                                                listaPais.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idPais}>{row.descripcion}</MenuItem>
                                                ))
                                            }

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Cantón</InputLabel>
                                        <Select
                                            {...register("idCanton")}
                                            labelId="demo-simple-select-helper-label"
                                            id="idCanton"
                                            name="idCanton"
                                            style={{ width: "100%" }}
                                            required
                                            label="Cantón"
                                            defaultValue={props.proveedor.idCanton}
                                        >
                                            {
                                                listaCanton.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idCanton}>{row.descripcion}</MenuItem>
                                                ))
                                            }
                                        </Select>

                                    </FormControl>

                                </Grid>
                            </Grid>

                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        id="observacion"
                                        name="observacion"
                                        label="Observación:"
                                        multiline
                                        style={{ width: "100%" }}

                                        {...register("observacion")}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Es parte relacionada</FormLabel>
                                        <RadioGroup
                                            {...register("idParteRelacionada")}
                                            id="idParteRelacionada"
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="idParteRelacionada"
                                            defaultValue={props.proveedor.idParteRelacionada}
                                        >
                                            {
                                                listaParteRelacionada.map((row, index) => (
                                                    <FormControlLabel key={index + 1} control={<Radio value={row.idParteRelacionada} />} label={row.codigoSri} />
                                                ))

                                            }

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Button variant="contained" style={{ width: "100%" }} type="submit">Guardar</Button>
                                </Grid>


                            </Grid>
                        </Grid>
                    </form>
                    <br />

                    <Accordion onClick={() => MuestraLista()}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon onClick={() => MuestraLista()} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: "gray" }}
                        >
                            <Typography color="white">Talonarios <small>establecimientos</small></Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <form onSubmit={handleSubmit(talonario)}>
                                <Grid container spacing={2}>
                                    <Grid container item spacing={2}>
                                        <Grid container item spacing={2}>
                                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                <TextField
                                                    {...register("nombreComercial")}
                                                    id="nombreComercial"
                                                    name="nombreComercial"
                                                    label="Nombre Comercial:"
                                                    style={{ width: "100%" }}
                                                    required

                                                />

                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                                <FormControl sx={{ minWidth: '100%' }}>
                                                    <InputLabel id="demo-simple-select-helper-label">Cantón</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="idCanton"
                                                        name="idCanton"
                                                        style={{ width: "100%" }}
                                                        required
                                                        label="Cantón"
                                                        {...register("idCanton")}
                                                        defaultValue={formTalonario.idCanton}

                                                    >
                                                        {
                                                            listaCanton.map((row, index) => (
                                                                <MenuItem key={index + 1} value={row.idCanton}>{row.descripcion}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>

                                                </FormControl>

                                            </Grid>

                                        </Grid>

                                        <Grid container item spacing={2}>
                                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                                <TextField
                                                    id="direccionTalonario"
                                                    name="direccionTalonario"
                                                    label="Dirección:"
                                                    style={{ width: "100%" }}
                                                    required
                                                    {...register("direccionTalonario")}

                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} >

                                                <TextField
                                                    id="emailTalonario"
                                                    name="emailTalonario"
                                                    label="Email:"
                                                    style={{ width: "100%" }}
                                                    required
                                                    {...register("emailTalonario")}


                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container item spacing={2}>
                                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                <TextField
                                                    id="telefonoTalonario"
                                                    name="telefonoTalonario"
                                                    label="Teléfono:"
                                                    style={{ width: "100%" }}

                                                    {...register("telefonoTalonario")}

                                                />

                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                                <TextField
                                                    id="celularTalonario"
                                                    name="celularTalonario"
                                                    label="Celular:"
                                                    style={{ width: "100%" }}
                                                    {...register("celularTalonario")}

                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="fechaCaducidad"
                                                name="fechaCaducidad"
                                                label="Fecha Caducidad:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("fechaCaducidad")}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="autorizacion"
                                                name="autorizacion"
                                                label="N° Autorización:"
                                                style={{ width: "100%" }}
                                                {...register("autorizacion")}

                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="establecimiento"
                                                name="establecimiento"
                                                label="Establecimiento:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("establecimiento")}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="puntoEmision"
                                                name="puntoEmision"
                                                label="Punto emisión:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("puntoEmision")}

                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="secuencialMin"
                                                name="secuencialMin"
                                                label="Secuencial Min:"

                                                style={{ width: "100%" }}
                                                required
                                                {...register("secuencialMin")}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="secuencialMax"
                                                name="secuencialMax"
                                                label="Secuencial Max:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("secuencialMax")}

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} sm={12} lg={12}>
                                            <Button type="submit" aria-label="settings" style={{ width: "100%" }} variant="outlined" >
                                                Guardar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                            <br />

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">

                                    <TableHead >
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Nombre Comercial</TableCell>
                                            <TableCell>Fecha Caducidad</TableCell>
                                            <TableCell align="center">Autorizacion</TableCell>
                                            <TableCell align="center">Establecimiento</TableCell>
                                            <TableCell align="center">Punto emision</TableCell>
                                            <TableCell align="center">Secuencial Min</TableCell>
                                            <TableCell align="center">Secuencial Max</TableCell>
                                            <TableCell align="center">Opciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>


                                        {listaProveedorTalonario.length > 0 ?
                                            listaProveedorTalonario.map((row, index) => (
                                                <TableRow hover key={index + 1} >
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.nombreComercial}</TableCell>
                                                    <TableCell>{row.fechaCaducidad}</TableCell>
                                                    <TableCell align="center">{row.autorizacion}</TableCell>
                                                    <TableCell align="center">{row.establecimiento}</TableCell>
                                                    <TableCell align="center">{row.puntoEmision} </TableCell>
                                                    <TableCell align="center">{row.secuencialMin} </TableCell>
                                                    <TableCell align="center">{row.secuencialMax}</TableCell>
                                                    <TableCell align="center">
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <ButtonEdit onClick={() => RowChange(row)}></ButtonEdit>
                                                            </Grid>

                                                            <Grid item>
                                                                <ButtonDelete onClick={() => deleteItem(row)}></ButtonDelete>
                                                            </Grid>
                                                        </Grid>

                                                    </TableCell>
                                                </TableRow>
                                            )) : (<TableRow hover><TableCell colSpan={8} align="center">--No existe Registros--</TableCell></TableRow>)
                                        }


                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </AccordionDetails>
                    </Accordion>

                    {/* </Card> */}

                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={props.onClose}>Cancelar</Button>
                    <Button type="submit">Registar Proveedor</Button> */}
                </DialogActions>

            </Dialog>
        </Fragment >

    );
}

export default ModalNuevoProveedor;
