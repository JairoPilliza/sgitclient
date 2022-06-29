import * as React from 'react';
import { useForm } from "react-hook-form"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button, Divider } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Ambiente = () => {
    const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const onSubmit = (data, evento) => {
        alert();
        console.log(data);
    }

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardHeader
                sx={{ textAlign: 'center' }}
                title="Gestion Ambiente"
            />
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>

                    <center>
                        <FormControl sx={{ margin: 'auto' }}>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="Pruebas" control={<Radio  {...register("pruebas")} />} label="Pruebas" />
                                <FormControlLabel value="Produccion" control={<Radio  {...register("produccion")}/>} label="Produccion" />
                            </RadioGroup>
                        </FormControl>
                    </center>
                </CardContent>
                <Divider />
                <CardActions >
                    <Button type='submit' variant='contained' sx={{ margin: 'auto' }}><CheckBoxIcon />Actualizar</Button>
                </CardActions>
            </form>
        </Card>
    );
}
export default Ambiente;