import React, { Fragment, useEffect, useState } from "react";
import { Grid, IconButton } from '@mui/material';
import { useForm } from "react-hook-form"
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
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
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12}  md={12} sm={12} xs={12} >


                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            <Button variant='contained' startIcon={<EditIcon />} onClick={handleClickOpen('paper')}> Agregar Persona Liquidacion </Button>
                        </Grid>
                        <Grid item lg={6}  md={6}  sm={12} xs={12} >
                            <TextField
                                id="outlined-basic"
                                label="Ingrese persona o Identificación"
                                style={{ width: "70%" }}
                                placeholder="Ingrese persona o Identificación"
                                {...register("razonSocial")}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
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
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <Button variant="contained">
                                                        <EditIcon />
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" >
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
                    <ModalNuevaPersona
                        open={open}
                        onClose={handleClose} />
                </Grid>
            </Grid>
        </MainCard>
    );
}


export default ListarPersonaLiquidacion;
