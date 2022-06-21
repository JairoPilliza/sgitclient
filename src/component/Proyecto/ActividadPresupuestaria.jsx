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

const ActividadPresupuestaria = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
  
    function createData(cuenta, descripcion, porcentaje, cantidad, tiempo, precio, total) {
        return { cuenta, descripcion, porcentaje, cantidad, tiempo, precio, total };
    }

    const rows = [
        createData('Personal', '-----------', '10', 1, 25, 700, 700),
        createData('Muebles', '-----------', '10', 1, 30, 500, 500),
        createData('Pasaje', '-----------', '10', 2, 10, 100, 200),
    ];

    var cont = 0;

    return (
        <Grid container item spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} >
                <TextField
                    id="actividad"
                    name="actividad"
                    label="Nombre del Actividad:"

                    style={{ width: "100%" }}
                    required
                    {...register("actividad")}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ border: 1 }}

                    >
                        <Typography variant="h4">Item</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} >

                            <Grid container item spacing={2} columns={32}>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Cuenta:</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="cuenta"
                                            name="cuenta"
                                            style={{ width: "100%" }}
                                            required
                                            label="Cuenta:"
                                            {...register("cuenta")}
                                        >
                                            <MenuItem value={10}>Personal</MenuItem>
                                            <MenuItem value={20}>Muebles</MenuItem>
                                            <MenuItem value={20}>Pasajes</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <TextField type="text" style={{ width: "100%" }} multiline {...register("descripcion")} id="descripcion" name="descripcion" label="Descripcion:" variant="outlined" />
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <TextField type="number" style={{ width: "100%" }} {...register("porcentaje")} id="porcentaje" name="porcentaje" label="Porcentaje:" variant="outlined" />
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <TextField type="number" style={{ width: "100%" }} {...register("cantidad")} id="cantidad" name="cantidad" label="Cantidad:" variant="outlined" />
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <TextField type="number" style={{ width: "100%" }} {...register("tiempo")} id="tiempo" name="tiempo" label="Tiempo:" variant="outlined" />
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <TextField type="number" style={{ width: "100%" }} {...register("precio")} id="precio" name="precio" label="Precio:" variant="outlined" />
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <TextField type="number" style={{ width: "100%" }} {...register("total")} id="total" name="total" label="Total:" variant="outlined" />
                                </Grid>
                                <Grid item xs={32} sm={32} md={16} lg={4}>
                                    <Button variant="contained" type="submit" style={{ width: "100%" }}>Agregar</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="center">Cuenta</TableCell>
                                        <TableCell align="center">Descripcion</TableCell>
                                        <TableCell align="center">Porcentaje</TableCell>
                                        <TableCell align="center">Cantidad</TableCell>
                                        <TableCell align="center">Tiempo</TableCell>
                                        <TableCell align="center">Precio</TableCell>
                                        <TableCell align="center">Total</TableCell>

                                        <TableCell align="center">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow hover key={row.cuenta}>
                                            <TableCell >
                                                {cont = cont + 1}
                                            </TableCell>
                                            <TableCell align="center">{row.cuenta}</TableCell>
                                            <TableCell align="center">{row.descripcion}</TableCell>

                                            <TableCell align="center">{row.porcentaje} %</TableCell>
                                            <TableCell align="center">{row.cantidad}</TableCell>
                                            <TableCell align="center">{row.tiempo} dias</TableCell>
                                            <TableCell align="center">$ {row.precio}</TableCell>
                                            <TableCell align="center">$ {row.total}</TableCell>

                                            <TableCell align="center">
                                                <Grid container spacing={2}>

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
                    </AccordionDetails>
                </Accordion>
            </Grid>


        </Grid>
    );
}


export default ActividadPresupuestaria;
