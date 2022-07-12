import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from "@mui/material";
import Paper from '@mui/material/Paper';
import { gridSpacing } from "store/constant";
import ModalNuevoProyecto from "./ModalProyecto";
import sitem1 from "services/DepartamentoService/DepartamentoService";
import { ButtonAdd, ButtonDelete, ButtonEdit } from "utils/custom-all";
import { saveNotification } from "utils/toastify";
import { ToastContainer, toast } from "material-react-toastify";
import Swal from "sweetalert2";
import Resource from "resource/resource";
const Proyecto = (props) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [departamento, setDepartamento] = useState({});
    const [edit, setEdit] = useState(false);
    const [listaDepartamento, setListaDepartamento] = useState([]);
    const [load, setLoad] = useState(0)
    const qs = JSON.stringify({ id: 0 });

    useEffect(() => {
        sitem1.GetT().then(async (result) => {
            if (result.code === "1") {
                setListaDepartamento(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);


    const RowChange = (item) => {

        if (typeof item === "object" && item) {
            setDepartamento(item);

        }
        setOpen(true);//setScroll('paper');
    };

    const handleClose = () => {
        setOpen(false);
    }

    const RowAdd = (item) => {
      
        localStorage.setItem("dep", item.idDepartamento)
        localStorage.setItem("departamento","Proyecto " +item.descripcion)

        navigate('/Proyecto/PartidaPresupuestaria');

    };
    const deleteItem = (item) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "¡No se podrá revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idDepartamento });
                sitem1.Delete(re).then(async (result) => {
                    if (result.code === "1") {
                        setLoad(load + 1)
                        Swal.fire(
                            'Eliminado!',
                            'El registro ha sido eliminado.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            result.message + '!',
                            'El registro no ha sido eliminado.',
                            'error'
                        )
                    }
                });
            }
        })
    }
    return (
        <MainCard title="Departamentos - Proyectos" >
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card >
                        <CardContent >
                            <ToastContainer

                            />
                            <Grid container spacing={2}>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <ButtonAdd onClick={() => RowChange()}
                                        name="Registrar Proyecto">
                                    </ButtonAdd>
                                </Grid>
                            </Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Departamento</TableCell>
                                            <TableCell align="center">Fecha Ini</TableCell>
                                            <TableCell align="center">Donante</TableCell>
                                            <TableCell align="center">Coordinador</TableCell>
                                            <TableCell align="center">Presupuesto</TableCell>

                                            <TableCell align="center">Estado</TableCell>
                                            <TableCell align="center">Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listaDepartamento.length > 0 ?
                                            listaDepartamento.map((row, index) => (
                                                <TableRow hover key={index}
                                                >
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell align="center" width="800px">{row.descripcion}</TableCell>
                                                    <TableCell align="center">{row.fechaInicio}</TableCell>
                                                    <TableCell align="center">{row.donante}</TableCell>
                                                    <TableCell align="center">{row.coordinador}</TableCell>
                                                    <TableCell align="center">${row.presupuesto}</TableCell>
                                                    <TableCell align="center">{"#"}</TableCell>
                                                    <TableCell align="center" width="800px">
                                                        <Grid container spacing={2}>
                                                            <Grid item>
                                                                <ButtonAdd onClick={() => RowAdd(row)} ></ButtonAdd>
                                                            </Grid>
                                                            <Grid item>
                                                                <ButtonEdit onClick={() => RowChange(row)}></ButtonEdit>
                                                            </Grid>
                                                            <Grid item>
                                                                <ButtonDelete onClick={() => deleteItem(row)}></ButtonDelete>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                            : (<TableRow hover><TableCell>-- no rows--</TableCell></TableRow>)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
            <ModalNuevoProyecto
                open={open}
                onClose={handleClose}
                departamento={departamento}
                edit={edit}
                load={load}
                setLoad={setLoad}
            />
        </MainCard>

    );
}


export default Proyecto;
