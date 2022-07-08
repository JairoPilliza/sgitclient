import React, { Fragment, useEffect, useState } from "react";
import { Divider, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
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
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
            >
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <DialogTitle id="scroll-dialog-title">Registrar Usuario</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        {/* <DialogContentText
                            id="scroll-dialog-description"

                            tabIndex={-1}
                        > */}
                            {/* <SubCard  container title="Datos del Usuario" style={{ textAlign: "center" }} > */}
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            {...register("nombreCompleto")}
                                            id="nombreCompleto"
                                            name="nombreCompleto"
                                            label="Nombre Completo:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Sucursal</InputLabel>
                                            <Select
                                                {...register("sucursal")}
                                                labelId="demo-simple-select-helper-label"
                                                id="sucursal"
                                                name="sucursal"
                                                style={{ width: "100%" }}
                                                required
                                                label="Sucursal"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> */}
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextField
                                            {...register("correo")}
                                            id="correo"
                                            name="correo"
                                            label="Email:"
                                            placeholder="Example@gmail.com "
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    {/* <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Politica</InputLabel>
                                            <Select
                                                {...register("politica")}
                                                labelId="demo-simple-select-helper-label"
                                                id="politica"
                                                name="politica"
                                                style={{ width: "100%" }}
                                                required
                                                label="Politica"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid> */}
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            {...register("usuario")}
                                            id="usuario"
                                            name="usuario"
                                            label="Usuario:"

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
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>

                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            {...register("contraseña")}
                                            id="contraseña"
                                            name="contraseña"
                                            label="Contraseña:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>

                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <br />
                                        <Divider />
                                        <br />
                                        Politicas
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Administrador" />
                                            <FormControlLabel control={<Checkbox />} label="Contador" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            {/* </SubCard> */}
                            <br />
                        {/* </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button type="submit" >Registar Usuario</Button>
                    </DialogActions>
                {/* </form> */}
            </Dialog>
        </Fragment >

    );
}

export default ModalUsuario;
