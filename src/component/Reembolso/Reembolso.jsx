import React, { Fragment, useEffect, useState } from "react";
import { Divider, Grid, InputLabel, Link } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CachedIcon from '@mui/icons-material/Cached';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import CardActions from '@mui/material/CardActions';
import { Stack } from "@mui/material";
import ModalReembolso from "./ModalReembolso";
import ModalRetencion from "component/ModalRetencion";
import EditIcon from '@mui/icons-material/Edit';
const Reembolso = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const [openMR, setOpenMR] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const handleOpen = () => setOpen(true);
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClickOpenMR = (scrollType) => () => {
        setOpenMR(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseMR = () => {
        setOpenMR(false);
    };

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MainCard title="Comprobante de venta emitido por Reembolso" >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} sm={12}>
                            <SubCard container title="Datos de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                                    <Grid item xs={12} md={6} sm={12} lg={6} />
                                    <Grid item xs={12} md={6} sm={12} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }} xs={12} md={6} sm={6} lg={6}>
                                            <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="sustentoTributario"
                                                name="sustentoTributario"
                                                style={{ width: "100%" }}
                                                required
                                                label="Sustento Tributario"
                                                {...register("sustentoTributario")}
                                            >
                                                <MenuItem value={10}>FACTURA</MenuItem>
                                                <MenuItem value={20}>NOTA DE VENTA</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={12} sm={12} lg={12} >
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <small style={{ width: "100%" }} ><b>N° Factura:</b></small>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <TextField
                                                    id="emision"
                                                    name="emision"
                                                    label="000"
                                                    style={{ width: "100%" }}
                                                    {...register("emision")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <TextField
                                                    id="puntoEmision"
                                                    name="puntoEmision"
                                                    label="000 "
                                                    style={{ width: "100%" }}
                                                    {...register("puntoEmision")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <TextField
                                                    id="secuencial"
                                                    name="secuencial"
                                                    label="000000000"
                                                    multiline
                                                    style={{ width: "100%" }}
                                                    {...register("secuencial")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <TextField
                                                    id="fechaEmsion"
                                                    name="fechaEmsion"
                                                    label="F. Emisión:"
                                                    type="date"
                                                    style={{ width: "100%", float: "right" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...register("fechaEmsion")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} sm={12} lg={6}>
                                                <TextField
                                                    id="fechaRegistro"
                                                    name="fechaRegistro"
                                                    label="F. Registro:"
                                                    type="date"
                                                    style={{ width: "100%", float: "right" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...register("fechaRegistro")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br></br>
                                <Card >
                                    <CardHeader
                                        title="Datos del proveedor"
                                        style={{ backgroundColor: "yellow", textAlign: "center", height: "60px" }}
                                    />
                                    <CardContent >
                                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                                            <Grid container item xs={12} md={12} sm={12} lg={12}>
                                                <Grid item xs={12} md={12} sm={12} lg={12} >
                                                    <Grid container spacing={2}>
                                                        {/* <Grid item xs={12} md={6} sm={12} lg={6} /> */}
                                                        <Grid item xs={12} md={12} sm={12} lg={12}>
                                                            <Button aria-label="settings" style={{ width: "100%", float: "right" }} variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                                                Editar Proveedor
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={12} sm={12} md={6} lg={6}>
                                                <Grid item spacing={2} xs={12} sm={12} md={12} lg={12}>
                                                    <Grid container spacing={2} >
                                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                                            <TextField
                                                                id="ruc"
                                                                name="ruc"
                                                                label="Numero Ruc: "
                                                                style={{ width: "100%" }}
                                                                {...register("ruc")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <TextField
                                                                id="numeroAutorizacion"
                                                                name="numeroAutorizacion"
                                                                label="Numero Autorización:"
                                                                style={{ width: "100%" }}
                                                                {...register("numeroAutorizacion")}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid container item xs={12} sm={12} md={6} lg={6}>
                                                <Grid item spacing={2} xs={12} sm={12} md={12} lg={12}>
                                                    <Grid container spacing={2} >
                                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                                            <TextField
                                                                id="telefono"
                                                                name="telefono"
                                                                label="Telefono: "
                                                                style={{ width: "100%" }}
                                                                {...register("telefono")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <TextField
                                                                id="direccionDomiciliaria"
                                                                name="direccionDomiciliaria"
                                                                label="Dirección:"
                                                                style={{ width: "100%" }}
                                                                {...register("direccionDomiciliaria")}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <TextField
                                                                id="correo"
                                                                name="correo"
                                                                label="Email:"
                                                                style={{ width: "100%" }}
                                                                {...register("correo")}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>


                                        </Grid>
                                    </CardContent>
                                </Card>
                            </SubCard>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button variant="contained" onClick={handleClickOpen('paper')} style={{ width: "100%" }}>Agregar Reembolso</Button>
                                </Grid>
                            </Grid>


                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>

                                <Grid container xs={12} md={12} sm={12} lg={12} spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Iva</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="iva"
                                                name="iva"
                                                style={{ width: "100%" }}
                                                required
                                                label="Iva"
                                                {...register("iva")}
                                            >
                                                <MenuItem value={10}>Iva 12%</MenuItem>
                                                <MenuItem value={20}>Iva 8%</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="departamento"
                                                name="departamento"
                                                style={{ width: "100%" }}
                                                required
                                                label="Departamento"
                                                {...register("departamento")}
                                            >
                                                <MenuItem value={"Huaquillas"}>Huaquillas</MenuItem>
                                                <MenuItem value={"Santo Domingo"}>Santo Domingo</MenuItem>
                                                <MenuItem value={"Esmeraldas"}>Esmeraldas</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="subcuenta"
                                                name="subcuenta"
                                                style={{ width: "100%" }}
                                                required
                                                label="Subcuenta"
                                                {...register("subcuenta")}
                                            >
                                                <MenuItem value={"Insumos Medicos"}>Insumos Medicos</MenuItem>
                                                <MenuItem value={"Tecnologico"}>Tecnologico</MenuItem>
                                                <MenuItem value={"Gastos"}>Gastos</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <div>
                                    <from>
                                        <TableContainer >
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Tipo Base</TableCell>
                                                        <TableCell align="center" >Grava Iva</TableCell>
                                                        <TableCell align="center">Cant.</TableCell>
                                                        <TableCell align="center">Descripción</TableCell>
                                                        <TableCell align="center">Precio Unit.</TableCell>
                                                        <TableCell align="center">Total</TableCell>
                                                        <TableCell align="center"></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableCell>
                                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="tipoBase"
                                                                name="tipoBase"
                                                                {...register("tipoBase")}>
                                                                <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                                <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <center>
                                                            <Checkbox
                                                                id="gravaIva"
                                                                name="gravaIva"
                                                                style={{
                                                                    transform: "scale(1)",
                                                                }}
                                                                {...register("gravaIva")} />
                                                        </center>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="cantidad"
                                                            name="cantidad"
                                                            type="number"
                                                            style={{ width: "50px" }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            variant="standard"
                                                            {...register("cantidad")} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="descripcion"
                                                            name="descripcion"
                                                            style={{ width: "300px" }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            variant="standard"
                                                            {...register("descripcion")} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="precioUnit"
                                                            name="precioUnit"
                                                            type="number"
                                                            style={{ width: "70px" }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            variant="standard"
                                                            {...register("precioUnit")} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="total"
                                                            name="total"
                                                            style={{ width: "70px" }}
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                            variant="standard"
                                                            {...register("total")} />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained" startIcon={<AddIcon />}>

                                                        </Button>
                                                    </TableCell>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </from>
                                </div>
                                <div >
                                    <TableContainer >
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead style={{ backgroundColor: "skyblue", color: "black" }}>
                                                <TableRow>
                                                    <TableCell>#</TableCell>

                                                    <TableCell align="center">Cant.</TableCell>
                                                    <TableCell align="center" >Tipo Base</TableCell>
                                                    <TableCell align="center">Descripción</TableCell>
                                                    <TableCell align="center">Precio Unit.</TableCell>
                                                    <TableCell align="center">Total</TableCell>
                                                    <TableCell align="center">Opcion</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                                <br></br>

                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="subtotal12" name="subtotal12" label="Subtotal 12%" variant="outlined" {...register("subtotal12")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="baseObjIVA" name="baseObjIVA" label="Base No Objeto IVA:" variant="outlined"  {...register("baseObjIVA")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="subtotal" name="subtotal" label="Subtotal:" variant="outlined" {...register("subtotal")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="subtotal0" name="subtotal0" label="Subtotal 0%:" variant="outlined"  {...register("subtotal0")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <label>
                                            <Checkbox
                                                id="usaIce"
                                                name="usaIce"
                                                style={{
                                                    width: "20%",
                                                    transform: "scale(1)",
                                                }}
                                                {...register("usaIce")} />
                                        </label>
                                        <TextField style={{
                                            width: "80%",
                                        }} id="ice" name="ice" label="Ice:" variant="outlined" {...register("ice")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="iva12" name="iva12" label="Iva 12 %:" variant="outlined"   {...register("iva12")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="descuento12" name="descuento12" label="Descuento 12%:" variant="outlined" {...register("descuento12")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="propina" name="propina" label="Propina Tip (Serv. 10%):" variant="outlined" {...register("propina")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined" {...register("valorTotal")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="descuento0" name="descuento0" label="Descuento 0%:" variant="outlined" {...register("descuento0")} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField style={{ width: "100%" }} id="impIRBPNR" name="impIRBPNR" label="IMP. IRBPNR:" variant="outlined" {...register("impIRBPNR")} />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button style={{ width: "100%" }} variant="contained" onClick={handleClickOpenMFP('paper')}>Forma de Pago</Button>
                            </Grid> */}
                                </Grid>
                                <br></br>
                                <Divider />
                                <CardActions >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <Button type="submit" variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                                Guardar
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <Button style={{ width: "100%" }} variant="contained" onClick={handleClickOpenMR('paper')}>Retener</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>

                            </SubCard>

                        </Grid>
                    </Grid >

                </MainCard >
            </form>
            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
            />
            <ModalReembolso
                open={open}
                onClose={handleClose} />
        </div>
    );
}

export default Reembolso;
