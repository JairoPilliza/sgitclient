import methods from "../Service";

const DepartamentoActividad = {

   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + qs) },
    async Get() { return await methods.Get("DepartamentoActividad/Get" ); },
    async Post(data) { return await methods.Post("DepartamentoActividad/Post", data) },
    async Put(qs, data) { return await methods.Put("DepartamentoActividad/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("DepartamentoActividad/Delete" + qs) }
};

export default DepartamentoActividad;