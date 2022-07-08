import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + qs) },
    async GetT(qs) { return await methods.Get("AtencionAlumno/Get" + qs); },
    async Post(data) { return await methods.Post("AtencionAlumno/Post", data) },
    async Put(qs, data) { return await methods.Put("AtencionAlumno/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("AtencionAlumno/Delete" + qs) }
};

export default sitem1;