import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const ParteRelacionada = {

    async Get() {  return await methods.Get("ParteRelacionada/Get" ); },
    async Post(data) { return await methods.Post("ParteRelacionada/Post", data) },
    async Put(qs, data) { return await methods.Put("ParteRelacionada/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("ParteRelacionada/Delete" + useParamsJson(qs)) }
};

export default ParteRelacionada;