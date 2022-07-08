import methods from "../Service";

const sitem1 = {

    async Get(qs) { return await methods.Get("DRCDescripcionCasoItem3/Get" + qs) },
    async Post(data) { return await methods.Post("DRCDescripcionCasoItem3/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCDescripcionCasoItem3/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;