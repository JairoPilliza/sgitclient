import React, { Fragment, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Sucursal from "services/Sucursal/SucursalService";
import useNavigateParamsSearch from "hooks/useNavigateParamsSearch";
import Periodo from "services/Periodo/Periodo";

const ModalAperturaPeriodo = (props) => {
    const params = useNavigateParamsSearch();
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({});
    const [scroll, setScroll] = React.useState('paper');
    const [listaSucursal, setListaSucursal] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [load, setLoad] = useState(true)

    useEffect(() => {
        Sucursal.Get().then(async (result) => {
            if (result.code === "1") {
                setListaSucursal(result.payload ? JSON.parse(result.payload) : [])
                return;
            }
            console.log(result.message);
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    const Save = (data) => {
        Periodo.Post(data).then(async (result, data) => {
            if (result.code === "1") {

                props.onClose(false);
                props.setLoad(!load)
            } else {
                alert(result.message);

            }
        });
    }
    const Update = (data) => {

        Periodo.Put({ id: params.id }, data).then(async (result) => {
            if (result.code === "1") {
                props.onClose(false);
                props.setLoad(!load)
            } else {
                alert(result.message);
            }
        });

    };

    const onSubmit = (data, evento) => {
        data.idRol = 1;
        data.estado = true;
        (editMode) ? Update(data) : Save(data);

    }



    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle id="scroll-dialog-title">Apertura de Periodo</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers={scroll === 'paper'}>


                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>

                                    <FormControl sx={{ minWidth: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Entidad - Sucursal</InputLabel>
                                        <Select
                                            {...register("idSucursal")}
                                            labelId="demo-simple-select-helper-label"
                                            id="idSucursal"
                                            name="idSucursal"
                                            style={{ width: "100%", float: "right" }}
                                            required
                                            label="Entidad - Sucursal"
                                        >
                                            {
                                                listaSucursal.map((row, index) => (
                                                    <MenuItem key={index + 1} value={row.idSucursal}>{row.nombre} - {row.descripcion} </MenuItem>
                                                ))
                                            }


                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        {...register("gestion")}
                                        id="gestion"
                                        name="gestion"
                                        label="Gestion:"
                                        style={{ width: "100%" }}
                                        required

                                    />

                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>

                                    <TextField
                                        {...register("mes")}
                                        id="mes"
                                        name="mes"
                                        label="Mes:"
                                        style={{ width: "100%" }}
                                        required


                                    />
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        {...register("fechaApertura")}
                                        id="fechaApertura"
                                        name="fechaApertura"
                                        label="Fecha Apertura:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}


                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        {...register("fechaCierre")}
                                        id="fechaCierre"
                                        name="fechaCierre"
                                        label="Fecha Cierre:"
                                        type="date"
                                        style={{ width: "100%" }}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />
                                </Grid>
                            </Grid>
                        </CardContent>

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit">Registar Apertura</Button>
                    </DialogActions>

                </form>

            </Dialog>
        </Fragment>

    );
}

export default ModalAperturaPeriodo;
