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
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Card className="col-12" container style={{ textAlign: "center" }} >
                            <br />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2} >
                                    <Grid container item spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Typography variant="h5" gutterBottom component="div">
                                                Factura N°: 56696
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <Typography variant="h5" gutterBottom component="div">
                                                Valor Total:200
                                            </Typography>
                                        </Grid>


                                    </Grid>

                                    <Grid container item spacing={2}>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                                <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="departamento"
                                                    name="departamento"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Departamento"
                                                    {...register("departamento")}
                                                >
                                                    <MenuItem value={"Huaquillas"}>Huaquillas</MenuItem>
                                                    <MenuItem value={"Santo Domingo"}>Santo Domingo</MenuItem>
                                                    <MenuItem value={"Esmeraldas"}>Esmeraldas</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                                <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="subcuenta"
                                                    name="subcuenta"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Subcuenta"
                                                    {...register("subcuenta")}
                                                >
                                                    <MenuItem value={"Insumos Medicos"}>Insumos Medicos</MenuItem>
                                                    <MenuItem value={"Tecnologico"}>Tecnologico</MenuItem>
                                                    <MenuItem value={"Gastos"}>Gastos</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <TextField
                                                id="valor"
                                                name="valor"
                                                label="Valor: "
                                                type="number"
                                                style={{ width: "100%" }}
                                                {...register("valor")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <Button type="submit" variant="contained" style={{ width: "100%" }}>Agregar</Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </form>

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
                                                    <Button  variant="contained" size="small"> <DeleteIcon/></Button>
                                                    </TableCell>

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
                    {/* <Button type="submit" >Guardar</Button> */}
                </DialogActions>

            </Dialog>


        </div >

    );
}

export default ModalEjecPresupuestaria;
