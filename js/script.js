const fileInput = document.getElementById("image-collector"),
    chooseImg = document.querySelector(".preview"),
    previewImg = document.querySelector("img"),
    uploadStyles = document.getElementById("uploadStyles"),
    filterOptions = document.querySelectorAll(".keys .key"),
    filterName = document.getElementById("filterName"),
    filterAmount = document.getElementById("filterValue"),
    rotateBtn = document.querySelectorAll(".rotate"),
    reset = document.getElementById("reset"),
    save = document.getElementById("save"),
    canvasHide = document.querySelector("canvas")
    range = document.getElementById("range");

let brightness = "100",
    contrast = "100",
    saturation = "100",
    sepia = "0",
    grayscale = "0";
let rotate = 0;
const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg)`;
    previewImg.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)  sepia(${sepia}%) grayscale(${grayscale}%)`;
}
const loadImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.style.height = "100%";
    uploadStyles.style.display = "none";
    document.querySelector(".keypad").classList.remove("disable");
    document.querySelector(".slider").classList.remove("disable");
    
}
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".keys .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if (option.id === "brightness") {
            range.max = "200";
            range.value = brightness;
            filterAmount.innerText = `${brightness}%`;
            range.style.display = "block";
        }
        else if (option.id === "contrast") {
            range.max = "200";
            range.value = contrast;
            filterAmount.innerText = `${contrast}%`;
            range.style.display = "block";
        }
        else if (option.id === "saturation") {
            range.max = "200";
            range.value = saturation;
            filterAmount.innerText = `${saturation}%`;
            range.style.display = "block";
        }
        else if (option.id === "sepia") {
            range.max = "100";
            range.value = sepia;
            filterAmount.innerText = `${sepia}%`;
            range.style.display = "block";
        }
        else if(option.id === "grayscale") {
            range.max = "100";
            range.value = grayscale;
            filterAmount.innerText = `${grayscale}%`;
            range.style.display = "block";

        }
        else{
            filterName.innerText=" "
            filterAmount.innerText = " ";
            range.style.display = "none";
        }
    });
});
const updateFilterValue = () => {
    filterAmount.innerText = `${range.value}%`;
    const selectedFilter = document.querySelector(".keys .active")
    if (selectedFilter.id === "brightness") {
        brightness = range.value;

        
    }
    else if (selectedFilter.id === "contrast") {
        contrast = range.value;
    }
    else if (selectedFilter.id == "saturation") {
        saturation = range.value;
    }
    else if (selectedFilter.id === "sepia") {
        sepia = range.value;
    }
    else{
        grayscale = range.value;
    }
    applyFilter();
}
rotateBtn.forEach(buttons => {
    buttons.addEventListener("click", () => {
        if (buttons.id === "left") {
            rotate -= 90;
            range.style.display = "none";
        } else if (buttons.id === "right") {
            rotate += 90;
            range.style.display = "none";
        }
        applyFilter();
    });
   
});
const resetFilter = () => {
    if (confirm("Are you sure to reset all?") !== false) {
        brightness = "100"; saturation = "100"; contrast = "100"; sepia = "0"; grayscale = "0";
        rotate = 0;
        filterOptions[0].click();
        applyFilter();
        range.style.display = "none";
    }else{
        return;
    }



}
const saveImg = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)  sepia(${sepia}%) grayscale(${grayscale}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    document.body.appendChild(canvas);
    canvas
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
       
    link.click();
    canvasHide.style.display ="none";
}
save.addEventListener("click", saveImg);
reset.addEventListener("click", resetFilter);
range.addEventListener("input", updateFilterValue);
fileInput.addEventListener("change", loadImg);
chooseImg.addEventListener("click", () => fileInput.click())