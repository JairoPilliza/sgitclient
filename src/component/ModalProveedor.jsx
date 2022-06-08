import React, { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, Grid, Link, Stack, Typography } from '@mui/material';
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
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ModalNuevoProveedor = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

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

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

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
                 <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="scroll-dialog-title">Registrar Proveedor</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <Card container style={{ textAlign: "center" }} >
                            <br />
                            <Grid container spacing={2}>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Tipo Contribuyente</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="tipoContribuyente"
                                                name="tipoContribuyente"
                                                style={{ width: "100%" }}
                                                required
                                                placeholder="Número de secuencia inicial (1)"
                                                label="Tipo Contribuyente"
                                                {...register("tipoContribuyente")}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="ruc"
                                            name="ruc"
                                            label="RUC:"
                                            placeholder="13 dígitos"
                                            helperText='Clickee fuera para validar el "RUC"'
                                            style={{ width: "100%" }}
                                            required
                                            {...register("ruc")}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="razonSocial"
                                            name="razonSocial"
                                            label="Razón Social:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("razonSocial")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="nombre"
                                            name="nombre"
                                            label="Nombre:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("nombre")}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="direccionDomiciliaria"
                                            name="direccionDomiciliaria"
                                            label="Dirección:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("direccionDomiciliaria")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="telefono"
                                            name="telefono"
                                            label="Teléfono:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("telefono")}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">País</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="pais"
                                                name="pais"
                                                style={{ width: "100%" }}
                                                required
                                                label="País"
                                                {...register("pais")}
                                            >
                                                <MenuItem value={10}>Ecuador</MenuItem>
                                                <MenuItem value={20}>Peru</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Ciudad</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="ciudad"
                                                name="ciudad"
                                                style={{ width: "100%" }}
                                                required
                                                label="Ciudad"
                                                {...register("ciudad")}
                                            >
                                                <MenuItem value={10}>Pujili</MenuItem>
                                                <MenuItem value={20}>Quito</MenuItem>
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="correo"
                                            name="correo"
                                            label="Email:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("correo")}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container item spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
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

                                </Grid>
                            </Grid>
                            <br></br>
                            <div>
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
                                        <br></br>
                                        <Grid container  spacing={2}>
                                            <Grid container item spacing={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        id="numeroAutorizacion"
                                                        name="numeroAutorizacion"
                                                        label="N° Autorización:"
                                                        style={{ width: "100%" }}
                                                        {...register("numeroAutorizacion")}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container item spacing={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        id="establecimiento"
                                                        name="establecimiento"
                                                        label="Establecimiento:"
                                                        style={{ width: "100%" }}
                                                        required
                                                        {...register("establecimiento")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        id="secuencialMin"
                                                        name="secuencialMin"
                                                        label="Secuencial Min:"

                                                        style={{ width: "100%" }}
                                                        required
                                                        {...register("secuencialMin")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        id="secuencialMax"
                                                        name="secuencialMax"
                                                        label="Secuencial Max:"
                                                        style={{ width: "100%" }}
                                                        required
                                                        {...register("secuencialMax")}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button type="submit">Registar Proveedor</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div >

    );
}

export default ModalNuevoProveedor;
