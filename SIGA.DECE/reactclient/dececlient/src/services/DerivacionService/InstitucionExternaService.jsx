import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("DerivacionInstitucionExternaOpcion/Get" + qs) },
    async Post(data) { return await methods.Post("DerivacionInstitucionExterna/Post", data) },
    async Put(qs, data) { return await methods.Put("DerivacionInstitucionExterna/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;