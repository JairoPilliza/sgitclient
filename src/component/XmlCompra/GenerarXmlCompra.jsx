
import React, { Fragment, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'ui-component/cards/MainCard';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Divider, FormControl, Grid, Input, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { gridSpacing } from "store/constant";

const XmlCompra = () => {

    const [value, setValue] = React.useState('1');
    const [showTable, setShowTable] = useState(false);


    const Input = styled('input')({
        display: 'none',
    });



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
                <CardContent>
                    <Grid container xs={12} md={12} sm={12} lg={12} spacing={2}  >
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl sx={{  minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-helper-label">Seleccione Periodo </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    style={{ width: "100%" }}
                                    label="Seleccione Periodo:"
                                >
                                    <MenuItem value={10}>6 / 22</MenuItem>
                                    <MenuItem value={20}>5 / 22</MenuItem>
                                    <MenuItem value={30}>4 / 22</MenuItem>
                                </Select>

                            </FormControl>
                           
                        </Grid>
                     
                        <br></br>
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                            <Button style={{ width: "100%" }} variant="contained" sx={{ margin: "auto" }} startIcon={<DownloadForOfflineIcon/>} >Descargar</Button>

                        </Grid>

                    </Grid>



                </CardContent>


            </Card>

        </MainCard>
    );
}

export default XmlCompra;
