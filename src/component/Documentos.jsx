import React, { Fragment, useEffect, useState } from "react";
import { Grid} from '@mui/material';
import { useForm } from "react-hook-form"
import MainCard from 'ui-component/cards/MainCard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Documentos = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    return (
        <MainCard>
            <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', border: 1, margin: 'auto' }}>
                <Box sx={{ my: 2, mx: 2 }}>
                    <Grid container alignItems="center">
                        <Grid item >
                            <Typography gutterBottom variant="h4" component="div">
                                Documentos <small>comprobantes sri</small>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" />
                <Box sx={{ m: 2 }} lg={6}  md={6}  xs={12}  >
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12}  xs={12}>
                            <FormControl sx={{ minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-helper-label">Escoga el comprabante</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="comprobante"
                                    name="comprobante"
                                    style={{ width: "100%" }}
                                    label="Escoga el comprobante:"
                                    {...register("comprobante")}
                                >
                                    <MenuItem value={10}>Factura</MenuItem>
                                    <MenuItem value={20}>Nota de venta</MenuItem>
                                    <MenuItem value={30}>Ticket</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item  lg={6}  md={6} sm={12} xs={12}>
                            <Button type="submit"  style={{ width: "100%" }}  variant="contained" >Aceptar</Button>
                        </Grid>

                    </Grid>




                </Box>
            </Box>
        </MainCard>
    );
}

export default Documentos;
