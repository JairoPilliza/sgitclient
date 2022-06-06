import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link } from '@mui/material';
import { useForm } from "react-hook-form"
// project import
import TextField from '@mui/material/TextField';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DatosProveedor = () => {
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
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: "yellow" }}
                >
                    <Typography>Datos del Proveedor</Typography>

                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

export default DatosProveedor;




























