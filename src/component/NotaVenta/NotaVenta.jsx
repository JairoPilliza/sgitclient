import React, { Fragment, useEffect, useState } from "react";
import { Chip, Divider, Grid } from '@mui/material';
import { useForm } from "react-hook-form";
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
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
    const [form, setForm] = useState({ electronica: "", idPeriodo: "", idSucursal: "", idProveedor: "", idComprobanteTipo: "", idSustentoTributario: "", ciRuc: "", telefono: "", autorizacion: "", establecimiento: "", puntoFacturacion: "", secuencial: "", fechaEmision: "", idDepartamento: "", idSubcuenta: "", valorTotal: "", estado: "", fechaRegistro: "" })
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

        console.log(form);


    }


    return (
        <MainCard title="Nota Venta">
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <BusquedaPr />
                </Grid>
                <Grid item sm={12} xs={12} >
                    {/* <form> */}
                    <Divider><Chip label="Datos de la nota de venta" /></Divider>
                    <br />
                    {/* <SubCard className="col-12" container title="Datos de la nota de venta" style={{ textAlign: "center" }} */}

                    <Grid container spacing={2} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid container item lg={12} md={12} sm={12} xs={12} >
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Button aria-label="settings" style={{ width: "100%" }} variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                            Editar Proveedor
                                        </Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} rowSpacing={2} lg={6} md={6} sm={12} xs={12}  >
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <FormControl sx={{ minWidth: 120 }} style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-helper-label">Sustento Tributario:</InputLabel>
                                    <Select
                                        {...register("idSustentoTributario")}
                                        value={form.idSustentoTributario}
                                        onChange={handleChange}
                                        labelId="demo-simple-select-helper-label"
                                        id="idSustentoTributario"
                                        name="idSustentoTributario"
                                        label="Sustento Tributario:"


                                    >
                                        <MenuItem value={10} >Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField {...register("ciRuc")}
                                    value={form.ciRuc}
                                    onChange={handleChange}
                                    id="ruc" name="ruc" label="RUC:" variant="outlined" style={{ width: "100%" }} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <TextField {...register("telefono")}
                                    value={form.telefono}
                                    onChange={handleChange}
                                    id="telefono" name="telefono" label="Telefono:" variant="outlined" style={{ width: "100%" }} />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                <TextField {...register("autorizacion")}
                                    value={form.autorizacion}
                                    onChange={handleChange}
                                    id="numeroAutorizacion" name="numeroAutorizacion" label="N° Autorización:" variant="outlined" style={{ width: "100%" }} />
                            </Grid>
                        </Grid>
                        <Grid container item lg={6} md={6} sm={12} xs={12}  >
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item lg={3} md={3} sm={12} xs={12} >
                                        <small style={{ width: "100%" }}><b>N° Nota de Venta:</b></small>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12} >
                                        <TextField
                                            {...register("establecimiento")}
                                            value={form.establecimiento}
                                            onChange={handleChange}
                                            id="establecimiento"
                                            name="establecimiento"
                                            label="000"
                                            style={{ width: "100%" }}

                                        />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12} >
                                        <TextField
                                            {...register("puntoFacturacion")}
                                            value={form.establecimiento}
                                            onChange={handleChange}
                                            id="puntoFacturacion"
                                            name="puntoFacturacion"
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
                                            {...register("fechaEmision")}
                                            id="fechaEmision"
                                            name="fechaEmision"
                                            label="F. Emisión:"
                                            type="date"
                                            style={{ width: "100%", float: "right" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}

                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
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
                    {/* </SubCard> */}
                    {/* </form> */}
                </Grid>
                <Grid item sm={12} xs={12}>
                    {/* <SubCard className="col-12" container title="Detalle de nota de venta" style={{ textAlign: "center" }} > */}

                    <Divider><Chip label="Detalle de nota de venta" /></Divider>
                    <br />

                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12} >
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
                        <Grid item lg={6} md={6} sm={12} xs={12}>
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
                    </Grid>

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
                                <TableRow>
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
                                        <Button variant="contained">
                                            <AddIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>




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

                    <br></br>

                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                        <Grid item lg={6} md={6} sm={12} xs={12} />
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField {...register("valorTotal")} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} style={{ width: "100%", float: "right" }}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Divider />

                    <CardActions >
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Button variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
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

                    {/* </SubCard> */}
                </Grid>
            </Grid >
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose} />
        </MainCard >

    );
}

export default NotaVenta;
