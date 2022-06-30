import React, { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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

const ModalNuevoProveedor = (props) => {
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

    const TAX_RATE = 0.07;

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function priceRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    const rows = [
        createRow('Paperclips (Box)', 100, 1.15),
        createRow('Paper (Case)', 10, 45.99),
        createRow('Waste Basket', 2, 17.99),
    ];

    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
                maxWidth="md"
            >

                <DialogTitle id="scroll-dialog-title">Registrar Proveedor</DialogTitle>

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
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Tipo Proveedor</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required
                                                    placeholder="Número de secuencia inicial (1)"
                                                    label="Tipo Contribuyente"
                                                    {...register("proveedorTipo")}
                                                >
                                                    <MenuItem value={10}>Persona Natural</MenuItem>
                                                    <MenuItem value={20}>Sociedad</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Tipo Contribuyente</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="tipoContribuyente"
                                                    name="tipoContribuyente"
                                                    style={{ width: "100%" }}
                                                    required
                                                    placeholder="Número de secuencia inicial (1)"
                                                    label="Tipo Contribuyente"
                                                    {...register("tipoContribuyente")}
                                                >
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="numeroRuc"
                                                name="numeroRuc"
                                                label="RUC:"
                                                placeholder="13 dígitos"
                                                helperText='Clickee fuera para validar el "RUC"'
                                                style={{ width: "100%" }}
                                                required
                                                {...register("numeroRuc")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="razonSocial"
                                                name="razonSocial"
                                                label="Razón Social:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("razonSocial")}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="nombre"
                                                name="nombre"
                                                label="Nombre:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("nombre")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="direccion"
                                                name="direccion"
                                                label="Dirección:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("direccion")}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >

                                            <TextField
                                                id="email"
                                                name="email"
                                                label="Email:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("email")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="telefono"
                                                name="telefono"
                                                label="Teléfono:"
                                                style={{ width: "100%" }}
                                                required
                                                {...register("telefono")}
                                            />

                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <TextField
                                                id="celular"
                                                name="celular"
                                                label="Celular:"
                                                style={{ width: "100%" }}
                                                {...register("celular")}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">País</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="pais"
                                                    name="pais"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="País"
                                                    {...register("pais")}
                                                >
                                                    <MenuItem value={10}>Ecuador</MenuItem>
                                                    <MenuItem value={20}>Peru</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xs={12} >
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Ciudad</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="ciudad"
                                                    name="ciudad"
                                                    style={{ width: "100%" }}
                                                    required
                                                    label="Ciudad"
                                                    {...register("ciudad")}
                                                >
                                                    <MenuItem value={10}>Pujili</MenuItem>
                                                    <MenuItem value={20}>Quito</MenuItem>
                                                </Select>

                                            </FormControl>

                                        </Grid>
                                    </Grid>

                                    <Grid container item spacing={2}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}  >
                                            <TextField
                                                id="observacion"
                                                name="observacion"
                                                label="Observación:"
                                                multiline
                                                style={{ width: "100%" }}
                                                required
                                                {...register("observacion")}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <br></br>
                                <div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ backgroundColor: "gray" }}
                                        >
                                            <Typography color="white">Talonarios <small>establecimientos</small></Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <br></br>
                                            <Grid container spacing={2}>
                                                <Grid container item spacing={2}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                        <TextField
                                                            id="fechaCaducidad"
                                                            name="fechaCaducidad"
                                                            label="Fecha Caducidad:"
                                                            type="date"
                                                            style={{ width: "100%" }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            {...register("fechaCaducidad")}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                                        <TextField
                                                            id="autorizacion"
                                                            name="autorizacion"
                                                            label="N° Autorización:"
                                                            style={{ width: "100%" }}
                                                            {...register("autorizacion")}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item spacing={2}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                        <TextField
                                                            id="establecimiento"
                                                            name="establecimiento"
                                                            label="Establecimiento:"
                                                            style={{ width: "100%" }}
                                                            required
                                                            {...register("establecimiento")}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                                        <TextField
                                                            id="puntoEmision"
                                                            name="puntoEmision"
                                                            label="Punto emisión:"
                                                            style={{ width: "100%" }}
                                                            required
                                                            {...register("puntoEmision")}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container item spacing={2}>
                                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                                        <TextField
                                                            id="secuencialMin"
                                                            name="secuencialMin"
                                                            label="Secuencial Min:"

                                                            style={{ width: "100%" }}
                                                            required
                                                            {...register("secuencialMin")}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                        <TextField
                                                            id="secuencialMax"
                                                            name="secuencialMax"
                                                            label="Secuencial Max:"
                                                            style={{ width: "100%" }}
                                                            required
                                                            {...register("secuencialMax")}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={12} sm={12} lg={12}>
                                                        <Button aria-label="settings" style={{ width: "100%" }} variant="outlined" >
                                                            Guardar
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <div>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="caption table">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Nombres</TableCell>
                                                                <TableCell align="center">Identificación</TableCell>
                                                                <TableCell align="center">Telefono</TableCell>
                                                                <TableCell align="center">Email</TableCell>
                                                                <TableCell align="center">Dirección</TableCell>
                                                                <TableCell align="center">Opciones</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>

                                                            <TableRow hover >

                                                            </TableRow>

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </Card>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button type="submit">Registar Proveedor</Button>
                </DialogActions>

            </Dialog>
        </div >

    );
}

export default ModalNuevoProveedor;
