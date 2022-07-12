import methods from "../Service";

const IdentificacionTipo = {

   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + qs) },
    async Get(qs) { return await methods.Get("IdentificacionTipo/Get",qs ); },
    async Post(data) { return await methods.Post("IdentificacionTipo/Post", data) },
    async Put(qs, data) { return await methods.Put("IdentificacionTipo/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("IdentificacionTipo/Delete" + qs) }
};

export default IdentificacionTipo;