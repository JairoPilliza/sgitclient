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
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ModalNuevaPersona from "component/ModalPersona";
import { ButtonAdd, ButtonDelete, ButtonEdit } from "utils/custom-all";
import { ToastContainer, toast } from "material-react-toastify";
import Swal from "sweetalert2";
import PersonaLiquidacion from "services/PersonaLiquidacion/PersonaLiquidacionService";
import Resource from "resource/resource";
const ListarPersonaLiquidacion = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    //  const [open, setOpen] = React.useState(false);
    //const handleOpen = () => setOpen(true);
    //  const handleClose = () => setOpen(false);


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [personaLiquidacion, setPersonaLiquidacion] = useState(false);
    const [listaPersonaLiquidacion, setListaPersonaLiquidacion] = useState([]);



    const [load, setLoad] = useState(0)
    const [edit, setEdit] = useState(false);

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

    const handleClose = () => {
        setOpen(false);
    };

    const RowChange = (item) => {

        if (typeof item === "object" && item) {
            setPersonaLiquidacion(item);

        }
        setOpen(true);//setScroll('paper');
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
                const re = Resource.convertObjectToQueryStringUnique("json", { id: item.idPersonaLiquidacion});
                PersonaLiquidacion.Delete(re).then(async (result) => {
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
        <MainCard title="Listado de Personas Liquidación" >
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                            {/* <Button variant='contained' startIcon={<EditIcon />} onClick={() => RowChange()}> Agregar Persona Liquidacion </Button> */}
                            <ButtonAdd onClick={() => RowChange()}> Agregar Persona Liquidacion</ButtonAdd>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
                            <TextField
                                {...register("razonSocial")}
                                id="outlined-basic"
                                label="Ingrese persona o Identificación"
                                style={{ width: "70%" }}
                                placeholder="Ingrese persona o Identificación"

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
                                    <TableCell align="center">Identificación</TableCell>
                                    <TableCell align="center">Telefono</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Dirección</TableCell>
                                    <TableCell align="center">Opciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaPersonaLiquidacion.map((row, index) => (
                                    <TableRow hover key={index+1}>
                                         <TableCell align="center">{index+1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.nombreCompleto}
                                        </TableCell>
                                        <TableCell align="center">{row.identificacion}</TableCell>
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
                        edit={edit}
                        load={load}
                        setLoad={setLoad} />
                </Grid>
            </Grid>
        </MainCard>
    );
}


export default ListarPersonaLiquidacion;
