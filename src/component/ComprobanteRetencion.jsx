import React, { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, Checkbox, Divider, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ModalComprobanteRetencion = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

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


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        p: 4,
    };


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

                <DialogTitle id="scroll-dialog-title">Comprobante Retencion</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Card container style={{ textAlign: "center" }} >
                                <br />
                                <Grid container spacing={2}>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Typography variant="h3" component="div">
                                                Información del Pago
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Pago a resiedente o no residente</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required
                                                    placeholder="Número de secuencia inicial (1)"
                                                    label="Pago a resiedente o no residente"
                                                    {...register("proveedorTipo")}
                                                >
                                                    <MenuItem value={10}>Persona Natural</MenuItem>
                                                    <MenuItem value={20}>Sociedad</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Tipo de régimien fisacal del exterior</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required

                                                    label="Tipo de régimien fisacal del exterior"
                                                    {...register("proveedorTipo")}
                                                >
                                                    <MenuItem value={10}>Persona Natural</MenuItem>
                                                    <MenuItem value={20}>Sociedad</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">País al que se realiza el pago en régimen General</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required

                                                    label="País al que se realiza el pago en régimen General"
                                                    {...register("proveedorTipo")}
                                                >
                                                    <MenuItem value={10}>Persona Natural</MenuItem>
                                                    <MenuItem value={20}>Sociedad</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">País al que se realiza el pago en Paraíso Fiscal</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required

                                                    label="País al que se realiza el pago en Paraíso Fiscal"
                                                    {...register("proveedorTipo")}
                                                >
                                                    <MenuItem value={10}>Persona Natural</MenuItem>
                                                    <MenuItem value={20}>Sociedad</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <TextField
                                                id="ruc"
                                                name="ruc"
                                                label="Régimen fiscal preferente:"
                                                placeholder="Denominación del régimen fiscal preferente o jurisdicción de menor imposición"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("ruc")}
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">País al que efectua el pago</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required

                                                    label="País al que efectua el pago"
                                                    {...register("proveedorTipo")}
                                                >
                                                    <MenuItem value={10}>Persona Natural</MenuItem>
                                                    <MenuItem value={20}>Sociedad</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <Typography variant="h5" gutterBottom component="div">
                                                Aplica convenio de doble tributación?
                                            </Typography>

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControl>

                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                                    <FormControlLabel value="NO" control={<Radio />} label="NO" />


                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <Typography variant="h6" gutterBottom component="div">
                                                Pago sujeto a retención en aplicación de la norma legal?
                                            </Typography>

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControl>

                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                                    <FormControlLabel value="NO" control={<Radio />} label="NO" />


                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                    
                                    <Grid container item spacing={2}>
                                    <br/>
                                    <Divider/>
                                    <br/>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Typography variant="h3" gutterBottom component="div">
                                                Comprobante Retención
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <Typography variant="h5" gutterBottom component="div">
                                                Tiene comprobnate de retención?
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControlLabel
                                                labelPlacement="start"
                                                label=""
                                                control={<Checkbox {...register("retencionElectronica")} id="retencionElectronica"
                                                    name="retencionElectronica"
                                                />}

                                            />
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={12} xs={12}  >
                                            <TextField
                                                id="razonSocial"
                                                name="razonSocial"
                                                label="Establecimiento:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("razonSocial")}
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={12} xs={12} >
                                            <TextField
                                                id="nombre"
                                                name="nombre"
                                                label="Punto Emisión:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("nombre")}
                                            />
                                        </Grid>
                                        <Grid item lg={4} md={4} sm={12} xs={12} >
                                            <TextField
                                                id="nombre"
                                                name="nombre"
                                                label="Secuencial:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("nombre")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="direccionDomiciliaria"
                                                name="direccionDomiciliaria"
                                                label="N° Autorización:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("direccionDomiciliaria")}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >

                                            <TextField
                                                id="fechaCaducidad"
                                                name="fechaCaducidad"
                                                label="Fecha Emisión Comprobante:"
                                                type="date"
                                                style={{ width: "100%" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                {...register("fechaCaducidad")}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <br></br>

                            </Card>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button type="submit">Guardar</Button>
                </DialogActions>

            </Dialog>
        </div >

    );
}

export default ModalComprobanteRetencion;