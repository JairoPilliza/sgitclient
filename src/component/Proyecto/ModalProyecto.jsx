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
import DialogTitle from '@mui/material/DialogTitle';
import sitem1 from "services/DepartamentoService/DepartamentoService";
import useNavigateParamsSearch from "hooks/useNavigateParamsSearch";

const ModalNuevoProyecto = (props) => {
    const params = useNavigateParamsSearch();
    const { register, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({});
    const [scroll, setScroll] = useState('paper');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => { reset(form) }, [form]);

    useEffect(() => {
        if (typeof params === "object") {
            setEditMode(true)        
            setForm(props.departamento)
        } else {
            setEditMode(false)
            setForm({})
        }
    }, []);

    const Save = (data) => {
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(!props.load)
            } else {
                alert(result.message);

            }
        });
    }
    
    const Update = (data) => {
        sitem1.Put(params.id, data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(!props.load)
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => {
        data.idRol = 1;
        (editMode) ? Update(data) : Save(data);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers={scroll === 'paper'}>

                        <Grid container spacing={2}>
                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("codigoDepartamentoAASINet")}
                                        id="codigoDepartamentoAASINet"
                                        name="codigoDepartamentoAASINet"
                                        label="Codigo de Proyecto:"
                                        style={{ width: "100%" }}
                                        required
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("descripcion")}
                                        id="descripcion"
                                        name="descripcion"
                                        label="Nombre del Proyecto:"
                                        placeholder="Departamento"
                                        style={{ width: "100%" }}
                                        required
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
                                    />

                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("presupuesto")}
                                        id="presupuesto"
                                        name="presupuesto"
                                        type="number"
                                        label="Presupuesto del proyecto:"
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
                                            style={{ width: "100%" }}
                                            required
                                            label="Estado"
                                            defaultValue={true}
                                        >

                                            <MenuItem value={true}>Activo</MenuItem>
                                            <MenuItem value={false}>Inactivo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit">Registar </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </Fragment >

    );
}

export default ModalNuevoProyecto;
