import React, { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Divider, Grid, Link, Stack, Typography } from '@mui/material';
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


const ModalReembolso = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        p: 4,
    };


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
                <DialogTitle id="scroll-dialog-title">Crear registro de autorización de liquidación</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <Card className="col-12" container title="Datos del Usuario" style={{ textAlign: "center" }} >
                            <br></br>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>

                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Tipo Identificación</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="tipoIdentificacion"
                                            style={{ width: "100%" }}
                                            required
                                            label="Tipo Identificación"
                                            {...register("tipoIdentificacion")}
                                        >
                                            <MenuItem value={10}>RUC</MenuItem>
                                            <MenuItem value={20}>CEDULA</MenuItem>
                                            <MenuItem value={20}>PASAPORTE</MenuItem>

                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        id="outlined-date"
                                        label="Número de Identificación:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("numeroIdentificacion")}
                                    />
                                </Grid>


                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Tipo Comprobante</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="tipoComprobantedemo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            label="Tipo Comprobante"
                                            {...register("tipoComprobante")}
                                        >
                                            <MenuItem value={10}>FACTURA</MenuItem>
                                            <MenuItem value={20}>NOTA DE VENTA</MenuItem>

                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <TextField
                                        id="establecimiento"
                                        label="Establecimiento:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("establecimiento")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <TextField
                                        id="puntoEmision"
                                        label="Punto Emisión:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("puntoEmision")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <TextField
                                        id="secuencial"
                                        label="secuencial:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("secuencial")}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        id="nAutorizacion"
                                        label="Tarifa IVA 0%:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("nAutorizacion")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        id="fechaEmision"
                                        label="Fecha Emision:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("fechaEmision")}
                                    />

                                </Grid>
                            </Grid>


                            <Card>
                                <CardHeader title="Bases Imponibles" style={{ textAlign: "left" }} />
                                <Divider />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="tarIVA0"
                                            label="Tarifa IVA 0%:"
                                            type="number"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("tarIVA0")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} />


                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="tarIVAdif0"
                                            label="Tarifa IVA diferente 0%:"
                                            style={{ width: "100%" }}
                                            required
                                            type="number"
                                            {...register("tarIVAdif0")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="montoIVA"
                                            label="Monto de IVA:"
                                            type="number"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("montoIVA")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>

                                        <TextField
                                            id="tarnoObjIVA"
                                            label="Tarifa No Objeto de IVA:"
                                            type="number"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("tarnoObjIVA")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="montoIce"
                                            label="Monto de ICE:"
                                            type="number"
                                            style={{ width: "100%" }}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register("montoIce")}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6}>

                                        <TextField
                                            id="baseExIVA"
                                            label="Base Exenta IVA:"
                                            type="number"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("baseExIVA")}
                                        />
                                    </Grid>
                                </Grid>

                            </Card>
                        </Card>



                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button >Registar </Button>
                </DialogActions>
            </Dialog>
        </div >

    );
}

export default ModalReembolso;
