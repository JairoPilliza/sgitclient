import React, { Fragment, useEffect, useState } from "react";
import { Card, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imp

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <Card className="col-12" container style={{ textAlign: "center" }} >
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}  >
                                        <TextField
                                            {...register("nombreCompleto")}
                                            id="nombreCompleto"
                                            name="nombreCompleto"
                                            label="Apellidos y Nombres:"
                                            placeholder="Ingrese Apellidos y Nombres de la persona"

                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >

                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Tipo Documento:</InputLabel>
                                            <Select
                                                {...register("tipoDocumento")}
                                                labelId="demo-simple-select-helper-label"
                                                id="tipoDocumento"
                                                name="tipoDocumento"
                                                style={{ width: "100%" }}
                                                required
                                                label="Tipo Documento:"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>

                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                        <TextField
                                            {...register("numeroIdentificacion")}
                                            id="numeroIdentificacion"
                                            name="numeroIdentificacion"
                                            label="Doc Identificación:"
                                            placeholder="Ingrese Cédula o Ruc"
                                            style={{ width: "100%" }}
                                            required

                                        />

                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            {...register("telefono")}
                                            id="telefono"
                                            name="telefono"
                                            label="Teléfono:"
                                            placeholder="Ingrese número telefónico"
                                            style={{ width: "100%" }}
                                           

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            {...register("celular")}
                                            id="celular"
                                            name="celular"
                                            label="Celular:"
                                            placeholder="Ingrese número celular"
                                            style={{ width: "100%" }}
                                            

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >

                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Profesión:</InputLabel>
                                            <Select
                                                {...register("profesionTipo")}
                                                labelId="demo-simple-select-helper-label"
                                                id="profesionTipo"
                                                name="profesionTipo"
                                                style={{ width: "100%" }}
                                                required
                                                label="Profesión:"

                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>

                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                            {...register("email")}
                                            id="email"
                                            name="email"
                                            label="Email:"
                                            placeholder="gold@example.com"
                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                        <TextField
                                            {...register("direccion")}
                                            id="direccion"
                                            name="direccion"
                                            label="Dirección:"
                                            placeholder="Ingrese dirección domiciliaria"
                                            style={{ width: "100%" }}
                                            multiline
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                        <TextField
                                            {...register("observacion")}
                                            id="observacion"
                                            name="observacion"
                                            label="Observación:"

                                            style={{ width: "100%" }}
                                            multiline
                                           

                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        </DialogContentText>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit" >Registar Persona</Button>
                    </DialogActions>
               
            </Dialog>

        </div >

    );
}

export default ModalNuevaPersona;
