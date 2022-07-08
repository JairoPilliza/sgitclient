import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("Derivacion/GetById" + qs) },
    async Get1(qs) { return await methods.Get("DerivacionOpcion/Get" + qs) },
    async GetT(qs) { return await methods.Get("Derivacion/Get" + qs) },
    async Post(data) { return await methods.Post("Derivacion/Post", data) },
    async Put(qs, data) { return await methods.Put("Derivacion/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("Derivacion/Delete" + qs) }
};

export default sitem1;