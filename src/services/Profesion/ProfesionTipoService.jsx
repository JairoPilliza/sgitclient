import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const ProfesionTipo = {
    async Get() { return await methods.Get("ProfesionTipo/Get"); },
    async Post(data) { return await methods.Post("ProfesionTipo/Post", data) },
    async Put(qs, data) { return await methods.Put("ProfesionTipo/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("ProfesionTipo/Delete" + useParamsJson(qs)) }
};

export default ProfesionTipo;