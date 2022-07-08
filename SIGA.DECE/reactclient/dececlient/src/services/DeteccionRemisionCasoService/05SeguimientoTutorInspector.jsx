import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DRCInformeSeguimientoItem5Opcion/Get" + qs) },
    async Get1(qs) { return await methods.Get("DRCAcuerdoEstablecido/Get" + qs) },
    async Post(data) { return await methods.Post("DRCInformeSeguimientoItem5/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCInformeSeguimientoItem5/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;