
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

import { Divider, Input, Stack } from '@mui/material';
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
import TableATS from './TableATS';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const ATS = () => {

    const [value, setValue] = React.useState('1');
    const [showTable, setShowTable] = useState(false);


    const Input = styled('input')({
        display: 'none',
    });

    var muestraTable;
    if (showTable) {
        muestraTable = <TableATS />;
    }

    return (
        <MainCard>
            <Card sx={{ maxWidth: "100%" }}>
                <CardHeader
                    title="Apertura de Entidades"
                />

                <Divider />
                <CardContent>
                    <center>
                        <Stack direction="row" alignItems="center" spacing={2} margin="auto">
                            <label htmlFor="contained-button-file">
                                <Input id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
                                    Cargar XML
                                </Button>
                            </label>
                            <Button variant='contained' startIcon={<VisibilityIcon />} onClick={e => setShowTable(true)} onDoubleClick={e => setShowTable(false)}></Button>
                        </Stack>
                    </center>
                </CardContent>

                {
                    muestraTable
                }
                <Divider></Divider><center>              
                <Button variant="contained" startIcon={<DownloadForOfflineIcon/>}>Generar Anexo Transaccional Simplificado (ATS)</Button>
                </center>
            </Card>

        </MainCard>
    );
}

export default ATS;
