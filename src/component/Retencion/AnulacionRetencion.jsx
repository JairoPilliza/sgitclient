import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'ui-component/cards/MainCard';


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import ModalNuevoProveedor from "component/ModalProveedor";
import { Button } from '@mui/material';

import SubCard from 'ui-component/cards/SubCard';
import SolcitudAnulacion from './SolicitudAnulacion';
import AutorizadasAnulacion from './AutorizadasAnulacion';
import RetencionesAnuladas from './RetencionesAnuladas';
const AnulacionRetencion = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Lista de Solicitudes de Anulación de Retenciones Autorizadas por el SRI">
            <Box sx={{ width: '100%', typography: 'body1' }}>                
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider',  }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Solicitadas para anulación" value="1"/>
                            <Tab label="Autorizadas para anulación" value="2" />
                            <Tab label="Retenciones Anuladas" value="3" />

                        </TabList>
                    </Box>
                    <TabPanel value="1"><SolcitudAnulacion/> </TabPanel>
                    <TabPanel value="2"><AutorizadasAnulacion/></TabPanel>
                    <TabPanel value="3"><RetencionesAnuladas/></TabPanel>

                </TabContext>
            </Box>
        </MainCard>
    );
}
export default AnulacionRetencion;