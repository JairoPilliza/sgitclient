import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DRCAccionRealizarItem6/Get" + qs) },
    async Post(data) { return await methods.Post("DRCAccionRealizarItem6/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCAccionRealizarItem6/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;