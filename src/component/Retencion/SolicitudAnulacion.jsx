
import * as React from 'react';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
                                <Grid container width={400}>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="position"
                                    >
                                        <Grid item>
                                            <FormControlLabel value="enProceso" control={<Radio />} label="En proceso" labelPlacement="top" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="subidoSri" control={<Radio />} label="Subido al SRI" labelPlacement="top" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="autorizado" control={<Radio />} label="Autorizado" labelPlacement="top" />
                                        </Grid>


                                    </RadioGroup>
                                </Grid>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    );
}

export default SolcitudAnulacion;
