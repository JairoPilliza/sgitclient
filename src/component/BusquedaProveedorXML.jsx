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
import ModalSubirXML from "./ModalSubirXML";
import BusquedaPr from "./BusquedaProveedor";
import FileUploadIcon from '@mui/icons-material/FileUpload';
const BusquedaProveedorCargarXML = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [scroll, setScroll] = React.useState('paper');

    const [openXML, setOpenXML] = React.useState(false);

    const handleClickOpenXML = (scrollType) => () => {
        setOpenXML(true);
        setScroll(scrollType);
    };
    const handleCloseXML = () => {
        setOpenXML(false);
    };


    return (
        <Grid container spacing={gridSpacing} >

            <Grid item xs={12} sm={12} lg={12} md={12} >

                <Grid container spacing={2}>
                    <Grid item xs={12} md={10} sm={12} lg={10}>
                        <BusquedaPr></BusquedaPr>
                    </Grid>
                    <Grid item xs={12} md={2} sm={12} lg={2} >
                        <Button onClick={handleClickOpenXML('paper')} variant="outlined" startIcon={<FileUploadIcon />}>
                            XML
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

            <ModalSubirXML
                open={openXML}
                onClose={handleCloseXML}
            />
        </Grid >
    );
}

export default BusquedaProveedorCargarXML;
