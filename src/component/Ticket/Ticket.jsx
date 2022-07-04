import React, { Fragment, useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import BusquedaPr from "component/BusquedaProveedor";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Ticket = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = useState(false);
    const [showTableDatosTicket, setShowTableDatosTicket] = useState(false);
    const handleOpen = () => setOpen(true);

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);
    }
    var tableDatosTicket;

    if (showTableDatosTicket) {
        tableDatosTicket = <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">

                <TableBody>
                    <TableCell align="center" style={{ width: "100px" }}>3</TableCell>
                    <TableCell colSpan={6} align="center" style={{ width: "300px" }}>Super</TableCell>
                    <TableCell colSpan={1} align="center" style={{ width: "100px" }}>$ 2.74</TableCell>
                    <TableCell align="center" style={{ width: "100px" }}>$ 8.93</TableCell>
                    <TableCell >
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button variant="contained" onClick={() => setShowTableDatosTicket(false)}><DeleteForeverIcon /></Button>
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableBody>
            </Table>
        </TableContainer>;
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <MainCard title="Registrar Ticket">
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <BusquedaPr />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <SubCard className="col-12" container title="Datos de Ticket" style={{ textAlign: "center" }}>
                            <Grid container spacing={2} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                <Grid container item spacing={2} rowSpacing={2} lg={6} md={6} sm={12} xs={12}  >
                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <Button aria-label="settings" style={{ width: "100%" }} variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                            Editar Proveedor
                                        </Button>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField  {...register("numeroRuc")} id="ruc" name="ruc" label="RUC:" variant="outlined" style={{ width: "100%" }}  />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField {...register("telefono")} id="telefono" name="telefono" label="Telefono:" variant="outlined" style={{ width: "100%" }}   />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <TextField {...register("autorizacion")}  id="autorizacion" name="autorizacion" label="N° Autorización:" variant="outlined" style={{ width: "100%" }}  />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} item lg={6} md={6} sm={12} xs={12}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControl sx={{ minWidth: "1005" }} style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-helper-label">Sustento Tributario:</InputLabel>
                                            <Select
                                                {...register("sustentoTributario")}
                                                labelId="demo-simple-select-helper-label"
                                                id="sustentoTributario"
                                                name="sustentoTributario"
                                                label="Sustento Tributario:"

                                            >
                                                <MenuItem value={10} >Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={2} >
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <small style={{ width: "100%" }} ><b>N° Ticket:</b></small>
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={12} xs={12} >
                                                <TextField
                                                    {...register("establecimiento")}
                                                    id="establecimiento"
                                                    name="establecimiento"
                                                    label="000"
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    {...register("puntoEmision")}
                                                    id="puntoEmision"
                                                    name="puntoEmision"
                                                    label="000 "
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                                <TextField
                                                    {...register("secuencial")}
                                                    id="secuencial"
                                                    name="secuencial"
                                                    label="000000000"
                                                    multiline
                                                    style={{ width: "100%" }}

                                                />
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <TextField
                                                    {...register("fechaEmsion")}
                                                    id="fechaEmsion"
                                                    name="fechaEmsion"
                                                    label="F. Emisión:"
                                                    type="date"

                                                    style={{ width: "100%", float: "right" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}

                                                />
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <TextField
                                                    {...register("fechaRegistro")}
                                                    id="fechaRegistro"
                                                    name="fechaRegistro"
                                                    label="F. Registro:"
                                                    type="date"

                                                    style={{ width: "100%", float: "right" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}

                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <SubCard className="col-12" container title="Datos de la nota de venta" style={{ textAlign: "center" }} >
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <FormControl sx={{ minWidth: '100%' }}>
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
                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                        <FormControl sx={{ minWidth: '100%' }}>
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
                                </Grid>
                                <from>
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
                                                        {...register("cantidad")}
                                                        id="cantidad"
                                                        name="cantidad"
                                                        type="number"
                                                        style={{ width: "50px" }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        variant="standard"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        {...register("descripcion")}
                                                        id="descripcion"
                                                        name="descripcion"
                                                        style={{ width: "300px" }}
                                                        multiline
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        variant="standard"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        {...register("valorUnitario")}
                                                        id="valorUnitario"
                                                        name="valorUnitario"
                                                        type="number"
                                                        style={{ width: "70px" }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        variant="standard"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        {...register("valorTotal")}
                                                        id="valorTotal"
                                                        name="valorTotal"
                                                        style={{ width: "70px" }}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        variant="standard"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" onClick={() => setShowTableDatosTicket(true)}>
                                                        <AddIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </from>
                            </div>
                            <div>
                                {tableDatosTicket}
                            </div>
                            <br></br>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                <Grid item lg={6} md={6} sm={12} xs={12} />
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField {...register("valorTotal")} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined" InputProps={{
                                        readOnly: true,
                                        type: "number"
                                    }} style={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <CardActions >
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Button type="submit" variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                            Guardar
                                        </Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </SubCard>
                    </Grid>
                </Grid >
            </MainCard >
        </form>
    );
}

export default Ticket;
