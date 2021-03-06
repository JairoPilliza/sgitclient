import React, { Fragment, useEffect, useState } from "react";
import { Grid, IconButton } from '@mui/material';
import { useForm } from "react-hook-form"
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ModalNuevaPersona from "component/ModalPersona";
import { ButtonAdd, ButtonDelete, ButtonEdit } from "utils/custom-all";
import Swal from "sweetalert2";
import PersonaLiquidacion from "services/PersonaLiquidacion/PersonaLiquidacionService";
import useNavigateParamsCreate from "hooks/useNavigateParamsCreate";

const ListarPersonaLiquidacion = () => {
    const navigate = useNavigate();
    const navigateParam = useNavigateParamsCreate();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const [personaLiquidacion, setPersonaLiquidacion] = useState({});
    const [listaPersonaLiquidacion, setListaPersonaLiquidacion] = useState([]);
    const [load, setLoad] = useState(0)
    const [recarga, setRecarga] = useState(true);

    useEffect(() => {
        PersonaLiquidacion.Get().then(async (result) => {
            if (result.code === "1") {
                setListaPersonaLiquidacion(result.payload ? JSON.parse(result.payload) : [])
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
            setPersonaLiquidacion(item);
            navigateParam('/Proveedor/ListarPersonaLiquidacion', { id: item.idPersonaLiquidacion });
        }
        setOpen(true);//setScroll('paper');
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/Proveedor/ListarPersonaLiquidacion');
        setRecarga(!recarga)
    };

    const deleteItem = (item) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "??No se podr?? revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                ;
                PersonaLiquidacion.Delete({ id: item.idPersonaLiquidacion }).then(async (result) => {
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
        <MainCard title="Listado de Personas Liquidaci??n" >
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            {/* <Button variant='contained' startIcon={<EditIcon />} onClick={() => RowChange()}> Agregar Persona Liquidacion </Button> */}
                            <ButtonAdd name="Agregar Persona Liquidacion" onClick={() => RowChange()}></ButtonAdd>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <TextField
                                {...register("razonSocial")}
                                id="outlined-basic"
                                label="Ingrese persona o Identificaci??n"
                                style={{ width: "70%" }}
                                placeholder="Ingrese persona o Identificaci??n"

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
                                    <TableCell>#</TableCell>
                                    <TableCell>Nombres</TableCell>
                                    <TableCell align="center">Tipo Identificaci??n</TableCell>
                                    <TableCell align="center">N?? Identificaci??n</TableCell>
                                    <TableCell align="center">Telefono</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Direcci??n</TableCell>
                                    <TableCell align="center">Opciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaPersonaLiquidacion.map((row, index) => (
                                    <TableRow hover key={index + 1}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.nombreCompleto}
                                        </TableCell>
                                        <TableCell align="center">{row.identificacion}</TableCell>
                                        <TableCell align="center">{row.numeroIdentificacion}</TableCell>

                                        <TableCell align="center">{row.telefono}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.direccion}</TableCell>
                                        <TableCell align="center">
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <ButtonEdit onClick={() => RowChange(row)}></ButtonEdit>
                                                </Grid>
                                                <Grid item>
                                                    <ButtonDelete onClick={() => deleteItem(row)}></ButtonDelete>
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
                        onClose={handleClose}
                        personaLiquidacion={personaLiquidacion}
                        recarga={recarga}
                        load={load}
                        setLoad={setLoad} />
                </Grid>
            </Grid>
        </MainCard>
    );
}


export default ListarPersonaLiquidacion;
