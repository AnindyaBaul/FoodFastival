var inputBox = document.getElementById("inputBox");
var flagBox = document.getElementById("flagBox");
var recipeName = document.getElementById("recipeName");
var recipe = document.getElementById("recipe");
var youtube = document.getElementById("youtube");
var main = document.getElementById("main");
var cat = document.getElementById("cat");
var bgImg = document.getElementById("bgImg");
var items = document.getElementsByClassName('items');


function btn() {
    main.style.display = 'none'
    cat.innerHTML='';
    bgImg.innerHTML='';
    var food = inputBox.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

function home(){
    window.location.reload()
}

defaultFx();
function defaultFx() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => rendomPic(data))
}
function rendomPic(data) {

    var categories = data.categories
  
    for (const category of categories) {
        var strCategory = category.strCategory;
        var strCategoryThumb = category.strCategoryThumb;

        var newDiv = document.createElement('div');
        newDiv.classList = 'col'
        newDiv.setAttribute('data-aos','fade-up')
        newDiv.setAttribute('data-aos-duration','2000')
        newDiv.setAttribute('data-aos-once','true')
        newDiv.innerHTML = `<img onclick="loadRecipe('${strCategory}')" class="items" src="${strCategoryThumb}"> <p class="text-center">${strCategory}</p>`;
        bgImg.appendChild(newDiv);
    }
}
function loadRecipe(category) {
    var url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

function displayMeals(meals) {
    if(meals==null){
        cat.innerHTML=`<div class="d-flex justify-content-center align-items-center no-res" "> <img style="  border-radius: 10px;
        box-shadow: 0 0 15px; class="mx-auto " src="./image/01c4da1a-ae29-4f04-ba6e-5b09a9a48f4d-transformed.jpg"> </div>`   
    }

    else{
        
        // cat.style.height="auto"
        console.log(meals)
        bgImg.innerHTML = ""
        for (const meal of meals) {
            const { idMeal, strMeal, strMealThumb } = meal
    
            const newDiv = document.createElement(`div`)
            newDiv.classList = `col`
            newDiv.setAttribute('data-aos','fade-up')
            newDiv.setAttribute('data-aos-duration','2000')
            newDiv.setAttribute('data-aos-once','true')
            newDiv.innerHTML = `<img onclick="loadRecipeDetails('${idMeal}')"  class="items" src="${strMealThumb}"> <p class="text-center">${strMeal}</p>`;
            bgImg.appendChild(newDiv);
        }
    }
   
}

function loadRecipeDetails(idMeal) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => recipeDitels(data.meals[0]))
    bgImg.innerHTML = "F"
}

function recipeDitels(recipeALL) {
    const {
        strInstructions, strMeal, strMealThumb, strYoutube } = recipeALL
    main.style.display = "block";
    flagBox.innerHTML = `<img class="w-100 h-100" src="${strMealThumb}" >`
    recipeName.innerText = strMeal
    recipe.innerText = strInstructions
    youtube.innerHTML = `<a target="_blank" href="${strYoutube}"> click Here to view full recipe</a>`

}