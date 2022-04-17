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

var productos;

var productos_filtrados = []
var buscarValue = "";
var allCategories;

var set = new Set()


window.addEventListener('DOMContentLoaded', (event) => {
  obtener_productos_desde_excel()
  
});
$('body').on('DOMNodeInserted', 'select', function () {    $(this).select2();})
$('#select_categorias').on('change', function (e) {
  categoria = e.target.value
  
  filtrar();
  llenar_productos(productos_filtrados)
  
});

buscar.addEventListener('keyup', (event) => {
  const buscar = document.getElementById("buscar");
  buscarValue = buscar.value.toUpperCase();
  filtrar();
  llenar_productos(productos_filtrados)
});


