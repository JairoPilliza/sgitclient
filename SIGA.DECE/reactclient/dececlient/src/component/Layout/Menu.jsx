import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { HashRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TablaListar from "../DatoSociodemografico/TablaListar";
import methods from "../../services/Service";
import Resource from "../../resource/resource";
const listaMenu = [
  { menuName: "Sociodemográfico", url: "TableListar", estado: true, activeClass: "active", icon: "fa-solid fa-hand-holding-hand" },
  { menuName: "Detección Derivación Seguimiento", url: "TableDeteccionRemisionCaso", estado: false, activeClass: "", icon: "fa-solid fa-box-archive" },
  { menuName: "Tipo Derivación", url: "TableDerivacion", estado: false, activeClass: "", icon: "fa-solid fa-arrow-right-arrow-left" },
  { menuName: "Tipo Intervención", url: "TableTipoIntervencion", estado: false, activeClass: "", icon: "fa-solid fa-people-group" },
  { menuName: "Proceso Sesión Seguimiento", url: "TableSesionSeguimiento", estado: false, activeClass: "", icon: "fa-solid fa-user-tag" },
  { menuName: "Atención Estudiantes", url: "TableAtencionEstudiante", estado: false, activeClass: "", icon: "fa-solid fa-child" },
  { menuName: "Atención Representantes", url: "TableAtencionRepresentante", estado: false, activeClass: "", icon: "fa-solid fa-person-circle-check" },
  { menuName: "Caso Individual", url: "TableCasoIndividual", estado: false, activeClass: "", icon: "fa-solid fa-hands-holding-child" },
  { menuName: "Compromiso Representantes", url: "TableCompromiso", estado: false, activeClass: "", icon: "fa-solid fa-file-contract" }]

export default function MainListItems() {
  const QueryString = Resource.convertObjectToQueryStringUnique("json", { id: JSON.parse(localStorage.getItem("idDeceDeteccionRemisionCaso")) });
  // const [listaMenu, setListaMenu] = React.useState([])
  // // React.useEffect(() => {
  // //   methods.Get("Login/Get" + QueryString).then(async (result) => {
  // //     if (result.code == "1") {
  // //       if (!(result.payload == null)) {
  // //         setListaMenu(JSON.parse(result.payload));
  // //       }
  // //     } else {
  // //     }
  // //   });
  // // }, [])
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    < React.Fragment >
      <HashRouter>
        {
          listaMenu.map((item, index) => {
            return (
              <ListItemButton key={index} href={"#/" + item.url}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.menuName} />
                {/* <ListItemText>
                <Link style={{ textDecoration: 'none' }} to={"/" + item.url} replace>{item.nameView}</Link>
              </ListItemText> */}
              </ListItemButton>)
          })
        }
      </HashRouter>
    </React.Fragment >
  )
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);

