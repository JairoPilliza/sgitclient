import React, { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Divider, Grid } from '@mui/material';
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

                <DialogTitle id="scroll-dialog-title">Reembolso</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>



                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12} >

                            <FormControl sx={{ minWidth: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Tipo Identificación</InputLabel>
                                <Select
                                    {...register("tipoIdentificacion")}
                                    labelId="demo-simple-select-helper-label"
                                    id="tipoIdentificacion"
                                    name="tipoIdentificacion"
                                    style={{ width: "100%" }}
                                    required
                                    label="Tipo Identificación"

                                >
                                    <MenuItem value={10}>RUC</MenuItem>
                                    <MenuItem value={20}>CEDULA</MenuItem>
                                    <MenuItem value={20}>PASAPORTE</MenuItem>

                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            <TextField
                                {...register("numeroIdentificacion")}
                                id="numeroIdentificacion"
                                name="numeroIdentificacion"
                                label="Número de Identificación:"
                                style={{ width: "100%" }}
                                required

                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            <FormControl sx={{ minWidth: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Tipo Comprobante</InputLabel>
                                <Select
                                    {...register("tipoComprobante")}
                                    labelId="demo-simple-select-helper-label"
                                    id="tipoComprobante"
                                    name="tipoComprobante"
                                    style={{ width: "100%" }}
                                    required
                                    label="Tipo Comprobante"

                                >
                                    <MenuItem value={10}>FACTURA</MenuItem>
                                    <MenuItem value={20}>NOTA DE VENTA</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={2} md={2} sm={12} xs={12}  >
                            <TextField
                                {...register("establecimiento")}
                                id="establecimiento"
                                name="establecimiento"
                                label="Establecimiento:"
                                style={{ width: "100%" }}
                                required

                            />
                        </Grid>
                        <Grid item lg={2} md={2} sm={12} xs={12} >
                            <TextField
                                {...register("puntoEmision")}
                                id="puntoEmision"
                                name="puntoEmision"
                                label="Punto Emisión:"
                                style={{ width: "100%" }}
                                required

                            />
                        </Grid>
                        <Grid item lg={2} md={2} sm={12} xs={12}  >
                            <TextField
                                {...register("secuencial")}
                                id="secuencial"
                                name="secuencial"
                                label="secuencial:"
                                style={{ width: "100%" }}
                                required

                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            <TextField
                                {...register("autorizacion")}
                                id="autorizacion"
                                name="autorizacion"
                                label="N° Autorización:"

                                style={{ width: "100%" }}
                                required

                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            <TextField
                                {...register("fechaEmision")}
                                id="fechaEmision"
                                name="fechaEmision"
                                label="Fecha Emision:"
                                type="date"
                                style={{ width: "100%" }}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                        </Grid>
                    </Grid>
                    <Card>
                        <CardHeader title="Bases Imponibles" style={{ textAlign: "left" }} />
                        <Divider />
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                <TextField
                                    {...register("baseImponibleIvaCero")}
                                    id="baseImponibleIvaCero"
                                    name="baseImponibleIvaCero"
                                    label="Tarifa IVA 0%:"
                                    type="number"
                                    style={{ width: "100%" }}
                                    required

                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} />
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                    {...register("baseImponibleDiferenteCero")}
                                    id="baseImponibleDiferenteCero"
                                    name="baseImponibleDiferenteCero"
                                    label="Tarifa IVA diferente 0%:"
                                    style={{ width: "100%" }}
                                    required
                                    type="number"

                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <TextField
                                    {...register("montoIva")}
                                    id="montoIva"
                                    name="montoIva"
                                    label="Monto de IVA:"
                                    type="number"
                                    style={{ width: "100%" }}
                                    required

                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >

                                <TextField
                                    {...register("baseImponibleNoObjetoIva")}
                                    id="baseImponibleNoObjetoIva"
                                    name="baseImponibleNoObjetoIva"
                                    label="Tarifa No Objeto de IVA:"
                                    type="number"
                                    style={{ width: "100%" }}
                                    required

                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}  >
                                <TextField
                                    {...register("montoIce")}
                                    id="montoIce"
                                    name="montoIce"
                                    label="Monto de ICE:"
                                    type="number"
                                    style={{ width: "100%" }}
                                    required


                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12} >

                                <TextField
                                    {...register("baseImponibleExentaIva")}
                                    id="baseImponibleExentaIva"
                                    name="baseImponibleExentaIva"
                                    label="Base Exenta IVA:"
                                    type="number"
                                    style={{ width: "100%" }}
                                    required

                                />
                            </Grid>
                        </Grid>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button type="submit" >Registar </Button>
                </DialogActions>

            </Dialog>
        </Fragment >

    );
}

export default ModalReembolso;
