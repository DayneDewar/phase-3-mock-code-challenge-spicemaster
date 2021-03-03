const spiceDetail = document.querySelector('div#spice-blend-detail');
const spiceImg = spiceDetail.querySelector('img.detail-image');
const spiceHeader = spiceDetail.querySelector('h2.title');
const ingredientsList = spiceDetail.querySelector('ul.ingredients-list');
const spiceForm = document.querySelector('form#update-form');
const ingredientForm = document.querySelector('form#ingredient-form');

function addIngredients(ingredient) {
    const li = document.createElement('li');
        li.innerText = ingredient;
        ingredientsList.append(li);
}

function renderFirstSpice () {
    fetch('http://localhost:3000/spiceblends/1')
        .then(resp => resp.json())
        .then(spice => {
        spiceImg.src = spice.image;
        spiceImg.alt = spice.title;
        spiceHeader.innerText = spice.title;
        spice.ingredients.forEach(ingredient => addIngredients(ingredient.name))
    })
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
    const newIngredient = event.target.name.value;
    addIngredients(newIngredient);
    event.target.reset();
})

renderFirstSpice();
