import React, { Fragment, useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, Link, MenuItem, Select, Stack } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CachedIcon from '@mui/icons-material/Cached';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import CardActions from '@mui/material/CardActions';
import TipoNotaCredito from "component/TipoNotaCredito";
import BuscarFactura from "component/BuscarRetencion";


const NotaCredito = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [buscadorFactura, setBuscadorFactura] = useState(false);
    var muestraBuscador;
    if (!buscadorFactura) {
        muestraBuscador = <TipoNotaCredito handleEvent={setBuscadorFactura} />;
    }
    else {
        muestraBuscador = <BuscarFactura />;
    }

    return (
        <MainCard title="Nota de Credito" >
            <Grid container spacing={gridSpacing}>
                {
                    muestraBuscador
                }
                <Grid item xs={12} sm={12}>
                    <SubCard className="col-12" container title="DATOS DE NOTA DE CREDITO" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
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
                            <Grid item xs={12} >
                                <Stack direction="row" spacing={2}>
                                    <small style={{ width: "50%" }}><b>N° Nota de Credito:</b></small>
                                    <TextField
                                        id="outlined-basic"
                                        label="000"
                                        style={{ width: "50%" }}
                                        {...register("emison")}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="000 "
                                        style={{ width: "50%" }}

                                    />
                                    <TextField
                                        id="outlined-textarea"
                                        label="000000000"
                                        multiline
                                        style={{ width: "50%" }}

                                        {...register("secuencial")}
                                    />


                                    <Grid item xs={12} >
                                        <TextField

                                            id="outlined-date"
                                            label="Fecha emision:"
                                            type="date"
                                            style={{ width: "100%" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            {...register("fechaEmision")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            id="outlined-date"
                                            label="Fecha registro:"
                                            type="date"
                                            style={{ width: "100%" }}
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
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={6}>
                                <Card >
                                    <CardHeader
                                        title="Datos de la Factura"
                                        style={{ backgroundColor: "yellow", textAlign: "center", height: "50px" }}
                                    />

                                    <CardContent >
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                                            <Grid item xs={12} spacing={2}>
                                                <Grid item xs={12} padding={1} >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Proveedor: "
                                                        style={{ width: "100%" }}
                                                        {...register("proveedor")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} padding={1}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="N° Factura:"
                                                        style={{ width: "100%" }}
                                                        {...register("numeroFactura")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} padding={1}>
                                                    <TextField
                                                        id="outlined-date"
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

                                        </Grid>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card >
                                    <CardHeader
                                        title="Datos de la Nota de Credito"
                                        style={{ backgroundColor: "yellow", textAlign: "center", height: "50px" }}
                                    />

                                    <CardContent >
                                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                                            <Grid item xs={12} spacing={2}>
                                                <Grid item xs={12} padding={1} >
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Numero Autorización: "
                                                        style={{ width: "100%" }}
                                                        {...register("numeroAutorizacion")}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} padding={1}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Razón de Modificación:"
                                                        style={{ width: "100%" }}
                                                        {...register("razonModificacion")}
                                                    />
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </SubCard>

                </Grid>
                <Grid item xs={12} sm={12}>

                    <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                        <div>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                                <Grid item xs={6} spacing={2}>
                                    <center>
                                        <Checkbox
                                            style={{
                                                transform: "scale(1)",
                                            }} />
                                        <small>Devolucion</small>
                                    </center>
                                </Grid>
                                <Grid item xs={6} spacing={2}>
                                    <center>
                                        <Checkbox
                                            style={{
                                                transform: "scale(1)",
                                            }} />
                                        <small>Descuento</small>
                                    </center>
                                </Grid>
                            </Grid>
                        </div>
                        <div >

                        </div>
                        <br></br>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>

                                <TextField id="outlined-basic" label="Subtotal " variant="outlined" style={{ width: "100%" }}  {...register("subtotal")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Descuento:" variant="outlined" style={{ width: "100%" }}  {...register("descuento")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Subtotal 12%:" variant="outlined" style={{ width: "100%" }}  {...register("subtotal12")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Iva 12%:" variant="outlined" style={{ width: "100%" }} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField {...register("iva12")} id="outlined-basic" label="Iva 12 %:" variant="outlined" style={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Valor Total:" variant="outlined"  {...register("valorTotal")} style={{ width: "100%" }} />
                            </Grid>

                        </Grid>

                    </SubCard>
                    <Grid>
                        <CardActions >

                            <Button variant="contained" style={{ backgroundColor: "#536dfe" }}>
                                Guardar
                            </Button>
                        </CardActions>
                    </Grid>

                </Grid>
            </Grid>
        </MainCard>
    );
}

export default NotaCredito;
