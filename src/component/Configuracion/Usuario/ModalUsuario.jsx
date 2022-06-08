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


const ModalUsuario = (props) => {
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
                    <DialogTitle id="scroll-dialog-title">Registrar Usuario</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                        
                            tabIndex={-1}
                        >
                            <SubCard className="col-12" container title="Datos del Usuario" style={{ textAlign: "center" }} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="nombreCompleto"
                                            name="nombreCompleto"
                                            label="Nombre Completo:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("nombreCompleto")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Sucursal</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="sucursal"
                                                name="sucursal"
                                                style={{ width: "100%" }}
                                                required
                                                label="Sucursal"
                                                {...register("sucursal")}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="correo"
                                            name="correo"
                                            label="Email:"
                                            placeholder="Example@gmail.com "
                                            style={{ width: "100%" }}
                                            required
                                            {...register("correo")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Politica</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="politica"
                                                name="politica"
                                                style={{ width: "100%" }}
                                                required
                                                label="Politica"
                                                {...register("politica")}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="usuario"
                                            name="usuario"
                                            label="Usuario:"

                                            style={{ width: "100%" }}
                                            required
                                            {...register("usuario")}
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
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>

                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="contraseña"
                                            name="contraseña"
                                            label="Contraseña:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("contraseña")}
                                        />
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button type="submit" >Registar Usuario</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >

    );
}

export default ModalUsuario;
