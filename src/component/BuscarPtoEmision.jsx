import React, { Fragment, useEffect, useState } from "react";
import { Divider, Grid, Link } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
const BuscarPtoEmision = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    ];



    return (
        <Grid container spacing={gridSpacing} >


            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Filtro Pto Emision:"
                        placeholder="Buscar Pto. Emision"
                        style={{ width: "100%" }}
                        {...register("ptoEmision")}
                    />
                </Grid>
            </Grid>
        </Grid >
    );
}

export default BuscarPtoEmision;
