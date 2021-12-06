//---------- Import and display articles -------------------//

// GET request to retrieve products from the API
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })

    /* Retrieving the response sent
    Function that will display objects in the DOM automatically */
    .then(function (items) {
        console.log(items);

        //Loop to display each item of all products
        for (let article of items) {
            displayProduct(article);
            console.log(article);
        }
    })
    //Catch the rejected promise and display error message
    .catch(function (err) {
        console.log("Fetch Failed", err);
        let items = document.querySelector("#items");
        items.innertHTML = "Display temporarily unavailable. Please come back later.";
    });


/* --- Information function of each product
Create the html elements and put the data inside --- */

function displayProduct(article) {
    /* Setting the 'href' attribute of the 'a' tag
     --- with ID for retrieving the article from the product page --- */
    let productLink = document.createElement("a");
    document.querySelector(".items").appendChild(productLink);
    productLink.href = `product.html?id=${article._id}`;

    let itemArticle = document.createElement("article");
    productLink.appendChild(itemArticle);

    // show image and alternative text

    let productImg = document.createElement("img");
    itemArticle.appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Product name display
    let productName = document.createElement("h3");
    itemArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = article.name;

    // display product description
    let productDescription = document.createElement("p");
    itemArticle.appendChild(productDescription);
    productDescription.classList.add("productDescription");
    productDescription.innerHTML = article.description;
}





