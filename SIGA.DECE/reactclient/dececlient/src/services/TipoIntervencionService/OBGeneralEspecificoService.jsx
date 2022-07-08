import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("IntervencionObjetivoGeneral/Get" + qs) },
    async Post(data) { return await methods.Post("IntervencionObjetivoGeneral/Post", data) },
    async Put(qs, data) { return await methods.Put("IntervencionObjetivoGeneral/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;