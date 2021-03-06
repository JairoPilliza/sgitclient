import React from "react";
import { Chip, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import ModalRetencion from "component/ModalRetencion";
import EditIcon from '@mui/icons-material/Edit';
import ModalNuevoProveedor from "component/ModalProveedor";
const Aviacion = () => {
    const { register } = useForm();
    /////////MODAL RETENCION
    const [openMR, setOpenMR] = React.useState(false);
   const [scroll, setScroll] = React.useState('paper');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpen = (scrollType) => () => {
        setOpenMR(true);
        setScroll(scrollType);
    };
    const handleCloseMR = () => {
        setOpenMR(false);
    };
    return (
        <MainCard title="Pasajes emitidos por empresa de Aviación" >
            <Grid container spacing={gridSpacing}>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                <Divider><Chip label="Datos de Factura" /></Divider>
                    <br/>
                    {/* <SubCard container title="Datos de Factura" style={{ textAlign: "center" }} > */}

                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                            <Grid item lg={6} md={6} sm={12} xs={12} >

                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} >
                                <FormControl sx={{ minWidth: '100%' }} lg={6} md={6} sm={6} xs={12}>
                                    <InputLabel id="demo-simple-select-helper-label">Sustento Tributario</InputLabel>
                                    <Select
                                    {...register("sustentoTributario")}
                                        labelId="demo-simple-select-helper-label"
                                        id="sustentoTributario"
                                        name="sustentoTributario"
                                        style={{ width: "100%", float: "right" }}
                                        required
                                        label="Sustento Tributario"
                                        
                                    >
                                        <MenuItem value={10}>FACTURA</MenuItem>
                                        <MenuItem value={20}>NOTA DE VENTA</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}  >
                                <Grid container spacing={2} >
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <small style={{ width: "100%" }} ><b>N° Factura:</b></small>
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <TextField
                                        {...register("establecimiento")}
                                            id="establecimiento"
                                            name="establecimiento"
                                            label="000"
                                            style={{ width: "100%" }}
                                            
                                        />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <TextField
                                         {...register("puntoEmision")}
                                            id="puntoEmision"
                                            name="puntoEmision"
                                            label="000 "
                                            style={{ width: "100%" }}
                                           
                                        />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                        <TextField
                                        {...register("secuencial")}
                                            id="secuencial"
                                            name="secuencial"
                                            label="000000000"
                                            multiline
                                            style={{ width: "100%" }}
                                            
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextField
                                        {...register("fechaEmsion")}
                                            id="fechaEmsion"
                                            name="fechaEmsion"
                                            label="F. Emisión:"
                                            type="date"
                                            style={{ width: "100%", float: "right" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12} >
                                        <TextField
                                        {...register("fechaRegistro")}
                                            id="fechaRegistro"
                                            name="fechaRegistro"
                                            label="F. Registro:"
                                            type="date"

                                            style={{ width: "100%", float: "right" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <br></br>
                        <Card >
                            <CardHeader
                                title="Datos del proveedor"
                                style={{ backgroundColor: "#ffc107", textAlign: "center", height: "60px" }}

                            />
                            <CardContent >
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }} >
                                    <Grid container item >
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Grid container spacing={2}>
                                                {/* <Grid item xs={12} md={6} sm={12} lg={6} /> */}
                                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                                    <Button aria-label="settings" style={{ width: "100%" }} variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
                                                        Editar Proveedor
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={2}>
                                        
                                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                    <TextField
                                                    {...register("numeroRuc")}
                                                        id="numeroRuc"
                                                        name="numeroRuc"
                                                        label="Numero Ruc: "
                                                        style={{ width: "100%" }}
                                                        
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                                    <TextField
                                                     {...register("autorizacion")}
                                                        id="autorizacion"
                                                        name="autorizacion"
                                                        label="Numero Autorización:"
                                                        style={{ width: "100%" }}
                                                       
                                                    />
                                                </Grid>
                                           
                                    </Grid>
                                    <Grid container item spacing={2} >
                                        
                                                <Grid item lg={6} md={6} sm={12} xs={12}  >
                                                    <TextField
                                                    {...register("telefono")}
                                                        id="telefono"
                                                        name="telefono"
                                                        label="Telefono: "
                                                        style={{ width: "100%" }}
                                                        
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                                    <TextField
                                                     {...register("direccion")}
                                                        id="direccion"
                                                        name="direccion"
                                                        label="Dirección:"
                                                        style={{ width: "100%" }}
                                                       
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                                    <TextField
                                                    {...register("email")}
                                                        id="email"
                                                        name="email"
                                                        label="Email:"
                                                        style={{ width: "100%" }}
                                                        
                                                    />
                                                </Grid>
                                          
                                    </Grid>



                                </Grid>
                            </CardContent>
                        </Card>
                    {/* </SubCard> */}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                <Divider><Chip label="Detalle de Factura" /></Divider>
                    <br/>
                    {/* <SubCard className="col-12" container title="Detalle de Factura" style={{ textAlign: "center" }} > */}

                        <Grid container  spacing={2}>

                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                    <InputLabel id="demo-simple-select-helper-label">Departamento</InputLabel>
                                    <Select
                                     {...register("departamento")}
                                        labelId="demo-simple-select-helper-label"
                                        id="departamento"
                                        name="departamento"
                                        style={{ width: "100%" }}
                                        required
                                        label="Departamento"
                                       
                                    >
                                        <MenuItem value={"Huaquillas"}>Huaquillas</MenuItem>
                                        <MenuItem value={"Santo Domingo"}>Santo Domingo</MenuItem>
                                        <MenuItem value={"Esmeraldas"}>Esmeraldas</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <FormControl sx={{ minWidth: '100%', float: "left" }}>
                                    <InputLabel id="demo-simple-select-helper-label">Subcuenta</InputLabel>
                                    <Select
                                    {...register("subcuenta")}
                                        labelId="demo-simple-select-helper-label"
                                        id="subcuenta"
                                        name="subcuenta"
                                        style={{ width: "100%" }}
                                        required
                                        label="Subcuenta"
                                        
                                    >
                                        <MenuItem value={"Insumos Medicos"}>Insumos Medicos</MenuItem>
                                        <MenuItem value={"Tecnologico"}>Tecnologico</MenuItem>
                                        <MenuItem value={"Gastos"}>Gastos</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Divider />
                        <br></br>

                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item lg={4} md={4} sm={12} xs={12}  >
                                <TextField {...register("baseImponibleDiferenteCero")} style={{ width: "100%" }} id="baseImponibleDiferenteCero" name="baseImponibleDiferenteCero" label="Subtotal 12%" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField  {...register("baseImponibleNoObjetoIva")} style={{ width: "100%" }} id="baseImponibleNoObjetoIva" name="baseImponibleNoObjetoIva" label="Base No Objeto IVA:" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField {...register("subtotal")} style={{ width: "100%" }} id="subtotal" name="subtotal" label="Subtotal:" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField  {...register("baseImponibleIvaCero")} style={{ width: "100%" }} id="baseImponibleIvaCero" name="baseImponibleIvaCero" label="Subtotal 0%:" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <label>
                                    <Checkbox
                                    {...register("usaIce")}
                                        id="usaIce"
                                        name="usaIce"
                                        style={{
                                            width: "20%",
                                            transform: "scale(1)",
                                        }}
                                         />
                                </label>
                                <TextField 
                                {...register("montoIce")}
                                style={{
                                    width: "80%",
                                }} id="montoIce" name="montoIce" label="Ice:" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                            <TextField  {...register("valorTotal")}  style={{ width: "100%" }} id="valorTotal" name="valorTotal" label="Valor Total:" variant="outlined"/>

                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField {...register("baseImponibleExentaIva")}  style={{ width: "100%" }} id="baseImponibleExentaIva" name="baseImponibleExentaIva" label="Base imponible extenta de IVA:" variant="outlined" />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField  {...register("montoIva")} style={{ width: "100%" }} id="montoIva" name="montoIva" label="Monto IVA:" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>

                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12} >
                                <TextField {...register("propinaTip")} style={{ width: "100%" }} id="propinaTip" name="propinaTip" label="Propina Tip (Serv. 10%):" variant="outlined"  />
                            </Grid>
                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField {...register("IRBPNR")}  style={{ width: "100%" }} id="impIRBPNR" name="impIRBPNR" label="IMP. IRBPNR:" variant="outlined" />
                            </Grid>

                        </Grid>
                        <br></br>
                        <Divider />
                        <CardActions >
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Button variant="contained" style={{ width: "100%", backgroundColor: "#536dfe" }}>
                                        Guardar
                                    </Button>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Button onClick={handleClickOpen('paper')} style={{ width: "100%" }} variant="contained" >Retener</Button>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} >
                                    <Button variant="contained" style={{ width: "100%", backgroundColor: "#f57f17" }}>
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    {/* </SubCard> */}
                </Grid>
            </Grid>
            <ModalRetencion
                open={openMR}
                onClose={handleCloseMR}
                scroll={scroll}
            />
            <ModalNuevoProveedor
                open={open}
                onClose={handleClose}
                scroll={scroll} />

        </MainCard>
    );
}
export default Aviacion;
