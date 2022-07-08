import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("EmbarazoParto/Get" + qs) },
    async Get1(qs) { return await methods.Get("DatoNinioRecienNacido/Get" + qs) },
    async Get2(qs) { return await methods.Get("AntecedentePatologicoFamiliar/Get" + qs) },
    async Get3(qs) { return await methods.Get("AntecedenteDificultadEscolar/Get" + qs) },
    async Post(data) { return await methods.Post("EmbarazoParto/Post", data) },
    async Put(qs, data) { return await methods.Put("EmbarazoParto/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;