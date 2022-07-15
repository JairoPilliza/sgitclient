import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const IdentificacionTipo = {

   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + useParamsJson(qs)) },
    async Get() { return await methods.Get("IdentificacionTipo/Get" ); },
    async Post(data) { return await methods.Post("IdentificacionTipo/Post", data) },
    async Put(qs, data) { return await methods.Put("IdentificacionTipo/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("IdentificacionTipo/Delete" + useParamsJson(qs)) }
};

export default IdentificacionTipo;