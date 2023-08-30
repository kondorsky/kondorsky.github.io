import "./style.css";
import smartphone from "./smart.webp";

document.querySelector("#app").innerHTML = `
<div class="container">
        <div class="product">
            <div class="product-image">
                <img src="${smartphone}" alt="Product Image">
            </div>
            <div class="product-details">
                <h1 class="product-title">Smartphone XYZ</h1>
                <p class="product-price">$499.99</p>
                <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor justo at ex pellentesque, eu bibendum urna aliquet.</p>
                <a href="#" data-attr="add-to-cart" class="btn">Add to Cart</a>
            </div>
        </div>
    </div>
`;
