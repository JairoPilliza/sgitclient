import React, { Fragment, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Divider, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import AsientoContable from "services/AsientoContable/AsientoContableService";
const ListaAsientoContable = () => {
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [listaAsientoContable, setListaAsientoContable] = useState([]);
    const [load, setLoad] = useState(true);
    //Listar Asiento Contable Final

    useEffect(() => {
        AsientoContable.Get().then(async (result) => {
            if (result.code === "1") {
                setListaAsientoContable(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);


    return (

        <Card sx={{ maxWidth: "100%" }}>
            <CardHeader
                title="Listado Asientos Contables"
            />
            <Divider />
            <CardContent>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Descripcion</TableCell>
                                <TableCell align="right">Fecha Inicio</TableCell>
                                <TableCell align="right">Fecha Fin</TableCell>
                                <TableCell align="right">Contabilizado</TableCell>
                                <TableCell align="right">Motivo Anulación</TableCell>
                                <TableCell align="right">Fecha Anulación</TableCell>
                                <TableCell align="right">Estado</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {listaAsientoContable.length > 0 ?
                                listaAsientoContable.map((row, index) => (
                                    <TableRow
                                        hover
                                        key={index + 1}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                    >
                                        <TableCell align="right"> {index + 1} </TableCell>
                                        <TableCell align="right">{row.descripcion}</TableCell>
                                        <TableCell align="right">{row.fechaInicio}</TableCell>
                                        <TableCell align="right">{row.fechaFin}</TableCell>
                                        <TableCell align="right">{row.contabilizado}</TableCell>
                                        <TableCell align="right">{row.motivoAnulacion}</TableCell>
                                        <TableCell align="right">{row.estado}</TableCell>
                                        <TableCell align="right"> <Grid container spacing={1}>
                                            <Grid item>
                                                <Button variant="contained" style={{ backgroundColor: "#33eb91" }} ><MonetizationOnIcon /></Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" style={{ backgroundColor: "#e91e63" }} ><CancelIcon /></Button>
                                            </Grid>

                                        </Grid></TableCell>
                                    </TableRow>
                                ))
                                : (<TableRow hover><TableCell align="center" colSpan={10}>-- No existen Registros--</TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>


        </Card>


    );
}

export default ListaAsientoContable;
