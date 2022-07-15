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
const ModalNuevoProveedor = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({ idContribuyenteTipo: "", idProveedorTipo: "", idParteRelacionada: "", idIdentificacionTipo: "", idPais: "", idCanton: "", numeroIdentificacion: "", razonSocial: "", direccion: "", telefono: "", celular: "", email: "", observacion: "", estado: "" });
    const [formTalonario, setFormTalonario] = useState({ idProveedor: 0, idCanton: 0, nombreComercial: "", direccion: "", telefono: "", celular: "", email: "", establecimiento: "", puntoEmision: "", autorizacion: "", secuencialMin: "", secuencialMax: "", fechaCaducidad: "" });
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [listaContribuyenteTipo, setListaContribuyenteTipo] = useState([]);
    const [listaProveedorTipo, setListaProveedorTipo] = useState([]);
    const [listaIdentificacionTipo, setIdentificacionTipo] = useState([]);
    const [listaPais, setListaPais] = useState([]);
    const [listaCanton, setListaCanton] = useState([])

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

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const TAX_RATE = 0.07;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const rows = [
        createRow('Paperclips (Box)', 100, 1.15),
        createRow('Paper (Case)', 10, 45.99),
        createRow('Waste Basket', 2, 17.99),
    ];

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }



    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

        console.log(form);
    }

    const handleChange2 = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...formTalonario,
            [name]: value
        })

        console.log(formTalonario);
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
                maxWidth="md"
            >

                <DialogTitle id="scroll-dialog-title">Registrar Proveedor</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    {/* <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    > */}

                    {/* <Card container style={{ textAlign: "center" }} > */}
                    {/* <br /> */}

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

                                    >
                                        {
                                            listaProveedorTipo.map((row, index) => {
                                                <MenuItem value={row.idProveedorTipo}>{row.descripcion}</MenuItem>
                                            })
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
                                    >
                                        {
                                            listaIdentificacionTipo.map((row, index) => {
                                                <MenuItem value={row.idIdentificacionTipo}>{row.codigoSri} - {row.descripcion}</MenuItem>
                                            })
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
                                    >
                                        {
                                            listaContribuyenteTipo.map((row, index) => {
                                                <MenuItem value={row.idContribuyenteTipo}>{row.descriocion} </MenuItem>
                                            })
                                        }


                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                    id="numeroIdentificacion"
                                    name="numeroIdentificacion"
                                    label="Número Identificacion:"
                                    placeholder="13 dígitos"
                                    helperText='Clickee fuera para validar el "RUC"'
                                    style={{ width: "100%" }}
                                    required
                                    {...register("numeroIdentificacion")}
                                   
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                <TextField
                                    id="razonSocial"
                                    name="razonSocial"
                                    label="Razón Social:"
                                    style={{ width: "100%" }}
                                    required
                                    {...register("razonSocial")}
                                    
                                />
                            </Grid>

                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                    id="direccion"
                                    name="direccion"
                                    label="Dirección:"
                                    style={{ width: "100%" }}
                                    required
                                    {...register("direccion")}
                                   
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >

                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email:"
                                    style={{ width: "100%" }}
                                    required
                                    {...register("email")}
                                    
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                <TextField
                                    id="telefono"
                                    name="telefono"
                                    label="Teléfono:"
                                    style={{ width: "100%" }}
                                    required
                                    {...register("telefono")}
                                    
                                />

                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                    id="celular"
                                    name="celular"
                                    label="Celular:"
                                    style={{ width: "100%" }}
                                    {...register("celular")}
                                  
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
                                    >

                                    {
                                        listaPais.map((row, index)=>{
                                            <MenuItem value={row.idPais}>{row.descripcion}</MenuItem>
                                        })
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
                                    >
                                        {
                                        listaCanton.map((row, index)=>{
                                            <MenuItem value={row.idCanton}>{row.descripcion}</MenuItem>
                                        })
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
                                    required
                                    {...register("observacion")}                                   
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Es parte relacionada</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="idParteRelacionada"                                       
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="SI" />
                                        <FormControlLabel value="2" control={<Radio />} label="NO" />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* <br></br> */}

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: "gray" }}
                        >
                            <Typography color="white">Talonarios <small>establecimientos</small></Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            {/* <br></br> */}
                            {/* <from> */}
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
                                                value={formTalonario.nombreComercial}
                                                onChange={handleChange2}
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
                                                    value={formTalonario.idCanton}
                                                    onChange={handleChange2}
                                                    {...register("idCanton")}
                                                >
                                                    <MenuItem value={10}>Pujili</MenuItem>
                                                    <MenuItem value={20}>Quito</MenuItem>
                                                </Select>

                                            </FormControl>

                                        </Grid>

                                    </Grid>

                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="direccion"
                                                name="direccion"
                                                label="Dirección:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("direccion")}
                                                value={formTalonario.direccion}
                                                onChange={handleChange2}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >

                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("email")}
                                                value={formTalonario.email}
                                                onChange={handleChange2}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="telefono"
                                                name="telefono"
                                                label="Teléfono:"
                                                style={{ width: "100%" }}

                                                {...register("telefono")}
                                                value={formTalonario.telefono}
                                                onChange={handleChange2}
                                            />

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="celular"
                                                name="celular"
                                                label="Celular:"
                                                style={{ width: "100%" }}
                                                {...register("celular")}
                                                value={formTalonario.celular}
                                                onChange={handleChange2}
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
                                            value={formTalonario.fechaCaducidad}
                                            onChange={handleChange2}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            id="autorizacion"
                                            name="autorizacion"
                                            label="N° Autorización:"
                                            style={{ width: "100%" }}
                                            {...register("autorizacion")}
                                            value={formTalonario.autorizacion}
                                            onChange={handleChange2}
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
                                            value={formTalonario.establecimiento}
                                            onChange={handleChange2}
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
                                            value={formTalonario.puntoEmision}
                                            onChange={handleChange2}
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
                                            value={formTalonario.secuencialMin}
                                            onChange={handleChange2}
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
                                            value={formTalonario.secuencialMax}
                                            onChange={handleChange2}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <Button aria-label="settings" style={{ width: "100%" }} variant="outlined" >
                                            Guardar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* </from> */}
                            <br />

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">

                                    <TableHead >
                                        <TableRow>
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

                                        <TableRow hover >

                                        </TableRow>

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
        </Fragment>

    );
}

export default ModalNuevoProveedor;
