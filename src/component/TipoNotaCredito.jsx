import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link } from '@mui/material';
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

import CardActions from '@mui/material/CardActions';


const TipoNotaCredito = ({ handleEvent }) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

    return (

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
                <SubCard title="N. Credito Física" style={{ textAlign: "center" }} >
                    <center>
                        <Checkbox
                            style={{
                                transform: "scale(2)",
                            }} onClick={e => handleEvent(true)} />
                    </center>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="N. Credito Elect." style={{ textAlign: "center" }}>
                    <center>
                        <Checkbox
                            style={{
                                transform: "scale(2)",
                            }}  onClick={e => handleEvent(true)}/>
                    </center>
                </SubCard>
            </Grid>
        </Grid>

    );
}

export default TipoNotaCredito;
