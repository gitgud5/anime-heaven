import "./styles.css"
// Get the necessary DOM elements
const img_container = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Array of types
let type = ["waifu", "husbando", "neko", "slap", "highfive"];

// Initial URL for fetching images
var url = `https://nekos.best/api/v2/${type[4]}?amount=${10}`;

// Initialize variables
var images = [];
var result = false;
var loaded_img = 0;
var total_img = 0;

// Radio buttons event listener, this is used for changing category
function changeImages(event) {
  //   The best way to delete the HTML children, KILL THEM ALL :)
  img_container.innerHTML = "";

  images = [];
  console.log(Number(event.target.value));
  // Update URL based on selected type
  url = `https://nekos.best/api/v2/${
    type[Number(event.target.value)]
  }?amount=${10}`;
  getImages();
}

// Attaching eventListener to radio buttons using event delegation (Handling event
// bubbling is called event delegation). Also to stop event bubbling we use
// event.stopPropagation();
document.getElementById("radio-butts").addEventListener("change", changeImages);

// Image load event listener
function imgload() {
  loaded_img++;
  console.log(`LOADED_IMG ${loaded_img}`);
  // Check if all images have been loaded
  if (loaded_img === total_img) {
    result = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes to elements
function setattributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display images in the container
function displayImages() {
  loaded_img = 0;
  total_img = images.length;
  images.forEach((element) => {
    // Create img element
    let img = document.createElement("img");
    // Create anchor element
    let a = document.createElement("a");

    // Set attributes of anchor tag
    setattributes(a, { href: element.url, target: "_blank" });

    // Set attributes of image tag
    img.setAttribute("src", element.url);
    img.setAttribute("title", element.anime_name);

    // Add load event listener to the image
    img.addEventListener("load", imgload);
    // Append the image inside the anchor tag
    a.appendChild(img);

    // Append the anchor tag inside the image container
    img_container.appendChild(a);
  });
}

// Fetch images from the server
async function getImages() {
  let img = await fetch(url);
  let img_resolve = await img.json();
  images = img_resolve.results;
  console.log(images);
  displayImages();
}

// Infinite scroll event listener
window.addEventListener("scroll", () => {
  console.log(result);

  // Check if the user has scrolled to the bottom of the page and if the 'result' flag is true
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    result
  ) {
    result = false; // Set the flag to false to prevent multiple simultaneous requests

    // Trigger the function to fetch more images
    getImages();
  }
});

// Initial fetch and display of images
getImages();
