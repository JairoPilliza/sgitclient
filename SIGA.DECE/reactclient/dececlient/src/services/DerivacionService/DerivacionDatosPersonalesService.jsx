import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("DerivacionDatoPersonalDerivado/GetById" + qs) },
    async Get1(qs) { return await methods.Get("Genero/Get" + qs) },
    async Post(data) { return await methods.Post("DerivacionDatoPersonalDerivado/Post", data) },
    async Put(qs, data) { return await methods.Put("DerivacionDatoPersonalDerivado/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;