import React, { Fragment, useEffect, useState } from "react";
import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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


    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Tarjeta Debito', 159, 6.0, 24, 4.0),
        createData('Tarjeta Credito', 237, 9.0, 37, 4.3),

    ];


    return (
        <Fragment>
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
                   
                      
                            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                <Grid container spacing={2} >
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <Typography variant="h5" color="red" gutterBottom component="div">
                                                Valor Total: 1500
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={4} md={4} sm={12} xs={12}  >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Forma de Pago:</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="idFormaPagoSri"
                                                    name="idFormaPagoSri"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Forma de Pago:"
                                                    {...register("idFormaPagoSri")}
                                                >
                                                    <MenuItem value={10}>Tarjeta Debito</MenuItem>
                                                    <MenuItem value={20}>Tarjeta Credito</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={12} xs={12} >
                                            <TextField {...register("valor")}  type="number" style={{ width: "100%" }} id="valor" name="valor" label="Valor:" variant="outlined" />
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={12} xs={12}>
                                            <Button variant="contained" type="submit" style={{ width: "100%" }}>Agregar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            {/* </form> */}
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">#</TableCell>
                                            <TableCell align="center">Forma de pago</TableCell>
                                            <TableCell align="center">Valor</TableCell>
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

                                                <TableCell align="center"><Button variant="contained"><DeleteForeverIcon /></Button></TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow >
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"><Typography variant="h6" color="red" gutterBottom component="div">
                                                Valor Total: 1500
                                            </Typography></TableCell>
                                            <TableCell align="center"></TableCell>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                     

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button  >Guardar</Button>
                </DialogActions>
            </Dialog>


        </Fragment >

    );
}

export default ModalFormaPago;
