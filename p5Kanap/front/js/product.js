//---------------- Product display management -------------------//

// Retrieving the query string from the URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

// Method of extraction of the Id by a constructor
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);
// Retrieving the item id in the URL
const idItems = urlSearchParams.get("id");
console.log(idItems);

// Positioning the object in the DOM
const positionElement = document.querySelector(".item");
console.log(positionElement);


// Retrieving an API article with its Id
fetch("http://localhost:3000/api/products/" + idItems)
    .then(function (res) {
        return res.json();
    })

    // Item information retrieval function
    .then(function (article) {
        displayProduct(article);

    })

    // Error display function if the promise is rejected
    .catch((error) => {
        console.log(error, "Fetch failed");
        let items = document.querySelector(".item");
        items.innertHTML = "Product temporarily unavailable. Please come back later.";
    });


// Creation of the article data display function
function displayProduct(article) {

    // Image display of the selected item
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Display of the name of the selected item
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Display of the name in the page tab
    let productsName = document.getElementById('titles');
    productsName.innerHTML = article.name;

    // Displays the price of the chosen item
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Displays the description of the chosen item
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Selection of the choice of the color of the article
    for (let colors of article.colors) {
        console.log(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    };
}


//------------------------- Shopping cart management --------------------------------//


// Select button to add to cart
const addToCart = document.getElementById("addToCart");
console.log(addToCart);

// Retrieval function of an article declared in the local storage
function getCart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
        items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
}
/*--- JSON.parse to convert data to JSON format
----- which are in the local storage in JavaScript object ---*/


// Selection of quantity in a function
function quantityValue() {
    let quantity = document.getElementById("quantity");
    return quantity.value;
}

// Selection of color in a function
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}



//Window of confirmation of selected options
const confirmationWindow = () => {
    if (window.confirm(`Your color selection: ${colorValue()} in quantity of: ${quantityValue()} added in your cart. \n Consult the basket OK, return to home Cancel`)) {
        window.location.href = "cart.html";
    } else {
        window.location.href = "index.html";
    }
}

/**
 * Add to cart function depending on the options with grouping of items
 * @param { String } productId (id of selected product)
 * @param { String } color (selected color option)
 * @param { number } quantity (quantity of selected products)
 */
function itemInCart(productId, color, quantity) {
    //if (quantity == 0 || color == 0) {
    if ((color == 0) || ((quantity == null) || (quantity < 1) || (quantity > 100))) {
        window.alert("Please select a color and quantity between min: 1 and max: 100 for your sofa, thank you.");
        return;
    }
    let items = getCart();
    if (items.length == 0) {
        items.push({ "productId": productId, "color": color, "quantity": quantity });
        confirmationWindow();

    } else {
        let found = false;
        for (let i = 0; i < items.length; i++) {
            /* If item with the same id / color already present in local storage
        we just increase the quantity */
            if (productId === items[i].productId && color === items[i].color) {
                found = true;
                items[i].quantity += quantity;
                confirmationWindow();
            }
        }
        if (found == false) {
            let item = {
                "productId": productId, "color": color, "quantity": quantity
            };
            // Method of adding the object to the table with the options selected
            items.push(item);
            confirmationWindow();
        }
    }
    // Transformation in JSON format and send to the local storage key

    localStorage.setItem("cart", JSON.stringify(items));
}


// Listen to the button and sends to the basket of the chosen options
addToCart.addEventListener("click", () => {
    let quantity = parseInt(quantityValue());  //Convert the string and return an integer
    let color = colorValue();
    itemInCart(idItems, color, quantity);
});