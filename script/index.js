import {recipes} from '/data/recipes.js';

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

    // console.log(allIngredients);
    // console.log(allAppliances);
    // console.log(allUstensils);
}

function getEventListeners(){
    const dropdownMenus = document.querySelectorAll('.dropdown');

    // dropdownMenus.forEach((dropdownMenu) => {
        document.addEventListener('click', dropdownInteraction);
    // });
}

function init(){
    displayData(recipes);
    getEventListeners();
}

init();