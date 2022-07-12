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
import Paper from '@mui/material/Paper';
import ModalNuevoProveedor from "component/ModalProveedor";
import { gridSpacing } from "store/constant";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ModalDetalleProveedor from "./ModalDetalleProveedor";
import Proveedor from "services/Proveedor/ProveedorService";
import { ButtonAdd, ButtonDelete, ButtonEdit } from "utils/custom-all";
import { ToastContainer, toast } from "material-react-toastify";
import Swal from "sweetalert2";
import PersonaLiquidacion from "services/PersonaLiquidacion/PersonaLiquidacionService";
import Resource from "resource/resource";
const ListarProveedor = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [openDetalle, setOpenDetalle] = useState(false);
    const [proveedor, setProveedor] = useState(false);
    const [listaProveedor, setListaProveedor] = useState([]);
    const [load, setLoad] = useState(0)
    const [edit, setEdit] = useState(false);


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

    useEffect(() => {
        Proveedor.Get().then(async (result) => {
            if (result.code === "1") {
                setListaProveedor(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);

   


    const RowChange = (item) => {

        if (typeof item === "object" && item) {
            setProveedor(item);

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
        <MainCard title="Proveedores" >
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Card >
                        <CardContent >

                            <Grid container spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    {/* <Button variant='contained' startIcon={<EditIcon />} onClick={handleClickOpen('paper')}> Registrar Proveedor</Button> */}
                                    <ButtonAdd onClick={() => RowChange()}> Registrar Proveedor</ButtonAdd>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <TextField
                                        {...register("razonSocial")}
                                        id="outlined-basic"
                                        label="Razón Social, Nombre o Ruc"
                                        style={{ width: "70%" }}
                                        placeholder="Razón Social, Nombre o Ruc"

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
                                        {listaProveedor.map((row, index) => (
                                            <TableRow hover key={index+1}>
                                                <TableCell >
                                                    {row.cod}
                                                </TableCell>
                                                <TableCell align="center">{row.razonSocial}</TableCell>
                                                <TableCell align="center">{row.numeroIdentificacion}</TableCell>
                                                <TableCell align="center">{row.telefono}</TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                
                                                <TableCell align="center">                               
                                                    <Grid container spacing={2}>
                                                        <Grid item>
                                                            <ButtonEdit onClick={() => RowChange(row)}></ButtonEdit>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" onClick={() => openDetalleClick('paper')}  >
                                                                <FormatListBulletedIcon />
                                                            </Button>
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

                        </CardContent>
                    </Card>
                    <ModalNuevoProveedor
                        open={open}
                        onClose={handleClose} 
                        proveedor={proveedor}
                        edit={edit}
                        load={load}
                        setLoad={setLoad} 
                        />
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
