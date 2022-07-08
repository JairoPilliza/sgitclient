import methods from "./Service";

const sitemG = {

    async Get(props, resource, qs, setItem) {

        methods.Get("General/EstadoCivil" + qs).then(async (result) => {
            if (result.code == "1") {
                if (!(result.payload == null)) {
                    setItem(JSON.parse(result.payload))
                }
            } else {
                console.log(result.message+"vacio");
            }
        });

    },
    async Get1(props, resource, qs, setItem) {

        methods.Get("General/GradoInstruccion" + qs).then(async (result) => {
            if (result.code == "1") {
                if (!(result.payload == null)) {
                    setItem(JSON.parse(result.payload))
                }
            } else {
                console.log(result.message+"vacio");
            }
        });

    },
    async Get2(props, resource, qs, setItem) {

        methods.Get("General/Parentesco" + qs).then(async (result) => {
            if (result.code == "1") {
                if (!(result.payload == null)) {
                    setItem(JSON.parse(result.payload))
                }
            } else {
                console.log(result.message+"vacio");
            }
        });

    }

};

export default sitemG;