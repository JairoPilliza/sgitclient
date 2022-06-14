
import React, { Fragment, useEffect, useState } from "react";
import MainCard from 'ui-component/cards/MainCard';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { CardActions, Divider, Grid } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableATS from './TableATS';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { gridSpacing } from "store/constant";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ATS = () => {

    const [value, setValue] = React.useState('1');
    const [showTable, setShowTable] = useState(false);
    const [btnEye, setBtnEye] = useState(false);

    const Input = styled('input')({
        display: 'none',
    });

    const ButonTableShow = () => {
        setShowTable(true);
        setBtnEye(true);
    };
    const ButonTableHidden = () => {
        setShowTable(false);
        setBtnEye(false);
    };
    var boton;
    if (!btnEye) {
        boton = <Button variant='contained' onClick={ButonTableShow} > <VisibilityOffIcon /></Button>;
    } else {
        boton = <Button variant='contained' onClick={ButonTableHidden}> <VisibilityIcon /></Button>;
    }

    var muestraTable;
    if (showTable) {
        muestraTable = <TableATS />;
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardHeader
                            title="Apertura de Entidades"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={4} lg={4} />
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <label htmlFor="contained-button-file">
                                                <Input id="contained-button-file" multiple type="file" />
                                                <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
                                                    Cargar XML
                                                </Button>
                                            </label>
                                        </Grid>
                                        <Grid item>
                                            {boton}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4} />

                            </Grid>
                        </CardContent>
                        {
                            muestraTable
                        }
                        <br />
                        <Divider />
                        <CardActions>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={4} lg={4} />
                                <Grid item xs={12} sm={12} md={4} lg={4}>

                                    <Button variant="contained" style={{ width: "100%" }} startIcon={<DownloadForOfflineIcon />}>Generar Anexo Transaccional Simplificado (ATS)</Button>

                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4} />

                            </Grid>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default ATS;
