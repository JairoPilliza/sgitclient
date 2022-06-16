import React, { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, Divider, Grid, Typography } from '@mui/material';
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

const ModalDetalleProveedor = (props) => {
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

                <DialogTitle id="scroll-dialog-title">Detalles del Proveedor</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <Card container style={{ textAlign: "center" }} >
                            <br />

                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Razón Social:</b> DISPETROL S.A.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Nombre:</b> DISPETROL S.A.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Contrib.:</b> Contribuyente Especial
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Dirección:</b> ELOY ALFARO N40-432 GRANADOS EL BATAN
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                               
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Codigo:</b> 5013
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Ruc:</b> 1791342690001
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Telefono:</b> 2471146
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Celular:</b>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid><br></br>
                            <Divider />
                            <br></br>
                            <Grid container spacing={2} >
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b style={{ float: "left" }}>Nro de Autorización:</b> <small style={{ float: "left" }}>0304201901179134269000120050040002394500047596614</small>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Fecha de Caducidad:</b> 01-06-2022
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                               <b> Secuencial Min:</b> 000000001
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Secuencial Max:</b> 000000100
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                              <b>  Observación:</b>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                               <b> Pais: </b>Ecuador
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Ciudad:</b> Quito
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Sucursal: </b>005
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                               <b> P. de Facturación:</b> 004
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom component="div" style={{ float: "left" }}>
                                                <b>Estado:</b> true
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>


                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cerrar</Button>
                 
                </DialogActions>

            </Dialog>
        </div >

    );
}

export default ModalDetalleProveedor;
