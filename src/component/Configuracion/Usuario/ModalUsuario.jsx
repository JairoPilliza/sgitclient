import React, { Fragment, useEffect, useState } from "react";
import {  Divider, FormControlLabel, FormGroup, Grid } from '@mui/material';
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
                                    {/* <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                    </Grid> */}
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
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <br/>
                                    <Divider/>
                                    <br/>
                                        Politicas
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Administrador" />
                                            <FormControlLabel  control={<Checkbox />} label="Contador" />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </SubCard>
                            <br />
                            {/* <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ backgroundColor: "yellow" }}
                                >
                                    <Typography>Datos del Proveedor</Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                                        <Grid item xs={6} spacing={2}>
                                            <Grid item xs={12} >
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numero Ruc: "
                                                    style={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numero Autorización:"
                                                    style={{ width: "100%" }}
                                                />
                                            </Grid>

                                        </Grid>
                                        <Grid item xs={6} spacing={2}>
                                            <Grid item xs={12} >
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Telefono: "
                                                    style={{ width: "100%" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    id="outlined-date"
                                                    label="Dirección:"
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    id="outlined-date"
                                                    label="Email:"
                                                    style={{ width: "100%" }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion> */}
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
