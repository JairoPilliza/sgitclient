import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DRCInformeSeguimientoItem7Opcion/Get" + qs) },
    async Get1(qs) { return await methods.Get("DRCAccionRealizarItem7/Get" + qs) },
    async Post(data) { return await methods.Post("DRCInformeSeguimientoItem7/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCInformeSeguimientoItem7/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;