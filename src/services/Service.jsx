const production = false;

const URL = (production) ? "http://iasdue-002-site3.ftempurl.com/api/" : "https://localhost:7085/api/";

const TOKEN = JSON.parse(localStorage.getItem("JWT"));

const config = {
    method: '', // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json charset=utf-8',
        'Authorization': TOKEN
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify("vacio") // body data type must match "Content-Type" header
}

const methods = {

    async Get(url) {     
        config.method = "GET";
        delete config.body;
        const response = await fetch(URL + url, config);
        const result = await response.json();        
        return result;
    },

    async Post(url, data) {
        
        config.method = "POST";
        config.body = JSON.stringify(data);
        const response = await fetch(URL + url, config);
        const result = await response.json();
        return result;
    },

    async Put(url, data) {
        config.method = "PUT";
        config.body = JSON.stringify(data);
        const response = await fetch(URL + url, config);
        const result = await response.json();
        return result;
    },

    async Delete(url, id) {
        config.method = "DELETE";
        delete config.body;
        const response = await fetch(URL + url, config);
        const result = await response.json();
        return result;
    }
};

export default methods;