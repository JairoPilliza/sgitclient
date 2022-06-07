import React, { Fragment, useEffect, useState } from "react";
import { Card, Grid, Link, Stack } from '@mui/material';
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


const ModalRegistroLiquidacion = (props) => {
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
                                        <InputLabel id="demo-simple-select-helper-label">Establecimiento</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            label="Establecimiento"
                                            {...register("establecimiento")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}>
                                    <TextField
                                        id="outlined-date"
                                        label="N° Autorización:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("nAutorizacion")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}>
                                    <TextField
                                        id="outlined-date"
                                        label="Punto Emisión:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("puntoEmision")}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Secuencial Inicial</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            placeholder="Número de secuencia inicial (1)"
                                            label="Secuencial Inicial"
                                            {...register("secuencialIni")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Secuencial Fin</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            placeholder="Número de secuencia Final (100)"
                                            label="Secuencial Fin"
                                            {...register("secuencialFin")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>

                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        id="outlined-date"
                                        label="Fecha Apertura:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("fechaApertura")}
                                    />

                                </Grid>
                            </Grid>

                        </Card>


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button >Registar Usuario</Button>
                </DialogActions>
            </Dialog>
        </div >

    );
}

export default ModalRegistroLiquidacion;
