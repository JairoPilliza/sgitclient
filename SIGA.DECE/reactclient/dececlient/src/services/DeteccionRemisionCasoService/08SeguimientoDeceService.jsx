import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("DRCInformeSeguimientoItem8Opcion/Get" + qs) },
    async Get1(qs) { return await methods.Get("DRCAcuerdosItem8/Get" + qs) },
    async Post(data) { return await methods.Post("DRCInformeSeguimientoItem8/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCInformeSeguimientoItem8/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;