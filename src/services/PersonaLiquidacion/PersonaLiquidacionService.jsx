import methods from "../Service";

const PersonaLiquidacion = {
    async Get() { return await methods.Get("PersonaLiquidacion/Get" ); },
    async Post(data) { return await methods.Post("PersonaLiquidacion/Post", data) },
    async Put(qs, data) { return await methods.Put("PersonaLiquidacion/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("PersonaLiquidacion/Delete" + qs) }
};

export default PersonaLiquidacion;