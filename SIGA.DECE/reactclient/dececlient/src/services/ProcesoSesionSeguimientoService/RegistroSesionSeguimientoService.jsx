import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("SesionSeguimientoDetalle/Get" + qs) },
    async Post(data) { return await methods.Post("SesionSeguimientoDetalle/Post", data) },
    async Put(qs, data) { return await methods.Put("SesionSeguimientoDetalle/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("SesionSeguimientoDetalle/Delete" + qs) }
};

export default sitem1;