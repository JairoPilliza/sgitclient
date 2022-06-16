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

const ModalComprobanteFisico = (props) => {
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
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="scroll-dialog-title">Comrobante anulado</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"

                            tabIndex={-1}
                        >
                            <SubCard className="col-12" container title="Datos del Usuario" style={{ textAlign: "center" }} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Tipo Comprobante</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="tipoComprobante"
                                                name="tipoComprobante"
                                                style={{ width: "100%" }}
                                                required
                                                label="Tipo comprobante"
                                                {...register("sucursal")}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <label>
                                           <b>N° Serie</b> 
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField
                                            id="establecimiento"
                                            name="establecimiento"
                                            label="Establecimiento:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("establecimiento")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <TextField
                                            id="puntoEmision"
                                            name="puntoEmision"
                                            label="Punto Emisión:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("puntoEmision")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="secuencialDesde"
                                            name="secuencialDesde"
                                            label="Secuencial desde:"
                                            
                                            style={{ width: "100%" }}
                                            required
                                            {...register("secuencialDesde")}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField
                                            id="secuencialHasta"
                                            name="secuencialHasta"
                                            label="Secuencial hasta:"

                                            style={{ width: "100%" }}
                                            required
                                            {...register("secuencialHasta")}
                                        />
                                    </Grid>
                                
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <TextField
                                            id="numeroAutorizacion"
                                            name="numeroAutorizacion"
                                            label="N° Autorización:"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("numeroAutorizacion")}
                                        />
                                    </Grid>
                                    
                                   
                                </Grid>
                            </SubCard>
                            <br />
                            
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button type="submit" >Aceptar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >

    );
}

export default ModalComprobanteFisico;
