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
import { ThemeProvider } from "@mui/styles";
import { Form } from "formik";


const ModalNuevoProyecto = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({descripcion:"",donante:"",coordinador:"",fechaInicio:"",presupuesto:"",estado:0});
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (e) => {
       
     

    }


    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

        console.log(form);
       
        
    }

    const Save = (e) => {        

        console.log(form);
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
                
                    <DialogTitle id="scroll-dialog-title">Registrar Proyecto - Departamento</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        <Grid container spacing={2}>
                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("descripcion")}
                                        id="descripcion"
                                        name="descripcion"
                                        label="Nombre del Proyecto:"
                                        placeholder="Departamento"
                                        style={{ width: "100%" }}
                                        required
                                        value={form.descripcion}
                                        onChange={handleChange}

                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("donante")}
                                        id="donante"
                                        name="donante"
                                        label="Donante:"
                                        placeholder="Donante"
                                        style={{ width: "100%" }}
                                        required
                                        value={form.donante}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("coordinador")}
                                        id="coordinador"
                                        name="coordinador"
                                        label="Coordinador:"
                                        placeholder="Coordinador"
                                        style={{ width: "100%" }}
                                        required
                                        value={form.coordinador}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                        {...register("fechaInicio")}
                                        id="fechaInicio"
                                        name="fechaInicio"
                                        label="Fecha Inicial:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        required
                                        value={form.fechaInicio}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("presupuesto")}
                                        id="presupuesto"
                                        name="presupuesto"
                                        label="Presupuesto del proyecto:"
                                        style={{ width: "100%" }}
                                        required
                                        value={form.presupuesto}
                                        onChange={handleChange}
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
                                            value={form.estado}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>Activo</MenuItem>
                                            <MenuItem value={0}>Inactivo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </Grid>


                        {/* </form> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button onClick={Save}>Registar Proveedor</Button>
                    </DialogActions>
               
            </Dialog>
        </Fragment >

    );
}

export default ModalNuevoProyecto;
