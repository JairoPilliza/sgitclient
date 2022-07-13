import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import { Accordion, AccordionDetails, AccordionSummary, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { gridSpacing } from "store/constant";
import AddIcon from '@mui/icons-material/Add';
import ActividadPresupuestaria from "./ActividadPresupuestaria";
import DepartamentoActividad from "services/DepartamentoActividad/DepartamentoActividadService";
import { useSearchParams, useParams, useLocation  } from "react-router-dom";
import useNavigateParamsSearch from "hooks/useNavigateParamsSearch";

const PartidaPresupuestaria = (props) => {
    const search  = useNavigateParamsSearch();
    console.log(search);
    
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [load, setLoad] = useState(0)
    const [listaDepartamentoActividad, setListaDepartamentoActividad] = useState([])
    //const id = 0;
    const titleProject = ""; // localStorage.getItem("departamento");
    // const id2 = localStorage.getItem("dep");
    // const qs = Resource.convertObjectToQueryStringUnique("json", { id: id2 });


    useEffect(() => {
        // DepartamentoActividad.Get("?json=" + JSON.stringify({ id: id })).then(async (result) => {
        //     if (result.code === "1") {
        //         setListaDepartamentoActividad(result.payload ? JSON.parse(result.payload) : [])
        //         return;
        //     }
        //     console.log(result.message);
        // }).catch(e => {
        //     console.log(e.message);
        // });
    }, [load]);

    const Save = (data) => {

        // DepartamentoActividad.Post(data).then(async (result) => {
        //     if (result.code === "1") {
        //         setLoad(load + 1)
        //     } else {
        //         alert(result.message);

        //     }
        // });
    }

    const Update = (data) => {

        // DepartamentoActividad.Put("?json=" + JSON.stringify({ id: id }), data).then(async (result) => {
        //     if (result.code === "1") {
        //         setLoad(load + 1)
        //     } else {
        //         alert(result.message);
        //     }
        // });
    }

    const onSubmit = (data, evento) => {

        data.idRol = 1;
        data.idDepartamento = localStorage.getItem("dep");
        Save(data);
    }


    return (

        <Grid container spacing={gridSpacing} >
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card >
                    <CardHeader
                        title={titleProject}
                        subheader={"Partida Presupuestaria"}
                    >


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
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <TextField
                                        {...register("orden")}
                                        id="orden"
                                        name="orden"
                                        label="Orden:"
                                        type="number"
                                        style={{ width: "100%" }}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <Button variant='contained' type="submit" startIcon={<AddIcon />} > Nueva Actividad</Button>
                                </Grid>
                            </Grid>

                        </form>
                        <br />
                        {
                            listaDepartamentoActividad.map((row, index) => {
                                return (<ActividadPresupuestaria
                                    key={index}
                                    index={index}
                                    descripcion={row.descripcion}
                                    id={row.idDepartamentoActividad}

                                />)
                            })
                        }


                    </CardContent>
                </Card>

            </Grid>
        </Grid>

    );
}


export default PartidaPresupuestaria;
