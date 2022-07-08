import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const saveNotification = () => {
  toast.info("📚 Guardado!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  });
};
export const errorNotification = (error) => {
  toast.error("👾" + error + "!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  });
};
export const errorDatos = () => {
  toast.error("📜 Ingrese Datos Por Favor!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0
  });
};
