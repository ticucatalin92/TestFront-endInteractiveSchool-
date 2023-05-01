//------ Variables------
// url list start
const urlRotatorCarouselData = "https://dummyjson.com/products/?limit=4";
const urlHeroCarouselData = "./src/js/data/marketingCollection.json";
const urlScrollerCarouselData = "https://dummyjson.com/products/?limit=10";

//url list end

gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

document.addEventListener("DOMContentLoaded", () => {
  // hide warning message if javascript is enabled
  document.getElementById("no-js").classList.add("m-hide");

  //Create Hero Carousel
  getDataHeroCarousel();

  // //Create Scroller Carousel
  getDataForCarouselScroller();

  //Create Rotator Carousel
  getDataRotatorCarousel();

  //Scroll to top
  let scrollToTopArrow = document.getElementById("goToTop");
  scrollToTopArrow.addEventListener("click", goToTop);
});

//HERO CAROUSEL START
export function getDataHeroCarousel() {
  let data = [];

  fetch(urlHeroCarouselData)
    .then((res) => res.json())
    .then((json) => {
      data = Object.assign([], json);
      heroCarouselGetRandomElements(data);
    });
}
//take 3 random elements from list
function heroCarouselGetRandomElements(dataToReceive) {
  const dataList = Object.assign([], dataToReceive);
  let randomListElements;
  randomListElements = dataList
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  buildHeroCarousel(randomListElements);
}

// create the Hero carousel
function buildHeroCarousel(dataToReceive) {
  const dataList = Object.assign([], dataToReceive);

  let onMobile = checkMobile();
  let heroNumberOfSlides;
  let heroInner;
  let hero;
  let heroUl;
  let heroSlide;
  if (onMobile) {
    hero = document.getElementById("hero");
    hero.classList.add("swiffy-slider");
    heroUl = document.createElement("ul");
    heroUl.classList.add("slider-container");
    hero.appendChild(heroUl);
  } else {
    heroNumberOfSlides = dataList.length;
    heroInner = document.getElementById("heroInner");
    heroInner.style.width = heroNumberOfSlides * 100 + "vw";
  }

  for (let i = 0; i <= dataList.length - 1; i++) {
    if (dataList[i].title != "") {
      if (onMobile) {
        heroSlide = document.createElement("li");
      } else {
        heroSlide = document.createElement("div");
      }
      heroSlide.classList.add("hero-slide", "slide" + i);

      let heroImage = document.createElement("img");
      heroImage.setAttribute("data-src", dataList[i].image);
      heroImage.classList.add("hero-image", "lazyload");
      heroSlide.appendChild(heroImage);

      let heroTitle = document.createElement("h1");
      heroTitle.innerHTML = dataList[i].title;
      heroTitle.classList.add("hero-title", "truncate-text");
      heroSlide.appendChild(heroTitle);

      let heroDescription = document.createElement("span");
      heroDescription.innerHTML = dataList[i].description;
      heroDescription.classList.add("hero-description", "truncate-text");
      heroSlide.appendChild(heroDescription);

      let downArrow = document.createElement("span");
      downArrow.innerHTML = "&#8595;";
      downArrow.classList.add("hero-down-arrow");
      heroSlide.append(downArrow);
      heroSlide.addEventListener("click", goToScrollerSection);
      if (onMobile) {
        heroUl.appendChild(heroSlide);
      } else {
        heroInner.appendChild(heroSlide);
      }
    }
  }
  // horizontal scroll -- start
  if (!onMobile) {
    const container = document.querySelector("#heroInner");
    const sections = gsap.utils.toArray("#heroInner .hero-slide");

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        end: "+=" + sections.length * 1000,
      },
    });
  }
  // horizontal scroll -- end
}
//HERO CAROUSEL END

// SCROLLER CAROUSEL START
// get data for scroller carousel
export function getDataForCarouselScroller() {
  let data = [];
  fetch(urlScrollerCarouselData, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      data = Object.assign([], json);
      scrollerCarouselBuild(data.products);
    });
}
//build scroller carousel
function scrollerCarouselBuild(scrollerData) {
  let listOfItems = Object.assign([], scrollerData);
  let scroller = document.getElementById("scroller");

  for (let i = 0; i < listOfItems.length; i++) {
    let scrollerSlide = document.createElement("div");
    scrollerSlide.classList.add("scroller-slide", "slide" + i);

    let scrollerImage = document.createElement("img");
    scrollerImage.setAttribute("data-src", listOfItems[i].thumbnail);
    scrollerImage.classList.add("scroller-image", "lazyload");
    scrollerSlide.appendChild(scrollerImage);

    let scrollerSlideTitle = document.createElement("h2");
    scrollerSlideTitle.innerHTML = listOfItems[i].title;
    scrollerSlideTitle.classList.add("scroller-slide-title");
    scrollerSlide.appendChild(scrollerSlideTitle);

    scroller.appendChild(scrollerSlide);
  }
  // stick the title for scroller
  tl.to(".scroller-title", {
    duration: 8,
    scrollTrigger: {
      trigger: "#scroller",
      start: "top top",
      end: "bottom top",
      scrub: 4,
      pin: ".scroller-title",
      pinSpacing: false,
      markers: false,
    },
  });
  // end
}
// SCROLLER CAROUSEL END

// ROTATOR CAROUSEL START
function getDataRotatorCarousel() {
  let data = [];
  fetch(urlRotatorCarouselData, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      data = Object.assign([], json);
      rotatorCarouselBuild(data.products);
    });
}

function rotatorCarouselBuild(rotatorData) {
  let listOfItems = Object.assign([], rotatorData);

  //left side variables
  let indexAnimation = document.getElementById("indexAnimation");
  let rotatorIndex;
  let dotsList = document.getElementById("dotsList");

  // right side variables
  let colImages = document.getElementById("colImages");

  for (let i = 0; i < listOfItems.length; i++) {
    //left side start
    rotatorIndex = document.createElement("div");
    rotatorIndex.classList.add("rotator-index");

    let rotatorIndexDescription = document.createElement("p");
    rotatorIndexDescription.classList.add("rotator-index-description");
    rotatorIndexDescription.innerHTML = listOfItems[i].description;
    rotatorIndex.appendChild(rotatorIndexDescription);

    let rotatorIndexNumberBox = document.createElement("div");
    rotatorIndexNumberBox.classList.add("rotator-index-number-box");
    rotatorIndex.appendChild(rotatorIndexNumberBox);

    let rotatorIndexNumber = document.createElement("span");
    rotatorIndexNumber.classList.add("rotator-index-number");
    rotatorIndexNumber.innerHTML = i + 1;
    rotatorIndexNumberBox.appendChild(rotatorIndexNumber);

    let rotatorIndexNumberLine = document.createElement("div");
    rotatorIndexNumberLine.classList.add("rotator-index-number-line");
    rotatorIndexNumberBox.appendChild(rotatorIndexNumberLine);

    let rotatorIndexLength = document.createElement("span");
    rotatorIndexLength.classList.add("rotator-index-length");
    rotatorIndexLength.innerHTML = listOfItems.length;
    rotatorIndexNumberBox.appendChild(rotatorIndexLength);

    indexAnimation.appendChild(rotatorIndex);

    let dot = document.createElement("li");
    dot.innerHTML = "&#x2022;";
    dotsList.appendChild(dot);

    //left side end

    //right side start
    let rotatorSlide = document.createElement("div");
    rotatorSlide.classList.add("rotatorSlide");

    let rotatorSlideInner = document.createElement("div");
    rotatorSlideInner.classList.add("rotatorSlideInner");

    let rotatorText = document.createElement("div");
    rotatorText.classList.add("rotator-text");

    let rotatorTextTitle = document.createElement("div");
    rotatorTextTitle.classList.add("index");
    rotatorTextTitle.innerHTML = listOfItems[i].title;
    rotatorText.appendChild(rotatorTextTitle);

    let rotatorTextArrow = document.createElement("div");
    rotatorTextArrow.classList.add("rotator-text-arrow");
    rotatorTextArrow.innerHTML = "&#8594;";
    rotatorTextArrow.addEventListener("click", gotoNewLink);
    rotatorText.appendChild(rotatorTextArrow);

    rotatorSlideInner.appendChild(rotatorText);

    let rotatorImgSlide = document.createElement("div");
    rotatorImgSlide.classList.add("rotator-img", "slide" + i);

    let rotatorImg = document.createElement("img");
    rotatorImg.setAttribute("data-src", listOfItems[i].thumbnail);
    rotatorImg.classList.add("lazyload");
    rotatorImgSlide.appendChild(rotatorImg);

    rotatorSlideInner.appendChild(rotatorImgSlide);
    rotatorSlide.appendChild(rotatorSlideInner);

    colImages.appendChild(rotatorSlide);

    // //right side ends
  }

  // stick the title for rotator carousel
  tl.to(".rotator-title", {
    duration: 8,
    scrollTrigger: {
      trigger: "#rotator",
      start: "top top",
      end: "bottom top",
      scrub: 4,
      pin: ".rotator-title",
      pinSpacing: false,
      markers: false,
    },
  });
  // end
  // animate the rotator inner
  tl.to(".colTextContainer", {
    duration: 8,
    scrollTrigger: {
      trigger: "#rotatorInner",
      start: "top 80px",
      end: "bottom top",
      scrub: 4,
      pin: ".colTextContainer",
      pinSpacing: false,
      markers: false,
    },
  });
}

// ROTATOR CAROUSEL END

//Go to scroller carousel section from Hero Section
function goToScrollerSection() {
  let pointToScrollTo = document.getElementById("scroller");
  pointToScrollTo.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToTop() {
  let pointToHero = document.getElementById("hero");
  pointToHero.scrollIntoView({ behavior: "smooth", block: "start" });
}

// to check if the user is on mobile device
function checkMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function gotoNewLink() {
  window.open("https://www.google.com/", "_blank");
}
