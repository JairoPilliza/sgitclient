import methods from "../Service";

const sitem1 = {

   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + qs) },
    async GetT() { return await methods.Get("Departamento/Get" ); },
    async Post(data) { return await methods.Post("Departamento/Post", data) },
    async Put(qs, data) { return await methods.Put("Departamento/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("Departamento/Delete" + qs) }
};

export default sitem1;