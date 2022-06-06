import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { useForm } from "react-hook-form"
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Documentos = () => {
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
                        <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                                Documentos <small>comprobantes sri</small>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" />
                <Box sx={{ m: 2 }} xs={12} sm={12} md={6} lg={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl sx={{ m: 1, minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-helper-label">Escoga el comprabante</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    style={{ width: "100%" }}
                                    label="Escoga el comprobante:"
                                >
                                    <MenuItem value={10}>Factura</MenuItem>
                                    <MenuItem value={20}>Nota de venta</MenuItem>
                                    <MenuItem value={30}>Ticket</MenuItem>
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Button   style={{ width: "100%" }}  variant="contained" >Aceptar</Button>
                        </Grid>

                    </Grid>




                </Box>
            </Box>
        </MainCard>
    );
}

export default Documentos;