import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const Canton = {

    async Get() {  return await methods.Get("Canton/Get" ); },
    async Post(data) { return await methods.Post("Canton/Post", data) },
    async Put(qs, data) { return await methods.Put("Canton/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("Canton/Delete" + useParamsJson(qs)) }
};

export default Canton;