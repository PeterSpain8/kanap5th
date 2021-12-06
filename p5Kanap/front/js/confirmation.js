//--------Display of the order id -----------------//

// Retrieving the url of the confirmation page
const confirmationPage = window.location.href;
const orderConfirm = new URL(confirmationPage);

// Retrieving the command id present in the specific url
const getResponseId = orderConfirm.searchParams.get("id");
// Injecting the id into the DOM
document.querySelector("#orderId").innerText = getResponseId;

// Dump data from local storage
localStorage.removeItem("cart");

