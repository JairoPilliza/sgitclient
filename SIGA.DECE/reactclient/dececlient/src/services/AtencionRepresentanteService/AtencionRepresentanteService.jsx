import methods from "../Service";
//import {}

const sitem1 = {

    async Get(qs) { return await methods.Get("AtencionRepresentante/GetById" + qs) },
    //async GetT(props, resource, qs, setItem) {
    async GetT(qs) { return await methods.Get("AtencionRepresentante/Get" + qs) },
    async Post(data) { return await methods.Post("AtencionRepresentante/Post", data) },
    async Put(qs, data) { return await methods.Put("AtencionRepresentante/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("AtencionRepresentante/Delete" + qs) }
};

export default sitem1;