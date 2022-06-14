import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Divider, FormControl, Grid, InputLabel, MenuItem, Select} from '@mui/material';
import { Button } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const XmlCompra = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const onSubmit = (data, evento) => {
        alert();
        console.log(data);
    }

    return (
        <MainCard>
            <Card sx={{ maxWidth: "100%" }}>
                <CardHeader
                    avatar={
                        <DownloadForOfflineIcon />
                    }
                    title="Genera Xml Compras"
                />
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Grid container xs={12} md={12} sm={12} lg={12} spacing={2}  >
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <FormControl sx={{ minWidth: "100%" }}>
                                    <InputLabel id="demo-simple-select-helper-label">Seleccione Periodo </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="periodo"
                                        name="periodo"
                                        style={{ width: "100%" }}
                                        label="Seleccione Periodo:"
                                        {...register("periodo")}
                                    >
                                        <MenuItem value={10}>6 / 22</MenuItem>
                                        <MenuItem value={20}>5 / 22</MenuItem>
                                        <MenuItem value={30}>4 / 22</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <br></br>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button type="submit" style={{ width: "100%" }} variant="contained" sx={{ margin: "auto" }} startIcon={<DownloadForOfflineIcon />} >Descargar</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </form>
            </Card>
        </MainCard>
    );
}

export default XmlCompra;
