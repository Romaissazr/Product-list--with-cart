let desserts = [];
let btns = document.getElementById("btns");

function addToCart(name, price, event) { 
 
    let addCart = event.currentTarget;


    let dessertNameCard = name.replace(/\s+/g, '-');

    addCart.style.display = "none"; 

 
    let card = addCart.closest('#card'); 
    card.classList.add("two", dessertNameCard); 
    let countCart = card.querySelector('#countCart');
    countCart.style.display = "flex"; 


    let quantityElement = countCart.querySelector('#score'); 
    let quantity = parseInt(quantityElement.textContent); 

  
    let decrement = countCart.querySelector('#decrement');
    decrement.addEventListener('click', () => decrementQuantity(name, quantityElement));

    let increment = countCart.querySelector('#increment');
    increment.addEventListener('click', () => incrementQuantity(name, quantityElement));

   
    let existingItem = desserts.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity; 
    } else {
        let dessert = { name: name, price: price, quantity: quantity };
        desserts.push(dessert); 
    }

    updateCartDisplay(); 
}
function removeIteem(name) {
    let itemIndex = desserts.findIndex(item => item.name === name);
    
    if (itemIndex !== -1) {
        desserts.splice(itemIndex, 1);

       
        let formattedName = name.replace(/\s+/g, '-');
       

        let cards = document.querySelectorAll('#card');
        let found = false;

        cards.forEach(card => {
            console.log("Checking card:", card); 


            if (card.classList.contains(formattedName)) {
                console.log("Found matching card for:", name);
                found = true;

                let addCart = card.querySelector('#addCart'); 

                if (addCart) {
                    console.log("Showing Add to Cart button for:", name); 
                    addCart.style.display = "flex";  
                } 

                card.classList.remove("two", formattedName);

            
                let countCart = card.querySelector('#countCart');
                if (countCart) {
                    countCart.style.display = "none"; 
                } else {
                    console.error("Count cart not found in card:", card);
                }
            }
        });

     

      
        updateCartDisplay();
    }
}



function updateDessertQuantity(name, quantity) {
    let existingItem = desserts.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity = quantity; 
    }
}

function decrementQuantity(name, quantityElement) {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) { 
        quantity--; 
        quantityElement.textContent = quantity; 
        updateDessertQuantity(name, quantity); 
    }
    updateCartDisplay(); 
}

function incrementQuantity(name, quantityElement) {
    let quantity = parseInt(quantityElement.textContent); 
    quantity++; 
    quantityElement.textContent = quantity;
    updateDessertQuantity(name, quantity); 
    updateCartDisplay(); 
}

function updateCartDisplay() {
    let cartContainer = document.getElementById('cart');
    let countElement = document.getElementById('count');
    let imgElement = document.getElementById('img');

    let ordersContainer = cartContainer.querySelector('.orders') || document.createElement('div');
    ordersContainer.classList.add('orders');
    ordersContainer.innerHTML = '';

    let totalAmount = 0;

    desserts.forEach(function(item) {
        totalAmount += item.price * item.quantity; 

        let orderElement = document.createElement('div');
        orderElement.innerHTML = `
            <h5>${item.name}</h5>
            <div class="txt">
                <p><span>${item.quantity}x</span> <span>@$${item.price.toFixed(2)}</span><span> @$${(item.price * item.quantity).toFixed(2)}</span></p>
                <img src="assets/images/icon-remove-item.svg" alt="" onclick="removeIteem('${item.name}')">
            </div>
            <hr>
        `;
        ordersContainer.appendChild(orderElement);
    });

    countElement.textContent = desserts.length; 
    imgElement.style.display = desserts.length ? 'none' : 'flex'; 
    btns.style.display = desserts.length ? 'block' : 'none';

    if (desserts.length > 0) {
        let totalElement = document.createElement('div');
        totalElement.classList.add('txt', 'last');
        totalElement.innerHTML = `
            <p>Order Total</p>
            <h2>$${totalAmount.toFixed(2)}</h2>
        `;
        ordersContainer.appendChild(totalElement);
    }

    cartContainer.appendChild(ordersContainer);

    if (desserts.length === 0) {
        btns.style.display = "none"; 
        imgElement.style.display = "flex"; 
    }
}
