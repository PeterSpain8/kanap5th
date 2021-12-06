//----------------- Cart Recovery -----------------------//

// Declaration of items contained in local storage
let cartItem = JSON.parse(localStorage.getItem("cart"));
console.log(cartItem);

// Selecting the class where to inject the elements
const positionItems = document.querySelector("#cart__items");


// If the cart is empty: display the empty cart
if (cartItem === null || cartItem == 0) {
  const emptyCart = document.querySelector("#cart__items");
  emptyCart.innerText = "Your cart is empty.";
  console.log(emptyCart);
  // Hide the user information entry form
  document.querySelector(".cart__order").style.display = "none";

  // If the cart is not empty, display of items
} else {
  for (i = 0; i < cartItem.length; i++) {
    let items = cartItem[i];
    // Call to API operation of target index item in loop and received
    fetch("http://localhost:3000/api/products/" + cartItem[i].productId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(items);
        positionItems.appendChild(displayItem(data, items.color, items.quantity));
        displayTotalPrice(data.price * items.quantity);
        changeQuantity();
        deleteProduct();
      })
  }
};


//--------- Events on cart items -----------------//

/**
 * Calculation of the total cart price
 * @param { number } price
 * Displays the result of the conversion as a number  
 */
function displayTotalPrice(price) {
  let divTotalPrice = document.querySelector("#totalPrice");
  //console.log(parseFloat(divTotalPrice.textContent));
  divTotalPrice.textContent = parseFloat(divTotalPrice.textContent) + price;
};


// Calculation of the number of items in the cart
let arrayQuantities = [];
if (cartItem === null || cartItem == 0) {
  console.log("Cart is empty");
} else {
  for (let items of cartItem) {
    let ItemQuantity = + items.quantity;
    arrayQuantities.push(ItemQuantity);
  }
  console.log(arrayQuantities);
  // Accumulator function application method
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let totalQuantityCart = arrayQuantities.reduce(reducer);
  document.querySelector("#totalQuantity").innerHTML = totalQuantityCart;
}


// Removing an Item from the Cart

function deleteProduct() {
  // Selecting the delete buttons to listen to
  let deleteBtn = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();
      // Method to target product id and color 
      let selectProd = deleteBtn[k].closest("article");
      let selectIdItem = selectProd.dataset.id;
      console.log(selectIdItem);
      let selectColorItem = selectProd.dataset.color;
      console.log(selectColorItem);
      // Method returns new array containing the elements that meet the filter condition
      cartItem = cartItem.filter(el => el.productId !== selectIdItem || el.color !== selectColorItem);
      console.log(cartItem);
      // Return of the new basket to local storage
      localStorage.setItem("cart", JSON.stringify(cartItem));

      location.reload();
    })
  }
}


// Changing the quantity of an item

function changeQuantity() {
  // Selection of inputs to listen to
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  // Method to target product id and color
  itemQuantity.forEach((itemQty) => {
    let articleQty = itemQty.closest("article");
    let articleQtyId = articleQty.dataset.id;
    console.log(articleQtyId);
    let articleQtyColor = articleQty.dataset.color;
    console.log(articleQtyColor);
    // Modification event to listen to quantity change
    itemQty.addEventListener("change", () => {
      let newQantity = Number(itemQty.value);
      /* Callback function for each item in the cart
      --- at the change we increment the quantity of the element of these id && color */
      cartItem.forEach((element) => {
        if (element.productId == articleQtyId && element.color == articleQtyColor) {
          element.quantity = newQantity;
        }
      });
      // Return of the new basket to local storage
      localStorage.setItem("cart", JSON.stringify(cartItem));
      window.location.reload();
    });
  });
}


//----------------- Order form -------------------------------//

// Select button to send the form
const orderButton = document.querySelector("#order");

// Add event listener
orderButton.addEventListener("click", (e) => {
  e.preventDefault();


  /* Create a class to craft the item
  in which the values ​​of the form to be controlled will go */
  class Formulaire {
    constructor() {
      this.prenom = document.querySelector("#firstName").value;
      this.nom = document.querySelector("#lastName").value;
      this.adresse = document.querySelector("#address").value;
      this.ville = document.querySelector("#city").value;
      this.email = document.querySelector("#email").value;
    }
  }
  // Calling the Form Class Instance to Create the Contact Object
  const contact = new Formulaire();


  // Building an array of strings from local storage
  let idProducts = [];
  for (let i = 0; i < cartItem.length; i++) {
    idProducts.push(cartItem[i].productId);
  }
  console.log(idProducts);


  //-------- Form validation management 

  // Entry control function according to regEx

  // Firstname / lastname / city search mask
  const regExNameCity = (value) => {
    return /^[A-Za-zÀ-ÿ ,.'-]{3,20}$/.test(value)
  }
  // Search reason for address
  const regExAddress = (value) => {
    return /^([a-zA-ZÀ-ÿ,-. ]{1,}|[0-9]{1,4})[ ].{1,}$/.test(value)
  }
  // Email search mask
  const regExEmail = (value) => {
    return /^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value)
  }


  //-------- Form field input functions
  function firstNameCheck() {
    const lePrenom = contact.prenom;
    if (regExNameCity(lePrenom)) {
      firstNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "Please enter only letters without accent, minimum of 3";
      return false;
    };
  }

  function lastNameCheck() {
    const leNom = contact.nom;
    if (regExNameCity(leNom)) {
      lastNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "Please enter only letters without accent, minimum of 3";
      return false;
    };
  }

  function addressCheck() {
    const leAddress = contact.adresse;
    if (regExAddress(leAddress)) {
      addressErrorMsg.innerHTML = " ";
      return true;
    } else {
      addressErrorMsg.innerHTML = "Please, enter correct adress";
      return false;
    };
  }

  function cityCheck() {
    const laVille = contact.ville;
    if (regExNameCity(laVille)) {
      cityErrorMsg.innerHTML = " ";
      return true;
    } else {
      cityErrorMsg.innerHTML = "Please enter a city";
      return false;
    };
  }

  function eMailCheck() {
    const leMail = contact.email;
    if (regExEmail(leMail)) {
      console.log("ok");
      emailErrorMsg.innerHTML = " ";
      return true;

    } else {
      console.log("ko");
      emailErrorMsg.innerHTML = "Invalid email";
      return false;
    };
  }


  // Form validity check before sending to local storage
  if (firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && eMailCheck()) {
    // Put the object in the local storage
    //localStorage.setItem("contact", JSON.stringify(contact));
    // Put the values ​​of the form and the products of the cart in an object to send to the server
    const order = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      },
      products: idProducts,
    }
    console.log("Envoyer", order);

    sendToServer(order);
  } else {
    return false;
  };
});


/* Command sending function with the POST method
JSON request containing the contact object and product table (order) */
function sendToServer(order) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      'Accept': "application/json",
      "Content-type": "application/json",
    },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    // Retrieving the response sent
    .then(function (content) {
      console.log("CONTENT", content);
      // Redirection to the confirmation page + command id in URL parameter
      window.location = "confirmation.html?id=" + content.orderId;
    })
    .catch(function (error) {
      alert(`Error in ${error}`);
    });
}

