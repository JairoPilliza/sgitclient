import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import SolcitudAnulacion from './SolicitudAnulacion';
import AutorizadasAnulacion from './AutorizadasAnulacion';
import RetencionesAnuladas from './RetencionesAnuladas';
import { gridSpacing } from 'store/constant';
import ListaRetencionesAut from './ListaRetencionesAut';
const AnulacionRetencion = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Lista de Solicitudes de Anulación de Retenciones Autorizadas por el SRI">
            <Grid container spacing={gridSpacing}>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Solicitadas para anulación" value="1" />
                                    <Tab label="Autorizadas para anulación" value="2" />
                                    <Tab label="Retenciones Anuladas" value="3" />
                                    <Tab label="Lista de Retenciones Autorizadas" value="4" />


                                </TabList>
                            </Box>
                            <TabPanel value="1"><SolcitudAnulacion /> </TabPanel>
                            <TabPanel value="2"><AutorizadasAnulacion /></TabPanel>
                            <TabPanel value="3"><RetencionesAnuladas /></TabPanel>
                            <TabPanel value="4"><ListaRetencionesAut /></TabPanel>


                        </TabContext>
                    </Box>
                </Grid>
            </Grid>
        </MainCard>
    );
}
export default AnulacionRetencion;
