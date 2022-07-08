import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DatoIdentificacionInfo/Get" + qs) },
    //async GetT(props, resource, qs, setItem) {
    async GetT(qs) { return await methods.Get("SocioDemografico/Get" + qs); },
    async Post(data) { return await methods.Post("DatoIdentificacionInfo/Post", data) },
    async Put(qs, data) { return await methods.Put("DatoIdentificacionInfo/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("SocioDemografico/Delete" + qs) }
};

export default sitem1;