function filtraProductos(arrayActual, index, arrayTotal) {

    if (buscarValue.length < 1) {
        return true;
    }
    var descripcion = arrayActual.DESCRIPCION.toUpperCase().indexOf(buscarValue) > -1
    var codigo = arrayActual.CODIGO.toUpperCase().indexOf(buscarValue) > -1
    return descripcion || codigo;
}

function filtrar_por_categoria(arrayActual, index, arrayTotal) {
   
    return arrayActual.CATEGORIA?.toUpperCase().indexOf(categoria.toLocaleUpperCase()) > -1
}
function filtrar() {
    productos_filtrados = productos.filter(filtraProductos);

    if (categoria == "Todos") categoria = ""

    if (categoria != "")
        productos_filtrados = productos.filter(filtrar_por_categoria);
}


function llenar_productos(productos) {
    const lista = document.getElementById("lista-dinamica");
    const numero_productos = document.getElementById("numero_productos");
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-li").content;


    lista.innerHTML = ""
    numero_productos.innerText = productos.length + " articulos"

    productos.forEach((item) => {
        var _imagen = item.IMAGEN == "" ? "imagen-producto.jpg" : item.IMAGEN
        template.querySelector("span").textContent = item.CODIGO;
        template.querySelector("#product_name").textContent = item.DESCRIPCION;
        template.querySelector("#imagen-producto").src = "images/productos/" + _imagen;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });

    lista.appendChild(fragment);

}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function populateFromArray(array) {
    var output = {};
    array.forEach(function (item, index) {
        if (!item) return;
        if (Array.isArray(item)) {
            output[index] = populateFromArray(item);
        } else {
            output[index] = item;
        }
    });
    return output;
}

function producto_excel_adaptador(arreglo = []) {

    let a = arreglo.filter((x, y) => y > 4)
    let b = [];
    a.forEach((x) => b.push({
        "CODIGO": x.__EMPTY,
        "DESCRIPCION": x.__EMPTY_1,
        "EXISTENCIA": x.__EMPTY_2,
        "CATEGORIA": x.__EMPTY_4,
        "IMAGEN": x.__EMPTY_5 || ""
    }))
    return b;
}

function obtener_productos_desde_excel() {
    var url = location.href.replace("index.html", "PUBLICIDAD.xlsx");
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";


    oReq.onload = function (e) {
        var arraybuffer = oReq.response;
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        var workbook = XLSX.read(bstr, { type: "binary" });

        var first_sheet_name = workbook.SheetNames[0];

        var worksheet = workbook.Sheets[first_sheet_name];
        var arreglo = XLSX.utils.sheet_to_json(worksheet, { raw: true })
         productos  = producto_excel_adaptador(arreglo);
      
    }
   
    oReq.send();

}

function llenar_select(productos, selector) {
    productos.forEach(p => set.add(p.CATEGORIA))
    var newOption = document.createElement("option");
    newOption.text = "Todos";
    var selectCategoria = document.querySelector(selector);
    selectCategoria.add(newOption);
    set.forEach(item => {
      var newOption = document.createElement("option");
      newOption.text = item
      selectCategoria.add(newOption);
  
    })
    
  }