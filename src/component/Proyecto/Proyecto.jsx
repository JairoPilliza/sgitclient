import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
// project imports
import { useNavigate } from 'react-router-dom';
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
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { gridSpacing } from "store/constant";
import ModalNuevoProyecto from "./ModalProyecto";
import AddIcon from '@mui/icons-material/Add';

const Proyecto = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const navigate = useNavigate();
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => setOpen(false);
    ///////////////  
    const handleListItemClick = (event, index, route = '/Proyecto/PartidaPresupuestaria', row) => {

        handleClose(event);
        localStorage.setItem("nameProject", "Proyecto " + row.calories)
        if (route && route !== '') {
            navigate(route);
        }
    };

    function createData(name, calories, fat, carbs, protein, estado) {
        return { name, calories, fat, carbs, protein, estado };
    }

    const rows = [
        createData('1', 'USAID SALINAS', '17-06-2022', '17-10-2022', '', 'activo'),
        createData('2', 'HUAQUILLAS', '17-06-2022', '17-10-2022', '', 'activo'),
        createData('3', 'TI', '17-06-2022', '17-10-2022', '', 'activo'),
    ];

    var cont = 0;

    return (
        <MainCard title="Departamentos - Proyectos" >
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card >
                        <CardContent >

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Button variant='contained' startIcon={<AddIcon />} onClick={handleClickOpen('paper')}> Registrar Proyecto</Button>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Razón Social, Nombre o Ruc"
                                        style={{ width: "70%" }}
                                        placeholder="Razón Social, Nombre o Ruc"
                                        {...register("razonSocial")}
                                    />
                                    <IconButton type="submit" sx={{ p: '10px' }}  aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Grid> */}
                            </Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Departamento</TableCell>
                                            <TableCell align="center">Fecha Ini</TableCell>
                                            <TableCell align="center">Fecha Fin</TableCell>
                                            <TableCell align="center">Responsable</TableCell>
                                            <TableCell align="center">Estado</TableCell>
                                            <TableCell align="center">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow hover key={row.name}>
                                                <TableCell >
                                                    {cont = cont + 1}
                                                </TableCell>
                                                <TableCell align="center">{row.calories}</TableCell>
                                                <TableCell align="center">{row.fat}</TableCell>
                                                <TableCell align="center">{row.carbs}</TableCell>
                                                <TableCell align="center">{row.protein}</TableCell>
                                                <TableCell align="center">{row.estado}</TableCell>
                                                <TableCell align="center">
                                                    <Grid container spacing={2}>
                                                        <Grid item>
                                                            <Button variant="contained" style={{ width: "100%" }} onClick={(event) => handleListItemClick(event, 1, '/Proyecto/PartidaPresupuestaria', row)}>
                                                                <AddIcon />
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" style={{ width: "100%", backgroundColor: "#ffac33" }} >
                                                                <EditIcon />
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" style={{ width: "100%", backgroundColor: "#e91e63" }} >
                                                                <DeleteIcon />
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                    <ModalNuevoProyecto
                        open={open}
                        onClose={handleClose} />
                </Grid>
            </Grid>
        </MainCard>
    );
}


export default Proyecto;
