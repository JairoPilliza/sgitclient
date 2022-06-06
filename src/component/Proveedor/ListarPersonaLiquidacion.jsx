import React, { Fragment, useEffect, useState } from "react";
import { Grid, IconButton, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CachedIcon from '@mui/icons-material/Cached';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import { Stack } from "@mui/material";
import ModalRetencion from "component/ModalRetencion";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ModalNuevaPersona from "component/ModalPersona";

const ListarPersonaLiquidacion = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    //  const [open, setOpen] = React.useState(false);
    //const handleOpen = () => setOpen(true);
    //  const handleClose = () => setOpen(false);


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => {
        setOpen(false);
    };


    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
    ];


    return (
        <MainCard title="Listado de Personas Liquidación" >
            <Stack direction="row" spacing={2}>
                <Button variant='contained' startIcon={<GroupAddIcon />} onClick={handleClickOpen('paper')}> Agregar Persona Liquidacion</Button>
                <TextField
                    id="outlined-basic"
                    label="Ingrese nombre persona o Identificación"
                    style={{ width: "400px" }}
                    placeholder="Ingrese nombre persona o Identificación"
                    {...register("establecimiento")}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Stack>
            <br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Nombres</TableCell>
                            <TableCell align="center">Identificación</TableCell>
                            <TableCell align="center">Telefono</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Dirección</TableCell>
                            <TableCell align="center">Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                                <TableCell align="center">{row.protein}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained">
                                        <EditIcon />
                                    </Button>
                                    <Button variant="contained" >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalNuevaPersona
            open={open}
            onClose={handleClose}/>
        </MainCard>
    );
}


export default ListarPersonaLiquidacion;
