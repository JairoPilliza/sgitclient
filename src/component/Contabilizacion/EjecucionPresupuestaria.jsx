
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CardActions, Divider, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ModalEjecPresupuestaria from './ModalEjecPresupuestaria';
import PartidaPresupuestaria from 'services/PartidaPresupuestaria/PartidaPresupuestaiaService';
import { useState } from 'react';
import useNavigateParamsCreate from "hooks/useNavigateParamsCreate";
const EjecucionPresupuestaria = () => {
    const navigate = useNavigate();
    const navigateParam = useNavigateParamsCreate();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = useState('paper');
    const [listaPartidaPresupuestaria, setListaPartidaPresupuestaria] = useState([]);
    const [load, setLoad] = useState(true)
    const [partidaPresupuestaria, setPartidaPresupuestaria] = useState({});
    
    localStorage.clear()
    useEffect(() => {
        PartidaPresupuestaria.Get().then(async (result) => {
            if (result.code === "1") {
                setListaPartidaPresupuestaria(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);

    const RowChange = (item) => {

        if (typeof item === "object" && item) {
            setPartidaPresupuestaria(item);
            navigateParam('/Contabilizacion/EjecucionPresupuestaria', { id: item.idPartidaPresupuestaria, presupuesto: item.presupuesto });
        }
        setOpen(true);
        setScroll('paper');
    };
    const handleClose = () => {
        setOpen(false);
      //  navigateParam('/Contabilizacion/EjecucionPresupuestaria');
    };


    return (
        <Card sx={{ maxWidth: "100%" }}>
            <CardHeader
                title="Partida Presupuestaria"
                action={
                    <Button variant="contained" style={{float:"left",width:"100%"}}>
                        Nuevo
                    </Button>
                }
            />
           

            <Divider />

            <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Departamento</TableCell>
                                <TableCell align="center">Sub cuenta</TableCell>
                                <TableCell align="center">Descripcion</TableCell>
                                <TableCell align="center">Presupuesto</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listaPartidaPresupuestaria.map((row, index) => (
                                    <TableRow key={index + 1}>
                                        <TableCell align="center">{index + 1} </TableCell>
                                        <TableCell align="center">{row.departamento} </TableCell>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">{row.descripcion}</TableCell>
                                        <TableCell align="center">{row.presupuesto}</TableCell>
                                        <TableCell align="center">
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant='contained' onClick={() => RowChange(row)}>Dividir</Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
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
            <ModalEjecPresupuestaria
                open={open}
                onClose={handleClose}
                load={load}
                setLoad={setLoad}
                scroll={scroll}
                partidaPresupuestaria={partidaPresupuestaria}
            />
        </Card>


    );
}

export default EjecucionPresupuestaria;
