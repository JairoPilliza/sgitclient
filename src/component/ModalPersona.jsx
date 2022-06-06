import React, { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Grid, Link, Stack } from '@mui/material';
import { useForm } from "react-hook-form"
// project imp

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';


const ModalNuevaPersona = (props) => {
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

    const onSubmit = (data, evento) => {
        alert();
      console.log(data);
        
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Dialog
                    open={props.open}
                    onClose={props.onClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle id="scroll-dialog-title">Registrar Persona Liquidación</DialogTitle>

                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <Card className="col-12" container style={{ textAlign: "center" }} >
                                <br />
                                <Stack spacing={2}>
                                    <TextField
                                        id="outlined-date"
                                        label="Apellidos y Nombres:"
                                        placeholder="Ingrese Apellidos y Nombres de la persona"

                                        style={{ width: "100%" }}
                                        required
                                        {...register("apellidosNombres")}
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <FormControl sx={{ minWidth: '50%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Tipo Documento:</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                style={{ width: "100%" }}
                                                required
                                                label="Tipo Documento:"
                                                {...register("tipoDocumento")}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>

                                            </Select>

                                        </FormControl>

                                        <TextField
                                            id="outlined-date"
                                            label="Doc Identificación:"
                                            placeholder="Ingrese Cédula o Ruc"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("numeroIdentificacion")}
                                        />

                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            id="outlined-date"
                                            label="Teléfono:"
                                            placeholder="Ingrese número telefónico"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("telefono")}
                                        />

                                        <TextField
                                            id="outlined-date"
                                            label="Email:"
                                            placeholder="gold@example.com"
                                            style={{ width: "100%" }}
                                            required
                                            {...register("correo")}
                                        />
                                    </Stack>
                                    <TextField
                                        id="outlined-date"
                                        label="Dirección:"
                                        placeholder="Ingrese dirección domiciliaria"
                                        style={{ width: "100%" }}
                                        multiline
                                        required
                                        {...register("direccionDomiciliaria")}
                                    />
                                </Stack>
                            </Card>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit" >Registar Proveedor</Button>
                    </DialogActions>
                </Dialog>

            </form>
        </div >

    );
}

export default ModalNuevaPersona;