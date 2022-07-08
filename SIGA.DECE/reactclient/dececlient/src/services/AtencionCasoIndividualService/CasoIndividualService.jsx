import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("SeguimientoCasoIndividual/GetById" + qs) },
    async GetT(qs) { return await methods.Get("SeguimientoCasoIndividual/Get" + qs) },
    async Post(data) { return await methods.Post("SeguimientoCasoIndividual/Post", data) },
    async Put(qs, data) { return await methods.Put("SeguimientoCasoIndividual/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("SeguimientoCasoIndividual/Delete" + qs) }
};

export default sitem1;