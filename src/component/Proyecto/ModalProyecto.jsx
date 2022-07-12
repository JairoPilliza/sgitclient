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
import sitem1 from "services/DepartamentoService/DepartamentoService";
import Resource from "resource/resource";

const ModalNuevoProyecto = (props) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({});
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
   
    const [editMode, setEditMode] = useState(false);
    const id = props.departamento.idDepartamento;
    const qs = Resource.convertObjectToQueryStringUnique("json", { id: id });
    useEffect(() => { reset(form) }, [form]);
    useEffect(() => {
        if(id >0){
            setEditMode(true)
             setForm(props.departamento)
       
        }else{
            setEditMode(false)
            setForm(null)
        }
           
       
        //setEditMode(true)
        // if(props.departamento != null){
        // }

        //props.setDepartamento(props.departamento) 
    })

   

    // useEffect(() => {
    //     if (id > 0) {
    //         sitem1.GetT(qs).then(async (result) => {
    //             if (result.code === "1") {
    //                 setDepartamento(result.payload ? JSON.parse(result.payload) : [])
    //                 setEditMode(true)
    //             } else {
    //                 console.log(result.message + "vacio");
    //             }
    //         });
    //     }
    // }, []);

    const Save = (data) => {
        //alert("2") 
        sitem1.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(props.load+1)
            } else {
                alert(result.message);

            }
        });
    }
    const Update = (data) => {
        //data.idDepartamento=id
        sitem1.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(props.load+1)
                //props.history.push("./TableAtencionEstudiante")
            } else {
                alert(result.message);
            }
        });
    }
    const onSubmit = (data, evento) => {
        //alert("1"); 
        data.idRol = 1;
        (editMode) ? Update(data) : Save(data);
    }
    // const back = () => {
    //     props.history.push("./TableAtencionEstudiante");
    // }

    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers={scroll === 'paper'}>

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
                                    //value={form.descripcion}
                                    // onChange={handleChange}

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
                                    // value={form.donante}
                                    //onChange={handleChange}
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
                                    //value={form.coordinador}
                                    //onChange={handleChange}
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
                                    //value={form.fechaInicio}
                                    //onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <TextField
                                        {...register("presupuesto")}
                                        id="presupuesto"
                                        name="presupuesto"
                                        type="number"
                                        label="Presupuesto del proyecto:"
                                        style={{ width: "100%" }}
                                        required
                                    //value={form.presupuesto}
                                    //onChange={handleChange}
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
                                        //value=""
                                        // onChange={handleChange}
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
