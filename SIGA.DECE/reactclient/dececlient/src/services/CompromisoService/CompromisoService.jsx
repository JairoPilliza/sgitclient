import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("CompromisoRepresentante/GetById" + qs) },
    async Get1(qs) { return await methods.Get("CompromisoRepresentanteDetalle/Get" + qs) },
    async GetT(qs) { return await methods.Get("CompromisoRepresentante/Get" + qs) },
    async Post(data) { return await methods.Post("CompromisoRepresentante/Post", data) },
    async Put(qs, data) { return await methods.Put("CompromisoRepresentante/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("CompromisoRepresentante/Delete" + qs) }
};

export default sitem1;