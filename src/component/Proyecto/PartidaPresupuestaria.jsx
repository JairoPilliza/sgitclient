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

const PartidaPresupuestaria = (props) => {
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
                    <DialogTitle id="scroll-dialog-title">Registrar Proyecto - Departamento</DialogTitle>

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
                                            <TextField
                                                id="nombreProyecto"
                                                name="nombreProyecto"
                                                label="Nombre del Proyecto:"
                                                placeholder="Departamento"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("nombreProyecto")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField
                                                id="fechaInicial"
                                                name="fechaInicial"
                                                label="Fecha Inicial:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                {...register("fechaInicial")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField
                                                id="fechaFin"
                                                name="fechaFin"
                                                label="Fecha Fin:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                {...register("fechaFin")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField
                                                id="nombreResponsable"
                                                name="nombreResponsable"
                                                label="Nombre Responsable:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("nombreResponsable")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField
                                                id="presupuestoProyecto"
                                                name="presupuestoProyecto"
                                                label="Presupuesto del proyecto:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("presupuestoProyecto")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="estado"
                                                    name="estado"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Estado"
                                                    {...register("estado")}
                                                >
                                                    <MenuItem value={10}>Activo</MenuItem>
                                                    <MenuItem value={20}>Finalizado</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                </Grid>

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

export default PartidaPresupuestaria;
