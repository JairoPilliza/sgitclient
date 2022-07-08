import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("IntervencionResultadoObtenido/Get" + qs) },
    async Get1(qs) { return await methods.Get("IntervencionObsRecomendacion/Get" + qs) },
    async Post(data) { return await methods.Post("IntervencionResultadoObtenido/Post", data) },
    async Put(qs, data) { return await methods.Put("IntervencionResultadoObtenido/Put" + qs, data) },
    async Delete() {

    }
};

export default sitem1;