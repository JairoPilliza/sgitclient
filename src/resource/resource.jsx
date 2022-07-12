//var _isLook = true;
const Resource = {
    //isLook: _isLook,
    convertObjectToQueryString: function (dataObject) {
        var QueryString = [];
        for (var item in dataObject) {
            if (dataObject.hasOwnProperty(item)) {
                QueryString.push(encodeURIComponent(item) + "=" + encodeURIComponent(dataObject[item]));
            }
        }
        return "?" + QueryString.join("&");
    },

    convertObjectToQueryStringUnique: function (nameProperty, dataObject) {
        var QueryString = "?" + nameProperty + "=" + JSON.stringify(dataObject);
        return QueryString;
    },

    // convertStringToArray: function (cadena) {
    //     const array = cadena.split(",");
    //     return array;
    // },

    // convertArrayToString: function (array) {
    //     const cadena = "";
    //     for (var i = 0; i < array.lenght; i++) {
    //         cadena += array[i].descripcion.join(",");
    //     }
    //     return cadena;
    // },
    // /* casos con RadioButton*/
    // getId: function (arreglo, propierty) {
    //     const row = arreglo.filter((item, index) => {
    //         if (item.data.value === true) return item;
    //     })[0];
    //     return row[propierty];
    // },
    // /* casos con CheckBox*/
    // getRows: function (arreglo) {
    //     return arreglo.filter((item, index) => {
    //         if (item.data.value === true) return item;
    //     });
    // },

    // getInputs: function (arreglo) {
    //     return arreglo.filter((item, index) => {
    //         if (item.data.descripcion !== null && item.data.descripcion !== "") return item;
    //     });
    // }
    // ,
    // look: function () {
    //     _isLook = true;
    // },
    // unlook: function () {
    //     alert();
    //     _isLook = false;
    // },
    // getLook: function () {
    //     return _isLook;
    // }

}
export default Resource;

