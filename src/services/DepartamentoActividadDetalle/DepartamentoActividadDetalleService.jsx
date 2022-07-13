import methods from "../Service";

const DepartamentoActividadDetalle = {
    // async Get(qs) { return await methods.Get("AtencionAlumno/GetById" + qs) },
    async Get(qs) { return await methods.Get("DepartamentoActividadDetalle/Get" + qs); },
    async Post(data) { return await methods.Post("DepartamentoActividadDetalle/Post", data) },
    async Put(qs, data) { return await methods.Put("DepartamentoActividadDetalle/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("DepartamentoActividadDetalle/Delete" + qs) }
};

export default DepartamentoActividadDetalle;