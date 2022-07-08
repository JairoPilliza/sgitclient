import methods from "../Service";

const sitem1 = {
    async Get(qs) { return await methods.Get("DRCMotivoReporteOpcion/Get" + qs) },
    async Get1(qs) { return await methods.Get("DRCMotivoReporteOpcionDetalle/Get" + qs) },
    async Post(data) { return await methods.Post("DRCMotivoReporte/Post", data) },
    async Put(qs, data) { return await methods.Put("DRCMotivoReporte/Put" + qs, data) },
    async Delete() { }
};

export default sitem1;