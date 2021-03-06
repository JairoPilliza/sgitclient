import React, { Fragment, useEffect, useState } from "react";
import { Chip, Divider, FormControlLabel, Grid, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import SubCard from 'ui-component/cards/SubCard';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ModalRetencion = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [factBuscadorPtoEmision, setBuscadorPtoEmision] = useState(false);
    const [checked, setChecked] = useState(true);
    const [secuencial, setSecuencial] = useState(false);
    const [count, setCount] = useState(0);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        p: 4,
    };

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


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const clickAyuda = () => {

        setCount(count + 1)
        setBuscadorPtoEmision(true);
        if (count == 1) {
            setCount(0)
            setBuscadorPtoEmision(false)
        }
    }


    var muestraBuscador;
    if (factBuscadorPtoEmision) {
        muestraBuscador =
            <TextField
                required
                id="outlined-basic"
                label="Filtro Pto Emision:"
                placeholder="Buscar Pto. Emision"
                style={{ width: "100%" }}
                {...register("ptoEmision")}
            />;
    }
    else {

        muestraBuscador = "";
    }
    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }

    var txtSecuencial;
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked == false) {

            setSecuencial(true);

        } else {
            setSecuencial(false);
        }
    };
    if (secuencial) {
        txtSecuencial = <TextField
            id="secuencialRetencion"
            name="secuencialRetencion"
            label="N?? Secuencial:"
            style={{ width: "100%" }}
            {...register("secuencialRetencion")} />;

    } else {
        txtSecuencial = '';
    }

    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={props.scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
            >

                <DialogTitle id="scroll-dialog-title">Registrar Retenci??n</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>

                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <Divider><Chip label="Datos de Retenci??n" /></Divider>
                    <br/>
                    {/* <SubCard className="col-12" container title="Datos de Retenci??n" style={{ textAlign: "center" }} > */}

                        <Grid container spacing={2} >
                            <Grid container item spacing={2}>

                                <Grid item lg={3} md={3} sm={12} xs={12}  >

                                    <FormControlLabel
                                        labelPlacement="start"
                                        label="Retencion Electronica"
                                        control={<Checkbox {...register("electronica")}
                                            checked={checked}
                                            onChange={handleChange}
                                            id="electronica"
                                            name="electronica"
                                        />}
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    {/* <label style={{ width: "100%" }}><b>Retenci??n electronica</b></label> */}
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Button variant="outlined" startIcon={<SearchIcon />} onClick={clickAyuda} style={{ width: "100%" }}>
                                        <small>Ayuda</small>
                                    </Button>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}  >
                                    <TextField
                                        id="fechaEmisionRetencion"
                                        name="fechaEmisionRetencion"
                                        label="Fecha Emisi??n:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("fechaEmisionRetencion")}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2} >
                                <Grid item lg={12} md={12} sm={12} xs={12}  >
                                    {muestraBuscador}
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2} >
                                <Grid item lg={3} md={3} sm={12} xs={12}  >
                                    <label style={{ width: "100%" }} >
                                        <b>N. Retencion: *</b>
                                    </label>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}  >

                                    <TextField
                                        id="establecimientoRetencion"
                                        name="establecimientoRetencion"
                                        label="N?? Establecimiento:"
                                        style={{ width: "100%" }}
                                        {...register("establecimientoRetencion")}
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Pto emisi??n</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="puntoFacturacionRetencion"
                                            name="puntoFacturacionRetencion"
                                            style={{ width: "100%" }}
                                            label="Pto emisi??n"
                                            {...register("puntoFacturacionRetencion")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}  >

                                    {
                                        txtSecuencial
                                    }
                                </Grid>
                            </Grid>

                            <Grid container item spacing={2} >
                                <Grid item lg={12} md={12} sm={12} xs={12}  >
                                    <FormControl sx={{ minWidth: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Sustenci??n Tributario</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="sustentoTributario"
                                            name="sustentoTributario"
                                            style={{ width: "100%", float: "right" }}
                                            label="Sustenci??n Tributario"
                                            {...register("sustentoTributario")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                    {/* </SubCard> */}
                    {/* </form> */}
                    <br></br>
                    <Divider><Chip label="Retenci??n de Renta" /></Divider>
                    <br/>
                    {/* <SubCard className="col-12" container title="Retenci??n de Renta" style={{ textAlign: "center" }} > */}
                        <div>
                            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tipo Base</TableCell>
                                            <TableCell align="center">Base</TableCell>
                                            <TableCell align="center">Cod. Retenci??n</TableCell>
                                            <TableCell align="center">Porcentaje</TableCell>
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
                                                <TextField
                                                    id="valorBase"
                                                    name="valorBase"
                                                    type="number"
                                                    style={{ width: "50px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("valorBase")} />
                                            </TableCell>
                                            <TableCell>
                                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                                    <InputLabel id="demo-simple-select-helper-label">::Seleccione::</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="codRetencion"
                                                        name="codRetencion"
                                                        style={{ width: "280px", float: "right" }}
                                                        label="::Seleccione::"
                                                        {...register("codRetencion")}
                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>

                                                </FormControl>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="porcentaje"
                                                    name="porcentaje"
                                                    type="number"
                                                    style={{ width: "70px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("porcentaje")} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="valorTotal"
                                                    name="valorTotal"
                                                    style={{ width: "70px" }}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                    variant="standard"
                                                    {...register("valorTotal")} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button type="submit" variant="contained">
                                                    <AddIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* </form> */}
                        </div>
                        <div >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Base</b></TableCell>
                                            <TableCell align="center"><b>Cod. Retenci??n</b></TableCell>
                                            <TableCell align="center"><b>Porcentaje</b></TableCell>
                                            <TableCell align="center"><b>Total</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow hover key={row.desc}>
                                                <TableCell>{row.desc}</TableCell>
                                                <TableCell align="center">{row.qty}</TableCell>
                                                <TableCell align="center">{row.unit}</TableCell>
                                                <TableCell align="center">{ccyFormat(row.price)}</TableCell>
                                            </TableRow>
                                        ))}

                                        <TableRow>
                                            <TableCell colSpan={3}></TableCell>
                                            <TableCell align="right" >
                                                <Typography variant="h6" color="red" gutterBottom component="div">
                                                    Total Renta: {ccyFormat(invoiceTotal)}
                                                </Typography>


                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    {/* </SubCard> */}
                    <br></br>
                    <Divider><Chip label="Retenci??n de Iva" /></Divider>
                    <br/>
                    {/* <SubCard className="col-12" container title="Retenci??n de Iva" style={{ textAlign: "center" }} > */}

                        <div >
                            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Base</b></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="center"><b>Cod. Retenci??n</b></TableCell>
                                            <TableCell align="center"><b>Porcentaje</b></TableCell>
                                            <TableCell align="center"><b>Total</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >

                                        <TableRow hover>
                                            <TableCell align="right">
                                                <label align="left"><b>Bienes</b> </label>
                                            </TableCell>
                                            <TableCell align="left">  <TextField id="bienes" name="bienes" type="number" label="-" variant="outlined"  {...register("bienes")} /></TableCell>
                                            <TableCell align="left">
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <InputLabel id="demo-simple-select-helper-label">::Seleccione::</InputLabel>
                                                    <Select
                                                        {...register("codRetencion")}
                                                        labelId="demo-simple-select-helper-label"
                                                        id="codRetencionIva"
                                                        name="codRetencionIva"
                                                        style={{ width: "280px", float: "right" }}
                                                        label="::Seleccione::"

                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>

                                                </FormControl>

                                            </TableCell>
                                            <TableCell align="left">  <TextField  {...register("porcentaje")} id="porcentajeBien" name="porcentajeBien" type="number" label="-" variant="outlined" /></TableCell>
                                            <TableCell align="left">  <TextField  {...register("valorTotal")} id="totalBien" name="totalBien" type="number" label="-" variant="outlined" /></TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell align="right">
                                                <label align="left"><b>Servicios</b> </label>
                                            </TableCell>
                                            <TableCell align="left">  <TextField {...register("servicios")} id="servicios" name="servicios" type="number" label="-" variant="outlined" /></TableCell>
                                            <TableCell align="left">
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <InputLabel id="demo-simple-select-helper-label">::Seleccione::</InputLabel>
                                                    <Select
                                                        {...register("codRetencion")}
                                                        labelId="demo-simple-select-helper-label"
                                                        id="codRetencionServicio"
                                                        style={{ width: "280px", float: "right" }}
                                                        label="::Seleccione::"
                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell  {...register("porcentaje")} align="left">  <TextField id="porcentajeIva" name="porcentajeIva" type="number" label="-" variant="outlined" /></TableCell>
                                            <TableCell {...register("valorTotal")} align="left">  <TextField id="valorTotal" name="valorTotal" type="number" label="-" variant="outlined" /></TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell colSpan={3} />
                                            <TableCell colSpan={2} align="right" >
                                                <Typography variant="h6" color="red" gutterBottom component="div">
                                                    Total Iva: ${ccyFormat(invoiceTotal)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover>
                                            <TableCell />
                                            <TableCell ></TableCell>
                                            <TableCell align="center" >
                                                <Typography variant="h6" color="red" gutterBottom component="div">
                                                    Total Retiene Factura: ${ccyFormat(invoiceTotal)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell ></TableCell>


                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* </form> */}
                        </div>
                    {/* </SubCard> */}

                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button type="submit" >Guardar Retenci??n</Button>
                </DialogActions>

            </Dialog>
        </Fragment >

    );
}

export default ModalRetencion;
