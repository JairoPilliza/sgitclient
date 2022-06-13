
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'ui-component/cards/MainCard';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
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
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const SolcitudAnulacion = () => {
    const [value, setValue] = React.useState('1');



    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
    ];

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="center">Sucursal</TableCell>
                        <TableCell align="center">N° Documento</TableCell>
                        <TableCell align="center">Fecha Solicitud</TableCell>
                        <TableCell align="center">Usuario</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Descripción Anulación</TableCell>
                        <TableCell align="center">Fecha de Emisión</TableCell>
                        <TableCell align="center">Proveedor</TableCell>
                        <TableCell align="center">Ver Pdf</TableCell>
                        <TableCell align="center">Acciones</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow hover key={row.name}>
                            <TableCell >
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                            <TableCell align="center">{row.protein}</TableCell>
                            <TableCell align="center"><Button variant="contained" size="small">
                                <LocalPrintshopIcon />
                            </Button>   </TableCell>
                            <TableCell align="center" >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="position"
                                >
                                    <FormControlLabel value="enProceso" control={<Radio />} label="En proceso" labelPlacement="top" />
                                    <FormControlLabel value="subidoSri" control={<Radio />} label="Subido al SRI" labelPlacement="top" />
                                    <FormControlLabel value="autorizado" control={<Radio />} label="Autorizado" labelPlacement="top" />
                                </RadioGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    );
}

export default SolcitudAnulacion;
