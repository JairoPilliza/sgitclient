import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }

const DepartamentoActividad = {
   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + useParamsJson(qs)) },
    async Get(qs) {  return await methods.Get("DepartamentoActividad/Get" + useParamsJson(qs) ); },
    async Post(data) { return await methods.Post("DepartamentoActividad/Post", data) },
    async Put(qs, data) { return await methods.Put("DepartamentoActividad/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("DepartamentoActividad/Delete" + useParamsJson(qs)) }
};

export default DepartamentoActividad;