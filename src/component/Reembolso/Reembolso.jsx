import React, { Fragment, useEffect, useState } from "react";
import { Grid, InputLabel, Link } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CachedIcon from '@mui/icons-material/Cached';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
import { Stack } from "@mui/material";
import ModalReembolso from "./ModalReembolso";
const Reembolso = () => {
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
    return (
        <MainCard title="Comprobante de venta emitido por Reembolso" >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12}>
                    <SubCard container title="Datos de Factura" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                            <Grid item xs={12}   >
                                <Stack direction="row" spacing={2}>
                                    <FormControl sx={{ minWidth: '50%' }}>
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
                                </Stack>
                                <br></br>
                                <Stack direction="row" spacing={2} xs={12} sm={6} md={3}>


                                    <Stack direction="row" spacing={3}>
                                        <small  style={{ width: "100%" }}><b>N° Factura:</b></small>
                                        <TextField
                                            id="outlined-basic"
                                            label="Establecimiento"
                                            style={{ width: "100%" }}
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label="Punto de emisión"
                                            style={{ width: "100%" }}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            label="Secuencial"
                                            placeholder="Digite Secuencial"
                                            style={{ width: "100%" }}
                                        />
                                    </Stack>

                                    <Stack direction="row" spacing={2}>
                                        <TextField

                                            id="outlined-date"
                                            label="F. Emisión:"
                                            type="date"
                                            style={{ width: "100%" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                        <TextField

                                            id="outlined-date"
                                            label="F. Registro:"
                                            type="date"
                                            style={{ width: "100%" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </Stack>

                                </Stack>
                                <br></br>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Card >
                            <CardHeader
                                title="Datos del proveedor"
                                style={{ backgroundColor: "yellow", textAlign: "center", height: "30px" }}
                            />

                            <CardContent >
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >

                                    <Grid item xs={6} spacing={2}>
                                        <Grid item xs={12} padding={1} >
                                            <TextField
                                                id="outlined-basic"
                                                label="Numero Ruc: "
                                                style={{ width: "70%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} padding={1}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Numero Autorización:"
                                                style={{ width: "70%" }}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={6} spacing={2}>
                                        <Grid item xs={12} padding={1} >
                                            <TextField
                                                id="outlined-basic"
                                                label="Telefono: "
                                                style={{ width: "70%" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} padding={1}>
                                            <TextField
                                                id="outlined-date"
                                                label="Dirección:"
                                                style={{ width: "70%" }}

                                            />
                                        </Grid>
                                        <Grid item xs={12} padding={1}>
                                            <TextField
                                                id="outlined-date"
                                                label="Email:"
                                                style={{ width: "70%" }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </SubCard>
                    <Stack spacing={2} >
                        <Button variant="contained" onClick={handleClickOpen('paper')}>Reembolso</Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard className="col-12" container title="Detalle del Reembolso" style={{ textAlign: "center" }} sx={{ borderColor: 'yellow' }}>
                        <div >
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead style={{ backgroundColor: "skyblue", color: "black" }}>
                                        <TableRow>
                                            <TableCell>#</TableCell>

                                            <TableCell align="center">Proveedor</TableCell>
                                            <TableCell align="center" >Tipo Comprobante</TableCell>
                                            <TableCell align="center">N° Serie </TableCell>
                                            <TableCell align="center">Base Imponible</TableCell>
                                            <TableCell align="center">Opcion</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <br></br>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Subtotal 12%" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Base No Objeto IVA:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Subtotal:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Subtotal 0%:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <label>
                                    <Checkbox
                                        style={{
                                            marginRight: "10px",
                                            transform: "scale(1)",
                                        }} />
                                </label>
                                <TextField style={{
                                    marginRight: "45px",
                                }} id="outlined-basic" label="Ice:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField {...register("nombreEstudiante")} id="outlined-basic" label="Iva 12 %:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Descuento 12%:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Propina Tip (Serv. 10%):" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Valor Total:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="Descuento 0%:" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField id="outlined-basic" label="IMP. IRBPNR:" variant="outlined" />
                            </Grid>
                        </Grid>
                        <Grid>
                            <CardActions >

                                <Button variant="contained" style={{ backgroundColor: "#536dfe" }}>
                                    Guardar
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: "#f06292" }}>
                                    Retener
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: "#f57f17" }}>
                                    Cancelar
                                </Button>

                            </CardActions>
                        </Grid>
                    </SubCard>

                </Grid>
            </Grid >
            <ModalReembolso
                open={open}
                onClose={handleClose} />
        </MainCard >
    );
}

export default Reembolso;
