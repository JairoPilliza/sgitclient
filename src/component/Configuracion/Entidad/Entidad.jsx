
import * as React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { Divider, Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Button } from '@mui/material';
import ModalAperturaEntidad from './ModalAperturaEntidad';
import { gridSpacing } from 'store/constant';
import ClearIcon from '@mui/icons-material/Clear';
import ArticleIcon from '@mui/icons-material/Article';
const Entidad = () => {
    const [value, setValue] = React.useState('1');

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
    ];

    return (
        <MainCard>
            <Grid container spacing={gridSpacing} >
                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardHeader
                            title="Apertura de Entidades"
                        />
                        <Divider />
                        <CardContent>
                            <center>
                                <Button variant='contained' style={{ width: "50%" }} startIcon={<EventNoteIcon />} onClick={handleClickOpen('paper')}>Aperturar</Button>
                            </center>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: "50%" }} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Entidad</TableCell>
                                            <TableCell align="center">Fecha Apertura</TableCell>
                                            <TableCell align="center">Fecha Cierre</TableCell>
                                            <TableCell align="center">Estado</TableCell>
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
                                                <TableCell align="center">
                                                    <Grid container spacing={2} >
                                                        <Grid item>
                                                            <Button variant="contained" size="small" ><ClearIcon /></Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" size="small" ><ArticleIcon /></Button>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                    <ModalAperturaEntidad
                        open={open}
                        onClose={handleClose}
                    />
                </Grid>
            </Grid>
        </MainCard >
    );
}

export default Entidad;
