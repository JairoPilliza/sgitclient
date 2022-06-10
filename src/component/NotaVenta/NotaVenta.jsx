import React, { Fragment, useEffect, useState } from "react";
import { Divider, Grid, Link } from '@mui/material';
import { useForm } from "react-hook-form";
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import CardActions from '@mui/material/CardActions';
import BusquedaPr from "component/BusquedaProveedor";
import EditIcon from '@mui/icons-material/Edit';
import ModalNuevoProveedor from "component/ModalProveedor";

const NotaVenta = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <MainCard title="Nota Venta">
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12}>
                    <BusquedaPr />

                </Grid>
                <Grid item xs={12} sm={12}>
                    <form>
                        <SubCard className="col-12" container title="Datos de la nota de venta" style={{ textAlign: "center" }}
                        >



                            <Grid container spacing={2} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid container item xs={12} md={12} sm={12} lg={12}>
                                    <Grid item xs={12} md={12} sm={12} lg={12} >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6} sm={12} lg={6}>
                                                <Button aria-label="settings" style={{ width: "100%" }} variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                                    Editar Proveedor
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} md={6} sm={12} lg={6}>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={2} rowSpacing={2} xs={12} md={6} sm={12} lg={6}  >
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <FormControl sx={{ minWidth: 120 }} style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Sustento Tributario:</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="sustentoTributario"
                                                name="sustentoTributario"
                                                label="Sustento Tributario:"
                                                {...register("sustentoTributario")}
                                            >
                                                <MenuItem value={10} >Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <TextField id="ruc" name="ruc" label="RUC:" variant="outlined" style={{ width: "100%" }}  {...register("ruc")} />
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <TextField id="telefono" name="telefono" label="Telefono:" variant="outlined" style={{ width: "100%" }}  {...register("telefono")} />
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <TextField id="numeroAutorizacion" name="numeroAutorizacion" label="N° Autorización:" variant="outlined" style={{ width: "100%" }}   {...register("numeroAutorizacion")} />
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} sm={12} md={6} lg={6}>
                                    <Grid item xs={12} md={12} sm={12} lg={12} >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3} sm={12} lg={3}>
                                                <small style={{ width: "100%" }}><b>N° Nota de Venta:</b></small>
                                            </Grid>
                                            <Grid item xs={12} md={3} sm={12} lg={3}>
                                                <TextField
                                                    id="emision"
                                                    name="emision"
                                                    label="000"
                                                    style={{ width: "100%" }}
                                                    {...register("emision")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3} sm={12} lg={3}>
                                                <TextField
                                                    id="puntoEmision"
                                                    name="puntoEmision"
                                                    label="000 "
                                                    style={{ width: "100%" }}
                                                    {...register("puntoEmision")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3} sm={12} lg={3}>
                                                <TextField
                                                    id="secuencial"
                                                    name="secuencial"
                                                    label="000000000"
                                                    multiline
                                                    style={{ width: "100%" }}
                                                    {...register("secuencial")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                                <TextField

                                                    id="fechaEmision"
                                                    name="fechaEmision"
                                                    label="F. Emisión:"
                                                    type="date"
                                                    style={{ width: "100%", float: "right" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...register("fechaEmision")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                                <TextField

                                                    id="fechaRegistro"
                                                    name="fechaRegistro"
                                                    label="F. Registro:"
                                                    type="date"
                                                    style={{ width: "100%", float: "right" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    {...register("fechaRegistro")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </SubCard>
                    </form>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard className="col-12" container title="Detalle de nota de venta" style={{ textAlign: "center" }} >

                        <div>
                            <form>
                                <TableContainer >
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Cant.</TableCell>
                                                <TableCell align="center">Descripción</TableCell>
                                                <TableCell align="center">V. Unit.</TableCell>
                                                <TableCell align="center">Total</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>
                                                <TextField
                                                    id="cantidad"
                                                    name="cantidad"
                                                    type="number"
                                                    style={{ width: "50px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("cantidad")} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="descripcion"
                                                    name="descripcion"
                                                    style={{ width: "300px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("descripcion")} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="valorUnit"
                                                    name="valorUnit"
                                                    type="number"
                                                    style={{ width: "70px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("valorUnit")} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="total"
                                                    name="total"
                                                    style={{ width: "70px" }}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                    variant="standard"
                                                    {...register("total")} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained">
                                                    <AddIcon />
                                                </Button>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </form>
                        </div>

                        <div >
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Cant.</TableCell>
                                            <TableCell align="center">Descripción</TableCell>
                                            <TableCell align="center">V. Unit.</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <br></br>
                        <from>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                <Grid item xs={12} sm={12} md={6} lg={6}>
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

                                <Grid item xs={12} md={6} sm={12} lg={6} />
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <TextField id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }} style={{ width: "100%", float: "right" }}
                                        {...register("valorTotal")} />
                                </Grid>
                            </Grid>
                            <br />
                            <Divider />

                            <CardActions >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} sm={12} lg={6} >
                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                            Guardar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6} sm={12} lg={6} >
                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </from>
                    </SubCard>
                </Grid>
            </Grid >
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose} />
        </MainCard >

    );
}

export default NotaVenta;
