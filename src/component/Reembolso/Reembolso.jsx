import React, { Fragment, useEffect, useState } from "react";
import { Chip, Divider, Grid, InputLabel } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
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
import ModalReembolso from "./ModalReembolso";
import ModalRetencion from "component/ModalRetencion";
import EditIcon from '@mui/icons-material/Edit';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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
        <Fragment>

            <MainCard title="Comprobante de venta emitido por Reembolso" >
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Divider><Chip label="Datos de Factura" /></Divider>
                    <br/>
                        {/* <SubCard container title="Datos de Factura" style={{ textAlign: "center" }} > */}
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                                <Grid item lg={6} md={6} sm={12} xs={12} />
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <FormControl sx={{ minWidth: '100%' }} lg={6} md={6} sm={6} xs={12} >
                                        <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                        <Select
                                            {...register("sustentoTributario")}
                                            labelId="demo-simple-select-helper-label"
                                            id="sustentoTributario"
                                            name="sustentoTributario"
                                            style={{ width: "100%" }}
                                            required
                                            label="Sustento Tributario"

                                        >
                                            <MenuItem value={10}>FACTURA</MenuItem>
                                            <MenuItem value={20}>NOTA DE VENTA</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Grid container spacing={2} >
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <small style={{ width: "100%" }} ><b>N° Factura:</b></small>
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12}  >
                                            <TextField
                                                {...register("emision")}
                                                id="emision"
                                                name="emision"
                                                label="000"
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12}  >
                                            <TextField
                                                {...register("puntoEmision")}
                                                id="puntoEmision"
                                                name="puntoEmision"
                                                label="000 "
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12}  >
                                            <TextField
                                                {...register("secuencial")}
                                                id="secuencial"
                                                name="secuencial"
                                                label="000000000"
                                                multiline
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                {...register("fechaEmsion")}
                                                id="fechaEmsion"
                                                name="fechaEmsion"
                                                label="F. Emisión:"
                                                type="date"
                                                style={{ width: "100%", float: "right" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("fechaRegistro")}
                                                id="fechaRegistro"
                                                name="fechaRegistro"
                                                label="F. Registro:"
                                                type="date"
                                                style={{ width: "100%", float: "right" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}

                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Card >
                                <CardHeader
                                    title="Datos del proveedor"
                                    style={{ backgroundColor: "#ffc107", textAlign: "center", height: "60px" }}
                                />
                                <CardContent >
                                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                                        <Grid container item  >
                                            <Grid item lg={12} md={12} sm={12} xs={12}  >
                                                <Grid container spacing={2}>
                                                    {/* <Grid item xs={12} md={6} sm={12} lg={6} /> */}
                                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                                        <Button aria-label="settings" style={{ width: "100%", float: "right" }} variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                                            Editar Proveedor
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container item spacing={2}>

                                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                <TextField
                                                    {...register("ruc")}
                                                    id="ruc"
                                                    name="ruc"
                                                    label="Numero Ruc: "
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                                <TextField
                                                    {...register("numeroAutorizacion")}
                                                    id="numeroAutorizacion"
                                                    name="numeroAutorizacion"
                                                    label="Numero Autorización:"
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>

                                        </Grid>

                                        <Grid container item spacing={2} >

                                            <Grid item lg={6} md={6} sm={12} xs={12}   >
                                                <TextField
                                                    {...register("telefono")}
                                                    id="telefono"
                                                    name="telefono"
                                                    label="Telefono: "
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                <TextField
                                                    {...register("direccionDomiciliaria")}
                                                    id="direccionDomiciliaria"
                                                    name="direccionDomiciliaria"
                                                    label="Dirección:"
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                <TextField
                                                    {...register("correo")}
                                                    id="correo"
                                                    name="correo"
                                                    label="Email:"
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>

                                        </Grid>


                                    </Grid>
                                </CardContent>
                            </Card>
                        {/* </SubCard> */}
                        <br />
                        <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <Button variant="contained" onClick={handleClickOpen('paper')} style={{ width: "100%" }} startIcon={<MonetizationOnIcon />}>Agregar Reembolso</Button>
                            </Grid>
                        </Grid>


                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}  >
                    <Divider><Chip label="Detalle de Factura" /></Divider>
                    <br/>
                        {/* <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} > */}

                            <Grid container spacing={2} >
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Iva</InputLabel>
                                        <Select
                                            {...register("iva")}
                                            labelId="demo-simple-select-helper-label"
                                            id="iva"
                                            name="iva"
                                            style={{ width: "100%" }}
                                            required
                                            label="Iva"

                                        >
                                            <MenuItem value={10}>Iva 12%</MenuItem>
                                            <MenuItem value={20}>Iva 8%</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                                        <Select
                                            {...register("departamento")}
                                            labelId="demo-simple-select-helper-label"
                                            id="departamento"
                                            name="departamento"
                                            style={{ width: "100%" }}
                                            required
                                            label="Departamento"

                                        >
                                            <MenuItem value={"Huaquillas"}>Huaquillas</MenuItem>
                                            <MenuItem value={"Santo Domingo"}>Santo Domingo</MenuItem>
                                            <MenuItem value={"Esmeraldas"}>Esmeraldas</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                                        <Select
                                            {...register("subcuenta")}
                                            labelId="demo-simple-select-helper-label"
                                            id="subcuenta"
                                            name="subcuenta"
                                            style={{ width: "100%" }}
                                            required
                                            label="Subcuenta"

                                        >
                                            <MenuItem value={"Insumos Medicos"}>Insumos Medicos</MenuItem>
                                            <MenuItem value={"Tecnologico"}>Tecnologico</MenuItem>
                                            <MenuItem value={"Gastos"}>Gastos</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>


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
                                        <TableRow>
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
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

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
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <TextField  {...register("subtotal12")} style={{ width: "100%" }} id="subtotal12" name="subtotal12" label="Subtotal 12%" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <TextField {...register("baseObjIVA")} style={{ width: "100%" }} id="baseObjIVA" name="baseObjIVA" label="Base No Objeto IVA:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <TextField {...register("subtotal")} style={{ width: "100%" }} id="subtotal" name="subtotal" label="Subtotal:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <TextField {...register("subtotal0")} style={{ width: "100%" }} id="subtotal0" name="subtotal0" label="Subtotal 0%:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <label>
                                        <Checkbox
                                            {...register("usaIce")}
                                            id="usaIce"
                                            name="usaIce"
                                            style={{
                                                width: "20%",
                                                transform: "scale(1)",
                                            }}
                                        />
                                    </label>
                                    <TextField
                                        {...register("ice")}
                                        style={{
                                            width: "80%",
                                        }} id="ice" name="ice" label="Ice:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <TextField {...register("iva12")} style={{ width: "100%" }} id="iva12" name="iva12" label="Iva 12 %:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <TextField {...register("descuento12")} style={{ width: "100%" }} id="descuento12" name="descuento12" label="Descuento 12%:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField {...register("propina")} style={{ width: "100%" }} id="propina" name="propina" label="Propina Tip (Serv. 10%):" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField  {...register("valorTotal")} style={{ width: "100%" }} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField {...register("descuento0")} style={{ width: "100%" }} id="descuento0" name="descuento0" label="Descuento 0%:" variant="outlined" />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField {...register("impIRBPNR")} style={{ width: "100%" }} id="impIRBPNR" name="impIRBPNR" label="IMP. IRBPNR:" variant="outlined" />
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button style={{ width: "100%" }} variant="contained" onClick={handleClickOpenMFP('paper')}>Forma de Pago</Button>
                            </Grid> */}
                            </Grid>
                            <br></br>
                            <Divider />
                            <CardActions >
                                <Grid container spacing={2}>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <Button type="submit" variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                            Guardar
                                        </Button>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <Button style={{ width: "100%" }} variant="contained" onClick={handleClickOpenMR('paper')}>Retener</Button>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>

                        {/* </SubCard> */}

                    </Grid>
                </Grid >

            </MainCard >

            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
            />
            <ModalReembolso
                open={open}
                onClose={handleClose} />
        </Fragment>
    );
}

export default Reembolso;
