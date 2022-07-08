import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const PiePagina = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Sitio Web || Pie de pagina
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default PiePagina;
