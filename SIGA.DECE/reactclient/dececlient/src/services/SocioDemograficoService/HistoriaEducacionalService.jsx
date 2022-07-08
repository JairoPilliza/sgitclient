import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("HistoriaEducacional/Get" + qs) },
    async Post(data) { return await methods.Post("HistoriaEducacional/Post", data) },
    async Put(qs, data) { return await methods.Put("HistoriaEducacional/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;