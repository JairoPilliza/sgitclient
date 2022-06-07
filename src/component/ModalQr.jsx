import React, { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, Grid, Link, Stack, Typography } from '@mui/material';
import { useForm } from "react-hook-form"
// project imports
import SubCard from 'ui-component/cards/SubCard';

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';

import QrCode2Icon from '@mui/icons-material/QrCode2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/system";

const ModalQr = (props) => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle id="scroll-dialog-title" > Compartir</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                      
                        tabIndex={-1}
                    >

                        <Card container style={{ textAlign: "center" }} >


                            <QrCode2Icon />

                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cerrar</Button>
                 
                </DialogActions>
            </Dialog>
        </div >

    );
}

export default ModalQr;
