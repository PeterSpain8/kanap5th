/**
 * Display in the DOM of the products in the cart
 * @param { String } data (retrieving item information)
 * @param { String } color (color selection)
 * @param { number } quantity (number of the same item)
 * @return { Promise } productArticle (product to insert in the DOM)
 */

function displayItem(data, color, quantity) {

    // Creation of the "article" element containing the data-id
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', data._id);
    productArticle.setAttribute('data-color', color);

    // Creating a "div" child element for the image
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion of image and alt text
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = data.imageUrl;
    productImg.alt = data.altTxt;

    // Creation of a "div" child element for the information of the object
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Creation of a child element "div" for name / color / price
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";

    // Product name display
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = data.name;

    // Display of product color choice
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = color;
    productColor.style.fontSize = "18px";

    // Product price display
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    let price = data.price * quantity;
    productPrice.innerHTML = price + " €";
    console.log(productPrice);

    // Child element creation for quantity / deletion
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Child element creation for quantity
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    // Display of the selected quantity
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Quantity : ";

    // Création des options pour le choix de la quantité affichée
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Creation of a "div" for the possibility of deletion
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Creation of the deletion element of a product
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Remove Item";

    return productArticle;
};

