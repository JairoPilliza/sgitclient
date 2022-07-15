import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const ContribuyenteTipo = {

    async Get() {  return await methods.Get("ContribuyenteTipo/Get" ); },
    async Post(data) { return await methods.Post("ContribuyenteTipo/Post", data) },
    async Put(qs, data) { return await methods.Put("ContribuyenteTipo/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("ContribuyenteTipo/Delete" + useParamsJson(qs)) }
};

export default ContribuyenteTipo;