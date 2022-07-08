import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("DerivacionValoracionCaso/GetById" + qs) },
    async Post(data) { return await methods.Post("DerivacionValoracionCaso/Post", data) },
    async Put(qs, data) { return await methods.Put("DerivacionValoracionCaso/Put" + qs, data) },
    async Delete(props, resource, qs, id) { }
};

export default sitem1;