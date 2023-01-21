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
    const IngredientsDrowndownDOM = dropdownsModel.getIngredientsDrowndownDOM();

    ingredientsList.append(IngredientsDrowndownDOM);

    // console.log(allIngredients);
    // console.log(allAppliances);
    // console.log(allUstensils);
}

function vw(x){
    return ((x*100)/1440)
}

function init(){
displayData(recipes);
console.log(vw(667))
}

init();