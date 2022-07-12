import Button from "@mui/material/Button";
import React, { Fragment } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ButtonAdd = (props) => {
    const {name, ...other} = props;
    // console.log(one);
    // console.log(...other);
    // console.log(other);
     console.log(props);
    return (
        <Fragment>
            <Button {...other} size="small" variant="contained" style={{ width: "100%" }} >
            <AddIcon /> {name || ""} 
            </Button>
        </Fragment>
    );
}
const ButtonEdit = (props) => {
    const {name, ...other} = props;
    return (
        <Fragment>
            <Button {...other} size="small" variant="contained" style={{ width: "100%", backgroundColor: "#ffac33" }} >
                <EditIcon /> {name || ""} 
            </Button>
        </Fragment>
    );
};
const ButtonDelete = (props) => {
    const {name, ...other} = props;
    return (
        <Fragment>
            <Button {...other} size="small" variant="contained" style={{ width: "100%", backgroundColor: "#e91e63" }} >
                <DeleteIcon /> {name || ""} 
            </Button>
        </Fragment>
    );
}


export { ButtonAdd, ButtonEdit, ButtonDelete };