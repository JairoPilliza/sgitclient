import methods from "../Service";

const ProfesionTipo = {
    async Get() { return await methods.Get("ProfesionTipo/Get" ); },
    async Post(data) { return await methods.Post("ProfesionTipo/Post", data) },
    async Put(qs, data) { return await methods.Put("ProfesionTipo/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("ProfesionTipo/Delete" + qs) }
};

export default ProfesionTipo;