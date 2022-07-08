import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DRCInformeSeguimientoItem10/Get" + qs) },
    async Post(data) { return await methods.Post("DRCInformeSeguimientoItem10/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCInformeSeguimientoItem10/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;