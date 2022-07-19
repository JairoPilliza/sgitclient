import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
// project imports
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { Accordion, AccordionDetails, AccordionSummary, CardHeader, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DepartamentoActividadDetalle from "services/DepartamentoActividadDetalle/DepartamentoActividadDetalleService";
import Resource from "resource/resource";
import { ButtonDelete, ButtonEdit } from "utils/custom-all";
import Swal from "sweetalert2";

const ActividadPresupuestaria = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [expanded, setExpanded] = React.useState(false);
    const [form, setForm] = useState({})
    const [load, setLoad] = useState(true);
    const [listaDepartamentoActividadDetalle, setlistaDepartamentoActividadDetalle] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [idDepartamentoActividadDetalle, setidDepartamentoActividadDetalle] = useState(0);
  

    useEffect(() => { reset(form) }, [form]);

    useEffect(() => {
        DepartamentoActividadDetalle.Get({ id: props.id }).then(async (result) => {
            if (result.code === "1") {
                setlistaDepartamentoActividadDetalle(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, [load]);



    const Save = (data) => {
        DepartamentoActividadDetalle.Post(data).then(async (result) => {
            if (result.code === "1") {
                setLoad(!load);
                setForm({})
                reset(form);
            } else {
                alert(result.message);
            }
        });
    };

    const Update = (data) => {
        DepartamentoActividadDetalle.Put(idDepartamentoActividadDetalle, data).then(async (result) => {
            if (result.code === "1") {
                setLoad(!load)
                setForm({});
                
            } else {
                alert(result.message);
            }
        });
    };

    const onSubmit = (data, evento) => {
        data.idRol = 1;
        data.presupuesto = data.total;
        data.idDepartamento = parseInt(props.idDepartamento);

        (editMode) ? Update(data) : Save(data);
    };

    const RowChange = (item) => {
        setidDepartamentoActividadDetalle({ id: item.idDepartamentoActividadDetalle });
        setForm(item);       
        setEditMode(true);
    };

    const deleteItem = (item) => {
        Swal.fire({
            title: "Esta seguro de eliminar?",
            text: "¡No se podrá revertir este proceso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {

                DepartamentoActividadDetalle.Delete({ id: item.idDepartamentoActividadDetalle }).then(async (result) => {
                    if (result.code === "1") {
                        setLoad(load + 1)
                        Swal.fire(
                            'Eliminado!',
                            'El registro ha sido eliminado.',
                            'success'
                        )
                    } else {
                        Swal.fire(
                            result.message + '!',
                            'El registro no ha sido eliminado.',
                            'error'
                        )
                    }
                });
            }
        })
    }
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const gridCols = { width: "100%" };

    return (
        <Grid container item spacing={2}>

            <Grid item lg={12} md={12} sm={12} xs={12} >

                <Accordion expanded={expanded === 'panel1' + (props.index + 1)} onChange={handleChange('panel1' + (props.index + 1))}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel1" + (props.index + 1) + "a-content"}
                        id={"panel1" + (props.index + 1) + "a-header"}
                        style={{ background: "#f3e5f5" }}
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        </Typography>
                        <Typography variant="h5" > {props.descripcion}</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} >
                                <TextField {...register("idDepartamentoActividad")} style={{ display: "none" }} id="idda" name="idda" value={props.id} />
                                {/* <TextField {...register("idDepartamentoActividadDetalle")} style={{ display: "none" }} id="iddad" name="iddad" /> */}
                                <Grid container item spacing={1} >
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <InputLabel id="demo-simple-select-helper-label">Cuenta:</InputLabel>
                                            <Select
                                                {...register("codigoCuentaAASINet")}
                                                labelId="demo-simple-select-helper-label"
                                                id="codigoCuentaAASINet"
                                                style={{ width: "100%" }}
                                                required
                                                label="Cuenta:"
                                                defaultValue={form.codigoCuentaAASINet || 0}

                                            >
                                                <MenuItem value={"0"}>::SELECCIONAR::</MenuItem>
                                                <MenuItem value={"10"}>Personal</MenuItem>
                                                <MenuItem value={"20"}>Muebles</MenuItem>
                                                <MenuItem value={"30"}>Pasajes</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={7} md={7} sm={12} xs={12}>

                                        <TextField
                                            {...register("descripcion")}
                                            type="text"
                                            style={gridCols}
                                            multiline
                                            id="descripcion"
                                            name="descripcion"
                                            label="Descripcion:"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12} >
                                        <TextField
                                            {...register("cantidadUnidadMedida")}
                                            type="number"
                                            style={gridCols}
                                            id="cantidadUnidadMedida"
                                            name="cantidadUnidadMedida"
                                            label="Cantidad:"
                                            variant="outlined" />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={1}>

                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <TextField
                                            {...register("unidadMedida")}
                                            type="text"
                                            style={gridCols}
                                            id="unidadMedida"
                                            name="unidadMedida"
                                            label="Unidad Medida:"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                        <TextField
                                            {...register("numeroUnidadMedida")}
                                            type='number'
                                            style={gridCols}
                                            id="numeroUnidadMedida"
                                            name="numeroUnidadMedida"
                                            label="Tiempo:"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12} >
                                        <TextField
                                            {...register("costoUnitario")}
                                            type="number"
                                            style={gridCols}
                                            id="costoUnitario"
                                            name="costoUnitario"
                                            label="Costo Unitario:"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12} >
                                        <TextField
                                            {...register("porcentaje")}
                                            type="number"
                                            style={gridCols}
                                            id="porcentaje"
                                            name="porcentaje"
                                            label="Porcentaje:"
                                            variant="outlined"
                                            defaultValue="100" />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <TextField
                                            {...register("total")}
                                            type="number"
                                            style={gridCols}
                                            id="total"
                                            name="total"
                                            label="Total:"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Button variant="contained" type="submit" style={gridCols}>GUARDAR</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
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
                                    {listaDepartamentoActividadDetalle.map((row, index) => (
                                        <TableRow hover key={index + 1}>
                                            <TableCell >
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center">#</TableCell>
                                            <TableCell align="center">{row.descripcion}</TableCell>
                                            <TableCell align="center">{row.cantidadUnidadMedida}</TableCell>
                                            <TableCell align="center">{row.unidadMedida}</TableCell>
                                            <TableCell align="center">{row.numeroUnidadMedida}</TableCell>
                                            <TableCell align="center">${row.costoUnitario}</TableCell>
                                            <TableCell align="center">{row.porcentaje} %</TableCell>
                                            <TableCell align="center">${row.total}</TableCell>

                                            <TableCell align="center">
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <ButtonEdit onClick={() => RowChange(row)}></ButtonEdit>
                                                        {/* <Button onClick={() => RowChange(row)} variant="contained" style={{ width: "100%", backgroundColor: "#ffac33" }}  >
                                                            <EditIcon />
                                                        </Button> */}
                                                    </Grid>
                                                    <Grid item>
                                                        <ButtonDelete onClick={() => deleteItem(row)}></ButtonDelete>
                                                        {/* <Button variant="contained" style={{ width: "100%", backgroundColor: "#e91e63" }} >
                                                            <DeleteIcon />
                                                        </Button> */}
                                                    </Grid>

                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion><br />

            </Grid>


        </Grid>
    );
}


export default ActividadPresupuestaria;
