import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { Accordion, AccordionDetails, AccordionSummary, CardHeader, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { gridSpacing } from "store/constant";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useNavigate } from "react-router";

const ActividadPresupuestaria = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({idDepartamentoActividad : "", codigoCuentaAASINet : "", descripcion : "", cantidadUnidadMedida : "", unidadMedida : "", numeroUnidadMedida : "", costoUnitario : "", porcentaje : "", total : ""})
    /////////MODAL PROVEEDOR
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [total, setTotal] = React.useState(0);

    const handleChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;

        setForm({
            ...form,
            [name]: value
        })

        console.log(form);


    }

    function createData(cuenta, descripcion, porcentaje, cantidad, tiempo, precio, total) {
        return { cuenta, descripcion, porcentaje, cantidad, tiempo, precio, total };
    }

    // useEffect(()=>{

    // },[])
    const CalcularTotalHandler = (e, item) => {
        alert();
        console.log(e)
    }

    const rows = [
        createData('Personal', '-----------', '10', 1, 25, 700, 700),
        createData('Muebles', '-----------', '10', 1, 30, 500, 500),
        createData('Pasaje', '-----------', '10', 2, 10, 100, 200),
    ];

    var cont = 0;
    const gridCols = { width: "100%" };
    return (
        <Grid container item spacing={2}>

            <Grid item lg={12} md={12} sm={12} xs={12} >
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ background: "#f3e5f5" }}

                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {/* Item */}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Actividad 1</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2} >
                            <Grid container item spacing={1} >
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <FormControl sx={{ minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-helper-label">Cuenta:</InputLabel>
                                        <Select
                                            {...register("codigoCuentaAASINet")}
                                            labelId="demo-simple-select-helper-label"
                                            id="codigoCuentaAASINet"
                                            name="codigoCuentaAASINet"
                                            style={{ width: "100%" }}
                                            required
                                            label="Cuenta:"
                                            value={form.codigoCuentaAASINet}
                                            onChange={handleChange}

                                        >
                                            <MenuItem value={10}>Personal</MenuItem>
                                            <MenuItem value={20}>Muebles</MenuItem>
                                            <MenuItem value={20}>Pasajes</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12}>
                                    <TextField {...register("descripcion")}
                                        value={form.descripcion}
                                        onChange={handleChange}
                                         type="text" style={gridCols} multiline id="descripcion" name="descripcion" label="Descripcion:" variant="outlined" />
                                </Grid>

                            </Grid>
                            <Grid container item spacing={1}>
                                <Grid item lg={2} md={2} sm={12} xs={12} >
                                    <TextField {...register("cantidadUnidadMedida")}
                                    value={form.cantidadUnidadMedida}
                                    onChange={handleChange}
                                    type="number" style={gridCols} id="cantidadUnidadMedida" name="cantidadUnidadMedida" label="Cantidad:" variant="outlined" />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <TextField  {...register("unidadMedida")} 
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    type="text" style={gridCols} id="unidadMedida" name="unidadMedida" label="Unidad Medida:" variant="outlined" />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12}>
                                    <TextField  {...register("numeroUnidadMedida")}
                                    value={form.numeroUnidadMedida}
                                    onChange={handleChange}
                                    type="number" style={gridCols} id="numeroUnidadMedida" name="numeroUnidadMedida" label="Tiempo:" variant="outlined" />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12} >
                                    <TextField  {...register("costoUnitario")}
                                    value={form.costoUnitario}
                                    onChange={handleChange}
                                    type="number" style={gridCols} id="costoUnitario" name="costoUnitario" label="Costo Unitario:" variant="outlined" />
                                </Grid>
                                <Grid item lg={2} md={2} sm={12} xs={12} >
                                    <TextField {...register("porcentaje")}
                                     value={form.porcentaje}
                                     onChange={handleChange}
                                    type="number" style={gridCols} id="porcentaje" name="porcentaje" label="Porcentaje:" variant="outlined" />
                                </Grid>
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <TextField {...register("total")} 
                                    value={form.total}
                                    onChange={handleChange}
                                    type="number" style={gridCols} id="total" name="total" label="Total:" variant="outlined" />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Button variant="contained" type="submit" style={gridCols}>Agregar</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell align="center">Cuenta</TableCell>
                                        <TableCell align="center">Descripcion</TableCell>
                                        <TableCell align="center">Cantidad</TableCell>
                                        <TableCell align="center">Unidad Medida</TableCell>
                                        <TableCell align="center">Tiempo</TableCell>
                                        <TableCell align="center">Precio</TableCell>
                                        <TableCell align="center">Porcentaje</TableCell>

                                        <TableCell align="center">Total</TableCell>

                                        <TableCell align="center">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow hover key={row.cuenta}>
                                            <TableCell >
                                                {cont = cont + 1}
                                            </TableCell>
                                            <TableCell align="center">{row.cuenta}</TableCell>
                                            <TableCell align="center">{row.descripcion}</TableCell>
                                            <TableCell align="center">{row.cantidad}</TableCell>
                                            <TableCell align="center">{row.tiempo} dias</TableCell>
                                            <TableCell align="center">$ {row.precio}</TableCell>
                                            <TableCell align="center">{row.porcentaje} %</TableCell>
                                            <TableCell align="center">$ {row.total}</TableCell>

                                            <TableCell align="center">
                                                <Grid container spacing={2}>

                                                    <Grid item>
                                                        <Button variant="contained" style={{ width: "100%", backgroundColor: "#e91e63" }} >
                                                            <DeleteIcon />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </Grid>


        </Grid>
    );
}


export default ActividadPresupuestaria;
