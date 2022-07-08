import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DatoFamiliar/Get" + qs) },
    async Post(data) { return await methods.Post("DatoFamiliar/Post", data) },
    async Put(qs, data) { return await methods.Put("DatoFamiliar/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("DatoFamiliar/Delete" + qs) }
};

export default sitem1;