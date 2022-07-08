import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("IngresoEgresoFamiliar/Get" + qs) },
    async Get1(qs) { return await methods.Get("ViviendaCondicion/Get" + qs) },
    async Get2(qs) { return await methods.Get("ViviendaServicio/Get" + qs) },
    async Post(data) { return await methods.Post("IngresoEgresoFamiliar/Post", data) },
    async Put(qs, data) { return await methods.Put("IngresoEgresoFamiliar/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;