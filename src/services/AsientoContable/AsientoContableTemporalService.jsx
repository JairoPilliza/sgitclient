import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const AsientoContableTemporal = {

   // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + useParamsJson(qs)) },
    async Get() {  return await methods.Get("AsientoContableTemporal/Get"); },
    async Post(data) { return await methods.Post("AsientoContableTemporal/Post", data) },
    async Put(qs, data) { return await methods.Put("AsientoContableTemporal/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("AsientoContableTemporal/Delete" + useParamsJson(qs)) }
};

export default AsientoContableTemporal;