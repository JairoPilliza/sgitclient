import methods from "./Service";

const login = {
    async Get() {
        return await methods.Get("Login/Get");
    },
    async Post(data) {
        return await methods.Post("Login/Post", data);
    }
};
export default login;