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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        p: 4,
    };


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

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle id="scroll-dialog-title">Apertura de Periodo</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <Card className="col-12" container style={{ border: '1' }}>
                                <CardHeader title="Registro de Periodos "
                                    subheader=" se recomienda escoger el 1er día de cada mes.
                            " />
                                <Divider></Divider>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>

                                            <FormControl sx={{ minWidth: "100%" }}>
                                                <InputLabel id="demo-simple-select-helper-label">Entidad</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="entidad"
                                                    name="entidad"
                                                    style={{ width: "100%", float: "right" }}
                                                    required
                                                    label="Entidad"
                                                    {...register("entidad")}
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>

                                            </FormControl>
                                        </Grid>

                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <TextField
                                                id="fechaApertura"
                                                name="fechaApertura"
                                                label="Fecha Apertura:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("fechaApertura")}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit">Registar Apertura</Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>

    );
}

export default ModalAperturaPeriodo;
