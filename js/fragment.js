 /* {
    "CODIGO": "0102-015",
    "DESCRIPCION": "ALAMBRE GALV CAL 17,5 (BOBINA 20 KG) T1",
    "EXISTENCIA": 93,
    "IMAGEN": "images/imagen-producto.jpg"
  }
*/

 
 


window.addEventListener('DOMContentLoaded', (event) => {
   llenar_productos(productos)
});


buscar.addEventListener('keyup',(event)=>{
   const buscar = document.getElementById("buscar");

  var buscarValue = buscar.value.toUpperCase();



    var productos_filtrados= productos.filter(filtraProductos);


     llenar_productos(productos_filtrados)
     console.log(productos_filtrados)
     
  

  function filtraProductos(arrayActual,index,arrayTotal) {
  
      if(buscarValue.length < 1){
        return true;
      }

      var descripcion = arrayActual.DESCRIPCION.toUpperCase().indexOf(buscarValue) > -1
       var codigo = arrayActual.CODIGO.toUpperCase().indexOf(buscarValue) > -1
      
      return descripcion || codigo ;
   
  }


});


 

function llenar_productos(productos){
  const lista = document.getElementById("lista-dinamica");
 const numero_productos = document.getElementById("numero_productos");
  const fragment = document.createDocumentFragment();
  const template = document.querySelector("#template-li").content;

  
lista.innerHTML="" 
numero_productos.innerText=productos.length+" articulos"

    productos.forEach((item) => {
    template.querySelector("span").textContent = item.CODIGO;
    template.querySelector("#product_name").textContent = item.DESCRIPCION;
    template.querySelector("#imagen-producto").src = item.IMAGEN;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });

lista.appendChild(fragment);

}