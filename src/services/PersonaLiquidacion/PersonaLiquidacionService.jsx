import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const PersonaLiquidacion = {
    async Get() { return await methods.Get("PersonaLiquidacion/Get" ); },
    async Post(data) { return await methods.Post("PersonaLiquidacion/Post", data) },
    async Put(qs, data) { return await methods.Put("PersonaLiquidacion/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("PersonaLiquidacion/Delete" + useParamsJson(qs)) }
};

export default PersonaLiquidacion;