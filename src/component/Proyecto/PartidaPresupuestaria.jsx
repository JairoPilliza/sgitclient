import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { Accordion, AccordionDetails, AccordionSummary, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { gridSpacing } from "store/constant";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router";
import ActividadPresupuestaria from "./ActividadPresupuestaria";
import DepartamentoActividad from "services/DepartamentoActividad/DepartamentoActividadService";
const PartidaPresupuestaria = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [acording, setAcording] = useState(false);
    const [load, setLoad] = useState(0)
    const [listaDepartamentoActividad, setListaDepartamentoActividad] = useState([])

    const qs = JSON.stringify({ id: 0 });
    const navigate = useNavigate();
    const titleProject = localStorage.getItem("departamento");
    const handleClose = () => setOpen(false);

    useEffect(() => {
        DepartamentoActividad.Get().then(async (result) => {
            if (result.code === "1") {
                setListaDepartamentoActividad(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);

    const Save = (data) => {
        //alert("2") 
        DepartamentoActividad.Post(data).then(async (result) => {
            if (result.code === "1") {
                setLoad(load + 1)
            } else {
                alert(result.message);

            }
        });
    }

    const Update = (data) => {
        //data.idDepartamento=id
        DepartamentoActividad.Put(qs, data).then(async (result) => {
            if (result.code === "1") {
                setLoad(load + 1)
                //props.history.push("./TableAtencionEstudiante")
            } else {
                alert(result.message);
            }
        });
    }

    const onSubmit = (data, evento) => {
        //alert("1"); 
        data.idRol = 1;
        data.idDepartamento = localStorage.getItem("dep");
        Save(data);
    }


    return (
        <MainCard title="Partida Presupuestaria" >
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Card >
                        <CardHeader title={titleProject}>

                        </CardHeader>
                        <CardContent >

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextField
                                            {...register("descripcion")}
                                            id="descripcion"
                                            name="descripcion"
                                            label="Nombre del Actividad:"

                                            style={{ width: "100%" }}
                                            required

                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Button variant='contained' type="submit" startIcon={<AddIcon />} > Nueva Actividad</Button>
                                    </Grid>
                                </Grid>

                            </form>
                            <br />
                            {
                                listaDepartamentoActividad.map((row, index) => {
                                    return (<ActividadPresupuestaria 
                                        key={index}
                                        index ={index}
                                        descripcion = {row.descripcion}
                                        id={row.idDepartamentoActividad}
                                    />)
                                })
                            }


                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </MainCard>
    );
}


export default PartidaPresupuestaria;
