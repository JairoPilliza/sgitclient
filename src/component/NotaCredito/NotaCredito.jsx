import React, { Fragment, useEffect, useState } from "react";
import { Alert, AlertTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TipoNotaCredito from "component/TipoNotaCredito";
import BuscarFactura from "component/BuscarFactura";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const NotaCredito = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [buscadorFactura, setBuscadorFactura] = useState(false);
    const [showTableDtNotaCredito, setShowTableDtNotaCredito] = useState(false);
    const [disable, setDisable] = useState(true);
    const [checkDevolucion, setCheckDevolucion] = useState(false);
    const [checkDescuento, setCheckDescuento] = useState(false);

    var muestraBuscador;
    if (!buscadorFactura) {
        muestraBuscador = <TipoNotaCredito handleEvent={setBuscadorFactura} />;
    }
    else {
        muestraBuscador = <BuscarFactura />;
    }

    const devolucion = () => {
        
        setDisable(true);
        setShowTableDtNotaCredito(true);
        setCheckDescuento(false);
        setCheckDevolucion(true);

    }
    const descuento = () => {
        setDisable(false);
        setShowTableDtNotaCredito(false);
        setCheckDescuento(true);
        setCheckDevolucion(false);
    }
    const onSubmit = (data, evento) => {
        alert();
        console.log(data);
    }

    var tableDetalleNotaCredito;
    if (showTableDtNotaCredito) {
        tableDetalleNotaCredito =
            <div>
                <div>
                    <form >
                        <TableContainer >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell align="center" >Grava Iva</TableCell>
                                        <TableCell align="center">Cant.</TableCell>
                                        <TableCell align="center">Detalle</TableCell>
                                        <TableCell align="center">Precio Unit.</TableCell>
                                        <TableCell align="center">Total</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableCell>
                                        <center>
                                            <Checkbox
                                                id="grabaIva"
                                                name="grabaIva"
                                                defaultChecked
                                                style={{
                                                    transform: "scale(1)",

                                                }}
                                                {...register("grabaIva")} />
                                        </center>
                                    </TableCell>
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
                                            id="detalle"
                                            name="detalle"
                                            style={{ width: "300px" }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            variant="standard"
                                            {...register("detalle")} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="precioUnit"
                                            name="precioUnit"
                                            type="number"
                                            style={{ width: "70px" }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            variant="standard"
                                            {...register("precioUnit")} />
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
                                        <Button variant="contained" >
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
                            <TableHead style={{ backgroundColor: "skyblue", color: "black" }}>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Grava Iva</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center">Descripción</TableCell>
                                    <TableCell align="center">Precio Unit.</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell align="center">Opciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>1</TableCell>
                                <TableCell>GRAVA IVA</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>Super</TableCell>
                                <TableCell>$ 2.74</TableCell>
                                <TableCell>$ 8.93</TableCell>
                                <TableCell>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Button variant="contained"><EditIcon /></Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained"><DeleteForeverIcon /></Button>

                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
    }else{
        tableDetalleNotaCredito =null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            < MainCard title="Nota de Credito" >

                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        {
                            muestraBuscador
                        }
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <SubCard className="col-12" container title="DATOS DE NOTA DE CREDITO" style={{ textAlign: "center" }} >
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                <Grid item xs={12} sm={12} md={6} lg={6} />
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="sustentoTributario"
                                            name="sustentoTributario"
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
                                <Grid item xs={12} md={12} sm={12} lg={12} >
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <small style={{ width: "100%" }} ><b>N° Nota de Credito:</b></small>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <TextField
                                                id="emision"
                                                name="emision"
                                                label="000"
                                                style={{ width: "100%" }}
                                                {...register("emision")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <TextField
                                                id="puntoEmision"
                                                name="puntoEmision"
                                                label="000 "
                                                style={{ width: "100%" }}
                                                {...register("puntoEmision")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <TextField
                                                id="secuencial"
                                                name="secuencial"
                                                label="000000000"
                                                multiline
                                                style={{ width: "100%" }}
                                                {...register("secuencial")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <TextField

                                                id="fechaEmsion"
                                                name="fechaEmsion"
                                                label="F. Emisión:"
                                                type="date"

                                                style={{ width: "100%", float: "right" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("fechaEmsion")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} sm={12} lg={6}>
                                            <TextField
                                                id="fechaRegistro"
                                                name="fechaRegistro"
                                                label="F. Registro:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("fechaRegistro")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <Card >
                                        <CardHeader
                                            title="Datos de la Factura"
                                            style={{ backgroundColor: "#ffc107", height: "50px" }}

                                        />

                                        <CardContent >

                                            <Grid container spacing={2} >
                                                <Grid item xs={12} md={12} sm={12} lg={12} >
                                                    <TextField
                                                        id="proveedor"
                                                        name="proveedor"
                                                        label="Proveedor: "
                                                        style={{ width: "100%" }}
                                                        {...register("proveedor")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={12} sm={12} lg={12}>
                                                    <TextField
                                                        id="numeroFactura"
                                                        name="numeroFactura"
                                                        label="N° Factura:"
                                                        style={{ width: "100%" }}
                                                        {...register("numeroFactura")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={12} sm={12} lg={12}>
                                                    <TextField
                                                        id="fechaEmision"
                                                        name="fechaEmision"
                                                        label="Fecha de Emision:"
                                                        type="date"
                                                        style={{ width: "100%" }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        {...register("fechaEmision")}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <Card >
                                        <CardHeader
                                            title="Datos de la Nota de Credito"
                                            style={{ backgroundColor: "#ffc107", textAlign: "center", height: "50px" }}
                                        />
                                        <CardContent >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} sm={12} lg={12} >
                                                    <TextField
                                                        id="numeroAutorizacion"
                                                        name="numeroAutorizacion"
                                                        label="Numero Autorización: "
                                                        style={{ width: "100%" }}
                                                        {...register("numeroAutorizacion")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={12} sm={12} lg={12}>
                                                    <TextField
                                                        id="razonModificacion"
                                                        name="razonModificacion"
                                                        label="Razón de Modificación:"
                                                        style={{ width: "100%" }}
                                                        {...register("razonModificacion")}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </SubCard>

                    </Grid>

                    <Grid item xs={12} md={12} sm={12} lg={12}>
                        <SubCard className="col-12" container title="Detalle de Nota de credito" style={{ textAlign: "center" }} >
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl sx={{ minWidth: '100%' }}>
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
                                        <FormControl sx={{ minWidth: '100%' }}>
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
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={6} sm={12} lg={6}>
                                        <center>
                                            <Checkbox
                                                id="devolucion"
                                                name="devolucion"
                                             
                                                onChange={checkDevolucion}
                                                style={{
                                                    transform: "scale(1)",
                                                }}    {...register("devolucion")}
                                                onClick={() => devolucion()} />

                                            <small>Devolucion</small>
                                        </center>


                                    </Grid>
                                    <Grid item xs={12} md={6} sm={12} lg={6}>
                                        <center>
                                            <Checkbox
                                                id="descuento"
                                                name="devolucion"
                                                
                                                onChange={checkDescuento}
                                                style={{
                                                    transform: "scale(1)",
                                                }}
                                                {...register("descuento")}
                                                onClick={() => descuento()} />
                                            <small>Descuento</small>
                                        </center>

                                    </Grid>

                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            Total Factura Restante:
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            {
                                tableDetalleNotaCredito
                            }
                            <br></br>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                                <Grid item xs={12} md={6} sm={12} lg={6}>

                                    <TextField id="subtotal" disabled name="subtotal" label="Subtotal " variant="outlined" style={{ width: "100%" }}  {...register("subtotal")} />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <TextField id="descuento" disabled={disable} name="descuento" label="Descuento:" variant="outlined" style={{ width: "100%" }}  {...register("descuento")} />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <TextField id="subtotal12" disabled name="subtotal12" label="Subtotal 12%:" variant="outlined" style={{ width: "100%" }}  {...register("subtotal12")} />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <TextField id="iva12" disabled name="iva12" label="Iva 12%:" variant="outlined" style={{ width: "100%" }}  {...register("iva12")} />
                                </Grid>

                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <TextField id="subtotal0" disabled name="subtotal0" label="Subtotal 0%:" variant="outlined" style={{ width: "100%" }}  {...register("subtotal0")} />
                                </Grid>
                                <Grid item xs={12} md={6} sm={12} lg={6}>
                                    <TextField id="valorTotal" disabled name="valorTotal" label="Valor Total:" variant="outlined"  {...register("valorTotal")} style={{ width: "100%" }} />
                                </Grid>
                            </Grid>
                        </SubCard>
                        <CardActions >
                            <Grid container>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <Button type="submit" variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Grid>
                </Grid>
            </MainCard >
        </form>
    );
}

export default NotaCredito;
