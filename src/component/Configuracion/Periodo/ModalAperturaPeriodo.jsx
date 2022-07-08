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


const ModalAperturaPeriodo = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [form, setForm] = useState({ });



    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }

    
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
                
                    <DialogContent dividers={scroll === 'paper'}>
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        {/* <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        > */}
                            {/* <Card className="col-12" container style={{ border: '1' }}>
                                <CardHeader title="Registro de Periodos "
                                    subheader=" se recomienda escoger el 1er día de cada mes.
                            " /> */}
                                
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>

                                            <FormControl sx={{ minWidth: "100%" }}>
                                                <InputLabel id="demo-simple-select-helper-label">Entidad</InputLabel>
                                                <Select
                                                    {...register("entidad")}
                                                    labelId="demo-simple-select-helper-label"
                                                    id="entidad"
                                                    name="entidad"
                                                    style={{ width: "100%", float: "right" }}
                                                    required
                                                    label="Entidad"
                                                    value={form.entidad}
                                                    onChange={handleChange}

                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
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
                                                value={form.gestion}
                                                onChange={handleChange}
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
                                                value={form.mes}
                                                onChange={handleChange}

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
                                                value={form.fechaApertura}
                                                onChange={handleChange}

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
                                                value={form.fechaCierre}
                                                onChange={handleChange}

                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            {/* </Card> */}

                        {/* </DialogContentText> */}
                        {/* </form> */}
                    </DialogContent>
                
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button type="submit">Registar Apertura</Button>
                </DialogActions>


            </Dialog>
        </Fragment>

    );
}

export default ModalAperturaPeriodo;
