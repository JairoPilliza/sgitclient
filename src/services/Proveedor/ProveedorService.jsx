import methods from "../Service";

const Proveedor = {
    async Get() { return await methods.Get("Proveedor/Get" ); },
    async Post(data) { return await methods.Post("Proveedor/Post", data) },
    async Put(qs, data) { return await methods.Put("Proveedor/Put" + qs, data) },
    async Delete(qs) { return await methods.Delete("Proveedor/Delete" + qs) }
};

export default Proveedor;