import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link, Stack } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import BuscarPtoEmision from "./BuscarPtoEmision";


const ModalRetencion = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [factBuscadorPtoEmision, setBuscadorPtoEmision] = useState(false);
   
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

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    var muestraBuscador;
    if (factBuscadorPtoEmision) {
        muestraBuscador = <BuscarPtoEmision  />;
    }
    else {
      
    }



    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="scroll-dialog-title">Registrar Retención</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <SubCard className="col-12" container title="Datos de Retención" style={{ textAlign: "center" }} >
                            <Stack direction="row" spacing={6}>
                                <label style={{ width: "100%"}}><b>Retención electronica</b></label>
                                <Checkbox  style={{ width: "100%"}}/>
                                <Button variant="outlined" size="small" startIcon={<SearchIcon />} onClick={e => setBuscadorPtoEmision(true)} style={{ width: "100%"}}>
                                    <small>Ayuda</small>
                                </Button>
                                <TextField
                                    id="outlined-date"
                                    label="Fecha:"
                                    type="date"
                                    style={{ width: "100%" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register("fechaEmision")}
                                />
                            </Stack>
                            <br></br>
                            <Stack>                                
                            {muestraBuscador}

                            </Stack>
                           
                            <br></br>
                            <Stack direction="row" spacing={7}>
                                <label >
                                    <b>N. Retencion: *</b>
                                </label>

                                <TextField
                                    id="outlined-date"
                                    label="N° Establecimiento:"
                                    {...register("numeroRetencion")}
                                />

                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Pto emisión</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        style={{ width: "280px", float: "right" }}
                                        label="Pto emisión"
                                        {...register("puntoEmision")}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </FormControl>
                            </Stack>
                            <br></br>
                            <Stack spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Sustención Tributario</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        style={{ width: "6 80px", float: "right" }}
                                        label="Sustención Tributario"
                                        {...register("sustentoTributario")}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </FormControl>
                            </Stack>
                        </SubCard>
                        <br></br>
                        <SubCard className="col-12" container title="Retención de Renta" style={{ textAlign: "center" }} >
                            <div>
                                <TableContainer >
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Tipo Base</TableCell>
                                                <TableCell align="center">Base</TableCell>
                                                <TableCell align="center">Cod. Retención</TableCell>
                                                <TableCell align="center">Porcentaje</TableCell>
                                                <TableCell align="center">Total</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>
                                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                    <Select
                                                        labelId="demo-simple-select-standard-label"
                                                        id="demo-simple-select-standard"
                                                        {...register("tipoBase")}>
                                                        <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                        <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                    </Select>
                                                </FormControl>
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
                                                    {...register("base")}/>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                                    <InputLabel id="demo-simple-select-helper-label">::Seleccione::</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
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
                                                    id="standard-number"
                                                    type="number"
                                                    style={{ width: "70px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard" 
                                                    {...register("porcentaje")}/>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="standard-read-only-input"
                                                    style={{ width: "70px" }}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                    variant="standard" 
                                                    {...register("total")}/>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained">
                                                    <AddIcon />
                                                </Button>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div >
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Base</b></TableCell>
                                                <TableCell align="center"><b>Cod. Retención</b></TableCell>
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
                                                <TableCell align="right" >Total Iva: {ccyFormat(invoiceTotal)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </SubCard>
                        <br></br>
                        <SubCard className="col-12" container title="Retención de Iva" style={{ textAlign: "center" }} >

                            <div >
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>Base</b></TableCell>
                                                <TableCell></TableCell>
                                                <TableCell align="center"><b>Cod. Retención</b></TableCell>
                                                <TableCell align="center"><b>Porcentaje</b></TableCell>
                                                <TableCell align="center"><b>Total</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >

                                            <TableRow hover>
                                                <TableCell align="right">
                                                    <label align="left"><b>Bienes</b> </label>
                                                </TableCell>
                                                <TableCell align="left">  <TextField id="outlined-basic" type="number" label="-" variant="outlined"  {...register("bienes")}/></TableCell>
                                                <TableCell align="left">
                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-helper-label">::Seleccione::</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            style={{ width: "280px", float: "right" }}
                                                            {...register("codRetencion")}
                                                            label="::Seleccione::"
                                                        >
                                                            <MenuItem value={10}>Ten</MenuItem>
                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                        </Select>

                                                    </FormControl>

                                                </TableCell>
                                                <TableCell align="left">  <TextField id="outlined-basic" type="number" label="-" variant="outlined"  {...register("porcentaje")}/></TableCell>
                                                <TableCell align="left">  <TextField id="outlined-basic" type="number" label="-" variant="outlined"   {...register("total")}/></TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell align="right">
                                                    <label align="left"><b>Servicios</b> </label>
                                                </TableCell>
                                                <TableCell align="left">  <TextField id="outlined-basic" type="number" label="-" variant="outlined"  {...register("servicios")} /></TableCell>
                                                <TableCell align="left">
                                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                        <InputLabel id="demo-simple-select-helper-label">::Seleccione::</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            style={{ width: "280px", float: "right" }}
                                                            {...register("codRetencion")}
                                                            label="::Seleccione::"
                                                        >
                                                            <MenuItem value={10}>Ten</MenuItem>
                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                        </Select>

                                                    </FormControl>

                                                </TableCell>
                                                <TableCell align="left">  <TextField id="outlined-basic" type="number" label="-" variant="outlined"  {...register("porcentaje")} /></TableCell>
                                                <TableCell align="left">  <TextField id="outlined-basic" type="number" label="-" variant="outlined"  {...register("total")} /></TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell colSpan={3} />
                                                <TableCell colSpan={2} align="right" >Total Iva: ${ccyFormat(invoiceTotal)}</TableCell>

                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell />
                                                <TableCell ></TableCell>
                                                <TableCell align="center" >Total Retiene Factura: ${ccyFormat(invoiceTotal)}</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell ></TableCell>


                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </SubCard>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button >Guardar Retención</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default ModalRetencion;
