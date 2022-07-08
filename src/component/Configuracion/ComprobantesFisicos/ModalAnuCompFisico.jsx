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
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle id="scroll-dialog-title">Comprobante anulado</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                  
                        {/* <SubCard className="col-12" container title="Datos del Usuario" style={{ textAlign: "center" }} > */}
                            <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Tipo Comprobante</InputLabel>
                                        <Select
                                            {...register("sucursal")}
                                            labelId="demo-simple-select-helper-label"
                                            id="tipoComprobante"
                                            name="tipoComprobante"
                                            style={{ width: "100%" }}
                                            required
                                            label="Tipo comprobante"

                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <label>
                                        <b>N° Serie</b>
                                    </label>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <TextField
                                        {...register("establecimiento")}
                                        id="establecimiento"
                                        name="establecimiento"
                                        label="Establecimiento:"
                                        style={{ width: "100%" }}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <TextField
                                        {...register("puntoEmision")}
                                        id="puntoEmision"
                                        name="puntoEmision"
                                        label="Punto Emisión:"
                                        style={{ width: "100%" }}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                        {...register("secuencialDesde")}
                                        id="secuencialDesde"
                                        name="secuencialDesde"
                                        label="Secuencial desde:"

                                        style={{ width: "100%" }}
                                        required

                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        {...register("secuencialHasta")}
                                        id="secuencialHasta"
                                        name="secuencialHasta"
                                        label="Secuencial hasta:"

                                        style={{ width: "100%" }}
                                        required

                                    />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        {...register("numeroAutorizacion")}
                                        id="numeroAutorizacion"
                                        name="numeroAutorizacion"
                                        label="N° Autorización:"
                                        style={{ width: "100%" }}
                                        required

                                    />
                                </Grid>


                            </Grid>
                        {/* </SubCard> */}
                        <br />

                   
                {/* </form> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button type="submit" >Aceptar</Button>
            </DialogActions>

        </Dialog>
        </Fragment >

    );
}

export default ModalComprobanteFisico;
