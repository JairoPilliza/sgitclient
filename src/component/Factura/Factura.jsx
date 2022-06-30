import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@mui/material';
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
import TipoFactura from "component/TipoFactura";
import ModalRetencion from "component/ModalRetencion";
import EditIcon from '@mui/icons-material/Edit';
import ModalNuevoProveedor from "component/ModalProveedor";
import BusquedaPr from "component/BusquedaProveedor";
import ModalFormaPago from "component/FormaPago";
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ModalSubirXML from "component/ModalSubirXML";
import ModalComprobanteRetencion from "component/ComprobanteRetencion";
const Factura = () => {

    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [factBuscadorPr, setFactBuscadorPr] = useState(false);
    const [muestraXML, setMuestraXML] = useState(false);
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /////////MODAL RETENCION
    const [openMR, setOpenMR] = useState(false);
    const [scroll, setScroll] = useState('paper');

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
    const Input = styled('input')({
        display: 'none',
    });
    var muestraBuscador;
    if (!factBuscadorPr) {
        muestraBuscador = <TipoFactura handleEvent={setFactBuscadorPr} muestraXML={setMuestraXML} />;
    }
    else {
        if (factBuscadorPr == true) {
            muestraBuscador =
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <BusquedaPr />
                    </Grid>
                </Grid>;
        }
        if (muestraXML == true) {
            muestraBuscador =
                <Grid container spacing={2}>
                    <Grid item lg={10} md={10} sm={12} xs={12}  >
                        <BusquedaPr></BusquedaPr>
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12} >
                        {/* <label htmlFor="contained-button-file"> */}
                        {/* <Input id="contained-button-file" multiple type="file" /> */}

                        <Button style={{ width: "100%" }} onClick={handleClickOpenXML('paper')} variant="outlined" component="span" startIcon={<FileUploadIcon />}>
                            XML
                        </Button>
                        {/* </label> */}
                        {/* <Button style={{ width: "100%" }} onClick={handleClickOpenXML('paper')} variant="outlined" startIcon={<FileUploadIcon />}>
                            XML
                        </Button> */}
                    </Grid>
                </Grid>;
        }

    }

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MainCard title="Factura"

                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            {
                                muestraBuscador
                            }
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} >
                            <SubCard className="col-12" container title="Datos de Factura" style={{ textAlign: "center" }}>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                                    <Grid item xs={12} md={6} sm={12} lg={6}>

                                    </Grid>
                                    <Grid item xs={12} md={6} sm={12} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }} xs={12} md={6} sm={6} lg={6}>
                                            <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                            <Select
                                                {...register("sustentoTributario")}
                                                labelId="demo-simple-select-helper-label"
                                                id="sustentoTributario"
                                                name="sustentoTributario"
                                                style={{ width: "100%", float: "right" }}
                                                required
                                                label="Sustento Tributario"

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
                                                    {...register("establecimiento")}
                                                    id="establecimiento"
                                                    name="establecimiento"
                                                    label="000"
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <TextField
                                                    {...register("puntoEmision")}
                                                    id="puntoEmision"
                                                    name="puntoEmision"
                                                    label="000 "
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                                <TextField
                                                    {...register("secuencial")}
                                                    id="secuencial"
                                                    name="secuencial"
                                                    label="000000000"
                                                    multiline
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                            <Grid item xs={12} md={6} sm={12} lg={6}>
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
                                <Card lg={12} md={12} sm={12} xs={12}>
                                    <CardHeader
                                        title="Datos del proveedor"
                                        style={{ backgroundColor: "#ffc107", textAlign: "center", height: "60px" }}

                                    />
                                    <CardContent >
                                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >

                                            <Grid container item lg={12} md={12} sm={12} xs={12}  >
                                                <Grid item lg={12} md={12} sm={12} xs={12} >
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
                                            <Grid container item lg={6} md={6} sm={12} xs={12}>
                                                <Grid item spacing={2} lg={12} md={12} sm={12} xs={12} >
                                                    <Grid container spacing={2} >

                                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                                            <TextField
                                                                {...register("numeroRuc")}
                                                                id="ruc"
                                                                name="ruc"
                                                                label="Numero Ruc: "
                                                                style={{ width: "100%" }}

                                                            />
                                                        </Grid>
                                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                                            <TextField
                                                                {...register("autorizacion")}
                                                                id="autorizacion"
                                                                name="autorizacion"
                                                                label="Numero Autorización:"
                                                                style={{ width: "100%" }}

                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container item lg={6} md={6} sm={12} xs={12}>
                                                <Grid item spacing={2} lg={12} md={12} sm={12} xs={12} >
                                                    <Grid container spacing={2} >
                                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                                            <TextField
                                                                {...register("telefono")}
                                                                id="telefono"
                                                                name="telefono"
                                                                label="Telefono: "
                                                                style={{ width: "100%" }}

                                                            />
                                                        </Grid>
                                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                                            <TextField
                                                                {...register("direccion")}
                                                                id="direccion"
                                                                name="direccion"
                                                                label="Dirección:"
                                                                style={{ width: "100%" }}

                                                            />
                                                        </Grid>
                                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                                            <TextField
                                                                {...register("email")}
                                                                id="email"
                                                                name="email"
                                                                label="Email:"
                                                                style={{ width: "100%" }}

                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </SubCard>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} >

                                <Grid container lg={12} md={12} sm={12} xs={12} spacing={2}>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Iva</InputLabel>
                                            <Select
                                                {...register("sustentoTributario")}
                                                labelId="demo-simple-select-helper-label"
                                                id="sustentoTributario"
                                                name="sustentoTributario"
                                                style={{ width: "100%" }}
                                                required
                                                label="Iva"

                                            >
                                                <MenuItem value={10}>Iva 12%</MenuItem>
                                                <MenuItem value={20}>Iva 8%</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
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
                                <div>
                                    <form >
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
                                                                {...register("tipoBase")}
                                                                labelId="demo-simple-select-standard-label"
                                                                id="tipoBase"
                                                                name="tipoBase"
                                                            >
                                                                <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                                <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <center>
                                                            <Checkbox
                                                                {...register("grabaIva")}
                                                                id="grabaIva"
                                                                name="grabaIva"
                                                                style={{
                                                                    transform: "scale(1)",

                                                                }}
                                                            />
                                                        </center>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            {...register("cantidad")}
                                                            id="cantidad"
                                                            name="cantidad"
                                                            type="number"
                                                            style={{ width: "50px" }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            variant="standard"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            {...register("descripcion")}
                                                            id="descripcion"
                                                            name="descripcion"
                                                            style={{ width: "300px" }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            variant="standard"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            {...register("valorUnitario")}
                                                            id="valorUnitario"
                                                            name="valorUnitario"
                                                            type="number"
                                                            style={{ width: "70px" }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            variant="standard"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            {...register("valorTotal")}
                                                            id="valorTotal"
                                                            name="valorTotal"
                                                            style={{ width: "70px" }}
                                                            InputProps={{
                                                                readOnly: true
                                                            }}
                                                            variant="standard"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="contained" startIcon={<AddIcon />}>

                                                        </Button>
                                                    </TableCell>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </form>
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
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <TextField  {...register("subtotalDoce")} style={{ width: "100%" }} id="subtotal12" name="subtotal12" label="Subtotal 12%" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <TextField {...register("baseNoObjetoIva")} style={{ width: "100%" }} id="baseObjIVA" name="baseObjIVA" label="Base No Objeto IVA:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <TextField  {...register("subtotal")} style={{ width: "100%" }} id="subtotal" name="subtotal" label="Subtotal:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <TextField {...register("subtotalCero")} style={{ width: "100%" }} id="subtotal0" name="subtotal0" label="Subtotal 0%:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
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
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <TextField {...register("ivaDoce")} style={{ width: "100%" }} id="iva12" name="iva12" label="Iva 12 %:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <TextField  {...register("descuentoDoce")} style={{ width: "100%" }} id="descuento12" name="descuento12" label="Descuento 12%:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <TextField {...register("propinaTip")} style={{ width: "100%" }} id="propina" name="propina" label="Propina Tip (Serv. 10%):" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <TextField  {...register("valorTotal")} style={{ width: "100%" }} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <TextField {...register("descuentoCero")} style={{ width: "100%" }} id="descuento0" name="descuento0" label="Descuento 0%:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12}>
                                        <TextField {...register("IRBPNR")} style={{ width: "100%" }} id="impIRBPNR" name="impIRBPNR" label="IMP. IRBPNR:" variant="outlined" />
                                    </Grid>
                                    <Grid item lg={4} md={4} sm={12} xs={12} >
                                        <Button style={{ width: "100%" }} variant="contained" onClick={handleClickOpenMFP('paper')}>Forma de Pago</Button>
                                    </Grid>
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

                                        <Grid item lg={4} md={4} sm={12} xs={12} >
                                            <Button onClick={handleClickOpen('paper')} style={{ width: "100%" }} variant="contained" >Retener</Button>
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={12} xs={12} >
                                            <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                                Cancelar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>

                            </SubCard>

                        </Grid>
                    </Grid>

                </MainCard >
            </form>
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose} />
            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
                scroll={scroll}
            />
            <ModalComprobanteRetencion
                open={openMFP}
                onClose={handleCloseMFP} />
            <ModalSubirXML
                open={openXML}
                onClose={handleCloseXML}
            />

        </div>
    );
}

export default Factura;
