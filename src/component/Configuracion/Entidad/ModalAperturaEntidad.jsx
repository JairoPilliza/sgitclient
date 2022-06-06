import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link, Stack } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ModalAperturaEntidad = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        p: 4,
    };


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);



    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="scroll-dialog-title">Registrar Apertura de Entidad</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <SubCard className="col-12" container title="Datos de la Apertura" style={{ textAlign: "center" }} >


                            <Stack spacing={2}>

                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Entidad</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        style={{ width: "100%" }}
                                        required
                                        label="Entidad"
                                        {...register("entidad")}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </FormControl>
                                <TextField
                                    id="outlined-date"
                                    label="Fecha Apertura:"
                                    type="date"
                                    style={{ width: "100%" }}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register("fechaApertura")}
                                />
                                <TextField
                                    id="outlined-date"
                                    label="Gestion:"
                                    placeholder="Ej. 2022"
                                    required
                                    {...register("gestion")}
                                />
                                <FormControl sx={{ m: 1, minWidth: 150 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        style={{ width: "100%" }}
                                        required
                                        label="Estado"
                                        {...register("estado")}
                                    >
                                        <MenuItem value={1}>Activo</MenuItem>
                                        <MenuItem value={2}>Inactivo</MenuItem>

                                    </Select>

                                </FormControl>
                            </Stack>
                        </SubCard>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button >Registar Apertura</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default ModalAperturaEntidad;
