import {recipes} from '../data/recipes.js';

function displayData(recipes){
    const ingredientsList = document.querySelector(".ingredients__menu__list");
    const appareilsList = document.querySelector(".appareils__menu__list");
    const ustensilsList = document.querySelector(".ustensils__menu__list");
    const recipesGallery = document.querySelector(".recipes__gallery");

    let allIngredients = [];
    let allAppliances = [];
    let allUstensils = [];

    recipes.forEach((recipe) => {

        recipe.ingredients.forEach((item) => {
            let itemLowerCase = item.ingredient.toLowerCase();
            if (!allIngredients.includes(itemLowerCase)){
                allIngredients.push(itemLowerCase);
            }
        });

            if (!allAppliances.includes(recipe.appliance)){
                allAppliances.push(recipe.appliance);
            }

            recipe.ustensils.forEach((item) => {
                if (!allUstensils.includes(item)){
                    allUstensils.push(item);
                }
            });

        const recipeModel = recipePageFactory(recipe);
        const recipeCardsDOM = recipeModel.getRecipeCardsDOM();

        recipesGallery.append(recipeCardsDOM);

    });

    const dropdownsModel = dropdownMenusFactory(allIngredients, allAppliances, allUstensils);
    const ingredientsDrowndownDOM = dropdownsModel.getIngredientsDrowndownDOM();
    const appliancesDrowndownDOM = dropdownsModel.getAppliancesDrowndownDOM();
    const ustensilsDropdownDOM = dropdownsModel.getUstensilsDropdownDOM();

    ingredientsList.append(ingredientsDrowndownDOM);
    appareilsList.append(appliancesDrowndownDOM);
    ustensilsList.append(ustensilsDropdownDOM);
}

function getEventListeners(){

    //Dom Elements
    const ingredientsInput = document.querySelector("#ingredient__searchform > input[type=text]");
    const appareilsInput = document.querySelector("#appareils__searchform > input[type=text]");
    const ustensilsInput = document.querySelector("#ustensils__searchform > input[type=text]");
    const body = document.querySelector("body");
    const dropdownList = document.querySelectorAll(".dropdown__list");
    const filtersSection = document.querySelector('.filters');

    body.addEventListener('click', dropdownInteraction); //Ouverture ou fermeture des dropdown menus
    ingredientsInput.addEventListener('keyup', tagFilter); //Filtre des ingrédients à chaque pression d'une touche dans l'input
    appareilsInput.addEventListener('keyup', tagFilter);
    ustensilsInput.addEventListener('keyup', tagFilter);
    dropdownList.forEach((list) => {
        list.addEventListener('click', selectTag);
    });
    filtersSection.addEventListener('click', closeTag);
    
}

function init(){
    displayData(recipes);
    getEventListeners();
}

init();