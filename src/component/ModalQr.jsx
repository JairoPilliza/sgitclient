import React, { Fragment, useEffect, useState } from "react";
import { Card} from '@mui/material';
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
                maxWidth="sm"
            >
                <DialogTitle id="scroll-dialog-title" > Compartir</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"                      
                        tabIndex={-1}
                    >
                        <Card container style={{ textAlign: "center" }} >
                            <QrCode2Icon style={{width:"250", height:"250"}} />
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
