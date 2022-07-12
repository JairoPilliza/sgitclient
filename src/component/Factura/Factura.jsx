import React, { Fragment, useEffect, useState } from "react";
import { Chip, Grid } from '@mui/material';
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

const Factura = () => {

    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [factBuscadorPr, setFactBuscadorPr] = useState(false);
    const [muestraXML, setMuestraXML] = useState(false);
    const [form, setForm] = useState({ electronica: "", idPeriodo: "", idSucursal: "", idProveedor: "", idComprobanteTipo: "", idSustentoTributario: "", establecimiento: "", puntoEmision: "", secuencial: "", fechaEmision: "", numeroRuc: "", autorizacion: "", telefono: "", email: "", direccion: "", idDepartamento: "", idSubcuenta: "", subtotalDoce: "", baseNoObjetoIva: "", subtotal: "", subtotalCero: "", ice: "", ivaDoce: "", descuentoDoce: "", propinaTip: "", valorTotal: "", descuentoCero: "", IRBPNR: "", estado: "", fechaRegistro: "" })
    const [formDetalle, setFormDetalle] = useState({ idFactura: "", iva: "", idProductoTipo: "", gravaIva: "", cantidad: "", descripcion: "", valorUnitario: "", valorTotal: "" })
    /////////MODAL PROVEEDOR
    const [open, setOpen] = useState(false);
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
    const [openMFP, setOpenMFP] = useState(false);
    const handleClickOpenMFP = (scrollType) => () => {
        setOpenMFP(true);
        setScroll(scrollType);
    };

    const handleCloseMFP = () => {
        setOpenMFP(false);
    };
    /////////////////////////

    const [openXML, setOpenXML] = useState(false);

    const handleClickOpenXML = (scrollType) => () => {
        setOpenXML(true);
        setScroll(scrollType);
    };
    const handleCloseXML = () => {
        setOpenXML(false);
    };

    var muestraBuscador;
    if (!factBuscadorPr) {
        muestraBuscador = <TipoFactura handleEvent={setFactBuscadorPr} muestraXML={setMuestraXML} />;
    }
    else {
        if (factBuscadorPr) {
            muestraBuscador =
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <BusquedaPr />
                    </Grid>
                </Grid>;
        }
        if (muestraXML) {
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

    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

        console.log(form);


    }

    const handleChangeDt = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setFormDetalle({
            ...formDetalle,
            [name]: value
        })

        console.log(formDetalle);


    }

    return (
        <Fragment>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <MainCard title="Factura"

            >
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {
                            muestraBuscador
                        }
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <Divider><Chip label="Datos de Factura" /></Divider>
                        <br />
                        {/* <SubCard className="col-12" container title="Datos de Factura" style={{ textAlign: "center" }}> */}
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                            <Grid item xs={12} md={6} sm={12} lg={6}>

                            </Grid>
                            <Grid item xs={12} md={6} sm={12} lg={6}>
                                <FormControl sx={{ minWidth: '100%' }} xs={12} md={6} sm={6} lg={6}>
                                    <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                    <Select
                                        {...register("idSustentoTributario")}
                                        labelId="demo-simple-select-helper-label"
                                        id="idSustentoTributario"
                                        name="idSustentoTributario"
                                        style={{ width: "100%", float: "right" }}
                                        required
                                        label="Sustento Tributario"
                                        value={form.idSustentoTributario}
                                        onChange={handleChange}

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
                                            value={form.establecimiento}
                                            onChange={handleChange}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                        <TextField
                                            {...register("puntoEmision")}
                                            id="puntoEmision"
                                            name="puntoEmision"
                                            label="000 "
                                            style={{ width: "100%" }}
                                            value={form.puntoEmision}
                                            onChange={handleChange}

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
                                            value={form.secuencial}
                                            onChange={handleChange}

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
                                            value={form.fechaEmsion}
                                            onChange={handleChange}

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
                                            value={form.fechaRegistro}
                                            onChange={handleChange}

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

                                    <Grid container item   >
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
                                    <Grid container item spacing={2}>

                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("numeroRuc")}
                                                id="ruc"
                                                name="ruc"
                                                label="Numero Ruc: "
                                                style={{ width: "100%" }}
                                                value={form.numeroRuc}
                                                onChange={handleChange}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("autorizacion")}
                                                id="autorizacion"
                                                name="autorizacion"
                                                label="Numero Autorización:"
                                                style={{ width: "100%" }}
                                                value={form.autorizacion}
                                                onChange={handleChange}


                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container item spacing={2}>

                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("telefono")}
                                                id="telefono"
                                                name="telefono"
                                                label="Telefono: "
                                                style={{ width: "100%" }}
                                                value={form.telefono}
                                                onChange={handleChange}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("direccion")}
                                                id="direccion"
                                                name="direccion"
                                                label="Dirección:"
                                                style={{ width: "100%" }}
                                                value={form.direccion}
                                                onChange={handleChange}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("email")}
                                                id="email"
                                                name="email"
                                                label="Email:"
                                                style={{ width: "100%" }}
                                                value={form.email}
                                                onChange={handleChange}

                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                        {/* </SubCard> */}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Divider><Chip label="Detalle de Factura" /></Divider>
                        <br />
                        {/* <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} > */}

                        <Grid container spacing={2}>
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
                                        value={form.email}
                                        onChange={handleChange}

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
                                        {...register("idDepartamento")}
                                        value={form.idDepartamento}
                                        onChange={handleChange}
                                        labelId="demo-simple-select-helper-label"
                                        id="idDepartamento"
                                        name="idDepartamento"
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
                                        {...register("idSubcuenta")}
                                        value={form.idSubcuenta}
                                        onChange={handleChange}
                                        labelId="demo-simple-select-helper-label"
                                        id="idSubcuenta"
                                        name="idSubcuenta"
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

                        {/* <form > */}
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
                                                    {...register("idProductoTipo")}
                                                    value={formDetalle.idProductoTipo}
                                                    onChange={handleChangeDt}
                                                    labelId="demo-simple-select-standard-label"
                                                    id="idProductoTipo"
                                                    name="idProductoTipo"
                                                >
                                                    <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                    <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <center>
                                                <Checkbox
                                                    {...register("gravaIva")}
                                                    value={formDetalle.gravaIva}
                                                    onChange={handleChangeDt}
                                                    id="gravaIva"
                                                    name="gravaIva"
                                                    style={{
                                                        transform: "scale(1)",

                                                    }}
                                                />
                                            </center>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                {...register("cantidad")}
                                                value={formDetalle.cantidad}
                                                onChange={handleChangeDt}
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
                                                value={formDetalle.descripcion}
                                                onChange={handleChangeDt}
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
                                                value={formDetalle.valorUnitario}
                                                onChange={handleChangeDt}
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
                                                value={formDetalle.valorTotal}
                                                onChange={handleChangeDt}
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
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* </form> */}



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

                        <br></br>

                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField  {...register("subtotalDoce")}
                                    value={form.subtotalDoce}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="subtotalDoce" name="subtotalDoce" label="Subtotal 12%" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField {...register("baseNoObjetoIva")}
                                    value={form.baseNoObjetoIva}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="baseNoObjetoIva" name="baseNoObjetoIva" label="Base No Objeto IVA:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField  {...register("subtotal")}
                                    value={form.subtotal}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="subtotal" name="subtotal" label="Subtotal:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField {...register("subtotalCero")}
                                    value={form.subtotalCero}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="subtotal0" name="subtotal0" label="Subtotal 0%:" variant="outlined" />
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
                                    value={form.ice}
                                    onChange={handleChange}
                                    style={{
                                        width: "80%",
                                    }} id="ice" name="ice" label="Ice:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField {...register("ivaDoce")}
                                    value={form.ivaDoce}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="ivaDoce" name="ivaDoce" label="Iva 12 %:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField  {...register("descuentoDoce")}
                                    value={form.descuentoDoce}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="descuento12" name="descuento12" label="Descuento 12%:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField {...register("propinaTip")}
                                    value={form.propinaTip}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="propinaTip" name="propinaTip" label="Propina Tip (Serv. 10%):" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField  {...register("valorTotal")}
                                    value={form.valorTotal}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField {...register("descuentoCero")}
                                    value={form.descuentoCero}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="descuentoCero" name="descuentoCero" label="Descuento 0%:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField {...register("IRBPNR")}
                                    value={form.IRBPNR}
                                    onChange={handleChange}
                                    style={{ width: "100%" }} id="IRBPNR" name="IRBPNR" label="IMP. IRBPNR:" variant="outlined" />
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

                        {/* </SubCard> */}

                    </Grid>
                </Grid>

            </MainCard >
            {/* </form> */}
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose}
                scroll={scroll} />
            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
                scroll={scroll}
            />
            <ModalFormaPago
                open={openMFP}
                onClose={handleCloseMFP}
                scroll={scroll} />
            <ModalSubirXML
                open={openXML}
                onClose={handleCloseXML}
                scroll={scroll}
            />

        </Fragment>
    );
}

export default Factura;
