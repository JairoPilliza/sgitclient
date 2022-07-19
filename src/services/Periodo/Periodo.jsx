import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const Periodo = {
    async Get() { return await methods.Get("Periodo/Get"); },
    async Post(data) { return await methods.Post("Periodo/Post", data) },
    async Put(qs, data) { return await methods.Put("Periodo/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("Periodo/Delete" + useParamsJson(qs)) }
};

export default Periodo;