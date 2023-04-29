import {getDataHeroCarousel}from "./components/heroCarousel.js";
import {getDataForCarouselScroller} from "./components/scrollerCarousel.js";
document.addEventListener("DOMContentLoaded", () => {
    // hide warning message if javascript is enabled
    document.getElementById("no-js").classList.add("m-hide");

    //Create Hero Carousel
    getDataHeroCarousel();

    //Create Scroller Carousel
    getDataForCarouselScroller();
});
