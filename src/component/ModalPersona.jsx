import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@mui/material';
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
import IdentificacionTipo from "services/Identificacion/IdentificacionService";
import ProfesionTipo from "services/Profesion/ProfesionTipoService";
import PersonaLiquidacion from "services/PersonaLiquidacion/PersonaLiquidacionService";
import useNavigateParamsSearch from "hooks/useNavigateParamsSearch"; 

const ModalNuevaPersona = (props) => {
    const params = useNavigateParamsSearch();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({});
    const [identificacionTipo, setIdentificacionTipo] = useState([])
    const [profesionTipo, setProfesionTipo] = useState([])
    const [scroll, setScroll] = useState('paper');
    const [editMode, setEditMode] = useState(false);
   
 
    useEffect(() => { reset(form) }, [form]);

    useEffect(() => {
        
        if (typeof params === "object") {
           
            setEditMode(true)
           
            setForm(props.personaLiquidacion); 
        } else {
           
            setEditMode(false)
            setForm({})
        }
    },[props.recarga]);

    

    useEffect(() => {
        IdentificacionTipo.Get().then(async (result) => {
            if (result.code === "1") {
                setIdentificacionTipo(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        ProfesionTipo.Get().then(async (result) => {
            if (result.code === "1") {
                setProfesionTipo(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    const Save = (data) => {
        PersonaLiquidacion.Post(data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(props.load + 1)
            } else {
                alert(result.message);

            }
        });
    }
    const Update = (data) => {
        PersonaLiquidacion.Put({id:params.id}, data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(props.load + 1)
            } else {
                alert(result.message);
            }
        });
    };

    const onSubmit = (data, evento) => {
        data.idRol = 1;
        data.estado = true;
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

                <DialogTitle id="scroll-dialog-title">Registrar Persona Liquidación</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers={scroll === 'paper'}>
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
                                        {...register("idIdentificacionTipo")}
                                        labelId="demo-simple-select-helper-label"
                                        id="idIdentificacionTipo"
                                        name="idIdentificacionTipo"
                                        style={{ width: "100%" }}
                                        required
                                        label="Tipo Documento:"
                                        defaultValue={props.personaLiquidacion.idIdentificacionTipo}


                                    >
                                        <MenuItem value={0}>::SELECCIONAR:: </MenuItem>
                                        {
                                            identificacionTipo.map((row, index) => (
                                                <MenuItem key={index + 1} value={row.idIdentificacionTipo}> {row.codigoSri}-{row.descripcion} </MenuItem>
                                            ))
                                        }


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
                                        {...register("idProfesionTipo")}
                                        labelId="demo-simple-select-helper-label"
                                        id="idProfesionTipo"
                                        name="idProfesionTipo"
                                        style={{ width: "100%" }}
                                        required
                                        label="Profesión:"
                                        defaultValue={props.personaLiquidacion.idProfesionTipo}

                                    >
                                        <MenuItem value={0}>::SELECCIONAR:: </MenuItem>
                                        {
                                            profesionTipo.map((row, index) => (
                                                <MenuItem key={index + 1} value={row.idProfesionTipo}> {row.descripcion} </MenuItem>
                                            ))
                                        }

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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit" >Registar Persona</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </Fragment >

    );
}

export default ModalNuevaPersona;
