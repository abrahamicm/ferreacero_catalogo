/* {
   "CODIGO": "0102-015",
   "DESCRIPCION": "ALAMBRE GALV CAL 17,5 (BOBINA 20 KG) T1",
   "EXISTENCIA": 93,
   "IMAGEN": "images/imagen-producto.jpg",
   "Categoría": "Ferretería, cerraduras, manillas",
 }

 https://csvjson.com/csv2json
*/


var categoria = "";
var productos_filtrados = []
var buscarValue = "";
var allCategories;
var selectCategoria = document.querySelector("#select_categorias");
var set = new Set()

window.addEventListener('DOMContentLoaded', (event) => {
  llenar_productos(productos)
  productos.forEach(p => set.add(p.CATEGORIA))
  var newOption = document.createElement("option");
  newOption.text = "Todos";
  selectCategoria.add(newOption);
  set.forEach(item => {
    var newOption = document.createElement("option");
    newOption.text = item.toString();
    selectCategoria.add(newOption);

  })
});
$('body').on('DOMNodeInserted', 'select', function () {    $(this).select2();})
var objeto = {}
function convertir_en_objeto(array) {
  if (objeto) { }
}
$('#select_categorias').on('select2:select', function (e) {
  categoria=e.target.value
  filtrar();
  llenar_productos(productos_filtrados)
});
buscar.addEventListener('keyup', (event) => {
  const buscar = document.getElementById("buscar");
  buscarValue = buscar.value.toUpperCase();
  filtrar();
  llenar_productos(productos_filtrados)
});

function filtraProductos(arrayActual, index, arrayTotal) {

  if (buscarValue.length < 1) {
    return true;
  }

  var descripcion = arrayActual.DESCRIPCION.toUpperCase().indexOf(buscarValue) > -1
  var codigo = arrayActual.CODIGO.toUpperCase().indexOf(buscarValue) > -1
  return descripcion || codigo;
}

function filtrar_por_categoria(arrayActual, index, arrayTotal) {
  
  return arrayActual.CATEGORIA.toUpperCase().indexOf(categoria.toLocaleUpperCase()) > -1
}
function filtrar() {

  productos_filtrados = productos.filter(filtraProductos);

   if(categoria == "Todos") categoria=""

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
    template.querySelector("span").textContent = item.CODIGO;
    template.querySelector("#product_name").textContent = item.DESCRIPCION;
    template.querySelector("#imagen-producto").src = item.IMAGEN;
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

// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter(onlyUnique);

//console.log(unique); // ['a', 1, 2, '1']