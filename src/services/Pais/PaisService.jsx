import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const Pais = {

    async Get() {  return await methods.Get("Pais/Get" ); },
    async Post(data) { return await methods.Post("Pais/Post", data) },
    async Put(qs, data) { return await methods.Put("Pais/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("Pais/Delete" + useParamsJson(qs)) }
};

export default Pais;