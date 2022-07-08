import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DRCObsSugerenciaItem9/Get" + qs) },
    async Post(data) { return await methods.Post("DRCObsSugerenciaItem9/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCObsSugerenciaItem9/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;