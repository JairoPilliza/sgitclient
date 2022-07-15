import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const sitem1 = {

   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + useParamsJson(qs)) },
    async GetT() { return await methods.Get("Departamento/Get" ); },
    async Post(data) { return await methods.Post("Departamento/Post", data) },
    async Put(qs, data) { return await methods.Put("Departamento/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("Departamento/Delete" + useParamsJson(qs)) }
};

export default sitem1;