
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form"
import Box from '@mui/material/Box';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardActions, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ModalEjecPresupuestaria from './ModalEjecPresupuestaria';
import AsientoContableTemporal from 'services/AsientoContable/AsientoContableTemporalService';
import { useState } from 'react';
const ConstruirAsiento = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [listaAsientoContableTemp, setListaAsientoContableTemp] = useState([]);
    const [load, setLoad] = useState(true)
    //Listar Asiento Contable Temporal
    useEffect(() => {
        AsientoContableTemporal.Get().then(async (result) => {
            if (result.code === "1") {
                setListaAsientoContableTemp(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (

        <Card sx={{ maxWidth: "100%" }}>
            <CardHeader
                title="Construir Asiento Contable"
            />
            <Divider />
            <CardContent>

                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Comprobante</TableCell>
                                <TableCell>N° Comprobante</TableCell>
                                <TableCell>Departamento</TableCell>
                                <TableCell>Cuenta</TableCell>
                                <TableCell>Subcuenta</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell>Credito</TableCell>
                                <TableCell >Valor</TableCell>
                                <TableCell >Accion</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaAsientoContableTemp.length > 0 ?
                                listaAsientoContableTemp.map((row, index) => (
                                    <TableRow >
                                        <TableCell align="center">{index + 1} </TableCell>
                                        <TableCell align="center"> {row.comprobate} </TableCell>
                                        <TableCell align="center">  </TableCell>
                                        <TableCell align="center">{row.departamento} </TableCell>
                                        <TableCell align="center">{row.cuenta} </TableCell>
                                        <TableCell align="center">{row.subcuenta}</TableCell>
                                        <TableCell align="center">{row.descripcion}</TableCell>
                                        <TableCell align="center">{row.credito}</TableCell>
                                        <TableCell align="center">{row.valor}</TableCell>
                                        <TableCell align="center">
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant='contained' onClick={handleClickOpen('paper')}>Dividir</Button>
                                                </Grid>
                                            </Grid>

                                        </TableCell>

                                    </TableRow>
                                ))
                                : (<TableRow hover><TableCell align="center" colSpan={10}>-- No existen Registros--</TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>

            </CardContent>
            <CardActions >
                <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12} >
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} >
                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                            Generar Asiento Contable
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
            {/* <ModalEjecPresupuestaria
                open={open}
                onClose={handleClose} /> */}
        </Card>


    );
}

export default ConstruirAsiento;
