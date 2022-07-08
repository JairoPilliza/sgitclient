import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DeteccionRemisionCaso/GetById" + qs) },
    async Post(data) { return await methods.Post("DeteccionRemisionCaso/Post", data) },
    async Put(qs, data) { return await methods.Put("DeteccionRemisionCaso/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("DeteccionRemisionCaso/Delete" + qs) }
};

export default sitem1;