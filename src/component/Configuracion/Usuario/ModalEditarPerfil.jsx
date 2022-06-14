import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/system";
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const ModalEditarPerfil = (props) => {
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
                <DialogTitle id="scroll-dialog-title">Editar Usuario</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <SubCard className="col-12" container title="Personaliza:" style={{ textAlign: "center" }} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}  >
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="nombreUsuario" name="nombreUsuario" label="Nombre Usuario" variant="standard" style={{ width: "100%" }}   {...register("nombreUsuario")} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="usuario" name="usuario" label="Usuario" variant="standard" style={{ width: "100%" }}  {...register("usuario")} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="correo" name="correo"label="Correo" variant="standard" style={{ width: "100%" }} {...register("correo")} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                                        <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="contraseña" name="contraseña" label="Contraseña" variant="standard" style={{ width: "100%" }} {...register("contraseña")} />
                                    </Box>

                                </Grid>
                            </Grid>
                        </SubCard>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} variant="contained"> Cancel</Button>
                    <Button variant="contained">Resetear</Button>
                    <Button variant="contained">Actualizar Usuario</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default ModalEditarPerfil;
