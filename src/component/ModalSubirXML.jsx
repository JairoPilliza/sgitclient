import React, { Fragment, useEffect, useState } from "react";
import { Card, FormControlLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const ModalSubirXML = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [table, setTable] = useState(false);



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        p: 4,
    };


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const onSubmit = (data, evento) => {
        alert();
        console.log(data);

    }

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const rows = [
        createData('Frozen yoghurt', "hola", 6.0, 24, 4.0),
        createData('Ice cream sandwich', "chao", 9.0, 37, 4.3),

    ];
    const [selectedValue, setSelectedValue] = React.useState(false);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        //alert(event.target.value)
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog
                    open={props.open}
                    onClose={props.onClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth
                    maxWidth="md"
                >
                    <DialogTitle id="scroll-dialog-title">Detalle de factura XML temporal</DialogTitle>

                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"

                            tabIndex={-1}
                        >
                            <Card className="col-12" container style={{ textAlign: "center" }} >
                                <div>
                                    <Grid container spacing={2}>

                                        <Grid container item  xs={12} sm={12} md={6} lg={6} spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <Button variant="contained" value="bien" startIcon={<CheckCircleOutlineIcon />} >
                                                    Bienes
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <Button variant="contained" startIcon={<CheckCircleOutlineIcon />}>
                                                    Servicios
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">#</TableCell>
                                                <TableCell align="left">Bien / Servicio</TableCell>

                                                <TableCell align="center">Gr.Iva</TableCell>
                                                <TableCell align="center">Cant.</TableCell>
                                                <TableCell align="center">Detalle</TableCell>
                                                <TableCell align="center">P.Unit</TableCell>
                                                <TableCell align="center">Total</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {rows.map((row) => (
                                                <TableRow
                                                    hover
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={e => setTable(false)}
                                                >

                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center" colSpan={1}>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                        >
                                                            <FormControlLabel value="bien" control={<Radio />} label="" />
                                                            <FormControlLabel value="servicio" control={<Radio />} label="" />
                                                        </RadioGroup>
                                                    </TableCell>

                                                    <TableCell align="center">{row.fat}</TableCell>
                                                    <TableCell align="center">{row.fat}</TableCell>
                                                    <TableCell align="center">ddddddddddddddd</TableCell>
                                                    <TableCell align="center">{row.fat}</TableCell>

                                                    <TableCell align="center">{row.fat}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Card>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancelar</Button>
                        <Button type="submit" >Guardar</Button>
                    </DialogActions>

                </Dialog>

            </form>
        </div >

    );
}

export default ModalSubirXML;
