import React, { Fragment, useEffect, useState } from "react";
import { Grid, InputLabel, Link } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import ModalNuevaPersona from "component/ModalPersona";
import ModalRetencion from "component/ModalRetencion";

const LiquidacionCompra = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [openMR, setOpenMR] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpenMR(true);
        setScroll(scrollType);
    };
    const handleCloseMR = () => {
        setOpenMR(false);
    };
    return (
        <MainCard title="Liquidación de compra" >
            <Grid container spacing={gridSpacing}>

                <Grid item xs={12} sm={12}>
                    <SubCard className="col-12" container title="Datos de Liquidación" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                        <Grid container>
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
                        </Grid>
                        <br></br>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Sr/Sra:"
                                    placeholder="Ingrese el nombre de la persona"
                                    multiline
                                    style={{ width: "100%" }}
                                    {...register("nombrePersona")}
                                />

                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" startIcon={<SearchIcon />}>
                                    Buscar
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon />}>
                                    Añadir Persona
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-date"
                                    helperText="Ingrese una fecha"
                                    label="Fecha registro:"
                                    type="date"
                                    style={{ width: "100%" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register("fechaRegistro")}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container  >
                            <Grid item xs={4} >
                                <TextField
                                    id="outlined-textarea"
                                    label="Lugar de Transacción:"
                                    placeholder="Escriba lugar donde se realiza la Transfacción"
                                    multiline
                                    style={{ width: "100%", float: "left" }}
                                    {...register("lugarTransaccion")}
                                />

                            </Grid>

                            <Grid item xs={8} >
                                <Grid container spacing={2} xs={10}>
                                    <Grid item xs={3}>
                                        <small  style={{ width: "100%" }}><b>N° Liquidación:</b></small>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Emision"
                                            helperText="emision"
                                            style={{ width: "100%" }}
                                            {...register("emision")}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="outlined-basic"
                                            label="punto emision "
                                            helperText="punto emision "
                                            style={{ width: "100%" }}
                                            {...register("puntoEmision")}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Secuencial de la liquidacion"
                                            helperText="Secuencial de la liquidacion"
                                            placeholder="Diguite Secuencial"
                                            multiline
                                            style={{ width: "170px" }}
                                            {...register("secuencial")}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Card >
                            <CardHeader
                                title="Datos de la persona"
                                style={{ backgroundColor: "yellow", textAlign: "center", height: "50px" }}
                            />

                            <CardContent xs={12} >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Nombres:"
                                            placeholder="Nombres Completos de la persona"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("nombreCompleto")}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Tipo Identificación:"
                                            placeholder="Tipo Identificación"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("tipoIdentificacion")}
                                        />
                                    </Grid>
                                    <Grid item xs={5} md={5}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="CI/Pasaporte:"
                                            placeholder="Numero de Identificación"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("numeroIdentificacion")}
                                        />

                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                        <Button variant="contained" size="small"><CheckIcon /></Button>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Telefono:"
                                            placeholder="Telefono convencional o celular"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("telefonoCelular")}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Email:"
                                            placeholder="gold@example.com"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("correo")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Dirección:"
                                            placeholder="Dirección domiciliaria"
                                            multiline
                                            style={{ width: "100%" }}
                                            {...register("direccionDomiciliaria")}
                                        />
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </SubCard>

                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard className="col-12" container title="Calculo (Valor Liquido a Recibir)" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                        <div>
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tipo Base</TableCell>
                                            <TableCell align="center">Cant.</TableCell>
                                            <TableCell align="center">Descripción</TableCell>
                                            <TableCell align="center">V.Unit.</TableCell>
                                            <TableCell align="center">Total</TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell>
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    {...register("tipoBase")}>
                                                    <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                    <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                id="standard-number"
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
                                                id="standard-number"
                                                style={{ width: "300px" }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="standard"
                                                {...register("descripcion")} />

                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-number"
                                                type="number"
                                                style={{ width: "70px" }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                variant="standard"
                                                {...register("valUnit")} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="standard-read-only-input"
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
                        </div>
                        <div >
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "skyblue", color: "black" }}>
                                        <TableRow>
                                            <TableCell>Cod Tipo Base</TableCell>
                                            <TableCell align="center">Cant.</TableCell>
                                            <TableCell align="center">Descripción</TableCell>
                                            <TableCell align="center">V.Unit.</TableCell>
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
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid container item xs={6} rowSpacing={2} >
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Subtotal" variant="outlined" style={{ width: "70%" }}  {...register("subtotal")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Base IVA 0%:" variant="outlined" style={{ width: "70%" }}  {...register("baseIVA0")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Base IVA 12%:" variant="outlined" style={{ width: "70%" }}  {...register("baseIVA12")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField {...register("Iva12")} id="outlined-basic" label="Iva 12 %:" variant="outlined" style={{ width: "70%" }} />
                                </Grid>

                            </Grid>
                            <Grid container item xs={6} rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" label="Valor Total:" variant="outlined"  {...register("valorTotal")} style={{ width: "70%" }} />
                                </Grid>
                            </Grid>


                        </Grid>
                    </SubCard>
                    <Grid>
                        <CardActions >
                            <Button variant="contained" style={{ backgroundColor: "#536dfe" }}>
                                Guardar Liquidación
                            </Button>
                            <Button variant="contained" onClick={handleClickOpen('paper')} style={{ backgroundColor: "#f06292" }}>
                                Retener
                            </Button>
                        </CardActions>
                    </Grid>

                </Grid>
            </Grid>
            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
            />
            <ModalNuevaPersona
                open={open}
                onClose={handleClose} />
        </MainCard>
    );
}

export default LiquidacionCompra;
