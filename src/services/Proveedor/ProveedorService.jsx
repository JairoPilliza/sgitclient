import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const Proveedor = {
    async Get() { return await methods.Get("Proveedor/Get" ); },
    async Post(data) { return await methods.Post("Proveedor/Post", data) },
    async Put(qs, data) { return await methods.Put("Proveedor/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("Proveedor/Delete" + useParamsJson(qs)) }
};

export default Proveedor;