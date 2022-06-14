import React, { Fragment, useEffect, useState } from "react";
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardHeader, Divider, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ModalEditarPerfil from "./ModalEditarPerfil";

const MiPerfil = () => {

    const [value, setValue] = React.useState('1');
    const [showTable, setShowTable] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Input = styled('input')({
        display: 'none',
    });



    return (
        <MainCard>
            <center>
                <Card sx={{ maxWidth: 345, alignItems: "center" }}>
                    <CardHeader title="Perfil de Usuario" />
                    <Divider />
                    <br></br>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://img.blogs.es/anexom/wp-content/uploads/2021/12/perfil-1024x754.jpg"
                        alt="green iguana"

                    />
                    <br></br>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <label htmlFor="contained-button-file">
                                    <Input id="contained-button-file" multiple type="file" />
                                    <Button variant="contained" component="span" >
                                        Editar Foto
                                    </Button>
                                </label>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography gutterBottom variant="h2" component="div">
                                    ADMIN
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="h5" color="text.secondary">
                                    Unión Ecuatoriana - Administrador - admin
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button variant="contained" onClick={handleClickOpen('paper')}>Editar Perfil </Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                    <ModalEditarPerfil
                        open={open}
                        onClose={handleClose} />

                </Card>
            </center>

        </MainCard >
    );
}

export default MiPerfil;
