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
const PartidaPresupuestaria = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [acording, setAcording] = useState(false);
    const navigate = useNavigate();

    const titleProject = localStorage.getItem("nameProject");

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => setOpen(false);
    ///////////////  
    const back = (event, index, route = '/Proyecto/Proyecto') => {

        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };

    function createData(cuenta, descripcion, porcentaje, cantidad, tiempo, precio, total) {
        return { cuenta, descripcion, porcentaje, cantidad, tiempo, precio, total };
    }

    const rows = [
        createData('Personal', '-----------', '10', 1, 25, 700, 700),
        createData('Muebles', '-----------', '10', 1, 30, 500, 500),
        createData('Pasaje', '-----------', '10', 2, 10, 100, 200),
    ];

    var cont = 0;
    var newItem;
    if (acording) {
        newItem = <ActividadPresupuestaria />;
    }


    return (
        <MainCard title="Partida Presupuestaria" >
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Card >
                        <CardHeader title={titleProject}>

                        </CardHeader>
                        <CardContent >
                            <Grid container spacing={2}>
                                <Grid container item spacing={2}>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <Button variant='contained' onClick={(event) => back(event, 1, '/Proyecto/Proyecto')} ><KeyboardReturnIcon /></Button>
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={12} xs={12} >
                                        <Button variant='contained' startIcon={<AddIcon />} onClick={() => setAcording(true)} > Nueva Actividad</Button>
                                    </Grid>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        {...register("actividad")}
                                        id="actividad"
                                        name="actividad"
                                        label="Nombre del Actividad:"

                                        style={{ width: "100%" }}
                                        required
                                    
                                    />
                                </Grid>
                                <ActividadPresupuestaria />

                                {newItem}
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </MainCard>
    );
}


export default PartidaPresupuestaria;
