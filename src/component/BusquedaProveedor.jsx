import React, { Fragment, useEffect, useState } from "react";
import { Divider, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalNuevoProveedor from "./ModalProveedor";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModalSubirXML from "./ModalSubirXML";
const BusquedaPr = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [scroll, setScroll] = React.useState('paper');
    const [muestraXML, setMuestraXML] = useState(false);


    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    ];

    const [openXML, setOpenXML] = React.useState(false);

    const handleClickOpenXML = (scrollType) => () => {
        setOpenXML(true);
        setScroll(scrollType);
    };
    const handleCloseXML = () => {
        setOpenXML(false);
    };



    var showTable;
    if (table) {
        showTable = <div>
            <Divider />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableBody >
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={e => setTable(false)}
                            >
                                <TableCell component="th" scope="row">{row.calories}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
        </div>;
    }

    return (
        <Grid container spacing={gridSpacing} >
            <Grid item lg={12} md={12} sm={12} xs={12}  >
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField
                            required
                            id="outlined-basic"
                            label="Buscar Proveedor:"
                            placeholder="Ingrese RUC o Razon Social"
                            style={{ width: "100%" }}
                            {...register("razonSocial")}
                        />
                    </Grid>
                    <Grid item lg={3} md={2} sm={12} xs={12}>
                        <Button variant="outlined" style={{ width: "100%" }} startIcon={<SearchIcon />} onClick={e => setTable(true)}>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item lg={3} md={2} sm={12} xs={12} >
                        <Button onClick={handleOpen} variant="outlined" style={{ width: "100%" }} startIcon={<AddCircleIcon />}>
                            Nuevo
                        </Button>
                    </Grid>
                </Grid><br></br>
                {
                    showTable
                }
            </Grid>
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose} />
            <ModalSubirXML
                open={openXML}
                onClose={handleCloseXML}
            />

        </Grid >

    );
}

export default BusquedaPr;
