import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CachedIcon from '@mui/icons-material/Cached';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import { Stack } from "@mui/material";
import TipoFactura from "component/TipoFactura";
import ModalRetencion from "component/ModalRetencion";
import EditIcon from '@mui/icons-material/Edit';
import ModalNuevoProveedor from "component/ModalProveedor";
import BusquedaPr from "component/BusquedaProveedor";
import ModalFormaPago from "component/FormaPago";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ModalSubirXML from "component/ModalSubirXML";
const Factura = () => {

    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [factBuscadorPr, setFactBuscadorPr] = useState(false);
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /////////MODAL RETENCION
    const [openMR, setOpenMR] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpenMR(true);
        setScroll(scrollType);
    };
    const handleCloseMR = () => {
        setOpenMR(false);
    };
    ///////MODAL FORMA PAGO
    const [openMFP, setOpenMFP] = React.useState(false);
    const handleClickOpenMFP = (scrollType) => () => {
        setOpenMFP(true);
        setScroll(scrollType);
    };

    const handleCloseMFP = () => {
        setOpenMFP(false);
    };
    /////////////////////////
    const [openXML, setOpenXML] = React.useState(false);


    const handleClickOpenXML = (scrollType) => () => {
        setOpenXML(true);
        setScroll(scrollType);
    };
    const handleCloseXML = () => {
        setOpenXML(false);
    };

    var muestraBuscador;
    if (!factBuscadorPr) {
        muestraBuscador = <TipoFactura handleEvent={setFactBuscadorPr} />;
    }
    else {
        muestraBuscador =
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sm={12} lg={8}>
                    <BusquedaPr />
                </Grid>

                <Grid item xs={12} md={4} sm={12} lg={4}>
                    <Button onClick={handleClickOpenXML('paper')} variant="outlined" startIcon={<FileUploadIcon />}>
                        XML
                    </Button>
                </Grid>
            </Grid>

            ;
    }
    return (
        <MainCard title="FACTURA" >
            <Grid container spacing={gridSpacing}>
                {
                    muestraBuscador
                }

                <Grid item xs={12} md={12} sm={12} lg={12}>
                    <SubCard className="col-12" container title="Datos de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>

                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                            <Grid item xs={12} md={6} sm={6} lg={6}>
                                <FormControl sx={{ minWidth: '100%' }} xs={12} md={6} sm={6} lg={6}>
                                    <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="sustentoTributario"
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
                                <Grid container spacing={2} xs={12} md={12} sm={12} lg={12}>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <small ><b>N° Factura:</b></small>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <TextField
                                            id="outlined-basic"
                                            label="000"
                                            style={{ width: "100%" }}
                                            {...register("emision")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <TextField
                                            id="outlined-basic"
                                            label="000 "
                                            style={{ width: "100%" }}
                                            {...register("puntoEmision")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="000000000"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("secuencial")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField

                                            id="outlined-date"
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
                                            id="outlined-date"
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
                                action={
                                    <Button aria-label="settings" size="small" variant="contained" startIcon={<EditIcon />} onClick={handleOpen}>
                                        Editar Proveedor
                                    </Button>
                                }
                            />
                            <CardContent >
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >

                                    <Grid item spacing={2} xs={12} sm={12} md={6} lg={6}>
                                        <Grid container spacing={2} xs={12} md={12} sm={12} lg={12}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numero Ruc: "
                                                    style={{ width: "100%" }}
                                                    {...register("numeroRuc")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numero Autorización:"
                                                    style={{ width: "100%" }}
                                                    {...register("numeroAutorizacion")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item spacing={2} xs={12} sm={12} md={6} lg={6}>
                                        <Grid container spacing={2} xs={12} md={12} sm={12} lg={12}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Telefono: "
                                                    style={{ width: "100%" }}
                                                    {...register("telefono")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextField
                                                    id="outlined-date"
                                                    label="Dirección:"
                                                    style={{ width: "100%" }}
                                                    {...register("direccionDomiciliaria")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <TextField
                                                    id="outlined-date"
                                                    label="Email:"
                                                    style={{ width: "100%" }}
                                                    {...register("correo")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </SubCard>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                        
                            <Grid container  xs={12} md={12} sm={12} lg={12} spacing={2}>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Iva</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="sustentoTributario"
                                            style={{ width: "100%" }}
                                            required
                                            label="Iva"
                                            {...register("sustentoTributario")}
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
                                            id="sustentoTributario"
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
                                            id="sustentoTributario"
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
                                                    id="demo-simple-select-standard">
                                                    <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                    <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <center>
                                                <Checkbox
                                                    style={{
                                                        transform: "scale(1)",
                                                    }} />
                                            </center>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-number"
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
                                                id="standard-number"
                                                style={{ width: "300px" }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="standard"
                                                {...register("descripcion")} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-number"
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
                                                id="standard-read-only-input"
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
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Subtotal 12%" variant="outlined" {...register("subtotal12")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Base No Objeto IVA:" variant="outlined"  {...register("baseObjIVA")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Subtotal:" variant="outlined" {...register("subtotal")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Subtotal 0%:" variant="outlined"  {...register("subtotal0")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <label>
                                    <Checkbox
                                        style={{
                                            width: "20%",
                                            transform: "scale(1)",
                                        }} />
                                </label>
                                <TextField style={{
                                    width: "80%",
                                }} id="outlined-basic" label="Ice:" variant="outlined" {...register("ice")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} {...register("iva12")} id="outlined-basic" label="Iva 12 %:" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Descuento 12%:" variant="outlined" {...register("descuento12")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Propina Tip (Serv. 10%):" variant="outlined" {...register("propina")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Valor Total:" variant="outlined" {...register("valorTotal")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="Descuento 0%:" variant="outlined" {...register("descuento0")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField style={{ width: "100%" }} id="outlined-basic" label="IMP. IRBPNR:" variant="outlined" {...register("impIRBPNR")} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button style={{ width: "100%" }} variant="contained" onClick={handleClickOpenMFP('paper')}>Forma de Pago</Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            <CardActions >

                                <Button variant="contained" style={{ backgroundColor: "#536dfe" }}>
                                    Guardar
                                </Button>
                                <Button onClick={handleClickOpen('paper')} variant="contained" >Retener</Button>
                                <Button variant="contained" style={{ backgroundColor: "#f57f17" }}>
                                    Cancelar
                                </Button>

                            </CardActions>
                        </Grid>
                    </SubCard>

                </Grid>
            </Grid>
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose} />
            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
            />
            <ModalFormaPago
                open={openMFP}
                onClose={handleCloseMFP} />
            <ModalSubirXML
                open={openXML}
                onClose={handleCloseXML}
            />
        </MainCard>
    );
}

export default Factura;
