//your code here
//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const result = document.getElementById("para");

const images = [
    "https://picsum.photos/id/101/200",
    "https://picsum.photos/id/102/200",
    "https://picsum.photos/id/103/200",
    "https://picsum.photos/id/104/200",
    "https://picsum.photos/id/105/200"
];

let selectedImages = [];

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Generate Images
function loadImages() {
    imageContainer.innerHTML = "";

    selectedImages = [];
    result.textContent = "";

    resetBtn.style.display = "none";
    verifyBtn.style.display = "none";

    let imageSet = [...images];

    // Random duplicate image
    const duplicateIndex = Math.floor(Math.random() * images.length);
    imageSet.push(images[duplicateIndex]);

    shuffle(imageSet);

    imageSet.forEach((src, index) => {
        const img = document.createElement("img");

        img.src = src;
        img.dataset.value = src;
        img.classList.add(`img${index + 1}`);

        img.addEventListener("click", selectImage);

        imageContainer.appendChild(img);
    });
}

// Select image
function selectImage() {

    if (selectedImages.length >= 2) return;

    if (selectedImages.includes(this)) return;

    this.classList.add("selected");
    selectedImages.push(this);

    resetBtn.style.display = "inline-block";

    if (selectedImages.length === 2) {
        verifyBtn.style.display = "inline-block";
    }
}

// Reset
resetBtn.addEventListener("click", () => {
    loadImages();
});

// Verify
verifyBtn.addEventListener("click", () => {

    verifyBtn.style.display = "none";

    const first = selectedImages[0].dataset.value;
    const second = selectedImages[1].dataset.value;

    if (first === second) {
        result.textContent =
            "You are a human. Congratulations!";
    } else {
        result.textContent =
            "We can't verify you as a human. You selected the non-identical tiles.";
    }
});

// Initial Load
loadImages();