import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }

const DepartamentoActividadDetalle = {
    // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + useParamsJson(qs)) },
    async Get(qs) { return await methods.Get("DepartamentoActividadDetalle/Get" + useParamsJson(qs)); },
    async Post(data) { return await methods.Post("DepartamentoActividadDetalle/Post", data) },
    async Put(qs, data) { return await methods.Put("DepartamentoActividadDetalle/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("DepartamentoActividadDetalle/Delete" + useParamsJson(qs)) }
};

export default DepartamentoActividadDetalle;