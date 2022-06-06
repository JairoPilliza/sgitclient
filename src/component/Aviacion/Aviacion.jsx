import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CachedIcon from '@mui/icons-material/Cached';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import { Stack } from "@mui/material";
const Aviacion = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    return (
        <MainCard title="Pasajes emitidos por empresa de Aviación" >
            <Grid container spacing={gridSpacing}>                
                <Grid item xs={12} sm={12}>
                    <SubCard className="col-12" container title="Datos de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={6}>
                                <FormControl sx={{ minWidth: '100%' }}>
                                    <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="sustentoTributario"
                                        style={{ width: "100%" }}
                                        required
                                        label="Sustento Tributario"
                                        {...register("sustentoTributario")}
                                    >
                                        <MenuItem value={10}>FACTURA</MenuItem>
                                        <MenuItem value={20}>NOTA DE VENTA</MenuItem>

                                    </Select>

                                </FormControl>
                            </Grid>
                            <Grid item xs={12}  >
                                <Stack direction="row" spacing={2}>
                                    <small style={{ width: "50%" }} ><b>N° Factura:</b></small>
                                    <TextField
                                        id="outlined-basic"
                                        label="xxx"
                                        style={{ width: "50%" }}
                                        {...register("establecimiento")}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="xxx"
                                        style={{ width: "50%" }}
                                        {...register("puntoEmision")}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="xxx"
                                        style={{ width: "50%" }}
                                        {...register("secuencial")}
                                    />

                                    <Grid item xs={12}>
                                        <TextField

                                            id="outlined-date"
                                            label="F. Emisión:"
                                            type="date"
                                            style={{ width: "100%", float: "right" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register("fechaEmision")}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField

                                            id="outlined-date"
                                            label="F. Registro:"
                                            type="date"
                                            style={{ width: "100%", float: "right" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register("fechaRegistro")}
                                        />
                                    </Grid>
                                </Stack>

                               
                            </Grid>
                        </Grid>
                        <br></br>
                        <Card >
                            <CardHeader
                                title="Datos del proveedor"
                                style={{ backgroundColor: "yellow", textAlign: "center", height: "30px" }}
                            />

                            <CardContent >
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                                    <Grid item xs={6} spacing={2}>
                                        <Grid item xs={12} padding={1} >
                                            <TextField
                                                id="outlined-basic"
                                                label="Numero Ruc: "
                                                style={{ width: "70%" }}
                                                {...register("numeroRuc")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} padding={1}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Numero Autorización:"
                                                style={{ width: "70%" }}
                                                {...register("numeroAutotizacion")}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={6} spacing={2}>
                                        <Grid item xs={12} padding={1} >
                                            <TextField
                                                id="outlined-basic"
                                                label="Telefono: "
                                                style={{ width: "70%" }}
                                                {...register("telefono")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} padding={1}>
                                            <TextField
                                                id="outlined-date"
                                                label="Dirección:"
                                                style={{ width: "70%" }}
                                                {...register("direccionDomiciliaria")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} padding={1}>
                                            <TextField
                                                id="outlined-date"
                                                label="Email:"
                                                style={{ width: "70%" }}
                                                {...register("correo")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </SubCard>

                </Grid>
                <Grid item xs={12} sm={12}>                  
                    <SubCard className="col-12" container title="Detalle del pasaje de Aviación" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                        <div>
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tipo Base</TableCell>
                                            <TableCell align="center" >Grava Iva</TableCell>
                                            <TableCell align="center">Cant.</TableCell>
                                            <TableCell align="center">Descripción</TableCell>
                                            <TableCell align="center">Precio Unit.</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell>
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard">
                                                    <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                    <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <center>
                                                <Checkbox
                                                    style={{
                                                        transform: "scale(1)",
                                                    }} />
                                            </center>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-number"
                                                type="number"
                                                style={{ width: "50px" }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="standard" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-number"
                                                style={{ width: "300px" }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="standard" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-number"
                                                type="number"
                                                style={{ width: "70px" }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="standard" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-read-only-input"
                                                style={{ width: "70px" }}
                                                InputProps={{
                                                    readOnly: true
                                                }}
                                                variant="standard" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained">
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div >
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "skyblue", color: "black" }}>
                                        <TableRow>
                                            <TableCell>#</TableCell>

                                            <TableCell align="center">Cant.</TableCell>
                                            <TableCell align="center" >Tipo Base</TableCell>
                                            <TableCell align="center">Descripción</TableCell>
                                            <TableCell align="center">Precio Unit.</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center">Opcion</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <br></br>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={4}>

                                <TextField id="outlined-basic" label="Subtotal 12%" variant="outlined"  {...register("subtotal12")}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Base No Objeto IVA:" variant="outlined"  {...register("baseNoObjIVA")} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Subtotal:" variant="outlined"   {...register("Ssubtotal")}/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Subtotal 0%:" variant="outlined"  {...register("subtotal0")} />
                            </Grid>
                            <Grid item xs={4}>
                                <label>
                                    <Checkbox
                                        style={{
                                            marginRight: "10px",
                                            transform: "scale(1)",
                                        }} />
                                </label>
                                <TextField style={{
                                    marginRight: "50px",
                                }} id="outlined-basic" label="Ice:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField {...register("IVA12")} id="outlined-basic" label="Iva 12 %:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField  {...register("descuento12")} id="outlined-basic"  label="Descuento 12%:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField  {...register("propina")} id="outlined-basic" label="Propina Tip (Serv. 10%):" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField   {...register("valorTotal")}id="outlined-basic" label="Valor Total:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField  {...register("descuento0")} id="outlined-basic" label="Descuento 0%:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField   {...register("irbpnr")} id="outlined-basic" label="IMP. IRBPNR:" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid>
                            <CardActions >

                                <Button variant="contained" style={{ backgroundColor: "#536dfe" }}>
                                    Guardar
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: "#f06292" }}>
                                    Retener
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: "#f57f17" }}>
                                    Cancelar
                                </Button>

                            </CardActions>
                        </Grid>
                    </SubCard>

                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Aviacion;
