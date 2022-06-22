import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { useForm } from "react-hook-form";
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import Checkbox from '@mui/material/Checkbox';


const TipoFactura = ({ handleEvent, muestraXML }) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

    const obtiene = (event) => {

        if (event.target.value == "1") {
            handleEvent(true)

        }
        if (event.target.value == "2") {
            handleEvent(true);
            muestraXML(true)
        }

    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={6} md={6} sm={12} xs={12}  >
                <SubCard title="Factura Física" style={{ textAlign: "center" }} >
                    <center>
                        <Checkbox
                            id="facturaFisica"
                            name="facturaFisica"
                            value="1"
                            style={{
                                transform: "scale(3)",
                            }} onClick={obtiene}
                            {...register("facturaFisica")} />
                    </center>
                </SubCard>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <SubCard title="Factura Elect." style={{ textAlign: "center" }}>
                    <center>
                        <Checkbox
                            id="facturaElectronica"
                            name="facturaElectronica"
                            value="2"
                            style={{
                                transform: "scale(3)",
                            }} onClick={obtiene}
                            {...register("facturaElectronica")}
                        />

                    </center>
                </SubCard>
            </Grid>
        </Grid>
    );
}

export default TipoFactura;
