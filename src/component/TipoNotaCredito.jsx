import React, { Fragment, useEffect, useState } from "react";
import { Grid} from '@mui/material';
import { useForm } from "react-hook-form"
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';

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
                            }} onClick={e => handleEvent(true)} 
                            {...register("notaCreditoFisico")}/>
                    </center>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <SubCard title="N. Credito Elect." style={{ textAlign: "center" }}>
                    <center>
                        <Checkbox
                            style={{
                                transform: "scale(2)",
                            }}  onClick={e => handleEvent(true)}
                            {...register("notaCreditoElect")}/>
                    </center>
                </SubCard>
            </Grid>
        </Grid>

    );
}

export default TipoNotaCredito;
