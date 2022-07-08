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
import DeleteIcon from '@mui/icons-material/Delete';

const ModalEjecPresupuestaria = (props) => {
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


            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
            >

                <DialogTitle id="scroll-dialog-title">Cuentas</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    
                      
                            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                                <Grid container spacing={2} >
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <Typography variant="h5" gutterBottom component="div">
                                                Factura N°: 56696
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <Typography variant="h5" gutterBottom component="div">
                                                Valor Total:200
                                            </Typography>
                                        </Grid>


                                    </Grid>

                                    <Grid container item spacing={2}>
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                                <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                                                <Select
                                                    {...register("departamento")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="departamento"
                                                    name="departamento"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Departamento"

                                                >
                                                    <MenuItem value={"Huaquillas"}>Huaquillas</MenuItem>
                                                    <MenuItem value={"Santo Domingo"}>Santo Domingo</MenuItem>
                                                    <MenuItem value={"Esmeraldas"}>Esmeraldas</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12}>
                                            <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                                <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                                                <Select
                                                    {...register("subcuenta")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="subcuenta"
                                                    name="subcuenta"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Subcuenta"

                                                >
                                                    <MenuItem value={"Insumos Medicos"}>Insumos Medicos</MenuItem>
                                                    <MenuItem value={"Tecnologico"}>Tecnologico</MenuItem>
                                                    <MenuItem value={"Gastos"}>Gastos</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <TextField
                                                {...register("valor")}
                                                id="valor"
                                                name="valor"
                                                label="Valor: "
                                                type="number"
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <Button type="submit" variant="contained" style={{ width: "100%" }}>Agregar</Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            {/* </form> */}

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">#</TableCell>
                                            <TableCell align="center">Departamento</TableCell>
                                            <TableCell align="center">Subcuenta</TableCell>
                                            <TableCell align="center">Valor</TableCell>
                                            <TableCell align="center"></TableCell>

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
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.fat}</TableCell>

                                                <TableCell align="center">100</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" size="small"> <DeleteIcon /></Button>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                   

                
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    {/* <Button type="submit" >Guardar</Button> */}
                </DialogActions>

            </Dialog>


        </div >

    );
}

export default ModalEjecPresupuestaria;
