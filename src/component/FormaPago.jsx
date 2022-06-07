import React, { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Grid, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useForm } from "react-hook-form"
// project imp

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ModalFormaPago = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);
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

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),

    ];


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Dialog
                    open={props.open}
                    onClose={props.onClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle id="scroll-dialog-title">Información del pago de la transaccion</DialogTitle>

                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <Card className="col-12" container style={{ textAlign: "center" }} >
                                <br />
                                <Grid container spacing={2} >
                                    <Grid container item spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Forma de Pago:</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            style={{ width: "100%" }}
                                            required
                                            label="Forma de Pago:"
                                            {...register("tipoDocumento")}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                        </Select>
                                    </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <Button variant="contained" style={{ width: "100%" }}>Agregar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">#</TableCell>
                                                <TableCell align="center">Forma de pago</TableCell>
                                                <TableCell align="center">Fat&nbsp;(g)</TableCell>

                                                <TableCell align="center">Acciones</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {rows.map((row) => (
                                                <TableRow
                                                    hover
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={e => setTable(false)}
                                                >

                                                    <TableCell align="center">{row.calories}</TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.fat}</TableCell>

                                                    <TableCell align="center"><Button variant="contained" startIcon={<DeleteForeverIcon />} ></Button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Card>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit" >Guardar</Button>
                    </DialogActions>
                </Dialog>

            </form>
        </div >

    );
}

export default ModalFormaPago;
