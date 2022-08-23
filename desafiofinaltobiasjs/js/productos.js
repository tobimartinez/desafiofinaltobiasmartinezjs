const resultado =  document.getElementById("productos");
fetch('./js/productos.json')
.then((response) => response.json ())
.then((data) => {

    data.forEach(valor => {
        let columna = document.createElement("div");
        columna.className="col-md-3 col-sm-12";
        let div_padre = document.createElement("div")
        div_padre.className = "card my-3 item"
        let div_hijo1 = document.createElement("div");
        div_hijo1.className = "card-header"
        let div_hijo2 = document.createElement("div");
        div_hijo2.className = "card-body ";
        let imagen = document.createElement("img");
        imagen.src = valor.imagen;
        imagen.className= "card-img-top card-img"
        let titulo = document.createElement ("h5");
        titulo.innerText= valor.nombre;
        titulo.className="text-center card-title"
        let precio = document.createElement("p");
        precio.className= "text-center card-title card-precio";
        precio.innerText= "$" + valor.precio;
        let boton = document.createElement("p")
        boton.className = "mt-2 text-center";
        boton.innerHTML = `<button class= "item-button btn btn-primary agregarAlcarrito "> Agregar </button>`;

        div_hijo2.appendChild(titulo);
        div_hijo2.appendChild(precio);
        div_hijo1.appendChild(imagen);
        div_hijo1.appendChild(boton);
        div_padre.appendChild(div_hijo2);
        div_padre.appendChild(div_hijo1);
        columna.appendChild(div_padre);
        resultado.appendChild(columna);

        
    });
    const botonCompra = document.querySelectorAll('.agregarAlcarrito');
    botonCompra.forEach(agregarBotonesAlCarrito => {
        agregarBotonesAlCarrito.addEventListener('click', clickAgregarCarrito);
    })
    
    const botonComprar = document.querySelector('.comprarButton');
    botonComprar.addEventListener('click', comprarButtonClicked);
    
    const containerCarritoItems =  document.querySelector('.containerCarritoItems');
    function clickAgregarCarrito(event){
       const button = event.target;
       const item = button.closest('.item');
        


       const itemTitle= item.querySelector('.card-title').textContent;
       const itemPrice = item.querySelector('.card-precio').textContent;
       const itemImg = item.querySelector('.card-img').src;
      

       añadirItemACarrito (itemTitle,itemPrice,itemImg);

       function añadirItemACarrito (itemTitle,itemPrice,itemImg){
            const rowCarrito = document.createElement('div');
            const contenidoCarrito =`
            <div class="row itemCarrito ">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <img src=${itemImg} class="shopping-cart-image">
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0"> ${itemTitle}</h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 itemPrecio">${itemPrice}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input itemCarritoCantidad" type="number"
                                value="1">
                            <button class="btn btn-danger botonBorrar" type="button">X</button>
                        </div>
                    </div>
                </div>`;

        rowCarrito.innerHTML = contenidoCarrito;
        containerCarritoItems.append(rowCarrito);

        rowCarrito.querySelector('.botonBorrar').addEventListener('click',borrarItemCarrito);
        rowCarrito.querySelector('.itemCarritoCantidad').addEventListener('change', elementoCantidad);
       }

       actualizarPrecioTotalCarrito()
    }
    function  actualizarPrecioTotalCarrito(){
        let total= 0;
        const totalCarrito = document.querySelector('.totalCarrito')

        const itemsCarrito = document.querySelectorAll('.itemCarrito');

        itemsCarrito.forEach(itemCarrito => {
           const itemCarritoPrecioElemento = itemCarrito.querySelector('.itemPrecio');

           const itemCarritoPrecio =  Number(itemCarritoPrecioElemento.textContent.replace('$',''));

           const itemCarritoCantidadElemento = itemCarrito.querySelector('.itemCarritoCantidad');
          
           const itemCarritoCantidad = Number(itemCarritoCantidadElemento.value);


           total = total + itemCarritoPrecio * itemCarritoCantidad; 
        });

         totalCarrito.innerHTML = `${total.toFixed(2)}$`;

    }
    function borrarItemCarrito(event) {
        const buttonClicked = event.target;
        buttonClicked.closest('.itemCarrito').remove();
        actualizarPrecioTotalCarrito();
    }
    function elementoCantidad(event){
        const input = event.target;
        input.value <= 0 ? input.value = 1 : null;
        actualizarPrecioTotalCarrito();
    }
    function comprarButtonClicked(){
        containerCarritoItems.innerHTML = ``;
        actualizarPrecioTotalCarrito();
        compraFinalizada();
    }
})



