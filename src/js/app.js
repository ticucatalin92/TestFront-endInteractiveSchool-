import {getDataHeroCarousel}from "./components/heroCarousel.js";
document.addEventListener("DOMContentLoaded", () => {
    // hide warning message if javascript is enabled
    document.getElementById("no-js").classList.add("m-hide");

    //Create Hero Carousel
    getDataHeroCarousel();
});
