import React, { Fragment, useEffect, useState } from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import sitem1 from "services/DepartamentoService/DepartamentoService";
import PartidaPresupuestaria from "services/PartidaPresupuestaria/PartidaPresupuestaiaService";
import useNavigateParamsSearch from "hooks/useNavigateParamsSearch";

const ModalEjecPresupuestaria = (props) => {
    const params = useNavigateParamsSearch();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [partidaPresupuestariaList, setPartidaPresupuestariaList] = useState([]);
    const [listaDepartamento, setListaDepartamento] = useState([]);

    useEffect(() => {
        sitem1.GetT().then(async (result) => {
            if (result.code === "1") {
                setListaDepartamento(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);



    const Save = (data) => {
        PartidaPresupuestaria.Post(partidaPresupuestariaList).then(async (result) => {
            if (result.code === "1") {
                // PartidaPresupuestaria.Delete("?json=" + JSON.stringify({ id: params.id})).then(async (result) => {
                PartidaPresupuestaria.Delete("?json=" + JSON.stringify({ id: props.partidaPresupuestaria.idPartidaPresupuestaria})).then(async (result) => {
                    if (result.code === "1") {
                        props.onClose(true);
                        props.setLoad(!props.load)

                    } else {
                        alert(result.message);
                    }
                });
            } else {
                alert(result.message);
            }
        });
    }


    const onSubmit = (data, evento) => {

        data.idRol = 1;
        const temp = [...partidaPresupuestariaList, data];

        setPartidaPresupuestariaList(temp);

        localStorage.setItem("partidaPresupuestaria", JSON.stringify(temp))

        console.log(JSON.parse(localStorage.getItem("partidaPresupuestaria")))
    }



    return (
        <Fragment>

            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={props.scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
            >

                <DialogTitle id="scroll-dialog-title">Cuentas</DialogTitle>

                <DialogContent dividers={props.scroll === 'paper'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} >
                            <Grid container item spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    {/* <Typography variant="h5" gutterBottom component="div">
                                        Factura N°: 56696
                                    </Typography> */}
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <Typography variant="h4" gutterBottom component="div" style={{ float: "right" }}>
                                        Valor Total: {props.partidaPresupuestaria.presupuesto}
                                        {/* Valor Total: {params.presupuesto} */}


                                        {/* <p>{props.partidaPresupuestaria.idPartidaPresupuestaria}</p> */}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2}>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                                        <Select
                                            {...register("idDepartamento")}
                                            labelId="demo-simple-select-helper-label"
                                            id="idDepartamento"
                                            name="idDepartamento"
                                            style={{ width: "100%" }}
                                            required
                                            label="Departamento"
                                            defaultValue={0}

                                        >
                                            <MenuItem value={0}>::SELECCIONAR::</MenuItem>
                                            {
                                                listaDepartamento.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idDepartamento}>{row.descripcion}</MenuItem>
                                                ))
                                            }


                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                                        <Select
                                            {...register("codigoSubcuentaAASINet")}
                                            labelId="demo-simple-select-helper-label"
                                            id="codigoSubcuentaAASINet"
                                            name="codigoSubcuentaAASINet"
                                            style={{ width: "100%" }}
                                            required
                                            label="Subcuenta"
                                            defaultValue={"0"}

                                        >
                                            <MenuItem value={"01"}>Insumos Medicos</MenuItem>
                                            <MenuItem value={"02"}>Tecnologico</MenuItem>
                                            <MenuItem value={"03"}>Gastos</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <TextField
                                        {...register("presupuesto")}
                                        id="presupuesto"
                                        name="presupuesto"
                                        label="Presupuesto: "
                                        type="text"
                                        
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <TextField
                                        {...register("descripcion")}
                                        id="descripcion"
                                        name="descripcion"
                                        label="Descripcion: "
                                        type="text"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Button type="submit" variant="contained" style={{ width: "100%" }}>Agregar</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </form>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    <TableCell align="center">Departamento</TableCell>
                                    <TableCell align="center">Subcuenta</TableCell>
                                    <TableCell align="center">Descripción</TableCell>
                                    <TableCell align="center">Presupuesto</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {partidaPresupuestariaList.map((row, index) => (
                                    <TableRow
                                        hover
                                        key={index + 1}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="center">{row.idDepartamento}</TableCell>
                                        <TableCell align="center" > {row.codigoSubcuentaAASINet}</TableCell>
                                        <TableCell align="center">{row.descripcion}</TableCell>
                                        <TableCell align="center">{row.presupuesto}</TableCell>

                                        {/* <TableCell align="center">
                                            <Button variant="contained" size="small"></Button>
                                        </TableCell> */}

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cerrar</Button>
                    <Button onClick={() => Save()} >Guardar</Button>
                </DialogActions>

            </Dialog>


        </Fragment >

    );
}

export default ModalEjecPresupuestaria;
