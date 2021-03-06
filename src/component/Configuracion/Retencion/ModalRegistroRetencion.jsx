import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';

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


const ModalRegistroRetencion = (props) => {
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
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                    <DialogTitle id="scroll-dialog-title">Retenciones Fisicas</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        {/* <DialogContentText
                            id="scroll-dialog-description"

                            tabIndex={-1}
                        > */}
                            {/* <SubCard className="col-12" container title="Registro de Talonarios" style={{ textAlign: "center" }} > */}


                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12} >

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
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <TextField
                                            {...register("numeroAutorizacion")}
                                            id="numeroAutorizacion"
                                            name="numeroAutorizacion"
                                            label="N?? Autorizaci??n:"

                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            {...register("puntoEmision")}
                                            id="puntoEmision"
                                            name="puntoEmision"
                                            label="Punto de Emisi??n:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            {...register("secuencialMin")}
                                            id="secuencialMin"
                                            name="secuencialMin"
                                            label="Secuencial Min:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            {...register("secuencialMax")}
                                            id="secuencialMax"
                                            name="secuencialMax"
                                            label="Secuencial Max:"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            {...register("fechaCaducidad")}
                                            id="fechaCaducidad"
                                            name="fechaCaducidad"
                                            label="Fecha Caducidad:"
                                            type="date"
                                            style={{ width: "100%" }}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                    </Grid>
                                </Grid>
                            {/* </SubCard> */}
                        {/* </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit" >Guardar</Button>
                    </DialogActions>
                {/* </form> */}
            </Dialog>
        </Fragment>

    );
}

export default ModalRegistroRetencion;
