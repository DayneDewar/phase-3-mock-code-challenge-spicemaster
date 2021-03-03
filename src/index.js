const spiceDetail = document.querySelector('div#spice-blend-detail');
const spiceImg = spiceDetail.querySelector('img.detail-image');
const spiceHeader = spiceDetail.querySelector('h2.title');
const ingredientsList = spiceDetail.querySelector('ul.ingredients-list');
const spiceForm = document.querySelector('form#update-form');
const ingredientForm = document.querySelector('form#ingredient-form');
const spiceImages = document.querySelector('div#spice-images');

function addIngredients(ingredient) {
    const li = document.createElement('li');
        li.innerText = ingredient;
        ingredientsList.append(li);
}

function renderSpice(spice) {
    spiceForm.dataset.id = spice.id;
    ingredientForm.dataset.id = spice.id;
    spiceImg.src = spice.image;
    spiceImg.alt = spice.title;
    spiceHeader.innerText = spice.title;
    spice.ingredients.forEach(ingredient => addIngredients(ingredient.name))
}

function renderFirstSpice () {
    fetch('http://localhost:3000/spiceblends/1')
        .then(resp => resp.json())
        .then(spice => renderSpice(spice))
}

spiceForm.addEventListener('submit', event => {
    event.preventDefault();

    const title = event.target.title.value;

    fetch('http://localhost:3000/spiceblends/1', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({title})
    })
    .then(resp => resp.json())
    .then(newTitle => {
        spiceHeader.innerText = newTitle.title
    })
        event.target.reset();
})

ingredientForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = event.target.name.value;
    const spiceblendId = parseInt(event.target.dataset.id);

    fetch('http://localhost:3000/ingredients/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name, spiceblendId})
    })
    .then(resp => resp.json())
    .then(newData => {
        addIngredients(newData.name)
    })
    event.target.reset();
})
function displayAllImages () {
    fetch('http://localhost:3000/spiceblends')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(spice => {
            const imgTag = document.createElement('img')
            imgTag.src = spice.image;
            imgTag.alt = spice.title;
            imgTag.dataset.id = spice.id
            spiceImages.append(imgTag);
            renderImage(imgTag);
        })})
}

function renderImage(image) {
    image.addEventListener('click', event => {
        const imgId = parseInt(image.dataset.id)
        fetch(`http://localhost:3000/spiceblends/${imgId}`)
        .then(resp => resp.json())
        .then(spice => renderSpice(spice))
    })
}
displayAllImages();
renderFirstSpice();
