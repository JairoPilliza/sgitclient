import React, { Fragment, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ModalAperturaPeriodo from './ModalAperturaPeriodo';
import ClearIcon from '@mui/icons-material/Clear';
import ArticleIcon from '@mui/icons-material/Article';
import { ButtonAdd } from 'utils/custom-all';
import Periodo from "services/Periodo/Periodo";
import useNavigateParamsCreate from "hooks/useNavigateParamsCreate";
const AperturaPeriodo = () => {
    const navigate = useNavigate();
    const navigateParam = useNavigateParamsCreate();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [recarga, setRecarga] = useState(false);
    const [listaPeriodo,setListaPeriodo] = useState([]);
    const [load, setLoad] = useState(true);
    
    useEffect(() => {
        Periodo.Get().then(async (result) => {
            if (result.code === "1") {
                setListaPeriodo(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);

    
    const RowChange = (item) => {
        setRecarga(!recarga)
        if (typeof item === "object" && item) {
            //setProveedor(item);
            navigateParam('/Configuracion/AperturaPeriodo', { id: item.idPeriodo });
        }
        setOpen(true);
        setScroll('paper');
    };
    const handleClose = () => {
        setOpen(false);
        navigate('/Configuracion/AperturaPeriodo');
    }
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Card>
                <CardHeader
                    title="Periodos"
                />
                <Divider></Divider>

                <CardContent>
                    <center>
                        <ButtonAdd   onClick={() => RowChange()} name="Aperturar"  icon={<EventNoteIcon /> } style={{ width: "50%" }}> </ButtonAdd>
                        {/* <Button variant='contained' style={{ width: "50%" }} startIcon={<EventNoteIcon />} onClick={handleClickOpen('paper')} >Aperturar</Button> */}
                    </center>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: "50%" }} aria-label="caption table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Sucursal</TableCell>
                                    <TableCell align="center">Gestion</TableCell>
                                    <TableCell align="center">Mes</TableCell>
                                    <TableCell align="center">Fecha Apertura</TableCell>
                                    <TableCell align="center">Fecha Cierre</TableCell>
                                    <TableCell align="center">Estado</TableCell>                                   
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaPeriodo.map((row, index) => (
                                    <TableRow hover key={index +1 }>
                                        <TableCell >{index + 1}</TableCell>
                                        <TableCell align="center">{row.descripcion}</TableCell>
                                        <TableCell align="center">{row.gestion}</TableCell>
                                        <TableCell align="center">{row.mes}</TableCell>
                                        <TableCell align="center">{row.fechaApertura}</TableCell>
                                        <TableCell align="center">{row.fechaCierre}</TableCell>
                                        <TableCell align="center">#</TableCell>                                       
                                        <TableCell align="center">
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button variant="contained" size="small" style={{ backgroundColor: "#e91e63" }} ><ClearIcon /></Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" size="small" style={{ backgroundColor: "#ffac33" }} ><ArticleIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card >
            <ModalAperturaPeriodo
                open={open}
                onClose={handleClose} 
                load={load}
                setLoad={setLoad} />
        </Box>
    );
}
export default AperturaPeriodo;