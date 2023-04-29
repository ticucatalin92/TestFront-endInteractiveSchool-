gsap.registerPlugin(ScrollTrigger);

export function getDataForCarouselScroller() {
  let data = [];
  const url = "https://dummyjson.com/products/?limit=10";
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      data = Object.assign([], json);
      scrollerCarouselBuild(data.products);
    });
}

function scrollerCarouselBuild(receivedData) {
  let listOfItems = Object.assign([], receivedData);
  let carouselList = document.getElementById("scrollerContainerBody");

  let carouselTitleBox = document.createElement("section");
  carouselTitleBox.classList.add("carouselTitleSection");
  carouselTitleBox.setAttribute("id", "carouselTitleSection");

  let carouselTitle = document.createElement("h1");
  carouselTitle.classList.add("pin-me");
  carouselTitle.innerHTML = "Carousel Scroller";

  carouselTitleBox.appendChild(carouselTitle);
  carouselList.appendChild(carouselTitleBox);

  for (let i = 0; i < listOfItems.length - 1; i++) {
    let carouselSection = document.createElement("section");
    carouselSection.classList.add("scrollerContainerListItem");

    let carouselImage = document.createElement("img");
    carouselImage.src = listOfItems[i].thumbnail;
    carouselImage.classList.add("listItemImage");

    let carouselTitle = document.createElement("h2");
    carouselTitle.innerHTML = listOfItems[i].title;
    carouselTitle.classList.add("listItemTitle");
    if (i == 0) {
      carouselTitle.setAttribute("id", "firstCarouselTitleElement");
    }

    carouselSection.appendChild(carouselImage);
    carouselSection.appendChild(carouselTitle);

    carouselList.appendChild(carouselSection);
  }
}
