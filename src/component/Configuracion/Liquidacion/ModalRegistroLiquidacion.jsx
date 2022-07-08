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
                    <DialogTitle id="scroll-dialog-title">Crear registro de autorización de liquidación</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                       

                            {/* <Card className="col-12" container title="Datos del Usuario" style={{ textAlign: "center" }} > */}
                                <br></br>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Establecimiento</InputLabel>
                                            <Select
                                                {...register("establecimiento")}
                                                labelId="demo-simple-select-helper-label"
                                                id="establecimiento"
                                                name="establecimiento"
                                                style={{ width: "100%" }}
                                                required
                                                label="Establecimiento"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <TextField
                                            {...register("numeroAutorizacion")}
                                            id="numeroAutorizacion"
                                            name="numeroAutorizacion"
                                            label="N° Autorización:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <TextField
                                            {...register("puntoEmision")}
                                            id="puntoEmision"
                                            name="puntoEmision"
                                            label="Punto Emisión:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                            {...register("secuencialInicial")}
                                            id="secuencialInicial"
                                            name="secuencialInicial"
                                            label="Secuencial Inicial:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                            {...register("secuencialFin")}
                                            id="secuencialFin"
                                            name="secuencialFin"
                                            label="Secuencial Fin:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextField
                                            {...register("fechaApertura")}
                                            id="fechaApertura"
                                            name="fechaApertura"
                                            label="Fecha Apertura:"
                                            type="date"
                                            style={{ width: "100%" }}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                    </Grid>
                                </Grid>
                            {/* </Card> */}
                        {/* </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit">Registar Usuario</Button>
                    </DialogActions>
                {/* </form> */}
            </Dialog>
        </Fragment >

    );
}

export default ModalRegistroLiquidacion;
