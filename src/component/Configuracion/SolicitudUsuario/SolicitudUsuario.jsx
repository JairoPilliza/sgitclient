import * as React from 'react';
import { useForm } from "react-hook-form"
import MainCard from 'ui-component/cards/MainCard';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, CardHeader, Divider, IconButton, Stack, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const SolicitudUsuario = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1', 159, 6.0, 24, 4.0),
        createData('2', 237, 9.0, 37, 4.3),
        createData('3', 262, 16.0, 24, 6.0),
    ];

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Card>
                <CardHeader
                    avatar={
                        <PersonIcon  />
                    }
                    title="Solicitudes de Usuarios"
                />
                <Divider></Divider>

                <CardContent>


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="caption table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="center">Código</TableCell>
                                    <TableCell align="center">Razón Social</TableCell>
                                    <TableCell align="center">Ruc</TableCell>
                                    <TableCell align="center">Teléfono</TableCell>
                                    <TableCell align="center">Email</TableCell>
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
                                        <TableCell align="center">
                                            <Button variant="contained" startIcon={<LockIcon />}>

                                            </Button>
                                            <Button variant="contained" startIcon={<DeleteIcon />} >

                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card >
        </Box>
    );
}
export default SolicitudUsuario;