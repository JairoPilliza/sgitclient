import React, { Fragment, useEffect, useState } from "react";
import { Checkbox, Divider, FormControlLabel, Grid, InputLabel } from '@mui/material';
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
import Select from '@mui/material/Select';
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
import EditIcon from '@mui/icons-material/Edit';
import ModalRegistroLiquidacion from "component/Configuracion/Liquidacion/ModalRegistroLiquidacion";
import ModalRetencionLiquidacion from "./ModalRetencionLiquidacion";
const LiquidacionCompra = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [openMRL, setOpenMRL] = useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpenMRL(true);
        setScroll(scrollType);
    };
    const handleCloseMRL = () => {
        setOpenMRL(false);
    };
    return (
        <MainCard title="Liquidación de compra" >
            <Grid container spacing={gridSpacing}>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <from>
                        <SubCard className="col-12" container title="Datos de Liquidación" style={{ textAlign: "center" }}>
                            <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                        <Select
                                            {...register("sustentoTributario")}
                                            labelId="demo-simple-select-helper-label"
                                            id="sustentoTributario"
                                            name="sustentoTributario"
                                            style={{ width: "100%" }}
                                            required
                                            label="Sustento Tributario"

                                        >
                                            <MenuItem value={10}>FACTURA</MenuItem>
                                            <MenuItem value={20}>NOTA DE VENTA</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12}  >
                                    <TextField
                                        {...register("nombrePersona")}
                                        id="nombrePersona"
                                        name="nombrePersona"
                                        label="Sr/Sra:"
                                        placeholder="Ingrese el nombre de la persona"

                                        style={{ width: "100%" }}

                                    />

                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}  >
                                    <Button variant="outlined" startIcon={<SearchIcon />} style={{ width: "100%" }}>
                                        Buscar
                                    </Button>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <Button onClick={handleOpen} variant="outlined" startIcon={<AddCircleIcon />} style={{ width: "100%" }}>
                                        Añadir Persona
                                    </Button>
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <TextField
                                        {...register("fechaRegistro")}
                                        id="fechaRegistro"
                                        name="fechaRegistro"
                                        helperText="Ingrese una fecha"
                                        label="Fecha registro:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container spacing={2} >
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <TextField
                                        {...register("lugarTransaccion")}
                                        id="lugarTransaccion"
                                        name="lugarTransaccion"
                                        label="Lugar de Transacción:"
                                        placeholder="Escriba lugar donde se realiza la Transfacción"
                                        multiline
                                        style={{ width: "100%", float: "left" }}

                                    />

                                </Grid>

                                <Grid item lg={8} md={8} sm={12} xs={12}  >
                                    <Grid container spacing={2} >
                                        <Grid item lg={3} md={3} sm={12} xs={12}>
                                            <small style={{ width: "100%" }}><b>N° Liquidación:</b></small>
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <TextField
                                                {...register("emision")}
                                                id="emision"
                                                name="emision"
                                                label="Emision"
                                                helperText="emision"
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <TextField
                                                {...register("puntoEmision")}
                                                id="puntoEmision"
                                                name="puntoEmision"
                                                label="punto emision "
                                                helperText="punto emision "
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={3} md={3} sm={12} xs={12} >
                                            <TextField
                                                {...register("secuencial")}
                                                id="secuencial"
                                                name="secuencial"
                                                label="Secuencial de la liquidacion"
                                                helperText="Secuencial de la liquidacion"
                                                placeholder="Diguite Secuencial"

                                                style={{ width: "100%" }}

                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Card lg={12}>
                                <CardHeader
                                    title="Datos de la persona"
                                    style={{ backgroundColor: "#ffc107", textAlign: "center", height: "50px" }}
                                />

                                <CardContent  >
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Button onClick={handleOpen} variant="outlined" startIcon={<EditIcon />} style={{ width: "100%" }}>
                                                Editar
                                            </Button>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                {...register("nombreCompleto")}
                                                id="nombreCompleto"
                                                name="nombreCompleto"
                                                label="Nombres:"
                                                placeholder="Nombres Completos de la persona"

                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <TextField
                                                {...register("tipoIdentificacion")}
                                                id="tipoIdentificacion"
                                                name="tipoIdentificacion"
                                                label="Tipo Identificación:"
                                                placeholder="Tipo Identificación"

                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={5} sm={12} xs={12}>
                                            <Grid container spacing={1} lg={12} >
                                                <Grid item lg={10} md={10} sm={8} xs={8}>
                                                    <TextField
                                                        {...register("numeroIdentificacion")}
                                                        id="numeroIdentificacion"
                                                        name="numeroIdentificacion"
                                                        label="CI/Pasaporte:"
                                                        placeholder="Numero de Identificación"
                                                        style={{ width: "100%" }}

                                                    />
                                                </Grid>
                                                <Grid item lg={2} md={2} sm={4} xs={4}>
                                                    <Button variant="contained" size="small"><CheckIcon /></Button>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <TextField
                                                {...register("telefono")}
                                                id="telefono"
                                                name="telefono"
                                                label="Telefono:"
                                                placeholder="Telefono convencional o celular"
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <TextField
                                                {...register("email")}
                                                id="email"
                                                name="email"
                                                label="Email:"
                                                placeholder="gold@example.com"
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <TextField
                                                {...register("direccion")}
                                                id="direccion"
                                                name="direccion"
                                                label="Dirección:"
                                                placeholder="Dirección domiciliaria"
                                                style={{ width: "100%" }}

                                            />
                                        </Grid>
                                    </Grid>

                                </CardContent>
                            </Card>
                        </SubCard>
                    </from>
                </Grid>
                <Grid item sm={12} xs={12} >
                    <SubCard className="col-12" container title="Calculo (Valor Liquido a Recibir)" style={{ textAlign: "center" }} >
                        <div>
                            <from>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
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
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
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
                                <Grid container >
                                    <Grid item >
                                      

                                        <FormControlLabel
                                            labelPlacement="start"
                                            label='Grava Iva'
                                            
                                            control={<Checkbox {...register("gravaIva")}  id="gravaIva"
                                                name="gravaIva"
                                            />}
                                        />

                                    </Grid>

                                </Grid>
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
                                                        id="tipoBase"
                                                        name="tipoBase"
                                                        {...register("tipoBase")}>
                                                        <MenuItem value={"Bienes"}>Bienes</MenuItem>
                                                        <MenuItem value={"Servicios"}>Servicios</MenuItem>
                                                    </Select>
                                                </FormControl>
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
                                                    id="descripcion"
                                                    name="descripcion"
                                                    style={{ width: "300px" }}
                                                    multiline
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("descripcion")} />

                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="valorUnitario"
                                                    name="valorUnitario"
                                                    type="number"
                                                    style={{ width: "70px" }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    variant="standard"
                                                    {...register("valorUnitario")} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="valorTotal"
                                                    name="valorTotal"
                                                    style={{ width: "70px" }}
                                                    InputProps={{
                                                        readOnly: true
                                                    }}
                                                    variant="standard"
                                                    {...register("valorTotal")} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained">
                                                    <AddIcon />
                                                </Button>
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </from>
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
                        <from>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid container item rowSpacing={2} lg={6} md={6} sm={12} xs={12}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField   {...register("subtotal")} id="subtotal" name="subtotal" label="Subtotal" variant="outlined" style={{ width: "100%" }} />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <TextField  {...register("baseIvaCero")} id="baseIvaCero" name="baseIvaCero" label="Base IVA 0%:" variant="outlined" style={{ width: "100%" }} />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField {...register("baseIvaDoce")} id="baseIvaDoce" name="baseIvaDoce" label="Base IVA 12%:" variant="outlined" style={{ width: "100%" }} />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}   >
                                        <TextField  {...register("ivaDoce")} id="ivaDoce" name="ivaDoce" label="Iva 12 %:" variant="outlined" style={{ width: "100%" }} />
                                    </Grid>
                                </Grid>
                                <Grid container item lg={6} md={6} sm={12} xs={12}>

                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                        <TextField {...register("valorTotal")} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined" style={{ width: "100%" }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Divider />
                            <CardActions >
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                            Guardar
                                        </Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }} onClick={handleClickOpen('paper')}>
                                            Retener
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </from>
                    </SubCard>
                </Grid>
            </Grid>

            <ModalNuevaPersona
                open={open}
                onClose={handleClose} />
            <ModalRetencionLiquidacion
                open={openMRL}
                onClose={handleCloseMRL}
            />
        </MainCard>
    );
}

export default LiquidacionCompra;
