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
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import ModalNuevoProveedor from "component/ModalProveedor";
import { gridSpacing } from "store/constant";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ModalDetalleProveedor from "./ModalDetalleProveedor";

const ListarProveedor = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [openDetalle, setOpenDetalle] = useState(false);
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    const handleClose = () => setOpen(false);
    ///////////////  
    const openDetalleClick = (scrollType) => () => {
        setOpenDetalle(true);
        setScroll(scrollType);
    }
    const closeDetalle = () => setOpenDetalle(false)

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
    ];


    return (
        <MainCard title="Proveedores" >
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card >
                        <CardContent >

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Button variant='contained' startIcon={<EditIcon />} onClick={handleClickOpen('paper')}> Registrar Proveedor</Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Razón Social, Nombre o Ruc"
                                        style={{ width: "70%" }}
                                        placeholder="Razón Social, Nombre o Ruc"
                                        {...register("razonSocial")}
                                    />
                                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>



                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">

                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Código</TableCell>
                                            <TableCell align="center">Razón Social</TableCell>
                                            <TableCell align="center">Ruc</TableCell>
                                            <TableCell align="center">Teléfono</TableCell>
                                            <TableCell align="center">Email</TableCell>
                                            <TableCell align="center">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow hover key={row.name}>
                                                <TableCell >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.calories}</TableCell>
                                                <TableCell align="center">{row.fat}</TableCell>
                                                <TableCell align="center">{row.carbs}</TableCell>
                                                <TableCell align="center">{row.protein}</TableCell>
                                                <TableCell align="center">{row.protein}</TableCell>
                                                <TableCell align="center">
                                                    <Grid container spacing={1}>
                                                        <Grid item>
                                                            <Button variant="contained">
                                                                <EditIcon />
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" onClick={openDetalleClick('paper')}  >
                                                                <FormatListBulletedIcon />
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

                        </CardContent>
                    </Card>
                    <ModalNuevoProveedor
                        open={open}
                        onClose={handleClose} />
                    <ModalDetalleProveedor
                        open={openDetalle}
                        onClose={closeDetalle}
                    />
                </Grid>
            </Grid>
        </MainCard>
    );
}


export default ListarProveedor;
