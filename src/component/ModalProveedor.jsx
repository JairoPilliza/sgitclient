import React, { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Grid, Link, Stack } from '@mui/material';
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


const ModalNuevoProveedor = (props) => {
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
                <DialogTitle id="scroll-dialog-title">Registrar Proveedor</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <Card container style={{ textAlign: "center" }} >
                            <br />
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={2}>
                                    <FormControl sx={{ minWidth: '50%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Tipo Contribuyente</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            placeholder="Número de secuencia inicial (1)"
                                            label="Secuencial Inicial"
                                            {...register("tipoContribuyente")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>

                                    </FormControl>
                                    

                                    <TextField
                                        id="outlined-date"
                                        label="RUC:"
                                        placeholder="13 dígitos"
                                        helperText='Clickee fuera para validar el "RUC"'
                                        style={{ width: "100%" }}
                                        required
                                        {...register("ruc")}
                                    />

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <TextField
                                        id="outlined-date"
                                        label="Razón Social:"
                                        style={{ width: "100%" }}
                                        required
                                        {...register("razonSocial")}
                                    />
                                    <TextField
                                        id="outlined-date"
                                        label="Nombre:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("nombre")}
                                    />

                                   

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <TextField
                                        id="outlined-date"
                                        label="Dirección:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("direccion")}
                                    />
                                    <TextField
                                        id="outlined-date"
                                        label="Teléfono:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("telefono")}
                                    />
                                  


                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <FormControl sx={{ minWidth: '50%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">País</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            label="País"
                                            {...register("pais")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>

                                    </FormControl>
                                    <TextField
                                        id="outlined-date"
                                        label="Celular:"

                                        style={{ width: "100%" }}

                                        {...register("celular")}
                                    />
                                   


                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <FormControl sx={{ minWidth: '50%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Ciudad</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            label="Ciudad"
                                            {...register("ciudad")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>

                                        </Select>

                                    </FormControl>
                                    <TextField
                                        id="outlined-date"
                                        label="N° Autorización:"

                                        style={{ width: "100%" }}

                                        {...register("numeroAutorizacion")}
                                    />



                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        id="outlined-date"
                                        label="Fecha Caducidad:"
                                        type="date"
                                        style={{ width: "100%" }}

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...register("fechaCaducidad")}
                                    />
                                    <TextField
                                        id="outlined-date"
                                        label="Punto de Facturación:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("puntoFacturacion")}
                                    />

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        id="outlined-date"
                                        label="Sucursal:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("sucursal")}
                                    />

                                    <TextField
                                        id="outlined-date"
                                        label="Email:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("correo")}
                                    />

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        id="outlined-date"
                                        label="Secuencial Min:"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("secuencialMin")}
                                    />

                                    <TextField
                                        id="outlined-date"
                                        label="Observación:"
                                        multiline
                                        style={{ width: "100%" }}
                                        required
                                        {...register("observacion")}
                                    />

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        id="outlined-date"
                                        label="Secuencial Max:"

                                        style={{ width: "50%" }}
                                        required
                                        {...register("secuencialMax")}
                                    />
                                </Stack>
                            </Stack>
                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button >Registar Proveedor</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default ModalNuevoProveedor;
