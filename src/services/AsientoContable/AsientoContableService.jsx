import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const AsientoContable = {

    async Get() {  return await methods.Get("AsientoContable/Get" ); },
    async Post(data) { return await methods.Post("AsientoContable/Post", data) },
    async Put(qs, data) { return await methods.Put("AsientoContable/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("AsientoContable/Delete" + useParamsJson(qs)) }
};

export default AsientoContable;