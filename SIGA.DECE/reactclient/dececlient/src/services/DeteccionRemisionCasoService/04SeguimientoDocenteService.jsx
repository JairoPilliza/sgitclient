import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("DRCInformeSeguimientoItem4Opcion/Get" + qs) },
    async Post(data) { return await methods.Post("DRCInformeSeguimientoItem4/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCInformeSeguimientoItem4/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;