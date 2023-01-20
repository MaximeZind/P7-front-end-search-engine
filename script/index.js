import {recipes} from '/data/recipes.js';

function displayData(data){
    const ingredientsList = document.querySelector(".ingredients__menu__list");
    const appareilsList = document.querySelector(".appareils__menu__list");
    const ustensilsList = document.querySelector(".ustensils__menu__list");
    const recipesGallery = document.querySelector(".recipes__gallery")
}

function init(){
displayData(recipes)
}

init();