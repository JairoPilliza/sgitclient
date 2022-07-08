import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("IntervencionSesionSeguimientoOpcion/Get" + qs) },
    async Get1(qs) { return await methods.Get("SesionSeguimiento/GetById" + qs) },
    async GetT(qs) { return await methods.Get("SesionSeguimiento/Get" + qs) },
    async Post(data) { return await methods.Post("SesionSeguimiento/Post", data) },
    async Put(qs, data) { return await methods.Put("SesionSeguimiento/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("SesionSeguimiento/Delete" + qs) }
};

export default sitem1;