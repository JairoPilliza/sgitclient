import React, { Fragment, useEffect, useState } from "react";
import { Grid, Link } from '@mui/material';
import { useForm } from "react-hook-form";
// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';


const TipoFactura = ({ handleEvent}) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    return (
            <Grid container spacing={gridSpacing}>
                <Grid  item xs={12} sm={6}>
                    <SubCard title="Factura Física" style={{ textAlign: "center" }} >
                        <center>
                            <Checkbox
                                style={{
                                    transform: "scale(3)",
                                }} onClick={e => handleEvent(true)}/>
                        </center>
                    </SubCard>
                    
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SubCard title="Factura Elect." style={{ textAlign: "center" }}>
                        <center>
                            <Checkbox
                                style={{
                                    transform: "scale(3)",
                                }} onClick={e => handleEvent(true)}/>
                        </center>
                    </SubCard>
                </Grid>               
            </Grid>
       
    );
}

export default TipoFactura;
