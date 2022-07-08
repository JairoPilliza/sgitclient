import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("Intervencion/GetOpcion" + qs) },
    async GetT(qs) { return await methods.Get("Intervencion/Get" + qs) },
    async Get1(qs) { return await methods.Get("IntervencionArea/Get" + qs) },
    async Get2(qs) { return await methods.Get("IntervencionDestinatario/Get" + qs) },
    async Get3(qs) { return await methods.Get("IntervencionRiesgoIdentificado/Get" + qs) },
    async Post(data) { return await methods.Post("Intervencion/Post", data) },
    async Put(qs, data) { return await methods.Put("Intervencion/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("Intervencion/Delete" + qs) }
};

export default sitem1;