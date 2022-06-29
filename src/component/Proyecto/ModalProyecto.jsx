import React, { Fragment, useEffect, useState } from "react";
import { Card, Grid } from '@mui/material';
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ModalNuevoProyecto = (props) => {
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
                            tabIndex={-1}
                        >
                            <Card container style={{ textAlign: "center" }} >
                                <br />
                                <Grid container spacing={2}>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                {...register("nombreProyecto")}
                                                id="nombreProyecto"
                                                name="nombreProyecto"
                                                label="Nombre del Proyecto:"
                                                placeholder="Departamento"
                                                style={{ width: "100%" }}
                                                required

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                {...register("fechaInicial")}
                                                id="fechaInicial"
                                                name="fechaInicial"
                                                label="Fecha Inicial:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required

                                            />
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                {...register("presupuestoProyecto")}
                                                id="presupuestoProyecto"
                                                name="presupuestoProyecto"
                                                label="Presupuesto del proyecto:"
                                                style={{ width: "100%" }}
                                                required

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                                                <Select
                                                    {...register("estado")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="estado"
                                                    name="estado"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Estado"

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

export default ModalNuevoProyecto;
