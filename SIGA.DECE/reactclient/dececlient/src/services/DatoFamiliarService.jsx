import methods from "./Service";

const sitem1 = {
    async Get(props, resource, qs) {
        methods.Get("DatoIdentificacionInfo/Get" + qs).then(async (result) => {
            if (result.code == "1") {
                if (!(result.payload == null)) {

                }
            } else {
                console.log(result.message+"vacio");
            }
        });

    },
    async Post(props, resource, qs, data) {
        data.telefono = resource.convertStringToArray(data.telefono);
        data.celular = resource.convertStringToArray(data.celular);
        methods.Post("DatoIdentificacionInfo/Post", data).then(async (result) => {
            if (result.code == "1") {
                localStorage.setItem("idDeceSociodemografico", JSON.stringify(result.payload))
                props.history.push("./DatosFamiliares")
            } else {
                alert(result.message);
            }
        });
    },
    async Put(props, resource, qs, data) {
        data.telefono = resource.convertStringToArray(data.telefono);
        data.celular = resource.convertStringToArray(data.celular);
        methods.Put("DatoIdentificacionInfo/Put" + qs, data).then(async (result) => {
            if (result.code == "1") {
                props.history.push("./DatosFamiliares")
            } else {
                alert(result.message);
            }
        });
    },
    async Delete(props, resource, qs, id) {

    }
};

export default sitem1;