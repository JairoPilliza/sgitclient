import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import login from "../../services/LoginService"
import Loader from "../Loader/Loader"
import { Fragment, useState } from "react";
import { errorNotification } from "../SweetAlert/test";
import { ToastContainer } from "react-toastify";
import SweetAlert from "../SweetAlert/SweetAlert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.adventistas.org/es/">
        IASD UE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();
export default function LogIn(props) {
  const [look, setLook] = useState(false);
  //const [message, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("go", true);
    const data = new FormData(event.currentTarget);
    setLook(true);
    login.Post({ "codUsuario": data.get("codUsuario"), "contrasena": data.get("contrasena") }).then(async (result) => {
      setLook(false);
      //setMessage(result.message);
      if (result.code === "1") {
        const resp = result.payload;
        localStorage.setItem("menus", JSON.stringify(resp.menus));
        localStorage.setItem("roles", JSON.stringify(resp.roles));
        localStorage.setItem("JWT", JSON.stringify(resp.token));
        localStorage.setItem("go", JSON.stringify(false));
        window.location.href = result.redirectTo;
      } else {
        errorNotification(result.message);
      }
    }).catch(e => {
      const error = e.message;
      SweetAlert.Warning(error);
      setLook(false)
    })
  };
  return (
    <Fragment>
      {
        look ? <Loader look={look} /> : null
      }
      <ThemeProvider theme={theme}>

        <Grid container component="main" sx={{ height: "100vh" }}>
          <ToastContainer />
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                {/*<LockOutlinedIcon />*/}
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {/* <Typography component="h5" variant="h6" color={"red"}>
                {message}
              </Typography> */}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="codUsuario"
                  label="Usuario"
                  name="codUsuario"
                  autoComplete="codUsuario"
                  autoFocus

                />
                <TextField

                  margin="normal"
                  required
                  fullWidth
                  name="contrasena"
                  label="Contraseña"
                  type="password"
                  id="contrasena"
                  autoComplete="current-contrasena"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button

                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ingresar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Olvidé mi contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link> */}
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Fragment>
  );
}
