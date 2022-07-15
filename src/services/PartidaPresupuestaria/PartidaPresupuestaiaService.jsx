import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const PartidaPresupuestaria = {
    
    async Get() {  return await methods.Get("PartidaPresupuestaria/Get"  ); },
    async Post(data) { return await methods.Post("PartidaPresupuestaria/Post", data) },
    async Put(qs, data) { return await methods.Put("PartidaPresupuestaria/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("PartidaPresupuestaria/Delete" + useParamsJson(qs)) }
};

export default PartidaPresupuestaria;